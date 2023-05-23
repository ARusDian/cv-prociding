import React from "react";
import MainDashboardAdminTailwind from "../../Layouts/MainDashboardAdminTailwind";

const Dashboard = () => {
  return (
    <div className='overflow-hidden font-roboto'>
      <MainDashboardAdminTailwind>
        <div className="flex flex-row gap-4 items-center">
          <p className='font-bold text-2xl'>Welcome to Dashboard</p>
        </div>
      </MainDashboardAdminTailwind>
    </div>
  )
};

export default Dashboard;