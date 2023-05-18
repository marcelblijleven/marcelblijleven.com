import fs from "fs";
import path from "path";
import matter  from "gray-matter";
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

const directory = path.join(process.cwd(), "posts");

export function getSortedPostsData(): {id: string, [p: string]: any}[] {
    const fileNames = fs.readdirSync(directory);
    const allData = fileNames.map(filename => {
        const id = filename.replace(/\.md$/, "");
        const filePath = path.join(directory, filename);
        const content = fs.readFileSync(filePath, "utf-8");
        const parsed = matter(content);

        return {
            id,
            slug: id,
            ...parsed.data,
        }
    });

    return allData.sort((a, b) => {
        // @ts-ignore
        if (a.date < b.date) {
            return 1;
        }

        return -1;
    })
}

export async function getPostData(id: string): Promise<{ id: string, markdown: string, [p: string]: any }> {
    const filePath = path.join(directory, `${id}.md`);
    const contents = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(contents);
    const processedContent = await remark().use(remarkParse).process(parsed.content);

    return {
        id,
        markdown: processedContent.toString(),
        ...parsed.data,
    };
}