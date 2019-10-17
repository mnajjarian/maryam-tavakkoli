import React from 'react';
import RichEditor from './editor';

const Dashboard = () => (
    <div className="dashboard" >
        <div className="dashboard__aside">
            <div className="dashboard__profile" >
                <div >
                    <img className="dashboard__profile__image" src={require(`../assets/images/bio-image.jpg`)} alt="admin" />
                </div>
                <span>Maryam Tavakkoli</span>
            </div>
            <ul>
                <li>Posts</li>
                <li>Create</li>
            </ul>
        </div>
        <div className="dashboard__editor" >
            <RichEditor />
        </div>
    </div>
);

export default Dashboard;