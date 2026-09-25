import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), {
      // dev only: serve api/news.ts like Vercel would (api/chat.ts still needs `vercel dev`)
      name: 'dev-api-news',
      configureServer(server: any) {
        Object.assign(process.env, loadEnv('development', process.cwd(), ''));
        server.middlewares.use('/api/news', async (_req: any, res: any) => {
          const { GET } = await server.ssrLoadModule('/api/news.ts');
          const r: Response = await GET();
          res.statusCode = r.status;
          res.setHeader('content-type', 'application/json');
          res.end(await r.text());
        });
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
