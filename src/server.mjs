import app from './app.mjs';
import url from 'url';

// Only listen if run directly (not imported as a module for Vercel)
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3000;
  const HOST = '0.0.0.0';
  app.listen(PORT, HOST, () => {
    console.log(`✓ Server running at http://${HOST}:${PORT}`);
    console.log(`✓ Also accessible at http://localhost:${PORT}`);
  });
}

export default app;

