import Image from "next/image";
import {
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconSrc?: string;
  text: string;
  className?: string;
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  iconSrc,
  text,
  className,
  disabled,
  ...props
}) => {
  return (
    <>
      <button
        disabled={disabled}
        {...props}
        className={` ${
          disabled && "opacity-70"
        } w-fit px-4 h-10 gap-2   flex items-center justify-between font-roboto font-medium text-[1rem] rounded-md border-[1px]	${className}
      	`}
      >
        {iconSrc && (
          <Image width={12.6} height={12.6} src={iconSrc} alt="icon" />
        )}

        <span>{text}</span>
      </button>
    </>
  );
};

export default Button;
