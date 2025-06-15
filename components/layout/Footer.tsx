import classNames from 'classnames';
import { useEffect, useState } from 'react'
import { RiComputerLine, RiSunLine, RiMoonClearLine } from "react-icons/ri";
import Button from '../ui/button';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-hot-toast';
import HCaptchaModal from '@/components/shared/HCaptchaModal';


const logos = [
  {
    name: "youtube",
    link: "https://www.youtube.com/@patitekno"
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/patitekno"
  },
  {
    name : "github",
    link: "https://github.com/PatiTekno"
  }
]

const Footer = () => {

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')
  const [email, setEmail] = useState('');
  const [isRecaptchaOpen, setIsRecaptchaOpen] = useState(false);
  const lightStyle = "text-primary rounded-full p-2 text-lg cursor-pointer hover:bg-sky-200 transition-all";

  

  const handleSubscribe = async (token: string | null) => {
    if (!token) {
      toast.error('Lütfen robot olmadığınızı doğrulayın');
      return;
    }

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;

      toast.success('Bültene başarıyla kaydoldunuz!');
      setEmail('');
      setIsRecaptchaOpen(false);
    } catch (error) {
      console.error('Kayıt sırasında hata:', error);
      toast.error('Bir hata oluştu, lütfen tekrar deneyin');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecaptchaOpen(true);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme')
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
      setTheme(savedTheme)
    }
  }, [])
  
  // theme değişince localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('site-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else if (theme === 'system') {
      // Sistem temasına göre ayarla
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const listener = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [theme])

  return (
    <>
      <footer className='pt-24 pb-16 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-0'>
  
        <div className='flex flex-col items-start gap-2 w-full md:w-1/3'>
          <h3 className='text-base font-semibold text-primary dark:text-primaryDark'>Pati Tekno Hakkında</h3>
          <p className='text-base font-medium text-textColor dark:text-textColorDark'>
            Pati Tekno, yazılım, tasarım ve teknoloji dünyasına eğlenceli ama öğretici bir pencereden bakan bir içerik platformudur.
          </p>
  
          <div className='mt-4 flex items-center border border-neutral-300 dark:border-gray-600 rounded-full'>
            <button
              onClick={() => setTheme("light")}
              className={classNames(
                [lightStyle],
                {
                  "!text-background bg-primary": theme === "light",
                }
              )}
            >
              <RiSunLine />
            </button>
  
            <button
              onClick={() => setTheme("system")}
              className={classNames(
                [lightStyle],
                {
                  "!text-background bg-primary": theme === "system",
                }
              )}
            >
              <RiComputerLine />
            </button>
  
            <button
              onClick={() => setTheme("dark")}
              className={classNames(
                [lightStyle],
                {
                  "!text-background bg-primary": theme === "dark",
                }
              )}
            >
              <RiMoonClearLine />
            </button>
          </div>
        </div>
  
        <div className='flex flex-col items-start gap-2 w-full md:w-1/5'>
          <h3 className='text-base font-semibold text-primary dark:text-primaryDark'>Bizi Takip Et!</h3>
  
          <div className="flex flex-row md:flex-col gap-3">
            {logos?.map((logo) => (
              <a
                key={logo.name}
                href={logo.link}
                target='_blank'
                className='px-4 py-3 rounded-md border border-neutral-300 dark:border-neutral-600 flex items-center justify-center cursor-pointer hover:shadow-sm transition-all'
              >
                <img
                  src={`/Image/${logo.name}.png`}
                  alt={`${logo.name} logo for footer`}
                  className='w-16'
                />
              </a>
            ))}
          </div>
        </div>
  
        <div className='w-full md:w-1/3'>
          <h3 className='text-base font-semibold text-primary dark:text-primaryDark'>Bültenimize Katıl</h3>
  
          <p className='text-sm text-textColor dark:text-textColorDark mb-2'>
            Yeni videolar, blog yazıları ve eğitimlerden ilk sen haberdar ol!
          </p>
  
          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row w-full gap-2 mt-2'>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className='flex-1 px-4 py-2 border border-neutral-300 rounded-md text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-primary dark:placeholder:text-textColorDark dark:bg-backgroundDark dark:border-gray-600 dark:text-textColorDark transition-all'
            />
            <Button
              name="Katıl"
              Icon
              size="normal"
              type={false}
            />
          </form>
        </div>
      </footer>
  
      <HCaptchaModal
        isOpen={isRecaptchaOpen}
        onClose={() => setIsRecaptchaOpen(false)}
        onVerify={handleSubscribe}
      />
    </>
  );
  
}



export default Footer