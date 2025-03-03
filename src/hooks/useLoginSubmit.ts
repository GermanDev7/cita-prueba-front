import { useDispatch } from "react-redux";
import { loginAPI, LoginResponse } from "../services/authAPI";
import { loginSuccess } from "../store/slices/authSlice";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { LoginFormInputs } from "../Interfaces/LoginFormInputs";


const useLoginSubmit = () => {
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

    return { onSubmit }
}

export default useLoginSubmit