import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <aside className='sidebar'>
            <ul>
                {role === 'admin' && (

                    <li>
                        <a href='/admin/appointments'>Citas</a>

                    </li>

                )}
                {role === 'doctor' && (
                    <>
                        <li>
                            <a href="/doctor/appointments">Mis Citas</a>
                        </li>
                    </>
                )}
                {role === 'user' && (
                    <>
                        <li>
                            <a href="/user/appointments">Mis Citas</a>
                        </li>
                        <li>
                            <a href="/user/create">Crear Cita</a>
                        </li>
                    </>
                )}

            </ul>
            <button onClick={handleLogout}>Cerrar sesión</button>

        </aside>
    )
}

export default Sidebar;