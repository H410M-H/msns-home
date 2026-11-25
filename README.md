# msns-home

Public website of M. S. Naz High School — https://www.msns.edu.pk

Next.js 15 (App Router), React 19, Tailwind CSS 4, deployed on Vercel. Media
and documents are served from a Cloudflare R2 bucket that is shared with the
LMS (`lms.msns.edu.pk`).

## Development

```sh
npm ci
cp .env.example .env.local   # fill in values
npm run dev
```

Checks (also run in CI on every pull request):

```sh
npm run typecheck
npm run lint
SKIP_ENV_VALIDATION=1 npm run build
```

## Layout

- `src/app` — pages and route handlers
  - `api/images` — streams public media (`gallery/`, `videos/`, `logos/`,
    `social/`, `placeholders/`) from R2; `api/images/resolve/<name>` looks an
    image up by filename
  - `api/documents` — lists and serves PDFs under `documents/`
    (`/documents/*` is rewritten here)
  - `api/gallery` — authenticated upload/delete (`GALLERY_API_SECRET`)
  - `api/admission/apply` — online admission form; emails the office via SMTP
  - `api/google-reviews` — Google Places reviews, cached for a day
- `src/components` — UI and page sections
- `src/lib` — R2 client, email, image helpers
- `scripts/` — content generation and upload scripts; `scripts/legacy/` holds
  one-off migrations that have already run

## Environment

See `.env.example`. Security headers and the Content Security Policy are set in
`next.config.js`; add any new third-party origin there.
