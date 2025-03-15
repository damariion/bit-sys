import {NSAPI} from 'bitsys/lib/nsapi.ts';

export class SysAPI
{
    #nsapi;
    constructor (nsapi: NSAPI)
    {
        this.#nsapi = nsapi;
    }

    async directoryExists(path: string)
    {
        // absence of items = nonexistent
        return (Array(await this.#nsapi.call(
            "ls", "home", path)).length > 0);
    }

    async sizeOf(path: string)
    {
        // singular file
        if (!await this.directoryExists(path))
            return String(await this.#nsapi.call("read", path)).length;

        // directory size
        let size = 0;
        for (let file of await this.#nsapi.call("ls", "home", path))
            size += String(await this.#nsapi.call("read", file)).length;

        return size;
    }
    
}
