import React from 'react'

const logos = [
  {
    name: "youtube"
  },
  {
    name: "linkedin"
  },
  {
    name: "instagram"
  },
  {
    name : "github"
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
  return (
    <footer className='py-6 flex items-start justify-between'>

      <div className='flex flex-col items-start gap-2 w-1/3'>
        <h3 className='text-base font-semibold text-primary'>Pati Tekno Hakkında</h3>
        <p className='text-base font-medium text-textColor'>Pati Tekno, yazılım, tasarım ve teknoloji dünyasına eğlenceli ama öğretici bir pencereden bakan bir içerik platformudur.</p>
      </div>


      <div className='flex flex-col items-start gap-2'>
        <h3 className='text-base font-semibold text-primary'>Bizi Takip Et!</h3>

        {logos?.map(logo => (
            <button className='px-4 py-3 rounded-md border border-neutral-300 flex items-center justify-center cursor-pointer hover:shadow-sm transition-all'>
              <img src={`/Image/${logo.name}.png`} alt={`${logo.name} logo for footer`} className='w-16'/>
            </button>
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