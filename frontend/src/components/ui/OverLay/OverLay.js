const OverLay = (props) => {
  return (
    <div className=" bg-black/50 backdrop-blur-sm backdrop-brightness-150 fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  opacity-80 flex flex-col items-center justify-center">
      {props.children}
    </div>
  );
};
export default OverLay;
