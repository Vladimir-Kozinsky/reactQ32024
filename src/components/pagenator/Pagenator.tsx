import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import s from './Pagemnator.module.scss';
import rtkApi from '../../API/rtkApi.tsx';
import { ThemeContext } from '../../App.tsx';

interface IPagenatorProps {
  searchValue: string;
}

function Pagenator({ searchValue }: IPagenatorProps) {
  const theme = useContext(ThemeContext);
  const { data } = rtkApi.useSearchRequestQuery(searchValue);
  const count = data ? data.count : 0;
  function createArr() {
    const pagesArr = [];
    for (let i = 0; i < count / 10; i += 1) {
      pagesArr.push(i + 1);
    }
    return pagesArr;
  }

  const pages = createArr();

  return (
    <div className={theme === 'light' ? s.pagenator : s.pagenator__dark}>
      {pages.map((page: number) => (
        <NavLink
          key={page}
          to={`${page}`}
          className={({ isActive }) => (isActive ? s.active : '')}
        >
          {page}
        </NavLink>
      ))}
    </div>
  );
}

export default Pagenator;
