import { useState } from 'react';

function useGetLS() {
  const [data, setData] = useState<string>();

  const getLocalStorage = (key: string) => {
    const dataLS = localStorage.getItem(key);
    if (dataLS?.length) {
      setData(dataLS);
      return dataLS;
    }
    return '';
  };
  return [data, getLocalStorage] as const;
}

export default useGetLS;
