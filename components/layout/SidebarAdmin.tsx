import React from 'react'
import { FaMessage, FaBlog, FaBook, FaNewspaper } from "react-icons/fa6";

// import { useRouter } from 'next/router'

const SidebarAdmin = () => {

    // const router = useRouter()
    // const link = router.query
    const iconStyle = "text-xl text-primary"
    const sectionStyle = 'flex items-center gap-4 font-medium'

  return (
    <aside className='max-w-xs h-screen fixed left-0 py-8 px-6 border-r border-neutral-200 flex flex-col items-center justify-between'>

        <div className='flex flex-col items-start gap-8'>

            <div className='flex items-center gap-2'>
                <img src="/Logos/LogoWithoutBg.png" alt="logo for sidebar admin" className='w-12'/>
                <span className='text-lg font-extrabold text-primary'>Admin Sayfası</span>
            </div>

            <div className='flex flex-col items-start gap-8 text-textColor'>
                <section className={sectionStyle}>  
                    <FaBlog className={iconStyle}/>
                    <a href="/admin/blog">Blog Düzenleme</a>
                </section>

                <section className={sectionStyle}>  
                    <FaBook className={iconStyle}/>
                    <a href="/admin/egitim">Ders Düzenleme</a>
                </section>

                <section className={sectionStyle}>  
                    <FaNewspaper className={iconStyle}/>
                    <a href="/admin/bulten">Bülten Düzenleme</a>
                </section>

                <section className={sectionStyle}>  
                    <FaMessage className={iconStyle}/>
                    <a href="/admin/mesajlar">Mesajların</a>
                </section>
            </div>

        </div>

        <button className='w-full rounded-md py-2 font-medium text-rose-100 bg-rose-500 cursor-pointer hover:bg-rose-400 transition-all'>Çıkış Yap</button>
            
    </aside>
  )
}

export default SidebarAdmin