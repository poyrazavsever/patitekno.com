import classNames from 'classnames';
import {useState} from 'react'
import { RiComputerLine, RiSunLine, RiMoonClearLine } from "react-icons/ri";
import Button from '../ui/button';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-hot-toast';
import RecaptchaModal from '@/components/shared/reCaptcha';


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

  const [lightMode, setLightMode] = useState("light");
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

  return (
    <>
      <footer className='pt-48 pb-16 flex items-start justify-between'>

          <div className='flex flex-col items-start gap-2 w-1/3'>
            <h3 className='text-base font-semibold text-primary'>Pati Tekno Hakkında</h3>
            <p className='text-base font-medium text-textColor'>Pati Tekno, yazılım, tasarım ve teknoloji dünyasına eğlenceli ama öğretici bir pencereden bakan bir içerik platformudur.</p>

            <div className='mt-4 flex items-center border border-neutral-300 rounded-full'>
              <button
                onClick={() => setLightMode("light")}
                className={classNames(
                  [lightStyle],
                  {
                  "!text-background bg-primary": lightMode === "light",
                  }
              )}
              >
                <RiSunLine/>
              </button>

              <button
                onClick={() => setLightMode("system")}
                className={classNames(
                  [lightStyle],
                  {
                  "!text-background bg-primary": lightMode === "system",
                  }
              )}
              >
                <RiComputerLine/>
              </button>

              <button
                onClick={() => setLightMode("dark")}
                className={classNames(
                  [lightStyle],
                  {
                  "!text-background bg-primary": lightMode === "dark",
                  }
              )}
              >
                <RiMoonClearLine/>
              </button>
            </div>
            
          </div>


          <div className='flex flex-col items-start gap-2'>
            <h3 className='text-base font-semibold text-primary'>Bizi Takip Et!</h3>

            {logos?.map(logo => (
                <a href={logo.link} target='_blank' className='px-4 py-3 rounded-md border border-neutral-300 flex items-center justify-center cursor-pointer hover:shadow-sm transition-all'>
                  <img src={`/Image/${logo.name}.png`} alt={`${logo.name} logo for footer`} className='w-16'/>
                </a>
            ))}

          </div>


          <div className='w-full md:w-1/3'>
            <h3 className='text-base font-semibold text-primary'>Bültenimize Katıl</h3>
            
            <p className='text-sm text-textColor mb-2'>
              Yeni videolar, blog yazıları ve eğitimlerden ilk sen haberdar ol!
            </p>
            
            <form onSubmit={handleSubmit} className='flex w-full gap-2 mt-2'>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className='flex-1 px-4 py-2 border border-neutral-300 rounded-md text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-primary'
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

        <RecaptchaModal
          isOpen={isRecaptchaOpen}
          onClose={() => setIsRecaptchaOpen(false)}
          onVerify={handleSubscribe}
        />
      </>
  )
}



export default Footer