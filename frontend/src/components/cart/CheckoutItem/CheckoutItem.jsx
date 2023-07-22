import Image from "next/image";
import Link from "next/link";

const Option = ({ attributes }) => {
  return (
    <>
      {" "}
      {attributes && attributes.length > 0 && (
        <div className="flex items-center pb-1">
          {attributes.map((item, i) => (
            <div
              key={`${item.pa_id}-${item.attribute_name}`}
              className="text-sm font-semibold text-black/[0.5] inline-flex items-center justify-center"
            >
              {item.attribute_name}
              {item.attribute_name === "Color" ? (
                <span
                  className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: `${item.attribute_value}`,
                  }}
                ></span>
              ) : (
                <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                  {item.attribute_value_description}
                </span>
              )}

              {i < attributes.length - 1 ? <span>/</span> : ""}
              {i === attributes.length - 1 ? "" : <span className="mr-3" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const CheckoutItem = ({ data }) => {
  const {
    quantity,
    product_title,
    product_sub_title,
    product_msp,
    product_mrp,
    product_id,
    product_slug,
    img_link,
    attributes,
    product_description,
  } = data;
  return (
    <li className={`flex flex-col py-4`}>
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer">
          <Link href={`/product/${product_slug}`}>
            <Image
              className={`w-full h-full object-cover`}
              width={64}
              height={64}
              src={img_link}
              alt={product_title}
            />
          </Link>
        </div>

        <div className="flex-1 flex flex-col text-base">
          <Link href={`/product/${product_slug}`}>
            <span className={"font-medium cursor-pointer pb-1"}>
              {product_title}
            </span>
          </Link>

          {/* OPTION */}
          <Option attributes={attributes} />
          {/*  OPTION */}

          <div className="text-sm tracking-wider">{quantity}x</div>
        </div>

        <div className="flex flex-col justify-between text-black/[0.5] text-sm md:text-md  font-bold space-y-2">
          <span>MRP : &#8377;{product_msp}</span>
        </div>
      </div>
    </li>
  );
};

export default CheckoutItem;
