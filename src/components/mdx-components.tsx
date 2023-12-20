import TOCInline from "pliny/ui/TOCInline";
import Pre from "@/components/pre";
import type { MDXComponents } from "mdx/types";
import Image from "./image";
import CustomLink from "./link";
import TableWrapper from "./table-wrapper";
import Paragraph from "./paragraph";

interface CustomLinkProps {
  href: string;
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: ({href, ...rest}: CustomLinkProps) => <CustomLink className={"text-blue-500 hover:underline"} href={href} {...rest}/> ,
  pre: Pre,
  table: TableWrapper,
  p: Paragraph,
};
