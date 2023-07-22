import ProductCard from "../ProductCard";

const ProductGrid = (props) => {
  return (
    <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5  ">
      {props?.productList.map((item, index) => {
        return (
          <ProductCard
            key={index}
            product_id={item.product_id}
            product_slug={item.product_slug}
            img_link={item.img_link}
            sub_title={item.product_sub_title}
            title={item.product_title}
            msp={item.product_msp}
            mrp={item.product_mrp}
            wishlist_id={item.wishlist_id}
            bagBtn={true}
            trashBtn={false}
            heartBtn={true}
          />
        );
      })}
    </section>
  );
};
export default ProductGrid;
