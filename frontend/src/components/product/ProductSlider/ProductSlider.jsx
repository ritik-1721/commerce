"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import Image from "next/image";

const ProductSlider = (props) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const handleNextSlide = () => {
    slider1.current.slickNext();
  };

  const handlePrevSlide = () => {
    slider1.current.slickPrev();
  };
  let imagesArray = props.images;
  if (props.images.length < 3) {
    imagesArray = imagesArray.concat(props.images);
    if (props.images.length < 2) {
      imagesArray = imagesArray.concat(props.images);
    }
    if (props.images.length < 1) {
      imagesArray = imagesArray.concat(props.images);
    }
  }

  return (
    <div style={{ height: "auto", width: "90%" }}>
      <div className="relative">
        <Slider
          nextArrow={<></>}
          prevArrow={<></>}
          infinite={true}
          dots={false}
          slidesToShow={1}
          slidesToScroll={1}
          // focusOnSelect={true}
          asNavFor={nav2}
          ref={slider1}
        >
          {imagesArray.map((i, index) => (
            <>
              {" "}
              <div
                key={index}
                className={`items-center  text-center aspect-square `}
              >
                <Image
                  className={`h-auto w-full `}
                  src={`${i.img}?w=600&h=600`}
                  blurDataURL={`${i.img}?w=10&h=10`}
                  height={800}
                  width={800}
                  alt="Product Image"
                  placeholder="blur"
                />
              </div>
            </>
          ))}
        </Slider>
        <div className="bg-violet absolute bottom-10 right-10 flex flex-row border-slate-300 border text-accent-0 z-0 shadow-xl select-none object-cover 2xl:visible xl:visible md:visible lg:visible sm:invisible invisible">
          <button
            className="px-9 py-3 cursor-pointer hover:bg-zinc-300 "
            onClick={handlePrevSlide}
            aria-label="Previous Product Image"
          >
            <ArrowLeft />
          </button>
          <button
            className="px-9 py-3 cursor-pointer hover:bg-zinc-300 border-l border-slate-300 "
            onClick={handleNextSlide}
            aria-label="Previous Product Image"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: `#f1f1f1`,
        }}
      >
        <Slider
          nextArrow={<></>}
          prevArrow={<></>}
          infinite={true}
          dots={false}
          slidesToShow={3}
          slidesToScroll={1}
          focusOnSelect={true}
          asNavFor={nav1}
          centerMode={true}
          ref={slider2}
          beforeChange={(current, next) => setSliderIndex(next)}
        >
          {imagesArray.map((i, index) => (
            <>
              <div
                key={index}
                className={`items-center  text-center aspect-square`}
              >
                <Image
                  src={`${i.img}?w=240&h=240`}
                  height={100}
                  width={100}
                  alt="Product Image"
                  placeholder="blur"
                  blurDataURL={`${i.img}?w=10&h=10`}
                  className={`h-auto w-full ${
                    index === sliderIndex && "opacity-75"
                  }`}
                />
              </div>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
