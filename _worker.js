// This file ensures that the nodejs_compat flag is applied to the Cloudflare Pages project
// It also handles routing for the Next.js application

export default {
  async fetch(request, env, ctx) {
    // Add nodejs_compat flag to ensure Node.js built-in modules work
    // This is required for modules like 'node:buffer' and 'node:async_hooks'

    try {
      // First try to serve static assets
      const url = new URL(request.url);

      // Check if this is a static asset request
      const isStaticAsset =
        url.pathname.startsWith('/_next/static/') ||
        url.pathname.startsWith('/icons/') ||
        url.pathname.startsWith('/fonts/') ||
        url.pathname.match(/\.(ico|png|svg|json)$/);

      if (isStaticAsset) {
        // Add caching headers for static assets
        const response = await env.ASSETS.fetch(request);
        const newResponse = new Response(response.body, response);
        newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return newResponse;
      }

      // For all other requests, just forward to the static assets handler
      return env.ASSETS.fetch(request);
    } catch (err) {
      // If there's an error, return a 500 response
      return new Response(`Server Error: ${err.message}`, { status: 500 });
    }
  }
};
