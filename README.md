This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## introspect from existing DB
```bash
$ yarn add -D prisma
$ npx prisma init
$ yarn add @prisma/client
$ npx prisma db pull
$ npx prisma generate
```

## setup tailwind css
```bash
$ yarn add -D tailwindcss postcss autoprefixer
$ yarn add -D prettier prettier-plugin-tailwindcss
$ npx tailwindcss init -p
```

- [Tailwind CSS Nextjs](https://tailwindcss.com/docs/guides/nextjs)
- [Mantine UI Nextjs](https://mantine.dev/guides/next/)


## install necessary packages
```bash
$ yarn add @tanstack/react-query@4.0.10 @tanstack/react-query-devtools@4.0.10
$ yarn add @mantine/core@5.0.2 @mantine/hooks@5.0.2 @mantine/form@5.0.2 @mantine/next@5.0.2 @emotion/server@11.10.0 @emotion/react@11.10.0
$ yarn add @heroicons/react@1.0.6 @tabler/icons@1.78.1 yup@0.32.11 axios@0.27.2 zustand@4.0.0
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
