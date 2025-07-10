import { clearCache } from './cache';
import { startServer } from './server';

export const parseArgs = () => {
  const args = process.argv.slice(2);

  if (args.includes('--clear-cache')) {
    clearCache();
    return;
  }

  const portIndex = args.indexOf('--port');
  const originIndex = args.indexOf('--origin');

  if (portIndex === -1 || originIndex === -1) {
    console.error("Usage: caching-proxy --port <number> --origin <url>");
    process.exit(1);
  }

  const port = parseInt(args[portIndex + 1]);
  const origin = args[originIndex + 1];

  if (isNaN(port)) {
    console.error("Port must be a number");
    process.exit(1);
  }

  startServer(port, origin);
};
