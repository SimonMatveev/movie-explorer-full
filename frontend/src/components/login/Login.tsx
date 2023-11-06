import { FC } from 'react';
import { EInputType, ISignin } from '../../types/types';
import { REG_EXP_EMAIL } from '../../utils/constants';
import AuthForm from '../auth-form/authForm';
import './login.css';

interface ILoginProps {
  signin: ({ email, password }: ISignin) => void;
  loginErr: string;
  isFormLoading: boolean;
}

const inputs = [
  {
    name: 'email',
    nameText: 'E-mail',
    type: EInputType.EMAIL,
    options: {
      pattern: REG_EXP_EMAIL,
      autoComplete: 'email',
    },
  }, {
    name: 'password',
    nameText: 'Пароль',
    type: EInputType.PASSWORD,
    options: {
      minLength: '2',
      maxLength: '30',
      autoComplete: 'current-password',
    },
  },
];

const Login: FC<ILoginProps> = ({ signin, loginErr, isFormLoading, }) => {
  return (
    <section className='login'>
      <AuthForm
        handleSubmit={signin}
        title={'Рады видеть!'}
        inputs={inputs}
        buttonText={'Войти'}
        questionText={'Ещё не зарегистрированы?'}
        linkText={'Регистрация'}
        link={'/signup'}
        apiError={loginErr}
        isFormLoading={isFormLoading}
      />
    </section>
  );
}

export default Login;
