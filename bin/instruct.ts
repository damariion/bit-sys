export async function main(ns: NS) 
{
    let hosts = JSON.parse(ns.read(
        "bitsys/var/hosts.json"));

    for (let host in hosts)
        ns.exec("rnsx.ts", host, 1, ...ns.args)
}
