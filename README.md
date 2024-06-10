# Cooling pads ECommerce project

## Overview

This project is based on Framework Next.js 14.

- React
- Next.js App Route.
- Using Shopify as CMS.
- GraphQL

## Shopify Integration

- Install Shopify Headless theme
- Install the Shopify Headless app
  - Headless app allow you to create an access token that can be used to authenticate requests to **Storefront API**.

## Running locally

Need to the environment variables in `.env` file to run locally.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).
