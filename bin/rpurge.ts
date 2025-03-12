import {NSAPI} from 'bitsys/lib/nsapi.ts';

export async function main(ns: NS) 
{
    let nsapi = new NSAPI(ns);
    let hosts = JSON.parse(ns.read(
        "bitsys/var/hosts.json"));

    for (let host in hosts)
    {
        for (let file of await nsapi.call("ls", host))
            await nsapi.call("rm", file, host);
    }
}
