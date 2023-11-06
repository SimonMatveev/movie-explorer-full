import { ChangeEventHandler, FormEventHandler, Dispatch, SetStateAction, FC } from 'react';
import './search-bar.css';

interface ISearchBarProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isShortsChecked: boolean;
  setIsShortsChecked: Dispatch<SetStateAction<boolean>>;
  searchMovies: () => void;
}

const SearchBar: FC<ISearchBarProps> = ({ value, setValue, isShortsChecked, setIsShortsChecked, searchMovies }) => {

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue(e.target.value);

  const handleCheckboxChange = () => setIsShortsChecked(prev => !prev)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className='search'>
      <div className='search__container'>
        <form className='search__form' onSubmit={handleSubmit} >
          <input className='search__input' type='text' name='search' id='search' placeholder='Фильм' onChange={handleChange} value={value} />
          <button className='search__btn' type='submit'>Найти</button>
        </form>
        <div className='search__shorts'>
          <input className='search__checkbox' type='checkbox' name='shorts' id='shorts' onChange={handleCheckboxChange} checked={isShortsChecked} />
          <label className='search__label' htmlFor='shorts'>Короткометражки</label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
