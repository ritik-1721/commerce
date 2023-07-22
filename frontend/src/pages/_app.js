import ReduxProvider, { wrapper } from "@/store/ReduxProvider";
import { SWRConfig } from "swr";
import "@/styles/globals.css";
import { Fragment } from "react";
import { DefaultSeo } from "next-seo";
import Layout from "@/components/common/Layout/Layout";

function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <SWRConfig>
        <Fragment>
          <DefaultSeo
            title="Next SEO Example"
            description="Next SEO is a plug in that makes managing your SEO easier in Next.js projects."
            openGraph={{
              type: "website",
              locale: "en_IE",
              url: "https://www.url.ie/",
              siteName: "SiteName",
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Fragment>
      </SWRConfig>
    </ReduxProvider>
  );
}

// export default wrapper.withRedux(App);
export default App;