import classNames from 'classnames';
import { ReactNode } from 'react';
interface props{
    Icon: ReactNode;
    name: string;
    type:boolean;
    size:string;
}

const Button = ({Icon = "", name = "button", type = false, size = "normal"} : props) => {
  return (
    <>
      {
        type? (
          <button className={classNames(
            'font-medium rounded-full flex items-center justify-center bg-transparent border border-primary text-primary hover:bg-sky-200 transition-all cursor-pointer text-center',
            {
              "px-4 py-2 gap-2" : size === "normal",
              "px-6 py-4 gap-3" : size === "large",
              "px-2 py-1 gap-1" : size === "small"
            }
          )}>
            {Icon}
            <span className={classNames({
              "text-xs" : size === "small",
              "text-lg" : size === "large",
            })}>{name}</span>
          </button>
        ) : (
          <button className={classNames(
            'font-medium rounded-full flex items-center justify-center bg-primary text-background hover:opacity-80 transition-all cursor-pointer',
            {
              "px-4 py-2 gap-2" : size === "normal",
              "px-6 py-4 gap-3" : size === "large",
              "px-2 py-1 gap-1" : size === "small"
            }

          )}>
            {Icon}
            <span className={classNames({
              "text-xs" : size === "small",
              "text-lg" : size === "large",
            })}>{name}</span>
          </button>
        )
      }

    </>
  )
}

export default Button