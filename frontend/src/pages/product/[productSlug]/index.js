import ProductDetails from "@/components/product/ProductDetails";
import { getProductDetailsBySlugApi } from "@/utils/service";
import { NextSeo } from "next-seo";
import Error from "next/error";
import { Suspense } from "react";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";

const ProductPage = ({ errorCode, productDetails, productSlug }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <NextSeo
        title={productDetails?.product_title}
        description="Next SEO packages simplifies the SEO management in Next Apps with less configurations"
        canonical="www.example.com/next-seo-blog"
        openGraph={{
          type: "article",
          article: {
            publishedTime: "2022-06-21T23:04:13Z",
            modifiedTime: "2022-01-21T18:04:43Z",
            authors: [
              "https://www.example.com/authors/@firstnameA-lastnameA",
              "https://www.example.com/authors/@firstnameB-lastnameB",
            ],
            tags: ["Tag A", "Tag B", "Tag C"],
          },
          url: "www.example.com/next-seo-blog",
          images: {
            url: "https://www.test.ie/images/cover.jpg",
            width: 850,
            height: 650,
            alt: "Photo of text",
          },
          site_name: "Next Blog",
        }}
      />
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productDetails={productDetails} />
      </Suspense>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { productSlug: "men-running" } },
      { params: { productSlug: "jordan-one-take-4-pfyellowuk-9" } },
    ],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const productSlug = params.productSlug;
  //API CAll ------getProductDetailsBySlugApi PRODUCT_DETALIS_BY_SLUG_API
  try {
    const req = await getProductDetailsBySlugApi(productSlug);
    const data = await req.json();
    if (data.ok === false) {
      return { notFound: true };
    }
    return {
      props: {
        productDetails: data?.productDetails,
        productSlug,
      },
    };
  } catch (error) {
    return {
      props: { errorCode: 500 },
    };
  }
}

export default ProductPage;
