import classNames from 'classnames';
import {useState} from 'react'
import { RiComputerLine, RiSunLine, RiMoonClearLine } from "react-icons/ri";

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
    link: "https://www.github.com/poyrazavsever"
  }
]

const links = [
  {
    name: "Ana Sayfa",
    link: "",
  },
  {
    name: "Eğitimler",
    link: "egitim",
  },
  {
    name : "Bülten",
    link: "/bulten"
  },
  {
    name: "Blog",
    link: "/blog"
  },
  {
    name : "İletişim",
    link: "iletisim"
  }
]

const Footer = () => {

  const [lightMode, setLightMode] = useState("light");
  const lightStyle = "text-primary rounded-full p-2 text-lg cursor-pointer hover:bg-sky-200 transition-all";

  return (
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
          
          <p className='text-sm text-textColor mb-2'>Yeni videolar, blog yazıları ve eğitimlerden ilk sen haberdar ol!</p>
          
          <form className='flex w-full gap-2 mt-2'>
            <input
              type="email"
              required
              placeholder="E-posta adresiniz"
              className='flex-1 px-4 py-2 border border-neutral-300 rounded-md text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-primary'
            />
            <button
              type="submit"
              className='px-4 py-2 bg-primary text-background font-semibold rounded-md hover:opacity-90 transition-all text-sm'
            >
              Katıl
            </button>
          </form>

        </div>

    </footer>
  )
}



export default Footer