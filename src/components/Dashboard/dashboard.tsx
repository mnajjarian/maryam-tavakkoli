import React from 'react';
import RichEditor from './editor';
import Nav from './nav';

const Dashboard = () => (
    <div className="dashboard" >
        <Nav />
        <div className="dashboard__editor">
          <RichEditor />
        </div>    
    </div>
);

export default Dashboard;