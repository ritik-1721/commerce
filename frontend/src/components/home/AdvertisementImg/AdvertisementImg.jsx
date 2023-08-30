"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const adImgs = [
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/14105b35-cb2e-4865-862b-775233096865/jordan-delta-3-low-shoes-fQrm6Q.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3bc861e-d279-4fd8-85fa-3d80b869ec7b/air-max-90-shoes-K0Hf12.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7fac5625-1cd0-40de-b188-df9baa6f6059/air-max-dawn-se-shoes-hgfNdW.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9c873d33-58ff-4a69-a28c-9deabb3631eb/blazer-mid-pro-club-shoes-xCk8SQ.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f8f49bd3-68df-47c4-b873-df9cbc6e7da2/sb-dunk-low-pro-skate-shoes-NWJncN.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/785a6831-ef11-4880-b47f-a08c77460b37/react-miler-3-road-running-shoes-5xtNSj.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6bb1e869-114e-476e-96ff-c279778f7a06/pegasus-flyease-easy-on-off-road-running-shoes-RlnnC7.png",
];

export default function AdvertisementImg() {
  return (
    <Marquee
      gradient={false} 
      style={{ backgroundColor: "", zIndex: "0" }}
      speed={20}
    >
      <div className="flex md:order-2 ml-auto">
        {adImgs.map((i, index) => (
          <Image
            width={200}
            height={200}
            key={i}
            src={i}
            alt={`Ad Img ${index + 1}`}
            className="h-50 w-60 object-cover rounded-none"
          />
        ))}
      </div>
    </Marquee>
  );
}
