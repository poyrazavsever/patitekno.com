import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

interface props {
  children : ReactNode;
};

const Layout = ({children} : props) => {
  return (
    <div className='min-h-screen max-w-5xl container mx-auto flex flex-col font-nunito'>

      <Toaster position='top-right'/>

      <Navbar />
      
      <main className='flex-grow'>
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default Layout