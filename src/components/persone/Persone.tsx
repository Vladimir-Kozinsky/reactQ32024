import { ChangeEvent, createRef, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersoneType } from '../../types/types.tsx';
import s from './Persone.module.scss';
import { ThemeContext } from '../../App.tsx';
import {
  addPersone,
  removePersone,
} from '../../store/redusers/peopleReducer.tsx';
import { RootState } from '../../store/store.tsx';

type PersoneProps = {
  persone: PersoneType;
  handler: (url: string) => void;
};

function Persone({ persone, handler }: PersoneProps) {
  const choosedPeople = useSelector(
    (state: RootState) => state.people.choosedPeople,
  );
  const myRef = createRef<HTMLInputElement>();
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const clickhandler = () => {
    handler(persone.url);
  };
  const checkBoxHendler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget as HTMLInputElement;
    if (input.checked) {
      dispatch(addPersone(persone));
    } else {
      dispatch(removePersone(persone.name));
    }
  };

  useEffect(() => {
    const res = choosedPeople.find(
      (per: PersoneType) => per.name === persone.name,
    );
    if (res && myRef.current) {
      myRef.current.checked = true;
    } else if (myRef.current) myRef.current.checked = false;
  }, [choosedPeople, myRef, persone.name]);

  return (
    <div className={theme === 'light' ? s.persone : s.persone__dark}>
      <div className={s.ckeckbox__block}>
        <input
          ref={myRef}
          type="checkbox"
          name=""
          id=""
          onChange={checkBoxHendler}
        />
      </div>
      <div
        className={s.persone__block}
        role="button"
        tabIndex={0}
        onClick={clickhandler}
        onKeyDown={clickhandler}
      >
        <div className={s.persone__data}>
          <span>Name:</span>
          <span>{persone.name}</span>
        </div>
        <div className={s.persone__data}>
          <span>Gender:</span>
          <span>{persone.gender}</span>
        </div>
        <div className={s.persone__data}>
          <span>Height:</span>
          <span>{persone.height}</span>
        </div>
        <div className={s.persone__data}>
          <span>Eye color:</span>
          <span>{persone.eye_color}</span>
        </div>
        <div className={s.persone__data}>
          <span>Hair color:</span>
          <span>{persone.hair_color}</span>
        </div>
      </div>
    </div>
  );
}

export default Persone;
