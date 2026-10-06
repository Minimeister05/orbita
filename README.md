# Órbita

Portal de jogos educacionais em pt-BR para crianças e adolescentes de 5 a 15 anos.

## Rodar

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Nenhuma chave ou banco de dados é necessário.

## Jogos e trilha

- Matemática: adição, multiplicação, divisão e equações conforme a idade.
- Palavras: 64 palavras com pistas, separadas em quatro faixas.
- Memória: pares de números, operações e quadrados.
- Lógica: sequências aritméticas, geométricas e quadrados.
- Ciências: 48 perguntas com explicações, separadas por faixa.
- Programação: comandos direcionais em mapas com obstáculos e caminho garantido.

Modo livre ou expedição de 50 minutos: seis missões de 8 minutos e uma pausa de 2 minutos após a terceira missão. O relógio pausa em abas ocultas. A pausa manual preserva o desafio. Não há garantia de retenção: validar tempo e interesse com crianças e educadores.

Progresso e faixa etária ficam somente no localStorage deste navegador. Não há contas, ranking ou anúncios. A leitura em voz alta depende do suporte e das vozes do navegador.

## Validação

Build de produção e TypeScript aprovados. 22 verificações automatizadas de jogabilidade, faixas etárias, pontuação, persistência e celular em 320/390 px. Expedição completa validada com relógio simulado, incluindo pausa, transições e encerramento. Sem erros JavaScript nos testes.

```sh
npm run build
npx tsc --noEmit
```

## Publicação

Importar este repositório na Vercel como Next.js, usando a branch main e configurações padrão. Cada push dispara um novo deploy. A URL de produção é inferida da Vercel; para domínio próprio, configurar NEXT_PUBLIC_SITE_URL. Não copiar o valor localhost do .env.example para produção.

Inclui SEO, favicon, imagem OG, modo escuro e componentes do Vercel Analytics/Speed Insights. Ativar os serviços no painel para coletar dados. Domínio próprio, Lighthouse e avaliação pedagógica/engajamento com usuários reais ainda precisam ser validados.

Criado com o comando novo do Erick. A etapa remota do shadcn falhou por timeout; a interface usa componentes React e lucide-react sem dependência do shadcn.
