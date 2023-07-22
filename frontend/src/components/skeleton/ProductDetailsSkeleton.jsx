import ProductSlider from "@/components/product/ProductSlider";

const ProductDetailsSkeleton = () => {
  return (
    <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-7  mt-10  md:mx-20 lg:mx-24 mb-5 ">
      <div className="rounded-none  bg-white  duration-500  w-full h-auto lg:col-span-2 px-10 md:px-2 lg:px-2 ">
        <ProductSlider
          images={[{ img: "http://localhost:1000/static/images/gray-bg.jpg" }]}
        />
      </div>
      <div className="rounded-none  bg-white duration-500 w-full h-auto lg:col-span-1 px-10 md:px-2 lg:px-2 ">
        <div
          className="w-full bg-gray-200 animate-pulse h-10 mb-2 
                  leading-tight tracking-tight"
        ></div>
        <div className="mb-4 w-36 h-6 bg-gray-200 animate-pulse  "> </div>
        <div className="flex items-center">
          <div className="w-20 h-7 bg-gray-200 animate-pulse  "> </div>
        </div>
        <div>
          <div className="pb-4">
            <div className="w-16 h-7 bg-gray-200 animate-pulse  mt-1"> </div>
            <div role="listbox" className="flex flex-row py-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse  p-2.5 mr-2"></div>
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse  p-2.5 mr-2"></div>
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse  p-2.5 mr-2"></div>
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse  p-2.5 mr-2"></div>
            </div>
          </div>
        </div>
        <div className="pb-4 w-full max-w-xl">
          <div className="w-full h-7 bg-gray-200 m-1 animate-pulse"></div>
          <div className="w-full h-7 bg-gray-200 m-1 animate-pulse"></div>
          <div className="w-full h-7 bg-gray-200 m-1 animate-pulse"></div>
          <div className="w-36 h-7 bg-gray-200 m-1 animate-pulse"></div>
        </div>
        <div className="pt-2 w-full flex flex-col">
          <div className="w-full bg-gray-200 animate-pulse h-10 mb-2 leading-tight tracking-tight"></div>
        </div>
        <div className="pt-2 w-full flex flex-col">
          <div
            className="w-full bg-gray-200 animate-pulse h-10 mb-2 
                  leading-tight tracking-tight"
          ></div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetailsSkeleton;
