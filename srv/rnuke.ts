import {NSAPI} from 'bitsys/lib/nsapi';

// statics
const PORTS = [
    "BruteSSH", 
    "FTPCrack", 
    "HTTPWorm", 
    "RelaySMTP", 
    "SQLInject"
]

// assistance
function available_ports(programs: any): string[]
{       
    let res = [];
    for (let program in programs)
    {
        if (!programs[program])
            continue;

        if (PORTS.find(x => x == program))
            res.push(program);
    }

    return res;
}

// force object-oriented structure
export async function main(ns: NS) 
{
    // initialization
    let nsapi  = new NSAPI(ns);
    let hosts  = JSON.parse(ns.read("bitsys/var/hosts.json"));
    let progs  = JSON.parse(ns.read("bitsys/var/programs.json"));
    let lhack  = await nsapi.call("getHackingLevel");
    let lport  = available_ports(progs);

    for (let host in hosts)
    {    

        let root   = hosts[host]["root"];
        let rhack  = hosts[host]["hack"];
        let rport  = hosts[host]["ports"];

        if (root)
            continue;

        if (rhack > lhack)
            continue;
        
        if (rport > lport.length)
            continue;

        // deport
        for (let port of lport)
            await nsapi.call(port.toLowerCase(), host);

        // infiltrate
        await nsapi.call("nuke", host);    
    }
}