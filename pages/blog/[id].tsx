import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';

type BlogPost = {
  id: string;
  title: string;
  date: string;
  author: string;
  imageUrl: string;
  content: string;
};

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Bu kısım normalde API'den gelecek, örnek veri:
  const blogPost: BlogPost = {
    id: '1',
    title: 'HTML 101',
    date: '07 Haziran 2025',
    author: 'Pati Tekno',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fatlasiko.com%2Fasserts%2Fblog%2Fhtml-semantic-elements.jpg&f=1&nofb=1&ipt=a7ad0e3593df9d2ffdafcba37d92c3947edcab5e01f0ce60c2304ac081280590',
    content: `
# HTML 101: Web'in Temeli

## Giriş

HTML, modern web geliştirmenin temel yapı taşıdır. Bu yazıda HTML'in temellerini ve önemini inceleyeceğiz.

### HTML Nedir?

HTML (Hypertext Markup Language), web sayfalarının yapısını tanımlamak için kullanılan standart işaretleme dilidir.

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>İlk HTML Sayfam</title>
  </head>
  <body>
    <h1>Merhaba Dünya!</h1>
  </body>
</html>
\`\`\`

## Temel HTML Etiketleri

- \`<h1>\` ile \`<h6>\`: Başlıklar
- \`<p>\`: Paragraflar
- \`<a>\`: Linkler
- \`<img>\`: Görseller
    `
  };

  return (
    <article className="max-w-6xl mx-auto pt-8">
      <div className="space-y-6">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{blogPost.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{blogPost.date}</span>
            <span>•</span>
            <span>{blogPost.author}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
          <img
            src={blogPost.imageUrl}
            alt={blogPost.title}
        
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none md-custom">
          <ReactMarkdown>{blogPost.content}</ReactMarkdown>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-neutral-300">
          <button
            onClick={() => router.back()}
            className="text-primary hover:underline cursor-pointer"
          >
            ← Geri Dön
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;