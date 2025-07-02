import React from 'react'
import Link from 'next/link'

type Lesson = {
  title: string
  icon_name: string
  slug: string
}

type EduCardProps = {
  lesson: Lesson
}

const EduCard = ({ lesson }: EduCardProps) => {
  return (
    <Link 
      href={`/egitim/${lesson.slug}`} 
      className="group w-60 sm:w-72 rounded-lg border-1 border-neutral-200 dark:border-sky-800 hover:border-primary dark:hover:border-primaryDark transition-all duration-300 cursor-pointer bg-background dark:bg-backgroundDark hover:translate-y-[-2px] relative overflow-hidden"
    >
      <div className="flex flex-col items-center p-6 space-y-4 relative z-10">
        <img 
          src={`https://skillicons.dev/icons?i=${lesson.icon_name}`} 
          alt={`${lesson.title} icon`} 
          className="w-20 h-20 transition-transform duration-300 group-hover:scale-110"
        />
        <h3 className="text-lg font-bold text-textColor dark:text-textColorDark group-hover:text-primary dark:group-hover:text-primaryDark transition-colors text-center">
          {lesson.title}
        </h3>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primaryDark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  )
}

export default EduCard