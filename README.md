# Caching Proxy Server

A simple CLI-based caching proxy server that caches responses from an origin server.

## Features

- Starts a proxy server on a given port.
- Forwards requests to a specified origin server.
- Caches the responses in memory.
- Adds `X-Cache: HIT/MISS` header.
- Supports clearing the cache with a command.

## Usage

### Start the server

```bash
npm run start -- --port 3000 --origin http://dummyjson.com


// Clear the cache
npm run start -- --clear-cache

//Example 

Start the proxy: 
npm run start -- --port 3000 --origin http://dummyjson.com

//Now make a request:
curl http://localhost:3000/products

//Second request will show X-Cache: HIT.

---

✅ Una vez tengas todos estos archivos listos, ejecuta:

```bash
npm install
npm run start -- --port 3000 --origin http://dummyjson.com

Y prueba con curl o Postman:
curl -I http://localhost:3000/products
