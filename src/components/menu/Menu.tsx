import { useDispatch, useSelector } from 'react-redux';
import { createRef, useContext } from 'react';
import Button from '../button/Button.tsx';
import s from './Menu.module.scss';
import { RootState } from '../../store/store.tsx';
import { unSellectAll } from '../../store/redusers/peopleReducer.tsx';
import { PersoneType } from '../../types/types.tsx';
import { ThemeContext } from '../../App.tsx';

function Menu() {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const myRef = createRef<HTMLAnchorElement>();
  const selected = useSelector(
    (state: RootState) => state.people.choosedPeople,
  );
  const unSelectAllHendler = () => {
    dispatch(unSellectAll());
  };

  const downloadHendler = () => {
    const dataToSave = selected.map((per: PersoneType) => {
      return {
        name: per.name,
        hair_color: per.hair_color,
        height: per.height,
        url: per.url,
      };
    });
    const file = new Blob([JSON.stringify(dataToSave)], {
      type: 'application/json',
    });
    if (myRef.current) {
      myRef.current.href = URL.createObjectURL(file);
      myRef.current.download = `${selected.length}_people.csv`;
      myRef.current.click();
    }
  };
  const className = () => {
    if (selected.length) {
      return theme === 'light' ? s.menu__active : s.menu__active__dark;
    }
    return theme === 'light' ? s.menu : s.menu__dark;
  };
  return (
    <div className={className()}>
      <span className={s.count}>{selected.length}</span>
      <a href="/#" className={s.link} ref={myRef}>
        Save
      </a>
      <Button text="Unselect all" onClickHandler={unSelectAllHendler} />
      <Button text="Download" onClickHandler={downloadHendler} />
    </div>
  );
}

export default Menu;
