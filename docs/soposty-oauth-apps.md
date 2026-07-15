# Soposty OAuth Apps

Soposty is a branded product built on the Postiz engine, but it should own its social provider developer apps. Do not rely on upstream Postiz/Gitroom OAuth apps for production.

## Why Soposty Owns The Apps

Social providers bind OAuth behavior to a developer app, not just to the codebase. The provider app controls:

- the app name and logo shown on consent screens
- redirect/callback URLs
- privacy policy and terms URLs
- approved products, scopes, and review status
- rate limits and enforcement history

Using upstream OAuth credentials would leak upstream branding, create redirect/domain mismatches, and make Soposty dependent on another product's platform approvals.

## Required Provider Credentials

Configure these from Soposty-owned developer apps:

- Meta/Facebook/Instagram: `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`, `FACEBOOK_SCOPES`, `THREADS_APP_ID`, `THREADS_APP_SECRET`
- Google/YouTube: `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`
- LinkedIn: `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`
- X: `X_URL`, `X_API_KEY`, `X_API_SECRET`
- TikTok: `TIKTOK_CLIENT_ID`, `TIKTOK_CLIENT_SECRET`
- Pinterest: `PINTEREST_CLIENT_ID`, `PINTEREST_CLIENT_SECRET`
- Reddit: `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`
- Discord: `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_BOT_TOKEN_ID`
- Slack: `SLACK_ID`, `SLACK_SECRET`, `SLACK_SIGNING_SECRET`
- Dribbble: `DRIBBBLE_CLIENT_ID`, `DRIBBBLE_CLIENT_SECRET`
- Tumblr: `TUMBLR_CLIENT_ID`, `TUMBLR_CLIENT_SECRET`
- GitHub: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`

Some generic OAuth environment variables still use the `POSTIZ_` prefix because that is the upstream code-facing contract. Treat them as internal compatibility names, not product branding.

## Redirect URLs

Each provider app should use the Soposty production domain, for example:

- `https://platform.soposty.com/integrations/social/{provider}`
- any provider-specific redirect shown by the app during setup

Local development should use the configured `FRONTEND_URL` and `NEXT_PUBLIC_BACKEND_URL` values from `.env`.

## Facebook Scope Strategy

The default `FACEBOOK_SCOPES` is intentionally conservative:

```env
FACEBOOK_SCOPES="pages_show_list,pages_read_engagement"
```

This lets a new Meta app start with page-linking scopes that are less likely to block OAuth. Add publishing and analytics scopes only after Meta grants the Soposty app the required access:

```env
FACEBOOK_SCOPES="pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_engagement,read_insights"
```

If Meta reports `Invalid Scopes`, remove the rejected scope from `FACEBOOK_SCOPES`, confirm that the product is added in the Meta developer console, and request/confirm app review approval before retrying.

## Launch Checklist

- App name, logo, privacy policy, and terms point to Soposty.
- Production redirect URLs use `platform.soposty.com`.
- Development redirect URLs are explicitly configured for local testing.
- Required scopes are approved before enabling posting/analytics features in production.
- Provider credentials are stored in deployment secrets, not committed.
- OAuth consent screens do not show Postiz/Gitroom branding.
