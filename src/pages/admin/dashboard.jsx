import { useState } from "react";
import "../../style/dashboard.css";
import DashboardNavbar from "../components/dashNav";
import Dhome from "./home";
import Learnings from "./learns";
import Products from "./products"


function Dashboard (){
  const [count, setCount] = useState(0);
  const incCount = (n) => {setCount(n);};
  return (
    <div className="dashboard">
      <div className="dummy" />
      <DashboardNavbar incCount={incCount} />
      {
        count == 0 ? (<Dhome />) : count == 1 ? (<Products />) : count == 2 ? (<Learnings />) : null
      }
    </div>
  );
}

export default Dashboard;