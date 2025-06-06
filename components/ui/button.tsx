import React from 'react'

interface props{
    Icon: any;
    name: string;
    type:boolean;
}

const Button = ({Icon = "", name = "button", type = false} : props) => {
  return (
    <>
      {
        type? (
          <button className='px-4 py-2 rounded-full flex items-center gap-2 bg-transparent border border-primary text-primary hover:bg-primary hover:text-background transition-all cursor-pointer'>
            {Icon}
            <span>{name}</span>
          </button>
        ) : (
          <button className='px-4 py-2 rounded-full flex items-center gap-2 bg-primary text-background hover:opacity-85 transition-all cursor-pointer'>
            {Icon}
            <span>{name}</span>
          </button>
        )
      }

    </>
  )
}

export default Button