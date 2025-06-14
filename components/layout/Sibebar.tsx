import React from 'react'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

interface SidebarProps {
  title: string
  items: {
    id: number
    title: string
    [key: string]: any
  }[]
  selectedItemId?: number | null
  onItemClick: (item: any) => void
  className?: string
  renderItem?: (item: any) => React.ReactNode
}

const Sidebar = ({
  title,
  items,
  selectedItemId,
  onItemClick,
  className,
  renderItem
}: SidebarProps) => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      {/* Burger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-30"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", bounce: 0.2 }}
              className={classNames(
                'overflow-auto max-h-screen h-screen fixed left-0 top-0 z-40',
                'w-72 bg-primary text-white py-6 px-2',
                'shadow-xl',
                className
              )}
            >
              <h3 className='text-lg font-semibold px-4 mt-10'>
                {title}
              </h3>

              <div className='flex flex-col items-start gap-1 mt-6'>
                {items.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={classNames(
                      'w-full px-4 py-2 rounded-lg text-left transition-colors',
                      'hover:bg-white/10',
                      {
                        'bg-white/20': selectedItemId === item.id
                      }
                    )}
                  >
                    {renderItem ? renderItem(item) : (
                      <span className='line-clamp-1'>{item.title}</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar