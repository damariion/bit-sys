export class NSAPI
{
    // standard output
    #out = "bitsys/tmp/nsout.json";

    // supported api's
    #ns = "bitsys/srv/nsx.ts";

    // only (required) api for file operations
    #_; constructor (ns: NS) { this.#_ = ns; }

    async call(id: string, ...params: any[])
    {
        // execute
        await this.#_.exec(this.#ns, 
            "home", 1, id, ...params);
        
        // capture
        let stdout = JSON.parse(await
            this.#_.read(this.#out))[id];

        // reset
        return stdout;
    }
}
