import CryptoJS from "crypto-js";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import ProfileSidebarMenu from "@/components/common/ProfileSidebarMenu";
import Image from "next/image";
import { ArrowRightTopIcon } from "@/components/icons";
import { useCallback, useEffect, useState } from "react";
import { fetchOrderList } from "@/utils/service";
import { useSelector } from "react-redux";
import Link from "next/link";
function OrderItem({ order }) {
  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 my-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Order #{order.order_no}</h3>
        <p className="text-gray-600 md:visible lg:visible sm:invisible invisible ">
          Date:{" "}
          {new Date(order.order_datetime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      
      <p className="text-gray-600  md:invisible lg:invisible sm:visible ">Date:{" "}
          {new Date(order.order_datetime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
      <p className="text-gray-600">Total Amount: {order.order_amount}</p>

      {/* Order Status */}
      <p className="text-gray-600">Status: {order.status_name}</p>

      {/* Order Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        {order.orderItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-16 h-16 overflow-hidden rounded-none">
              <Image
                width={100}
                height={100}
                src={item.img_link}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-800">{item.product_title}</p>
          </div>
        ))}
      </div>

      {/* Order Actions */}
      <div className="flex justify-end mt-4">
        <Link
          href={`/order/${order.order_id}/${CryptoJS.SHA256(
            order.order_id.toString()
          )}`}
          className="text-blue-500 hover:underline"
        >
          View Details
          <ArrowRightTopIcon className="h-2 w-2 inline-block ml-1 -mt-1" />
        </Link>
      </div>
    </div>
  );
}

function OrderItemLoading() {
  const emptyArray = new Array(2).fill(null);
  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 my-4">
      <div className="flex items-center justify-between">
        <div className="w-60 h-7 bg-gray-200 animate-pulse  "> </div>
        <div className="w-36 h-6 bg-gray-200 animate-pulse  "> </div>
      </div>

      <div className="w-36 h-6 my-2 bg-gray-200 animate-pulse  "> </div>

      <div className="w-20 h-6 my-2 bg-gray-200 animate-pulse  "> </div>

      {/* Order Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        {emptyArray.map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-16 h-16 overflow-hidden rounded-none">
              <div className="w-12 h-12 bg-gray-200 rounded-none animate-pulse  p-2.5 mr-2"></div>
            </div>
            <div className="w-36 h-6 my-2 bg-gray-200 animate-pulse  "> </div>
          </div>
        ))}
      </div>

      {/* Order Actions */}
      <div className="flex justify-end mt-4">
        <div className="w-20 h-6 my-2 bg-gray-200 animate-pulse  "> </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const userId = useSelector((state) => state.auth.userDetails?.user_id);
  const [orders, setOrders] = useState({
    loading: true,
    list: [],
    error: "",
  });
  const emptyArray = new Array(3).fill(null);

  const getOrderList = useCallback(async () => {
    try {
      setOrders({ list: [], loading: true, error: "" });

      if (!userId) {
        setOrders({
          list: [],
          loading: false,
          error: "User ID is missing.",
        });
        return false;
      }

      const req = await fetchOrderList(userId);
      const data = await req.json();

      if (!req.ok || !data.ok) {
        setOrders({
          list: [],
          loading: false,
          error: data.message || "Something went wrong.",
        });
        return false;
      }

      setOrders({ list: data.orderList, loading: false, error: "" });
    } catch (error) {
      console.error(error);
      setOrders({ list: [], loading: false, error: "Something went wrong." });
    }
  }, [userId]);

  useEffect(() => {
    getOrderList();
  }, [userId, getOrderList]);

  return (
    <ProtectedRoute>
      {/* <!-- component --> */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="hidden lg:block">
          <ProfileSidebarMenu activeLink={"/orders"} />
        </div>
        <div className="lg:col-span-3 px-3  md:px-28">
          <div className="flex-[3] ">
            <div className="bg-white">
              <div className="text-xl-semi  flex items-center gap-x-4 px-8 pb-6 pt-8  text-[28px] font-semibold ">
                <h2>Orders</h2>
              </div>
              <div className="px-8 pb-8">
                <div className="grid grid-cols-1 gap-4">
                  {orders.error && (
                    <div className="text-red-500">{orders.error}</div>
                  )}
                  {!orders.error && orders.loading && (
                    <>
                      {emptyArray.map((_, index) => (
                        <OrderItemLoading key={index} />
                      ))}
                    </>
                  )}
                  {!orders.error && !orders.loading && (
                    <div className="grid grid-cols-1 gap-4">
                      {orders.list.map((order) => (
                        <OrderItem
                          key={`order_id${order.order_id}`}
                          order={order}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
