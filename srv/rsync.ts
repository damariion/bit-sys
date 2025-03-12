import {NSAPI} from 'bitsys/lib/nsapi.ts';

export async function main(ns: NS) 
{   
    // initialization
    let nsapi = new NSAPI(ns);
    let root  = "bitsys/rmt/";    

    let hosts = JSON.parse(ns.read("bitsys/var/hosts.json"));
    let files = Array<string>(await nsapi.call("ls", "home", root));
    
    // disallow empty directories
    if (files.length === 0) return;

    // copy all contents of /rmt
    for (let host in hosts)
    {
        for (let path of files)
        {
            let file = String(path).replace(root, '');

            // remove old file
            await nsapi.call("rm", file, host);

            // implemented for clean navigation on remote
            await nsapi.call("mv", "home", root + file, file);
            await nsapi.call("scp", file, host, "home");
            await nsapi.call("mv", "home", file, root + file);   
        }
    }
}