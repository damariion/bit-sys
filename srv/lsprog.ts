// list programs

export async function main(ns: NS) 
{
    let path = "bitsys/var/programs.json";
    let struct = {
        "NUKE"           : null,
        "BruteSSH"       : null,
        "FTPCrack"       : null,
        "HTTPWorm"       : null,
        "AutoLink"       : null,
        "Formulas"       : null,
        "RelaySMTP"      : null,
        "SQLInject"      : null,
        "DeepscanV1"     : null,
        "DeepscanV2"     : null,
        "ServerProfiler" : null,
    }

    // dynamically define
    for (let program of Object.keys(struct))
    {
        struct[program] = ns.fileExists(
            program + ".exe", "home");
    }
    
    // writing
    await ns.write(path, JSON.stringify(
        struct, null, 4), 'w');
    await ns.sleep(100);
}