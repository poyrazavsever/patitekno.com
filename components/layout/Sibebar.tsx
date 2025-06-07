import classNames from "classnames";

// deneme icin
const lessons = [
  {
    id: 0,
    lessonName: "html",
    title: "Temel HTML Yapısı",
    content: `
# Temel HTML Yapısı
<!DOCTYPE html>, <html>, <head>, <body> gibi temel etiketlerle HTML belgesi başlatılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 1,
    lessonName: "html",
    title: "Metin Etiketleri",
    content: `
# Metin Etiketleri
<h1>-<h6>, <span>, <br>, <hr>, <strong>, <em> gibi etiketler metin düzeni için kullanılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 2,
    lessonName: "html",
    title: "Linkler",
    content: `
# Linkler
<a> etiketi ile hem sayfa içi hem de site dışı bağlantılar oluşturabilirsiniz.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 3,
    lessonName: "html",
    title: "Görseller",
    content: `
# Görseller
<img> etiketi ile resim eklenir. SEO için alt özelliği mutlaka kullanılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 4,
    lessonName: "html",
    title: "Listeler",
    content: `
# Listeler
<ul>, <ol> ve <dl> etiketleri ile farklı türde listeler oluşturulur.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 5,
    lessonName: "html",
    title: "Tablolar",
    content: `
# Tablolar
<table>, <tr>, <td>, <th> gibi etiketlerle veri tablosu yapılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 6,
    lessonName: "html",
    title: "Formlara Giriş",
    content: `
# Formlara Giriş
<form>, <input>, <label>, <button> gibi temel form etiketleri anlatılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 7,
    lessonName: "html",
    title: "Form Elemanları II",
    content: `
# Form Elemanları II
<select>, <option>, <textarea>, checkbox ve radio kullanımı detaylandırılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 8,
    lessonName: "html",
    title: "HTML5 Semantic Etiketleri",
    content: `
# HTML5 Semantic Etiketleri
<header>, <nav>, <main>, <section>, <footer> gibi yapısal etiketler tanıtılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 9,
    lessonName: "html",
    title: "Medya Kullanımı",
    content: `
# Medya Kullanımı
<audio>, <video>, <source>, controls gibi medya öğeleri tanıtılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 10,
    lessonName: "html",
    title: "Yapılandırılmış Veri",
    content: `
# Yapılandırılmış Veri
<iframe>, <embed>, <object> etiketleriyle harici veri gösterimi.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 11,
    lessonName: "html",
    title: "Karakter Kodlaması ve Özel Karakterler",
    content: `
# Karakter Kodlaması ve Özel Karakterler
&nbsp;, &copy;, &lt;, &gt; gibi özel HTML karakterleri anlatılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 12,
    lessonName: "html",
    title: "Meta Etiketleri",
    content: `
# Meta Etiketleri
<meta charset>, viewport, description, keywords gibi etiketler SEO açısından önemlidir.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 13,
    lessonName: "html",
    title: "Script ve Stil Bağlama",
    content: `
# Script ve Stil Bağlama
<style>, <link>, <script> ile CSS ve JavaScript bağlantıları sağlanır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 14,
    lessonName: "html",
    title: "Input Validasyonu",
    content: `
# Input Validasyonu
required, type, min, max, pattern gibi input doğrulama özellikleri kullanılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 15,
    lessonName: "html",
    title: "div ve span Kullanımı",
    content: `
# div ve span Kullanımı
<div> blok, <span> satır içi elemanlardır. Sayfa düzeni için kullanılır.
    `,
    videoLink: "https://www.youtube.com"
  },
  {
    id: 16,
    lessonName: "html",
    title: "HTML’de Erişilebilirlik (Accessibility)",
    content: `
# Erişilebilirlik
alt, aria, label for gibi etiketlerle erişilebilirlik artırılır.
    `,
    videoLink: "https://www.youtube.com"
  }
]

interface props {
  section:number;
  setSection: any;
}

const Sibebar = ({section, setSection} : props) => {

  return (
    <aside className='overflow-auto max-h-screen h-screen fixed left-0 top-0 py-6 border border-neutral-300 w-72'>
        <h3 className='text-lg font-semibold text-primary px-6'>HTML 101 Ders Notları</h3>

        <div className='flex flex-col items-start gap-2 mt-4'>
            {
                lessons?.map((lesson) => (
                    <button onClick={() => setSection(lesson.id)} className={classNames(
                      'w-full px-6 py-1 cursor-pointer hover:bg-primary hover:text-background transition-all',
                      {
                        "bg-primary text-background" : section === lesson.id
                      }
                    )}>
                        <span className='text-left line-clamp-1'>{lesson.title}</span>
                    </button>
                ))
            }

        </div>

    </aside>
  )
}

export default Sibebar