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
    name: "Ana Sayfa"
  },
  {
    name: "Eğitimler"
  },
  {
    name: "Kategoriler"
  },
  {
    name : "Bülten"
  },
  {
    name : "İletişim"
  }
]

const Footer = () => {

  const [lightMode, setLightMode] = useState("light");
  const lightStyle = "text-primary rounded-full p-2 text-lg cursor-pointer hover:bg-sky-200 transition-all";

  return (
    <footer className='py-6 flex items-start justify-between'>

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


      <div className='flex flex-col items-start gap-2'>
        <h3 className='text-base font-semibold text-primary'>Navigasyon</h3>

        {links?.map(link => (
          <a href="#" className='text-textColor font-medium hover:opacity-70 transition-all'>{link.name}</a>
        ))}
      </div>

    </footer>
  )
}



export default Footer