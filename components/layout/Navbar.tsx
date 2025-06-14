import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navbarLink = "text-base font-medium text-textColor dark:text-textColorDark hover:opacity-70 transition-all"

  const menuItems = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/egitim", label: "Eğitimler" },
    { href: "/bulten", label: "Bülten" },
    { href: "/blog", label: "Blog" },
    { href: "/iletisim", label: "İletişim" },
  ]

  return (
    <nav className='relative py-8 w-full'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <Link href="/" className='flex items-center gap-2'>
          <img src="/Logos/LogoWithoutBg.png" alt="logo for navbar" className='w-16'/>
          <span className='text-lg font-extrabold text-primary dark:text-primaryDark'>patitekno.com</span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-6'>
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={navbarLink}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-primary dark:text-primaryDark hover:opacity-70 transition-all cursor-pointer"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full top-full left-0 right-0 bg-primary dark:bg-backgroundDark dark:border dark:border-gray-700 z-20 rounded-b-lg md:hidden"
          >
            <div className='flex flex-col py-4'>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`${navbarLink} px-6 py-3 !text-background hover:bg-primary/10 transition-all`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
