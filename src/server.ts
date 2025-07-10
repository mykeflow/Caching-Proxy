import http from 'http';
import axios from 'axios';
import { getFromCache, setInCache } from './cache';

export const startServer = (port: number, origin: string) => {
  const server = http.createServer(async (req, res) => {
    const key = req.url || '/';
    const cached = getFromCache(key);

    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      res.writeHead(200, cached.response.headers);
      res.end(cached.response.data);
      return;
    }

    try {
      const url = new URL(req.url!, origin);
      const response = await axios.get(url.toString(), {
        headers: req.headers,
        responseType: 'stream',
      });

      res.setHeader('X-Cache', 'MISS');
      res.writeHead(response.status, response.headers as any);

      response.data.pipe(res);

      // Guardar en caché completo (sin stream)
      const dataChunks: Buffer[] = [];
      response.data.on('data', (chunk: Buffer) => dataChunks.push(chunk));
      response.data.on('end', () => {
        const data = Buffer.concat(dataChunks);
        setInCache(key, { ...response, data });
      });

    } catch (error: any) {
      res.statusCode = error.response?.status || 500;
      res.end(error.message);
    }
  });

  server.listen(port, () => {
    console.log(`Caching proxy running on port ${port}, forwarding to ${origin}`);
  });
};
