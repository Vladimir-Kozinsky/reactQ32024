import s from './Loader.module.scss';

function Loader() {
  return (
    <div className={s.loader__container}>
      <div className={s.ring} />
      <span className={s.ring__text}>loading...</span>
    </div>
  );
}

export default Loader;
