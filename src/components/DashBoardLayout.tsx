import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className='dashboard-layout'>
            <Sidebar />
            <main className="dashboard-content">{children}</main>
        </div>
    )
};

export default DashboardLayout;