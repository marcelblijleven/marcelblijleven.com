import Intro from "@/app/Intro";
import TextSection from "@/components/TextSection";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter"
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'


import {getPostData, getSortedPostsData} from "@/lib/posts";

export default async function Post({ params }: { params: { slug: string }}) {
    const { slug } = params;
    const postData = await getPostData(slug);

    return (
        <>

            <Intro title={postData.title}/>
            <TextSection>
                <ReactMarkdown
                    className={"blog-post"}
                    components={{
                        h2: ({node, ...props}) => <h1 className={"font-semibold text-lg mb-2"} {...props} />,
                        p: ({node, ...props}) => <p className={"mb-2"} {...props} />,
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    {...props}
                                    style={dark}
                                    language={match[1]}
                                    PreTag="div"
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code {...props} className={className}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {postData.markdown}
                </ReactMarkdown>
            </TextSection>
        </>
    )
}

export async function generateStaticParams() {
    return getSortedPostsData();
}
