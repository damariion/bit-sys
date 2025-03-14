export async function main(ns: NS) 
{
    for (let file of ns.ls("home", "bitsys/tmp"))
        ns.rm(file);
}
