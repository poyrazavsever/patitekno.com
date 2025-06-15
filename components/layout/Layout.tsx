import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'
import { useRouter } from 'next/router'

const defaultMeta = {
  title: 'Pati Tekno | Teknoloji | Tasarım | Yazılım',
  description: 'Pati Tekno: Teknoloji, tasarım ve yazılım dünyasına eğlenceli bir pencereden bak!',
}

interface props {
  children : ReactNode;
  meta?: {
    title?: string;
    description?: string;
  }
};

const metaMap: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Pati Tekno | Teknoloji | Tasarım | Yazılım',
    description: 'Pati Tekno: Teknoloji, tasarım ve yazılım dünyasına eğlenceli bir pencereden bak!',
  },
  '/egitim': {
    title: 'Eğitimler | Pati Tekno',
    description: 'Pati Tekno eğitimleri: Yazılım, teknoloji ve tasarım alanında ücretsiz dersler.',
  },
  '/bulten': {
    title: 'Bülten | Pati Tekno',
    description: 'Pati Tekno bültenine abone olun, yeni içeriklerden ilk siz haberdar olun!',
  },
  '/blog': {
    title: 'Blog | Pati Tekno',
    description: 'Pati Tekno blog: Yazılım, teknoloji ve tasarım üzerine güncel yazılar.',
  },
  '/iletisim': {
    title: 'İletişim | Pati Tekno',
    description: 'Pati Tekno ile iletişime geçin, görüş ve önerilerinizi iletin.',
  },
}

const Layout = ({children} : props) => {
  const router = useRouter()
  const basePath = router.pathname.replace(/\[.*\]/, '')
  const meta = metaMap[basePath] || metaMap['/']

  return (
    <div className='min-h-screen w-full px-6 md:px-0 md:max-w-5xl md:container mx-auto flex flex-col font-nunito'>

      <Toaster position='top-right'/>

      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://patitekno.com${router.asPath}`} />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href={`https://patitekno.com${router.asPath}`} />
      </Head>

      <Navbar />
      
      <main className='flex-grow'>
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default Layout