// list hosts
import {NSAPI} from 'bitsys/lib/nsapi.ts';

function hosts(ns: NS)
{
    let _hosts = new Set(ns.scan("home"));
    for (let host of _hosts)
    {
        ns.scan(host).forEach(
            x => _hosts.add(x));
    }

    _hosts.delete("home");
    return _hosts;
}

export async function main(ns: NS) 
{
    let path   = "bitsys/var/hosts.json";
    let nsapi  = new NSAPI(ns);
    let struct = {};

    for (let host of hosts(ns))
    {
        struct[host] =
        {
            "root" : await nsapi.call("hasRootAccess", host),
            "port" : await nsapi.call("getServerNumPortsRequired", host),
            "hack" : await nsapi.call("getServerRequiredHackingLevel", host),
            "secure"  : {
                "now" : await nsapi.call("getServerSecurityLevel", host), 
                "min" : await nsapi.call("getServerMinSecurityLevel", host)
            },
            "money" : {
                "now" : await nsapi.call("getServerMoneyAvailable", host),
                "max" : await nsapi.call("getServerMaxMoney", host)
            }
        }
    }

    await ns.write(path, JSON.stringify(struct, null, 4), 'w');
    await ns.sleep(100);
}