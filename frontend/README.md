# ShopSphere Frontend

ShopSphere is a React + Vite storefront frontend for a fashion e-commerce experience. The current app includes a customer-facing home page with a hero section, gender-based collection entry points, new-arrival product browsing, navigation, search, cart drawer UI, and shared layout components.

## Tech Stack

- React 19
- Vite 8
- React Router
- Tailwind CSS
- React Icons
- ESLint

## Getting Started

Follow these steps to run the frontend locally.

### Prerequisites

Install Node.js and npm before starting. Node.js 20 or newer is recommended.

### Installation

From the project root:

```bash
cd frontend
npm install
```

### Start Development Server

```bash
npm run dev
```

Vite will start the app and print a local URL in the terminal, usually:

```text
http://localhost:5173/
```

Open that URL in your browser to view the ShopSphere frontend.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

```bash
npm run build
```

Builds the production-ready frontend into the `dist` folder.

```bash
npm run preview
```

Serves the production build locally for previewing.

```bash
npm run lint
```

Runs ESLint checks across the frontend source files.

## Project Structure

```text
frontend/
  public/              Static public assets
  src/
    assets/            Images used by the storefront
    components/
      Cart/            Cart display components
      Common/          Header, footer, navbar, and search UI
      Layout/          Page layout, hero, topbar, and cart drawer
      Products/        Product and collection sections
    pages/             Route-level pages
    App.jsx            App routing setup
    main.jsx           React entry point
    index.css          Global styles and Tailwind imports
  index.html           Vite HTML entry
  package.json         Frontend dependencies and scripts
  tailwind.config.js   Tailwind CSS configuration
  vite.config.js       Vite configuration
```

## Current Routes

- `/` - Home page

More storefront routes, such as product details, product listing, login, and checkout pages, can be added in `src/App.jsx`.

## Notes

- Product data in the new-arrivals section is currently static sample data.
- Some product images are loaded from `picsum.photos`, so those images require an internet connection while developing.
- Storefront image assets live in `src/assets`.
