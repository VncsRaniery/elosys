<h1 align="start">
  Elosys - Criação e personalização de Linktrees
</h1>

<img width="1280" alt="Elosys Thumbnail" src="/public/assets/Banner.png">

## Introdução

**Elosys** é uma aplicação web moderna inspirada no conceito de Linktree, permitindo que usuários criem e compartilhem uma página personalizada com seus principais links, redes sociais e informações. O projeto foi desenvolvido utilizando tecnologias de ponta para garantir performance, segurança e uma experiência de usuário agradável.

Destaques do projeto:

- **Design moderno e responsivo** desenvolvido com TailwindCSS e Shadcn UI.
- **Análises detalhadas** dos seus linktrees e acesso e clicks nos seus links cadastrados.
- **Autenticação segura e simplificada** com Auth.js V5.
- **Armazenamento eficiente e escalável** utilizando NeonDB e Prisma ORM.

## Tecnologias utilizadas

- **[Next.js](https://nextjs.org/):** Framework React para aplicações web modernas, com suporte a rotas, SSR/SSG e API routes.
- **[TypeScript]():** Tipagem estática para maior segurança e produtividade no desenvolvimento.
- **[Prisma](https://www.prisma.io/):** ORM para integração e manipulação do banco de dados.
- **[TailwindCSS](https://tailwindcss.com/):** Estilização rápida e responsiva.
- **[Shadcn UI](https://ui.shadcn.dev/):** Conjunto de componentes acessíveis e personalizáveis.
- **[Authjs V5](https://authjs.dev/):** Solução robusta para autenticação e gerenciamento de usuários.
- **[NeonDB](https://console.neon.tech/):** Banco de dados escalável e otimizado para aplicações modernas. .

## Início rápido

### Pré-requisitos

Certifique-se de ter instalado

- Node.js
- Git
- npm / yarn / pnpm / bun

1. Clonar este repositório:

   ```bash
   git clone https://github.com/VncsRaniery/my-linktree
   cd my-linktree
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configurar variáveis de ​ambientes:

   ```bash
   # VARIÁVEIS PARA ACESSO NAS PÁGINAS DO LINKTREES
    NEXT_PUBLIC_URL=""
    NEXT_DEVELOPMENT_URL="http://localhost:3000/"

   # DATABASE ENVIRONMENT VARIABLES
   DATABASE_URL=""

   # AUTH JS AUTENTIFICAÇÃO
   AUTH_SECRET=""

   # GOOGLE PROVIDER AUTH ENVIRONMENT VARIABLES (TESTE)
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=

   # GITHUB PROVIDER AUTH ENVIRONMENT VARIABLES
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=

   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra seu navegador e navegue até http://localhost:3000 para ver o site em ação.

---
