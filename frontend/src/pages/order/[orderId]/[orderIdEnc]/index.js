import { NextSeo } from "next-seo";
import Error from "next/error";
import { ArrowRightTopIcon } from "@/components/icons";
import CheckoutItem from "@/components/cart/CheckoutItem";
import { GetOrderApi } from "@/utils/service";
import CryptoJS from "crypto-js";

const OrderPage = ({ orderId, orderIdEnc, errorCode, orderDetails }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const pStyle = { marginTop: 0, marginBottom: 0 };
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

      <div className="py-10 px-4 md:px-6 2xl:px-20 bg-gray-50 2xl:container 2xl:mx-auto  mt-10  md:mx-20 lg:mx-24 ">
        <div className="flex justify-start   item-start space-y-2 flex-col">
          <p className="text-base text-center  font-medium leading-6 text-gray-400 ">
            THANK YOU
          </p>
          <h1 className=" text-center text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-black">
            Your order is confirmed
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-0  lg:gap-1  py-10">
          <div className="flex-[2] py-4 px-4 bg-white ">
            <div className="flex justify-start  py-4  item-start space-y-2  flex-col border-b border-gray-200 ">
              <h2 className="text-xl font-semibold mb-2">Order Info</h2>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                Order number: #9483003
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                Date: January 23, 2022
              </p>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="#"
                className="text-sm text-blue-500 hover:underline "
              >
                View invoice
                <ArrowRightTopIcon className="h-0 w-0 inline-block ml-1 -mt-1" />
              </a>
            </div>
            <div className="flex justify-start  py-4  item-start space-y-2  flex-col border-b border-gray-200 ">
              <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.shipping_address.fname}{" "}
                {orderDetails.shipping_address.lname}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.shipping_address.street_address}
              </p>

              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.shipping_address.apartment_suite_unit}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.shipping_address.city},{" "}
                {orderDetails.shipping_address.pincode},{" "}
                {orderDetails.shipping_address.state},{" "}
                {orderDetails.shipping_address.country}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.shipping_address.email}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.shipping_address.receiver_mobile},{" "}
                {orderDetails.shipping_address.alternative_mobile}
              </p>
            </div>
            <div className="flex justify-start  py-4  item-start space-y-2  flex-col border-b border-gray-200 ">
              <h2 className="text-xl font-semibold mb-2">Billing Address</h2>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.billing_address.fname}{" "}
                {orderDetails.billing_address.lname}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.billing_address.street_address}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.billing_address.apartment_suite_unit}{" "}
              </p>

              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.billing_address.city},{" "}
                {orderDetails.billing_address.pincode},{" "}
                {orderDetails.billing_address.state},{" "}
                {orderDetails.billing_address.country}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.billing_address.email}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.billing_address.receiver_mobile},{" "}
                {orderDetails.billing_address.alternative_mobile}
              </p>
            </div>
            <div className="flex justify-start  py-4  item-start space-y-2  flex-col">
              <h2 className="text-x font-semibold mb-2">Payment Method</h2>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {" "}
                {orderDetails.payment_response?.method}
              </p>
              <p
                className="text-sm font-small leading-6 text-gray-800"
                style={pStyle}
              >
                {orderDetails.payment_response?.id}
              </p>
            </div>
          </div>

          <div className="flex-[2] py-4 px-4  bg-white ">
            <h2 className="text-xl font-semibold mb-2">Ordered Items</h2>

            {orderDetails.orderItems?.map((item) => (
              <CheckoutItem key={item.product_id} data={item} />
            ))}
            <div className="mb-2 flex items-center justify-between pt-2 ">
              <p>Subtotal</p>
              <p className="text-right">&#8377;{orderDetails.order_amount}</p>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p>Taxes</p>
              <p className="text-right">&#8377;0.00</p>
            </div>
            <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-2">
              <p>Shipping</p>
              <p className="text-right">&#8377;0.00</p>
            </div>
            <div className="mb-5 flex justify-between">
              <div className="uppercase text-md md:text-lg font-medium text-black">
                Total
              </div>
              <div className="text-md md:text-lg font-medium text-black">
                &#8377;{orderDetails.order_amount}
              </div>
            </div>
          </div>
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
  //API CAll ------
  try {
    if (
      orderIdEnc.toString() !== CryptoJS.SHA256(orderId.toString()).toString()
    ) {
      return { notFound: true };
    }
    const req = await GetOrderApi(orderId);
    const data = await req.json();
    if (data.ok === false) {
      return { notFound: true };
    }
    return {
      props: {
        orderDetails: data?.orderDetails,
        orderId: orderId,
        orderIdEnc: orderIdEnc,
      },
    };
  } catch (error) {
    return { props: { errorCode: 500 } };
  }
}

export default OrderPage;
