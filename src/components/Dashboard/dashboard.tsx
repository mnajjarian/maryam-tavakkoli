import React, { useContext, useState } from 'react';
import RichEditor from './editor';
import { AuthContext } from '../../contexts/authContext';
import Nav from './nav';

const Dashboard = () => {
    return(
    <div className="dashboard" >
        <Nav />
        <div className="dashboard__editor">
        <RichEditor />
        </div>    
    </div>
)};

export default Dashboard;