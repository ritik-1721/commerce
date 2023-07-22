import CategoryFilters from "@/components/category/CategoryFilters/CategoryFilters";
import { getCategoryDetailsBySlugApi } from "@/utils/service";
import { NextSeo } from "next-seo";
import Error from "next/error";
// import { Suspense } from "react";

const CategoryPage = ({
  errorCode,
  categoryName,
  categoryId,
  categorySlug,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <>
      <NextSeo
        title={categoryName}
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
      <CategoryFilters categoryId={categoryId} categoryName={categoryName} slug={categorySlug} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { categorySlug: "men-running" } },
      { params: { categorySlug: "women-football" } },
    ],
    fallback: 'blocking', // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const categorySlug = params.categorySlug;
  //API CAll ------
  try {
    const req = await getCategoryDetailsBySlugApi(categorySlug);
    const data = await req.json();
    if (data.ok === false) {
      return { notFound: true };
    }
    return {
      props: {
        categoryName: data?.categoryDetails?.category_name,
        categoryId: data?.categoryDetails?.category_id,
        categorySlug,
      },
    };
  } catch (error) {
    return {
      props: { errorCode: 500 },
    };
  }
}

export default CategoryPage;
