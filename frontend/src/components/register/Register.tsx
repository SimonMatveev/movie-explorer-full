import './register.css';
import AuthForm from '../auth-form/authForm';
import { REG_EXP_EMAIL, REG_EXP_NAME } from '../../utils/constants';
import { EInputType, ISignup } from '../../types/types';
import { FC } from 'react';

interface IRegisterProps {
  signup: ({ email, name, password }: ISignup) => void;
  registerErr: string;
  isFormLoading: boolean;
}

const inputs = [
  {
    name: 'name',
    nameText: 'Имя',
    type: EInputType.TEXT,
    options: {
      pattern: REG_EXP_NAME,
      minLength: '2',
      maxLength: '30',
      autoComplete: 'name',
    },
  },
  {
    name: 'email',
    nameText: 'E-mail',
    type: EInputType.EMAIL,
    options: {
      pattern: REG_EXP_EMAIL,
      autoComplete: 'email',
    },
  },
  {
    name: 'password',
    nameText: 'Пароль',
    type: EInputType.PASSWORD,
    options: {
      minLength: '2',
      maxLength: '30',
      autoComplete: 'new-password',
    },
  },
];

const Register: FC<IRegisterProps> = ({ signup, registerErr, isFormLoading }) => {
  return (
    <section className='register'>
      <AuthForm
        handleSubmit={signup}
        title={'Добро пожаловать!'}
        inputs={inputs}
        buttonText={'Зарегистрироваться'}
        questionText={'Уже зарегистрированы?'}
        linkText={'Войти'}
        link={'/signin'}
        apiError={registerErr}
        isFormLoading={isFormLoading}
      />
    </section>
  );
};

export default Register;
