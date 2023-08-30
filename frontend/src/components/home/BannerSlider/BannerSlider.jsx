"use client";

// import Marquee from "react-fast-marquee";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const banner = [
  "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/a53b7f7e-37ab-4319-a1b4-5d9c0cca68601650180659343-Lancer_Desk.jpg",
  ,
  "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/eb6408d8-b413-49f7-8525-317fddba53821650180659351-Casual---Sports-Shoes_Desk.jpg",
  ,
  "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/846beb79-ada7-48c3-a6c6-4448f276c2111651599573979-Sports-Shoes_Desk.jpg",
  ,
];

export default function BannerSlider() {
  return (
    <>
      <Slider
        nextArrow={<></>}
        prevArrow={<></>}
        infinite={true}
        //dots={false}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        speed={1000}
        autoplaySpeed={2000}
        pauseOnHover={true}
      >
        {banner.map((b, index) => (
          <div className="h-auto w-full " key={index}>
            <img
              className={`h-auto w-full `}
              src={b}
              alt={`Picture of banner ${index + 1}.`}
            ></img>
          </div>
        ))}
      </Slider>
    </>
  );
}
