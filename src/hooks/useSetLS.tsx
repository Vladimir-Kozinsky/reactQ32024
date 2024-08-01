import { useState } from 'react';

function useLocalStorage(initialSearch: string) {
  const [search, setSearch] = useState(initialSearch);

  // const setLocalStorage = (value: string) => {
  //   setSearch(value);
  //   localStorage.setItem('search', value);
  // };

  const getLocalStorage = (key: string) => {
    const dataLS = localStorage.getItem(key);
    if (dataLS?.length) {
      setSearch(dataLS);
      return dataLS;
    }
    return '';
  };

  return [getLocalStorage, search] as const;
}

export default useLocalStorage;
