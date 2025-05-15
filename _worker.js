// This file ensures that the nodejs_compat flag is applied to the Cloudflare Pages project
export default {
  async fetch(request, env, ctx) {
    // This is a minimal worker that forwards requests to the static assets
    // The actual functionality is handled by the Next.js application
    return env.ASSETS.fetch(request);
  }
};
