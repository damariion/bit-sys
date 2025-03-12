export async function main(ns: NS) 
{
    let i    = 0;
    let path = "bitsys/sys/seq.json"
    
    while (true)
    {
        // retrieve
        let services;
        try
        {
            services = JSON.parse(
                await ns.read(path));
        }
        catch { services = {}; }
        
        // conditional execution
        for (let service in services)
        {
            if (i++ % services[service] == 0)
                await ns.run(service);
        }

        // calibrated for 
        // outmost accuracy
        await ns.sleep(1000);
    }
}