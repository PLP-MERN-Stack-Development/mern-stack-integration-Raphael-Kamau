import { useState, useEffect } from 'react';

export const useApi = (apiFunc, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiFunc()
      .then((res) => isMounted && setData(res.data))
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setLoading(false));
    return () => (isMounted = false);
  }, deps);

  return { data, loading, error };
};
