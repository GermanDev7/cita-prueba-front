import React from 'react';

import './DashboardLayout.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <main className="dashboard-layout__content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
