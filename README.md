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
├─ HOF
├─ README.md
├─ actions
│  └─ auth.action.ts
├─ app.vue
├─ assets
│  └─ css
│     ├─ app.css
│     └─ fonts.css
├─ components
│  ├─ core
│  │  └─ auth
│  │     ├─ 2fa
│  │     │  └─ OTPFill.vue
│  │     ├─ forgot-password
│  │     │  ├─ ForgotPasswordContainer.vue
│  │     │  └─ ForgotPasswordForm.vue
│  │     ├─ login
│  │     │  ├─ LoginContainer.vue
│  │     │  └─ LoginForm.vue
│  │     ├─ register
│  │     │  ├─ RegisterContainer.vue
│  │     │  ├─ RegisterFillForm.vue
│  │     │  └─ RegisterRequestForm.vue
│  │     └─ reset-password
│  │        ├─ ResetPasswordContainer.vue
│  │        └─ ResetPasswordForm.vue
│  ├─ loading
│  │  └─ TwoFaEnableTOTP.loading.vue
│  ├─ modals
│  │  └─ auth
│  │     └─ TwoFaEnableTOTP.vue
│  └─ shared
│     ├─ input
│     │  ├─ CommonField.vue
│     │  ├─ OTPField.vue
│     │  └─ PasswordField.vue
│     ├─ toast
│     │  ├─ ErrorToastNotification.vue
│     │  ├─ InfoToastNotification.vue
│     │  └─ SuccessToastNotification.vue
│     └─ utils
│        └─ AuthResponse.utils.vue
├─ composables
│  ├─ useModalAnimation.ts
│  └─ useVerifyLink.ts
├─ content
├─ layouts
│  └─ Auth.layout.vue
├─ middleware
│  ├─ verifyRegisterLink.ts
│  └─ verifyResetPassLink.ts
├─ nuxt.config.ts
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ forgot_password.vue
│  ├─ index.vue
│  ├─ login.vue
│  ├─ register.vue
│  ├─ reset_password.vue
│  └─ test.vue
├─ plugins
│  ├─ Vue3-toastify.client.ts
│  └─ Vue3Lottie.client.ts
├─ public
│  ├─ animations
│  │  ├─ InternalError.json
│  │  ├─ fail.json
│  │  ├─ security.json
│  │  ├─ successed.json
│  │  └─ waiting.json
│  ├─ favicon.ico
│  ├─ icons
│  │  ├─ copy.svg
│  │  ├─ error.svg
│  │  ├─ eye-slash.svg
│  │  ├─ eye.svg
│  │  ├─ facebook.svg
│  │  ├─ google.svg
│  │  ├─ info.svg
│  │  ├─ loading.svg
│  │  ├─ logo-dark.webp
│  │  └─ success.svg
│  ├─ images
│  │  ├─ forgot-password.png
│  │  ├─ image.png
│  │  ├─ login-image.jpg
│  │  ├─ register-image.png
│  │  └─ reset-password.png
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
│  ├─ api
│  │  └─ auth
│  │     ├─ forgotPassword.ts
│  │     ├─ forgotSubmit.ts
│  │     ├─ login.ts
│  │     ├─ register.ts
│  │     └─ registerRequest.ts
│  └─ tsconfig.json
├─ store
│  └─ authLoading.ts
├─ tailwind.config.js
├─ tsconfig.json
└─ utils
   ├─ string.ts
   └─ toastNotification.ts

```
