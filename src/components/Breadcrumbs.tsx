"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import {useMemo} from "react";

function Crumb(props: { name: string, href: string, isLast: boolean}) {
    const name = useMemo(() => {
        return props.name.replaceAll("-", " ");
    }, [props.name]);

    if (props.isLast) {
        return (<p className={"text-sm text-gray-500 capitalize"}>{name}</p>)
    }

    return (
        <div className={"text-sm after:content-['/'] after:ml-3 after:text-gray-500"}>
            <Link href={props.href} className={"link capitalize no-underline"}>{name}</Link>
        </div>
    );
}

export default function Breadcrumbs() {
    const pathname = usePathname();

    const crumbs = useMemo(() => {
        const paths = pathname.split("/").filter(path => !!path);
        return [
            {name: "Home", href: "/"},
            ...paths.map((path, idx) => ({name: path, href: "/" + path}))
        ];
    }, [pathname]);

    if (crumbs.length === 1) {
        return null;
    }

    return (
        <div aria-label={"breadcrumb"} className={"flex space-x-3"}>
            {crumbs.map((crumb, idx) => (
                <Crumb key={idx} name={crumb.name} href={crumb.href} isLast={idx === crumbs.length - 1} />
            ))}
        </div>
    )
}

