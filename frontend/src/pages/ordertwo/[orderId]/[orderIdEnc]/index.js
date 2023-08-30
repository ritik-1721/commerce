import { NextSeo } from "next-seo";
import Error from "next/error";

const OrderPage = ({ orderId, orderIdEnc, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <>
      <NextSeo
        title={"Order #" + orderId + " | " + orderIdEnc}
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

      <div class="py-14 px-4 md:px-6 2xl:px-20 bg-black 2xl:container 2xl:mx-auto  mt-10  md:mx-20 lg:mx-24 ">
        {/* <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-7  mt-10  md:mx-20 lg:mx-24 mb-5 "> */}

        <div class="flex justify-start   item-start space-y-2 flex-col">
          <h1 class="uppercase text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-white">
            your order was placed successfully.
          </h1>
          {/* <p class="text-base dark:text-gray-800 font-medium leading-6 text-gray-800">Hi Ritik!</p> */}

          <p class="text-base  font-medium leading-6 text-white">
            Check your email for your order confirmation.
          </p>

          {/* <p class="text-base dark:text-gray-300 font-small leading-6 text-gray-600">Ordered on 13 July 2022 | Order# 406-7525528-9050707</p> */}
        </div>
      </div>
      <div class="py-14 px-4 md:px-6 2xl:px-20 bg-black/[0.05] 2xl:container 2xl:mx-auto  md:mx-20 lg:mx-24 mb-5 ">
        <div class="flex justify-start   item-start space-y-2 flex-col">
          <p class="text-base font-small leading-6 text-gray-800">
            Your Order : 406-7525528-9050707
          </p>
          <p class="text-base font-small leading-6 text-gray-800">
            Order Date : December 19, 2013 , 2:30 PM GMT+1
          </p>
          <br />
          <p class="text-base font-small leading-6 text-gray-800">
            we have sent the order confirmation details to{" "}
            <span class="font-medium">ritikrppawar@gmail.com</span>
          </p>
        </div>

        <div class="flex justify-start py-14   item-start space-y-2 flex-col border-b border-gray-800 pb-2">
          <h1 class="uppercase text-xl my-2 lg:text-xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Shipment
          </h1>
        </div>

        <div class="flex justify-start py-14   item-start space-y-2 flex-col pb-2">
          <p class="text-base font-small leading-6 text-gray-800">
            Shipping Address
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
          Ritik Pawar
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
          Chestn
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
           Madhya Pradesh, Sarni, 460449
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
           rp@gmail.com
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
           +91-8305187639
          </p>
        </div>
      
        <div class="flex justify-start py-14   item-start space-y-2 flex-col border-b border-gray-800 pb-2">
          <h1 class="uppercase text-xl my-2 lg:text-xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Payment
          </h1>
        </div>

        
        <div class="flex justify-start py-14   item-start space-y-2 flex-col pb-2">
          <p class="text-base font-small leading-6 text-gray-800">
          Payment Details
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
          Ritik Pawar
          </p>
          <p class="text-base font-small leading-6 text-gray-800">
          Billing Details
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
          Chestn
          </p>
          <p class="text-base font-small leading-6 text-gray-400">
           Madhya Pradesh, Sarni, 460449
          </p>
        </div>
      
        <div class="flex justify-start py-14   item-start space-y-2 flex-col border-b border-gray-800 pb-2">
          <h1 class="uppercase text-xl my-2 lg:text-xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Items 
          </h1>
        </div>

      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { orderId: "1", orderIdEnc: "1" } },
      { params: { orderId: "2", orderIdEnc: "2" } },
    ],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { orderId, orderIdEnc } = params;
  return {
    props: {
      orderId,
      orderIdEnc,
    },
  };
  // //API CAll ------
  // try {
  //   const req = await getCategoryDetailsBySlugApi(categorySlug);
  //   const data = await req.json();
  //   if (data.ok === false) {
  //     return { notFound: true };
  //   }
  //   return {
  //     props: {
  //       categoryName: data?.categoryDetails?.category_name,
  //       categoryId: data?.categoryDetails?.category_id,
  //       categorySlug,
  //     },
  //   };
  // } catch (error) {
  //   return {
  //     props: { errorCode: 500 },
  //   };
  // }
}

export default OrderPage;
