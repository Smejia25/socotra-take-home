import Image from "next/image";

const Card = ({
  iconSrc,
  title,
  subtitle,
  onClick,
}: {
  iconSrc: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="h-20 text-white w-[25.9rem] items-center flex gap-4 bg-Socotra/Honesty rounded-lg shadow-md py-5 pl-4"
    >
      <Image
        color="white"
        className="rounded-full border-white border-[1px] p-1"
        src={iconSrc}
        alt="Logo"
        width={40}
        height={40}
      />
      <div className="w-full h-full  flex flex-col font-raleway justify-center leading-5 text-start">
        <p className=" font-raleway font-medium h-[1.4rem]">{title}</p>
        {subtitle && (
          <p className="text-white/60 font-bold  h-[1.4rem] font-roboto l-h ">
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );
};

export default Card;
