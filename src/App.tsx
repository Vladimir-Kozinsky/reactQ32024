import React, { createContext, useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './App.module.scss';
import Button from './components/button/Button.tsx';
import People from './components/people/People.tsx';
import useLocalStorage from './hooks/useSetLS.tsx';
import Pagenator from './components/pagenator/Pagenator.tsx';
import { AppDispatch } from './store/store.tsx';
import rtkApi from './API/rtkApi.tsx';
import Loader from './components/loader/Loader.tsx';

export const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  const [getLocalStorage] = useLocalStorage('');
  const [currentSearch, setCurrentSearch] = useState<string>(() => {
    return getLocalStorage('search');
  });
  const { data, isLoading } = rtkApi.useSearchRequestQuery(currentSearch);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const peopleCount = data?.count;

  const [inputValue, setInputValue] = useState<string>(() => {
    return getLocalStorage('search');
  });

  const createPagesArr = (count: number) => {
    const pagesArr = [];
    for (let i = 0; i < count / 10; i += 1) {
      pagesArr.push(i + 1);
    }
    return pagesArr;
  };

  const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const onClickHandler = () => {
    dispatch(rtkApi.endpoints.searchRequest.initiate(inputValue));
    setCurrentSearch(inputValue);
    localStorage.setItem('search', inputValue);
    navigate('1');
  };

  const themeHandler = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    if (error) throw new Error('Simulated error.');
    navigate('1');
  }, [error]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme === 'light' ? s.page : s.page__dark}>
        <div className={s.container}>
          <Button text={theme.toUpperCase()} onClickHandler={themeHandler} />
          {isLoading && <Loader />}
          <section className={s.search}>
            <input
              ref={inputRef}
              className={theme === 'light' ? s.input : s.input__dark}
              type="text"
              name="search"
              id="search"
              onChange={inputHandler}
              value={inputValue}
            />
            <Button text="Search" onClickHandler={onClickHandler} />
          </section>
          <section className={s.pages}>
            <Pagenator searchValue={currentSearch} />
          </section>
          <Routes>
            {peopleCount ? (
              createPagesArr(peopleCount).map((item: number) => (
                <Route
                  path={`${item}`}
                  element={
                    <People
                      page={item.toString()}
                      searchValue={currentSearch}
                    />
                  }
                />
              ))
            ) : (
              <Route
                path="1"
                element={<People page="1" searchValue={currentSearch} />}
              />
            )}
          </Routes>
          <Button
            text="Throw an Error"
            onClickHandler={() => {
              setError(true);
            }}
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
