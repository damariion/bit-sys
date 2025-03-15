import {NSAPI} from 'bitsys/lib/nsapi.ts';
import {SysAPI} from 'bitsys/lib/sysapi.ts';

export async function main(ns: NS) 
{   
    // initialization
    let nsapi  = new NSAPI(ns);
    let sysapi = new SysAPI(nsapi);
    let root   = "bitsys/rmt/";    

    // efficient termination
    if (!await sysapi.directoryExists(root))
        return;

    let hosts = JSON.parse(ns.read("bitsys/var/hosts.json"));
    let files = Array<string>(await nsapi.call("ls", "home", root));

    // copy all contents of /rmt
    for (let host in hosts)
    {
        // clean system
        for (let file of await nsapi.call("ls", host))
            await nsapi.call("rm", file, host);

        for (let path of files)
        {
            let file = String(path).replace(root, '');

            // implemented for clean navigation on remote
            await nsapi.call("mv", "home", root + file, file);
            await nsapi.call("scp", file, host, "home");
            await nsapi.call("mv", "home", file, root + file);   
        }
    }
}
