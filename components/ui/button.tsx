import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
  Icon?: ReactNode;
  name: string;
  type?: boolean;
  size?: 'small' | 'normal' | 'large';
  onClick?: () => void;
}

const Button = ({
  Icon,
  name = 'Button',
  type = false,
  size = 'normal',
  onClick,
}: Props) => {
  const baseClass = 'font-medium rounded-full flex items-center justify-center transition-all cursor-pointer';

  const sizeClass = classNames({
    'px-2 py-1 gap-1': size === 'small',
    'px-4 py-2 gap-2': size === 'normal',
    'px-6 py-4 gap-3': size === 'large',
  });

  const textSizeClass = classNames({
    'text-xs': size === 'small',
    'text-sm': size === 'normal',
    'text-lg': size === 'large',
  });

  const filledClass = 'bg-primary text-background hover:opacity-80';
  const outlinedClass = 'bg-transparent border border-primary text-primary hover:bg-sky-200';

  return (
    <button
      className={classNames(
        baseClass,
        sizeClass,
        type ? outlinedClass : filledClass
      )}
      onClick={onClick}
    >
      {Icon}
      <span className={textSizeClass}>{name}</span>
    </button>
  );
};

export default Button;
