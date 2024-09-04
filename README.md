# Cooling pads E-Commerce project

demo website address:
https://ecommerce-nextjs-hazel.vercel.app

## Overview

This project is based on Framework Next.js 14.

- React
- Next.js App Route.
- Using Shopify as CMS.
- GraphQL

## Shopify Integration

- Need a Shopify account and storefront
- Install Shopify Headless **theme**
  - Set headless theme as current active theme
  - Hostname which is located in storefront setting need to set to headless store domain, for example "ecommerce-nextjs-hazel.vercel.app"
- Install the Shopify Headless **app**
  - Headless app allow you to create an access token that can be used to authenticate requests to Storefront API.
  - Storefront API allow you to fetch products, collections, pages, and more for your headless store.
- Even though you're creating a headless store, there are still a few aspects Shopify will control. For example Checkout, Emails, Order status, Order history. You can customize them in store setting.
- Configure Shopify webhooks
  - You will need a secret for secure revalidation.
- Using Shopify as a full-featured CMS. You can manage the Products, Collections, Pages, Navigation Menus, SEO in Shopify platform.

## Running locally

Need to the environment variables in `.env` file to run locally.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).
