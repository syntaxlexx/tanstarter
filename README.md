# [TanStarter](https://github.com/dotnize/tanstarter)

A minimal starter template for 🏝️ TanStack Start.

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL  (Neon, Supabase, Docker, e.t.c.)
- [Better Auth](https://www.better-auth.com/)
   - Email + Password login
   - Social Auth Login (Discord, Github, Google)
   - Roles & User Mgmt via [Better-Auth admin plugin](https://www.better-auth.com/docs/plugins/admin)

## Getting Started

1. [Clone this repository](https://github.com/syntaxlexx/tanstarter).
   ```bash
   git clone git@github.com:syntaxlexx/tanstarter.git
   ```

2. Install dependencies:

   ```bash
   bun install # npm install
   ```

3. Create a `.env` file based on [`.env.example`](./.env.example).

4. Push the schema to your database with drizzle-kit:

   ```bash
   bun db push # npm run db push
   ```

   https://orm.drizzle.team/docs/migrations

5. Run the development server:

   ```bash
   bun dev # npm run dev
   ```

   The development server should be now running at [http://localhost:3000](http://localhost:3000).

## Issue watchlist

- [React Compiler docs](https://react.dev/learn/react-compiler), [Working Group](https://github.com/reactwg/react-compiler/discussions) - React Compiler is still in beta. You can disable it in [app.config.ts](./app.config.ts#L15) if you prefer.
- https://github.com/TanStack/router/discussions/2863 - TanStack Start is currently in beta and may still undergo major changes.
- https://github.com/shadcn-ui/ui/discussions/6714 - We're using the `canary` version of shadcn/ui for Tailwind v4 support.

## Auth

Better Auth is currently configured for OAuth with GitHub, Google, and Discord, but can be easily modified to use other providers.

If you want to use email/password authentication or change providers, update the [auth config](./src/lib/auth.ts#L36) and [signin page](./src/routes/signin.tsx) with your own UI. You can use [shadcn/ui login blocks](https://ui.shadcn.com/blocks/login) as a starting point.

## Goodies

#### Scripts

These scripts in [package.json](./package.json#L5) use **pnpm** by default, but you can modify them to use your preferred package manager.

- **`db`** - Run drizzle-kit commands. (e.g. `bun db generate` to generate a migration)
- **`ui`** - The shadcn/ui CLI. (e.g. `bun add button` to add the button component)
- **`format`** and **`lint`** - Run Prettier and ESLint.
- **`auth:generate`** - Regenerate the [auth db schema](./src/database/schema/auth.schema.ts) if you've made changes to your Better Auth [config](./src/lib/auth.ts).


#### Utilities

- [`auth-guard.ts`](./src/middlewares/auth-guard.ts) - Sample middleware for forcing authentication on server functions. ([see #5](https://github.com/dotnize/tanstarter/issues/5))
- [`theme-toggle.tsx`](./src/components/theme-toggle.tsx) - A simple component to toggle between light and dark mode. ([#7](https://github.com/dotnize/tanstarter/issues/7))

## Building for production

Read the [hosting docs](https://tanstack.com/start/latest/docs/framework/react/hosting) for information on how to deploy your TanStack Start app.

## Acknowledgements

- [daveyplate/better-auth-tanstack-starter](https://github.com/daveyplate/better-auth-tanstack-starter) - A batteries-included TanStack Start boilerplate that inspired some patterns in this template. If you're looking for a more feature-rich starter, check it out!
