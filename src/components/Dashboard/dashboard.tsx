import React from 'react';
import RichEditor from './editor';
import Sidebar from './sidebar';

const Dashboard = () => (
    <div className="dashboard" >
        <Sidebar />

        <RichEditor />  
    </div>
);

export default Dashboard;