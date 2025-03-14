export async function main(ns: NS) 
{
    ns.ramOverride(1.75);
    ns[ns.args[0]](...ns.args.slice(1));
}
