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

      <main className='flex-grow'>
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default Layout