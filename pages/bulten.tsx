import EduCard from '@/components/shared/eduCard';
import YoutubeData from '@/components/shared/youtubeData';
import Button from '@/components/ui/button';

export default function Bulten() {

  return (
    <div className="py-12 space-y-20">

      <div className='flex flex-col items-start gap-4 mt-6 w-full'>

        <h3 className='text-2xl font-semibold text-primary'>Bültenimize Katıl</h3>

        <p className='text-textColor mb-2'>Yeni videolar, bloglar ve eğitimlerden ilk sen haberdar ol!</p>

        <form className='flex w-full md:w-1/2 gap-2 mt-2'>

          <input
            type="email"
            required
            placeholder="E-posta adresiniz"
            className='flex-1 px-4 py-2 border border-neutral-300 rounded-md text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-primary'
          />

          <Button name='Kayıt Ol' type={false} Icon size="normal"/>

        </form>

      </div>

      <div className="flex flex-col items-start gap-6 mt-36">
        <h1 className="text-2xl font-semibold text-primary">Son Videolardan Haberdar Ol!</h1>
        <YoutubeData />
      </div>

      <div className="flex flex-col items-start gap-6 mt-36">
        <h1 className="text-2xl font-semibold text-primary">Son Eğitimlerimizi Kaçırma!</h1>
        <EduCard />
      </div>

      {/* Yakında Podcast Serimi buraya koymak istiyorum. */ }

    </div>
  );
}
