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
      className='flex flex-col items-center gap-4 p-6 rounded-md border border-neutral-200 dark:border-neutral-600 hover:shadow-xs transition-all'
    >
      <img 
        src={`https://skillicons.dev/icons?i=${lesson.icon_name}`} 
        alt={`${lesson.title} icon`} 
        className='w-24 h-24'
      />
      <span className='font-medium text-textColor dark:text-textColorDark'>{lesson.title}</span>
    </Link>
  )
}

export default EduCard