import { formatDate } from "pliny/utils/formatDate";
import siteMetadata from "@/data/siteMetadata";
import Link from "@/components/mdx/link";
import Tag from "@/components/tag";
import { format } from "date-fns";

interface Props {
  date: string;
  title: string;
  path: string;
  tags?: string[];
  summary: string | undefined;
}

export default function PostPreview({ date, title, path, tags, summary }: Props) {
  return (
    <article className="flex flex-col space-y-2 xl:space-y-0">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
        </dd>
      </dl>
      <div className="2">
        <div>
          <h2 className="text-xl font-bold leading-8 tracking-tight">
            <Link href={`/${path}`} className="link">
              {title}
            </Link>
          </h2>
          <div className="flex flex-wrap">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
        </div>
        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
      </div>
    </article>
  );
}

// export function PostPreviewSmall(props: Props) {
//   return (
//     <article className={"flex flex-col gap-x-2"}>
//       <dl>
//         <dt className="sr-only">Published on</dt>
//         <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
//           <time dateTime={props.date}>{formatDate(props.date, siteMetadata.locale)}</time>
//         </dd>
//       </dl>
//       <div className={"flex flex-col gap-2 leading-8 tracking-tight"}>
//         <h2 className="text-xl font-bold ">
//           <Link href={`/${props.path}`} className="link">
//             {props.title}
//           </Link>
//         </h2>
//         <div className={"flex flex-wrap"}>{props.tags?.slice(0, 3).map((tag) => <Tag key={tag} text={tag} />)}</div>
//       </div>
//         <div className="prose max-w-none text-gray-500 dark:text-gray-400">{props.summary}</div>
//     </article>
//   )
// }

export function PostPreviewSmall(props: Props) {
  return (
    <article className={"flex items-center gap-2 md:gap-4"}>
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="w-text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={props.date}>{format(new Date(props.date), "yyyy-MM-dd")}</time>
        </dd>
      </dl>
      <h2 className="text-base font-bold ">
        <Link href={`/${props.path}`} className="link">
          {props.title}
        </Link>
      </h2>
    </article>
  );
}
