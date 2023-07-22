import Image from "next/image";
import { CrossIcon } from "@/components/icons";

const ProductToaster = ({
  dismissHandler,
  t,
  img_link,
  product_title,
  message,
}) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-80 bg-white shadow-lg rounded-none pointer-events-auto flex border border-gray-200 `}
    >
      {/* ring-1 ring-black ring-opacity-5 */}
      <div className="flex-1 w-0 p-1">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image
              width={500}
              height={500}
              className="h-12 w-12 rounded-none"
              src={img_link}
              alt={product_title}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-xs font-medium text-gray-900">{product_title}</p>
            <p className="mt-1 text-xs text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={dismissHandler}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-black hover:text-gray-500  "
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
};

export default ProductToaster;
