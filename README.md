# BuildWithHaseeb — Portfolio of Haseeb Nawaz

Built with React 19, TanStack Start (Vite), Tailwind CSS v4, Framer Motion and Lucide icons.

## Run
```
bun install      # or npm install
bun run dev      # dev server
bun run build    # production build
```

## Edit content
All content lives in `src/data/site.ts`:
- `profile` — email, WhatsApp, `profileImage`, `calendlyUrl`, `resumeUrl`, `availability` (empty = hidden).
- `socials` — add new social links here; they appear in contact + footer.
- `stats`, `services`, `skillGroups`, `tools`, `journey`, `faqs`.
- `projects` — add verified `liveUrl` / `sourceUrl` to show links.

## Screenshots
Drop PNGs in `public/images/projects/`: novapay.png, luma-stay.png, savora.png, fitpulse.png, kora.png, verdant.png, aurelia-escapes.png, ripple-social.png, stackit.png. Missing files show a placeholder automatically.

## Theme
Colours are tokens in `src/styles.css` (`:root`). Fonts are loaded in `src/routes/__root.tsx`.

## Contact form
Currently the form validates input and opens the visitor's email app with a prepared draft (nothing is sent silently). To send directly, add a server function using an email provider (e.g. Resend) with the API key stored as a server-side secret.

## Chat widget
A clearly labelled demo assistant with pre-written answers (`answer()` in `src/components/portfolio/Bottom.tsx`). A live AI version can be added via a server function; keys must stay server-side.

## Deploy
The project is set up for publishing on Lovable. For Vercel, import the repo and use the TanStack Start/Nitro Vercel preset per TanStack Start's hosting docs.
