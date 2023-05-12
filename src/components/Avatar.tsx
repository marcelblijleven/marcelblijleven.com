import Image from "next/image";

export default function Avatar() {
    return (
            <Image className={"rounded-full"} src={"/avatar.png"} alt={"An avatar of a cat"} width={30} height={30}/>
    )
}