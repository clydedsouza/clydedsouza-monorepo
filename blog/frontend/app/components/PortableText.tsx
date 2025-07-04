/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import ResolvedLink from "@/app/components/ResolvedLink";

import ReactPlayer from "react-player";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => {
        // Add an anchor to the h2
        return (
          <h2 className="group relative">
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        );
      },
    },
    types: {
      codeBlock: ({ value }) => (
        <SyntaxHighlighter
          language={value.language}
          style={atomOneDark}
          showLineNumbers
        >
          {value.code + "\nLanguage:" + value.language}
        </SyntaxHighlighter>
      ),
      githubGist: ({ value }) => (
        <div>
          <iframe
            src={`https://gist.github.com/${value.url.split("github.com/")[1]}.pibb`}
            width="100%"
            height={"800px"}
          />
        </div>
      ),
      googleAd: ({ value }) => (
        <div>
          {/* Replace with your actual ad code */}
          <b>google ad here</b>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXX"
            data-ad-slot={value.adSlot}
          />
        </div>
      ),
      youTube: ({ value }) => {
        return (
          <ReactPlayer src={value.url} width={"440px"} height={"247.50px"} />
        );
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
  };

  return (
    <div
      className={["prose prose-a:text-brand", className]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
