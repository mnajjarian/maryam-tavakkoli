import React from 'react';
import RichEditor from './editor';
import Nav from './nav';
import Profile from './profile';

const Dashboard = () => {
    return(
    <div className="dashboard" >
        <Nav />
        <div className="dashboard__editor">
        <RichEditor />
       
        </div>  
{/*         <Profile />  */} 
    </div>
)};

export default Dashboard;