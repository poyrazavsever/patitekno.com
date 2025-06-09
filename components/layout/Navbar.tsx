import React, { useState } from 'react'
import Button from '../ui/button'
import { IoMdSearch } from "react-icons/io"
import { IoCloseSharp, IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navbarLink = "text-base font-medium text-textColor hover:opacity-70 transition-all"

  return (
    <>
      <nav className='py-8 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img src="/Logos/LogoWithoutBg.png" alt="logo for navbar" className='w-16'/>
          <span className='text-lg font-extrabold text-primary'>patitekno.com</span>
        </div>

        <div className='flex items-center gap-6'>
          <Button 
            Icon={<IoMdSearch className='text-sm' />} 
            name='Ctrl K' 
            type 
            size='small' 
            onClick={() => setIsSearchOpen(true)} 
          />
          
          <a href="/" className={navbarLink}>Ana Sayfa</a>
          <a href="/egitim" className={navbarLink}>Eğitimler</a>
          <a href="/bulten" className={navbarLink}>Bülten</a>
          <a href="/blog" className={navbarLink}>Blog</a>
          <a href="/iletisim" className={navbarLink}>İletişim</a>
        </div>
      </nav>

      {
        isSearchOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-32 z-50">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg py-6 pl-6 pr-12 mx-4 relative">
              
              <div className="flex items-center gap-3 border border-gray-300 rounded px-4 py-2 focus-within:ring-2 focus-within:ring-primary">
                <IoSearch className="text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Ders, blog, kategori ara..."
                  className="w-full focus:outline-none text-sm"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsSearchOpen(false);
                  }}
                />
              </div>

              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <IoCloseSharp className="text-xl" />
              </button>
            </div>
          </div>
        )
      }
      
    </>
  )
}

export default Navbar
