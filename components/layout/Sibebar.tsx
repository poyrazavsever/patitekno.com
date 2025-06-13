import classNames from "classnames";

type LessonPost = {
  id: number
  title: string
  content: string
  video_link: string
  lesson_id: number
  created_at: string
}

interface Props {
  posts: LessonPost[]
  selectedPost: LessonPost | null
  onSelectPost: (post: LessonPost) => void
  lessonTitle: string
}

const Sidebar = ({ posts, selectedPost, onSelectPost, lessonTitle }: Props) => {
  return (
    <aside className='overflow-auto max-h-screen h-screen fixed left-0 top-0 py-6 border-r border-neutral-300 w-72'>
      <h3 className='text-lg font-semibold text-primary px-6'>
        {lessonTitle} Ders Notları
      </h3>

      <div className='flex flex-col items-start gap-2 mt-4'>
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => onSelectPost(post)}
            className={classNames(
              'w-full px-6 py-1 cursor-pointer hover:bg-primary hover:text-background transition-all',
              {
                "bg-primary text-background": selectedPost?.id === post.id
              }
            )}
          >
            <span className='text-left line-clamp-1'>{post.title}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar