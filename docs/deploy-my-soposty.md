# Deploying The Soposty App

The public marketing and enrollment site lives at `https://soposty.com`.
The logged-in product experience should live at `https://my.soposty.com`.

## Production URL Settings

Use these values for the app deployment:

```env
MAIN_URL=https://my.soposty.com
FRONTEND_URL=https://my.soposty.com
NEXT_PUBLIC_BACKEND_URL=https://my.soposty.com/api
IS_GENERAL=true
```

Set `BACKEND_INTERNAL_URL` to the internal backend URL for the deployment platform. For the bundled Docker container, this commonly remains:

```env
BACKEND_INTERNAL_URL=http://localhost:3000
```

## Required Runtime Services

Soposty needs:

- PostgreSQL
- Redis
- Temporal
- persistent uploads, preferably Cloudflare R2 for production
- a public HTTPS route for `my.soposty.com`

## Required Secrets

Configure these as deployment secrets:

- `JWT_SECRET`
- `DATABASE_URL`
- `REDIS_URL`
- `CLOUDFLARE_*` upload settings if using R2
- `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` if email activation is enabled
- provider OAuth credentials from Soposty-owned developer apps
- `STRIPE_*` keys if billing runs in-app
- `OPENAI_API_KEY` if AI features are enabled

## Facebook Launch Settings

Start with:

```env
FACEBOOK_SCOPES=pages_show_list,pages_read_engagement
```

After Meta approves publishing and insight permissions for the Soposty app, expand the value:

```env
FACEBOOK_SCOPES=pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_engagement,read_insights
```

## DNS And Routing

Point `my.soposty.com` at the app host. Keep `soposty.com` pointed at the marketing/enrollment site.

Marketing CTAs should send users to the logged-in app:

```text
https://my.soposty.com/auth
```

## Smoke Test Checklist

- `https://my.soposty.com` loads over HTTPS.
- Signup and login work.
- Email activation works, or automatic activation is intentionally enabled.
- Facebook account linking works with the current `FACEBOOK_SCOPES`.
- At least one non-Meta provider connects successfully.
- Uploads persist after an app restart.
- A test post can be created and scheduled.
- User-facing pages and OAuth consent screens show Soposty branding.
