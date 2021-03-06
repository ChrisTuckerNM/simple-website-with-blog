"use strict";
const React = require("react");
const shared = require("../" + "shared.js");
const strings = {
    "title": "simple-website-with-blog/sample-text",
    "description": "The blog of a simple web site",
    "author": "David Anson",
    "copyright": `Copyright \u00a9 2006-${new Date().getFullYear()} by David Anson`
};
module.exports.getPostTitle = (post) => post.title;
module.exports.getContentJsonElements = (contentJson) => {
    const content = contentJson.map((line, index) => React.createElement("p", { key: index }, line));
    return React.createElement("div", null, content);
};
module.exports.getHtmlElements = (props) => {
    const tags = shared.getTagList(props.tags);
    const archives = shared.getArchiveList(props.archives);
    const posts = props.posts.map((post) => {
        const tagLinks = shared.getTagLinks(post.tags);
        const references = shared.getReferences(Boolean(props.title), post.references, props.publishedPostFilter);
        return (React.createElement("div", { key: post.id, className: "post" },
            React.createElement("h2", null,
                React.createElement("a", { href: `/blog/post/${post.id}` }, post.title)),
            shared.getPublishDate(post),
            React.createElement("div", { className: post.contentSource, dangerouslySetInnerHTML: { "__html": post.contentHtml } }),
            tagLinks,
            references
                ? (React.createElement("div", { className: "references" },
                    React.createElement("p", null, "Related Posts:"),
                    references))
                : null));
    });
    const { title, heading } = shared.getTitleHeading(props, strings);
    return (React.createElement("html", { lang: "en" },
        React.createElement("head", null,
            React.createElement("title", null, title),
            React.createElement("meta", { name: "viewport", content: "width=device-width" }),
            React.createElement("meta", { name: "description", content: strings.description }),
            shared.getMetaRobots(props.noindex),
            React.createElement("link", { rel: "alternate", type: "application/rss+xml", href: "/blog/rss", title: strings.title }),
            React.createElement("link", { rel: "stylesheet", href: "/blog.css" }),
            React.createElement("link", { rel: "stylesheet", href: "/xcode.css" })),
        React.createElement("body", null,
            React.createElement("div", { className: "column" },
                React.createElement("h1", { className: "banner" },
                    React.createElement("a", { href: "/blog" }, strings.description)),
                React.createElement("div", { className: "content" },
                    React.createElement("div", { className: "posts" },
                        heading ? React.createElement("h2", null, heading) : null,
                        posts,
                        shared.getPrevNextLinks(props)),
                    React.createElement("div", { className: "sidebar" },
                        React.createElement("img", { src: "/avatar.png", alt: strings.author }),
                        React.createElement("h2", null, "About"),
                        React.createElement("p", null, strings.description),
                        React.createElement("p", null,
                            "By ",
                            strings.author),
                        React.createElement("h2", null, "License"),
                        React.createElement("p", null,
                            React.createElement("a", { href: "/blog/post/mit-license" }, "MIT")),
                        React.createElement("h2", null, "Search"),
                        React.createElement("form", { action: "/blog/search" },
                            React.createElement("input", { type: "text", name: "query", accessKey: "s", placeholder: "HTML -CSS Java*", "aria-label": "Search" })),
                        React.createElement("h2", null, "Tags"),
                        React.createElement("ul", null, tags),
                        React.createElement("h2", null, "Archive"),
                        React.createElement("ul", null, archives))),
                React.createElement("div", { className: "copyright" }, strings.copyright)))));
};
module.exports.getRssMetadata = () => shared.getRssMetadata(strings);
