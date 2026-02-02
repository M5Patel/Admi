import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

const MainLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <Topbar title={title} />

            <main
                className="pt-4 pb-8 px-8"
                style={{
                    marginLeft: 'var(--sidebar-width)',
                    marginTop: 'var(--topbar-height)'
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
