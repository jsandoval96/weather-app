import { useCallback } from 'react';

const useApi = (baseUrl: string) => {
  const http = useCallback(async (    
    url: string,
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS',
    data: any = null,
    headers: any = {}
  ) => {
    const config = {
      method,
      headers,
      body: data && JSON.stringify(data)
    };

    try {
      const res = await fetch(`${baseUrl}${url}`, config);
      if (!res.ok) throw new Error(`An error has occured: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }, [baseUrl]);
  
   return { http };
};

export default useApi;
