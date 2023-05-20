import * as fs from "fs";
import path from "path";

function readSha() {
    return fs.readFileSync(path.join(process.cwd(), "src/lib/sha.txt")).toString();
}


export default function Footer() {
    const sha = readSha();
    return (
        <footer className={"fixed bottom-0 w-full bg-white"}>
            <div className={"flex justify-center items-center max-w-5xl mx-auto px-8 h-12"}>
                <p className={"text-xs text-gray-300"}>{sha}</p>
            </div>
        </footer>
    )
}

