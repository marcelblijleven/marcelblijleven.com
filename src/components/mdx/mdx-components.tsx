import TOCInline from "pliny/ui/TOCInline";
import Pre from "@/components/mdx/pre";
import type { MDXComponents } from "mdx/types";
import Image from "@/components/mdx/image";
import CustomLink from "@/components/mdx/link";
import TableWrapper from "@/components/mdx/table-wrapper";
import Paragraph from "@/components/mdx/paragraph";
import { Heading1, Heading2, Heading3, Heading4 } from "@/components/mdx/heading";
import { OrderedList, UnorderedList } from "@/components/mdx/lists";

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
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  ol: OrderedList,
  ul: UnorderedList,
};
