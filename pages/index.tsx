import Head from "next/head";


export default function Home() {
  return (
    <div className="h-screen w-screen bg-background flex items-center justify-center">
      <Head>
        <title>Pati Tekno | Teknoloji | Tasarım | Yazılım</title>
      </Head>

      <img src="Logo.png" alt="our logo" />
    </div>
  );
}
