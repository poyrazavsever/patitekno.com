import Head from "next/head";
import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pati Tekno | Teknoloji | Tasarım | Yazılım</title>
        <meta name="description" content="Pati Tekno: Teknoloji, tasarım ve yazılım dünyasına eğlenceli bir pencereden bak!" />
      </Head>

      <div className="h-screen w-screen bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3] flex flex-col items-center justify-center font-nunito px-4 text-center">
        <img
          src="Logo.png"
          alt="Pati Tekno Logo"
          className="w-40 md:w-60 mb-6 drop-shadow-lg animate-bounce rounded-full"
        />

        <h1 className="text-3xl md:text-5xl font-extrabold text-background mb-4">
          Sitemiz İnşa Ediliyor...
        </h1>

        <p className="text-md md:text-lg text-gray-600 max-w-xl mb-8">
          Pati Tekno olarak teknoloji, yazılım ve tasarım dünyasını eğlenceli bir bakış açısıyla size sunmak için hazırlanıyoruz!
        </p>

        <div className="flex gap-6 text-3xl text-background">
          <a
            href="https://www.instagram.com/patitekno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@patitekno"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </>
  );
}
