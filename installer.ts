export class Installer
{
    // stored locally for
    // simplicity and modifiability
    #sources =
    {
        "sys":[
            "init.ts",
            "ssm.ts",
            "seq.json",
        ],

        "lib":[
            "nsapi.ts",
            "sysapi.ts"
        ],

        "srv":[
            "lshosts.ts",
            "lsprogs.ts",
            "nsx.ts",
            "rnuke.ts",
            "rsync.ts",
        ],

        "rmt":[
            "rnsx.ts",
        ],

        "bin":[
            "instruct.ts", 
            "rpurge.ts"
            ],
    }

    #ns;
    constructor (ns: NS)
    {
        this.#ns = ns;
    }

    *#urls (): Generator<[string, string] | null>
    {
        let dstr = "bitsys/";
        let srcr = "https://raw.githubusercontent.com/" +
                   "damariion/bit-sys/refs/heads/main/";

        for (let dir in this.#sources)
        {
            for (let file of this.#sources[dir])
            {
                yield [
                    (srcr + dir + '/' + file), 
                    (dstr + dir + '/' + file)
                    ]
            }
        }

        yield null;
    }

    start()
    {
        let urls = this.#urls();
        let data: IteratorResult<[string, string] | null>;

        while ((data = urls.next().value) != null)
            this.#ns.wget(data[0], data[1], "home");
    }
}

export async function main(ns: NS) 
{
    let installer = new Installer(ns);
    installer.start();
}
