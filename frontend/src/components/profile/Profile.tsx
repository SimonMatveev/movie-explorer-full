import { ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState } from 'react';
import './profile.css';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { REG_EXP_EMAIL, REG_EXP_NAME } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import { IPatchMe } from '../../types/types';

interface IProfileProps {
  signout: () => void;
  editProfile: ({ name, email }: IPatchMe) => void;
  profileErr: string;
  isFormLoading: boolean;
}

const Profile: FC<IProfileProps> = ({ signout, editProfile, profileErr, isFormLoading, }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isUnchanged, setIsUnchanged] = useState(true);
  const { resetForm, values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e);
    setIsUnchanged(e.target.value === currentUser?.[e.target.name as keyof IPatchMe]);
  }

  const handleEditing = () => {
    setIsEditing(true);
    setIsValid(true);
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    editProfile({ name: values.name, email: values.email });
  }

  useEffect(() => {
    resetForm({
      name: currentUser?.name,
      email: currentUser?.email,
    });
  }, [])

  useEffect(() => {
    setIsEditing(false);
  }, [currentUser])

  return (
    <section className='profile'>
      <form className='profile__form' id='profile' name='profile' onSubmit={handleSubmit}>
        <h1 className='profile__greeting'>Привет, {currentUser?.name}!</h1>
        <fieldset className='profile__row'>
          <p className='profile__text profile__text_header'>Имя</p>
          <input
            type='text'
            name='name'
            className='profile__text profile__input'
            value={values['name'] || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            minLength={2}
            maxLength={30}
            pattern={REG_EXP_NAME}
            required
          />
          {errors['name'] && <span className="profile__input-error">{errors['name']}</span>}
        </fieldset>
        <fieldset className='profile__row'>
          <p className='profile__text profile__text_header'>E-mail</p>
          <input
            type='email'
            name='email'
            className='profile__text profile__input'
            value={values['email'] || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            pattern={REG_EXP_EMAIL}
            required
          />
          {errors['email'] && <span className="profile__input-error">{errors['email']}</span>}
        </fieldset>
        {profileErr && <p className='profile__error'>{profileErr}</p>}
        {!isEditing ? <>
          <button type='button' className='profile__btn profile__btn_t_edit' onClick={handleEditing}>Редактировать</button>
          <button type='button' className='profile__btn profile__btn_t_exit' onClick={signout}>Выйти из аккаунта</button>
        </> :
          <button type='submit' className={`profile__btn profile__btn_t_submit${!isValid || isFormLoading || isUnchanged ? ' profile__btn_disabled' : ''}`} disabled={!isValid || isFormLoading || isUnchanged}>{!isFormLoading ? 'Сохранить' : 'Сохранение...'}</button>
        }

      </form>
    </section>
  );
}

export default Profile;
