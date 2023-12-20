import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  children: ReactNode;
  summary?: string;
}

export default function Section(props: Props) {
  return (
    <section className={"w-full snap-center"}>
      <h3 className={"text-2xl font-medium"}>{props.title}</h3>
      <div className={"prose max-w-none text-gray-500 dark:text-gray-400"}>{props.summary}</div>
      {props.children}
    </section>
  );
}
