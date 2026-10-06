// Configuração central do site — muda aqui e reflete no SEO, imagem de compartilhamento e páginas.
export const site = {
  name: "Orbita",
  description: "Jogos para descobrir, pensar e aprender. Dos 5 aos 15 anos.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "pt_BR",
  initial: "O",
};
