import React from 'react';
import { useForm } from 'react-hook-form';

import './LoginPage.css'
import { LoginFormInputs } from '../Interfaces/LoginFormInputs';
import useLoginSubmit from '../hooks/useLoginSubmit';

const LoginPage: React.FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { onSubmit } = useLoginSubmit();

  return (
    <div className="login-page">
      <div className="login-page__container">
        <h2 className="login-page__title">Iniciar Sesión</h2>
        <form className="login-page__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-page__form-group">
            <label>Email:</label>
            <input
              type="email"
              {...register('email', { required: 'El email es obligatorio' })}
            />
            {errors.email && (
              <p className="login-page__error">{errors.email.message}</p>
            )}
          </div>

          <div className="login-page__form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
            />
            {errors.password && (
              <p className="login-page__error">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="login-page__submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
