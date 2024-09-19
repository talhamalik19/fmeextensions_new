import dlv from "dlv";
import Script from "next/script";
const ArticleSchema = ({ article }) => {
    return (
        <Script type="application/ld+json" id="blog-schema">
            {`
            {
              "@context": "http://schema.org",
              "@type": "Blog",
              "name": "FME Extensions Blog",
              "url": "https://www.fmeextensions.com/blog/",
              "description": "${dlv(article,'blogs_data.0.article_meta_description')}",
              "publisher": {
                "@type": "Organization",
                "name": "FMEExtensions",
                "url": "https://www.fmeextensions.com/",
                "logo": "https://www.fmeextensions.com/images/webp/logo.webp"
              }
            }
            `}
        </Script>
    );
};

export default ArticleSchema;
