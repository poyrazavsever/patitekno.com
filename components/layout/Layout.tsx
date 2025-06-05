import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface props {
  children : ReactNode;
};

const Layout = ({children} : props) => {
  return (
    <div className='min-h-screen max-w-5xl container mx-auto flex flex-col font-nunito'>

      <Navbar />

      <img src="/Logos/LogoWithoutBg.png" alt="background logo" className='w-96 md:w-[600px] absolute bottom-1/3 left-1/3 opacity-10'/>

      <main className='flex-grow'>
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default Layout