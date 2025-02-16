# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```
movie-dashboard
├─ README.md
├─ app.vue
├─ assets
│  └─ css
│     ├─ app.css
│     └─ fonts.css
├─ components
│  ├─ core
│  │  ├─ login
│  │  │  ├─ LoginForm.vue
│  │  │  └─ LoginWrap.vue
│  │  └─ register
│  │     ├─ RegisterFillForm.vue
│  │     ├─ RegisterInitForm.vue
│  │     ├─ RegisterResponse.vue
│  │     ├─ RegisterReview.vue
│  │     └─ RegisterWrap.vue
│  └─ shared
│     └─ input
│        ├─ Password.input.vue
│        └─ Text.input.vue
├─ layouts
│  └─ Auth.layout.vue
├─ nuxt.config.ts
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ Index.vue
│  ├─ Login.vue
│  └─ Register.vue
├─ plugins
│  └─ Vue3Lottie.client.ts
├─ public
│  ├─ animations
│  │  ├─ InternalError.json
│  │  ├─ fail.json
│  │  ├─ successed.json
│  │  └─ waiting.json
│  ├─ favicon.ico
│  ├─ icons
│  │  ├─ eye-slash.svg
│  │  ├─ eye.svg
│  │  ├─ facebook.svg
│  │  ├─ google.svg
│  │  ├─ loading.svg
│  │  └─ logo-dark.webp
│  ├─ images
│  │  ├─ image.png
│  │  ├─ login-image.jpg
│  │  └─ register-image.png
│  ├─ robots.txt
│  └─ static
│     └─ fonts
│        ├─ Satoshi-Black.woff2
│        ├─ Satoshi-Bold.woff2
│        ├─ Satoshi-Light.woff2
│        ├─ Satoshi-Medium.woff2
│        ├─ Satoshi-Regular.woff2
│        └─ Satoshi-Variable.woff2
├─ server
│  └─ tsconfig.json
├─ tailwind.config.js
└─ tsconfig.json

```