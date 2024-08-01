import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './People.module.scss';
import Persone from '../persone/Persone.tsx';
import Loader from '../loader/Loader.tsx';
import { PersoneType } from '../../types/types.tsx';
import { AppDispatch } from '../../store/store.tsx';
import rtkApi from '../../API/rtkApi.tsx';
import Menu from '../menu/Menu.tsx';
import { ThemeContext } from '../../App.tsx';

interface IPeopleProps {
  page: string;
  searchValue: string;
}

function People({ page, searchValue }: IPeopleProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [url, setUrl] = useState('');
  const [isPanel, setIsPanel] = useState(false);
  const theme = useContext(ThemeContext);
  const { data, isFetching } = rtkApi.usePageRequestQuery({ searchValue, page });
  const people = data?.results;
  const personeResponse = rtkApi.usePersoneRequestQuery(url);
  const personeData = personeResponse.data;
  const personeHandler = async (personeUrl: string) => {
    setUrl(personeUrl);
    if (isPanel) {
      setIsPanel(false);
    } else {
      setIsPanel(true);
      await dispatch(rtkApi.endpoints.personeRequest.initiate(personeUrl));
    }
  };

  return (
    <>
      {isFetching && <Loader />}
      <section className={theme === 'light' ? s.container : s.container__dark}>
        <Menu />
        <div className={!isPanel ? s.people : s.people__active}>
          {people?.length ? (
            people.map((persone: PersoneType) => {
              return (
                <Persone
                  key={persone.name}
                  persone={persone}
                  handler={personeHandler}
                />
              );
            })
          ) : (
            <h1>Not found</h1>
          )}
        </div>
        {isPanel && (
          <div className={s.panel}>
            <div className={s.persone}>
              <div className={s.persone__block}>
                <span>Name:</span>
                <span>{personeData?.name}</span>
              </div>
              <div className={s.persone__block}>
                <span>Gender:</span>
                <span>{personeData?.gender}</span>
              </div>
            </div>
            <div className={s.status__block}>
              <span>Status</span>
              <span>{personeResponse.status}</span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default People;
