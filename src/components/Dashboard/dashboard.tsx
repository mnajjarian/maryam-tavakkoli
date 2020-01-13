import React, { ReactNode } from "react";
import Nav from "./Nav";


const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dashboard">
      <Nav />
      {children}
    </div>
  );
};

export default Dashboard;
