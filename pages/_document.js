
import Document, { Head, Html, Main, NextScript } from "next/document";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/images/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <SpeedInsights />
                    <Analytics/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
