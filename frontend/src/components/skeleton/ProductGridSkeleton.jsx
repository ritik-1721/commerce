import Image from "next/image";

const ProductGridSkeleton = () => {
  const itemCount = 8;
  return (
    <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5  ">
      {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
      {/* {props.categoryData.products_list.map((item) => { */}
      {Array.from({ length: itemCount }, (_, index) => {
        return (
          <div
            key={index}
            className="rounded-none w-80 sm:w-80 md:w-60 bg-white shadow-md duration-500 hover:scale-102 hover:shadow-xl "
          >
            <Image
              src="http://localhost:1000/static/images/gray-bg.jpg?w=240&h=240"
              alt="Product"
              className="h-50 w-80 sm:w-80 md:w-60 object-cover rounded-none"
              height={240}
              width={240}
            />
            <div className="px-4 py-3 w-60">
              <div className="mb-1 w-20 h-4 bg-gray-200 animate-pulse  "> </div>

              <div className="mb-2 w-full h-6 bg-gray-200 animate-pulse  ">
                {" "}
              </div>
              <div className="flex items-center">
                <div className="w-20 h-6 bg-gray-200 animate-pulse  "> </div>

                <div className="flex md:order-2 ml-auto">
                  {/* <SearchIcon/> */}

                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse  p-2.5 mr-2"></div>

                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse  p-2.5 mr-2"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* <!--   🛑 Product card 1 - Ends Here  --> */}
    </section>
  );
};

export default ProductGridSkeleton;
