// (N)et(S)cript (E)xecution

export async function main(ns: NS) 
{   
    // silence Bitburner
    ns.ramOverride(3); 
    
    // initalization
    let res = new Object();
    let loc = "bitsys/tmp/nsout.json";
    
    // exploit 'n store
    res[ns.args[0]] = ns[ns.args[0]](...ns.args.slice(1));
    ns.write(loc, JSON.stringify(res), 'w');
}
