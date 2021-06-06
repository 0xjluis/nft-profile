This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## DEMO
* Please set you wallet network to BSC testnet
```
RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
Chain ID: 97
```

https://nft-profile.vercel.app/

## Getting Started

* Please add `.env.local` on root to run on local, you can see example on `.env.example`
```
// example env
# NEXT_PUBLIC_CHAIN_ID=97
# NEXT_PUBLIC_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545
```

* run the development server:

```bash
npm run dev
# or
yarn dev
```

> ***Note***: you can change token address for what you want to test, you can find config on `./app/config/constants/addresses.ts`

```
//addresses.ts
...
  carrot: {
    symbol: 'CARROT',
    address: {
      56: '0x807C6CC8d83D35733a7D3990c03E9c94B5090d7E',
      97: '0x807C6CC8d83D35733a7D3990c03E9c94B5090d7E',
    },
  },
...
```

=======================================================================================

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
