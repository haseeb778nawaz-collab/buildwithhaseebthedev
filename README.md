# BuildWithHaseeb — Portfolio of Haseeb Nawaz

Built with React 19, TanStack Start (Vite), Tailwind CSS v4, Framer Motion and Lucide icons.

ours are tokens in `src/styles.css` (`:root`). Fonts are loaded in `src/routes/__root.tsx`.

## Contact form
Currently the form validates input and opens the visitor's email app with a prepared draft (nothing is sent silently). To send directly, add a server function using an email provider (e.g. Resend) with the API key stored as a server-side secret.

## Chat widget
A clearly labelled demo assistant with pre-written answers (`answer()` in `src/components/portfolio/Bottom.tsx`). A live AI version can be added via a server function; keys must stay server-side.

