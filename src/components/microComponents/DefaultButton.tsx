const DefaultButton = ({ text } : { text: string}) => {
  return (
    <a className="py-4 px-10 bg-[#e94222] text-white font-light text-lg italic cursor-pointer hover:bg-[#ffffff] hover:text-[#e94222] transition-colors duration-300 flex justify-center items-center">
        {text}
    </a>
  );
};

export default DefaultButton;
