import React from 'react'
import Button from '@/components/ui/button'

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

const Iletisim = () => {
  return (
    <section className='pt-24 text-textColor'>

      {/* Başlık */}
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-primary mb-4'>İletişim</h1>
        <p className='text-base text-textColor max-w-lg'>
          Görüş, öneri ya da iş birliği teklifin mi var? Aşağıdaki formu doldur veya sosyal medya hesaplarımızdan bize ulaş!
        </p>
      </div>

      <div className='items-start justify-between grid grid-cols-1 md:grid-cols-2 gap-16'>

        {/* Form */}
        <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            placeholder='Adınız (Opsiyonel)'
            required
            className='border border-neutral-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm'
          />

          <input
            type='email'
            placeholder='E-posta adresiniz'
            required
            className='border border-neutral-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm'
          />

          <textarea
            rows={6}
            placeholder='Mesajınız'
            required
            className='border border-neutral-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none'
          />

          <Button name="Gönder" Icon size="normal" type={false}/>

        </form>

        {/* Sosyal Medya + İletişim Bilgileri */}
        <div className='flex flex-col justify-center items-start gap-2'>

          <h3 className='font-semibold text-base text-primary'>Sosyal Medyada Bizi Takip Et</h3>
          <div className='flex gap-4'>

            {logos?.map(logo => (
                <a href={logo.link} target='_blank' className='px-4 py-3 rounded-md border border-neutral-300 flex items-center justify-center cursor-pointer hover:shadow-sm transition-all'>
                    <img src={`/Image/${logo.name}.png`} alt={`${logo.name} logo for footer`} className='w-16'/>
                </a>
            ))}
          </div>

          <div className='mt-6'>
            <h4 className='font-semibold text-base text-primary'>Mail ile ulaşmak istersen:</h4>
            <a href='mailto:info@patitekno.com' className='text-textColor hover:underline'>info@patitekno.com</a>
          </div>

        </div>

      </div>
      
    </section>
  )
}

export default Iletisim
