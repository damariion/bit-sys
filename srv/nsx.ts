// (N)et(S)cript (E)xecution

export async function main(ns: NS) 
{   
    // silence Bitburner
    ns.ramOverride(3); 
    
    // initalization
    let loc = "bitsys/var/temp.json";
    let res = JSON.parse(ns.read(loc));
    
    // exploit 'n store
    res["nsx." + ns.args[0]] = ns[ns.args[0]](...ns.args.slice(1));
    ns.write(loc, JSON.stringify(res, null, 4), 'w');
}
