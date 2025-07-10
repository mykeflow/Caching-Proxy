const cache = new Map<string, { response: any; timestamp: number }>();

export const getFromCache = (key: string) => {
  return cache.get(key);
};

export const setInCache = (key: string, response: any) => {
  cache.set(key, { response, timestamp: Date.now() });
};

export const clearCache = () => {
  cache.clear();
  console.log("Cache cleared.");
};
