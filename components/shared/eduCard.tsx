import React from 'react'

const EduCard = () => {

  /* Deneme İçin*/
  const eduList = [
    {
      name: "HTML 101",
      iconName : "html",
      link: ""
    },
    {
      name: "CSS 101",
      iconName : "css",
      link: ""
    },
    {
      name: "Javascript 101",
      iconName : "js",
      link: ""
    },
    
    {
      name: "Typescript 101",
      iconName : "ts",
      link: ""
    }
  ]

  return (
    <div className='w-full flex flex-wrap items-center justify-between gap-8'>
      {
        eduList?.map((edu) => (
          <a href="" className='w-fit flex flex-col items-center gap-4 p-8 rounded-md border border-neutral-300 hover:shadow-sm transition-all'>
            <img src={`https://skillicons.dev/icons?i=${edu.iconName}`} alt="edu logo for card" className='w-32 h-32'/>
            <span className='font-medium text-textColor'>{edu.name}</span>
          </a>
        ))
      }
    </div>
  )
}

export default EduCard