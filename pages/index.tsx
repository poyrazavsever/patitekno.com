import Button from "@/components/ui/button";
import Head from "next/head";

import EduCard from "@/components/shared/eduCard";
import YoutubeData from "@/components/shared/youtubeData";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pati Tekno | Teknoloji | Tasarım | Yazılım</title>
        <meta name="description" content="Pati Tekno: Teknoloji, tasarım ve yazılım dünyasına eğlenceli bir pencereden bak!" />
      </Head>
      <div>
        
          {/* Hero Section */}
          <div className="relative flex items-center justify-center my-48">
            <img src="/Logos/LogoWithoutBg.png" alt="background logo" className='w-96 md:w-[600px] absolute -top-32 left-1/4 opacity-5 -z-10'/>

            <div className="flex flex-col items-center gap-4 w-2/3 text-center">
              <h1 className="text-2xl font-semibold text-primary">Kendi Hızında Yazılım ve Tasarımı Öğren!</h1>
              <p className="font-medium text-textColor">Patitekno, yazılım, tasarım ve teknoloji dünyasını senin için sadeleştiriyor. YouTube videolarımla eş zamanlı yayınlanan yazılı içeriklerle istediğin türden kaynaklara ulaşabilirsin. Son güncellemeleri kaçırmamak için kayıt olmayı unutma!</p>
              <div className="flex items-center gap-3">
                <Button  name="Bültene Abone Ol" type={false} Icon size="normal"/>
                <Button name="Eğitimleri İncele" type={true} Icon size="normal"/>
              </div>
            </div>

          </div>

          
          <div className="flex flex-col items-start gap-6 mt-36">
            <h1 className="text-2xl font-semibold text-primary">Popüler Eğitim Serileri</h1>
            <EduCard />
          </div>


          <YoutubeData />


      </div>
    </>
  );
}
