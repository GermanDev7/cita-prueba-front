import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { loginAPI, LoginResponse } from '../services/authAPI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response: LoginResponse = await loginAPI(data);
      console.log(response)
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role || '');
      localStorage.setItem('userData', JSON.stringify(response.userData));
      dispatch(loginSuccess(response));

      if (response.role === 'admin') {
        navigate('/admin/appointments');
      } else if (response.role === 'doctor') {
        navigate('/doctor/appointments');
      } else {
        navigate('/patient/appointments');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error en el login:', error.response?.data || error.message);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      } else {
        console.error('Error desconocido:', error);
        alert('Ocurrió un error inesperado.');
      }
    }
  };

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
