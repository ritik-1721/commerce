import s from "./LoadingDots.module.css";

const LoadingDots = (props) => {
  return (

    <span className={`${s.root} inline-flex text-center items-center leading-7`}>
      <span className={`${s.dot} rounded-full h-2 w-2`} key={`dot_1`} />
      <span className={`${s.dot} rounded-full h-2 w-2`} key={`dot_2`} />
      <span className={`${s.dot} rounded-full h-2 w-2`} key={`dot_3`} />
    </span>

    // <span className={`${s.loader}`}>
    //   <span className={`${s.loader__dot} `}>.</span>
    //   <span className={`${s.loader__dot} `}>.</span>
    //   <span className={`${s.loader__dot} `}>.</span>
    // </span>
  );
};

export default LoadingDots;
