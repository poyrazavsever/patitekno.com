import React from 'react'
import Button from '../ui/button';
import { IoMdSearch } from "react-icons/io";

const Navbar = () => {

  const navbarLink = "text-base font-medium text-textColor hover:opacity-70 transition-all";

  return (
    <nav className='py-8 flex items-center justify-between'>

      <div className='flex items-center gap-2'>
          <img src="/Logos/LogoWithoutBg.png" alt="logo for navbar" className='w-16'/>
          <span className='text-lg font-extrabold text-primary'>patitekno.com</span>
      </div>

      <div className='flex items-center gap-6'>

        <Button Icon={<IoMdSearch className='text-sm'/>} name='Ctrl K' type size='small'/>
        
        <a href="/" className={navbarLink}>Ana Sayfa</a>
        <a href="/egitim" className={navbarLink}>Eğitimler</a>
        <a href="/bülten" className={navbarLink}>Bülten</a>
        <a href="/blog" className={navbarLink}>Blog</a>
        <a href="/iletisim" className={navbarLink}>İletişim</a>

      </div>

    </nav>
  )
}

export default Navbar