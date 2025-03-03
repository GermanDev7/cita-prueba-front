import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                {role === 'admin' && (
                    <li className="sidebar__item">
                        <a href="/admin/appointments" className="sidebar__link">Citas</a>
                    </li>
                )}
                {role === 'doctor' && (
                    <li className="sidebar__item">
                        <a href="/doctor/appointments" className="sidebar__link">Mis Citas</a>
                    </li>
                )}
                {role === 'patient' && (
                    <>
                        <li className="sidebar__item">
                            <a href="/patient/appointments" className="sidebar__link">Mis Citas</a>
                        </li>
                        <li className="sidebar__item">
                            <a href="/patient/create" className="sidebar__link">Crear Cita</a>
                        </li>
                    </>
                )}
            </ul>
            <button onClick={handleLogout} className="sidebar__logout-button">
                Cerrar Sesión
            </button>
        </aside>
    );
};

export default Sidebar;
