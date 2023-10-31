import Link from "next/link";

export function BackHome() {
    return (
        <Link href={"/"} className={"text-foreground md:text-muted-foreground md:hover:text-foreground block w-fit"}>
            <div className={"flex items-center hover:cursor-pointer gap-1 group"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <g clipPath="url(#clip0_9_2121)">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.25-7.25a.75.75 0 000-1.5H8.66l2.1-1.95a.75.75 0 10-1.02-1.1l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 001.02-1.1l-2.1-1.95h4.59z"
                              clipRule="evenodd"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_9_2121">
                            <path d="M0 0h20v20H0z"/>
                        </clipPath>
                    </defs>
                </svg>
                <span className={"opacity-95 md:opacity-0 md:group-hover:opacity-95 transition-opacity duration-500 text-sm md:text-base"}>Back home</span>
            </div>
        </Link>
    )
}