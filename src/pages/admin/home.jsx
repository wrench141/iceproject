import axios from "axios";
import { useEffect, useState } from "react";
import DashboardCard from "../components/dashboardCard";
import HOST_URI from "../components/url";

export default function Dhome() {
  const [data, setData] = useState();

  useEffect(() => {
    (async() => {
      const resp = await axios.get(HOST_URI + "/analytics", {
        headers: {
          token: window.localStorage.getItem("token")
        }
      })
      console.log(resp.data.monthlyAnalytics)
      // const currentMonth = (new Date()).toString().split(" ")[1];
      // console.log(resp.data.monthlyAnalytics.filter((item, i) => item.month == currentMonth)[0]);
      setData(resp.data);
      console.log(resp.data);
    })()
  }, [])
  const currentMonth = (new Date()).toString().split(" ")[1];
  // console.log(currentMonth)
  return (
    <div className="sideSection">
      <div className="topbar">
        <div className="title">Dashboard</div>
        <button className="btn">
          <ion-icon name="notifications-outline"></ion-icon>
        </button>
      </div>
      <div className="sections">
        <div className="sec1">
          <div className="cards">
            {data != undefined ? (
              <>
                <DashboardCard
                  title={"Monthly Sales"}
                  totalSales={
                    data?.monthlyAnalytics.filter(
                      (item, i) => item.month == currentMonth
                    )[0].totalSales
                  }
                  comparison={
                    data?.monthlyAnalytics.filter(
                      (item, i) => item.month == currentMonth
                    )[0].comparison
                  }
                  month={"In " +currentMonth}
                  show={true}
                />
                <DashboardCard
                  title={"Average Order Value"}
                  totalSales={Math.round(data?.averageSaleCountPerMonth)}
                  comparison={1}
                  month={"Per Month"}
                  show={false}
                />
                <DashboardCard
                  title={"Yearly Sales"}
                  totalSales={Math.round(data?.totalSales)}
                  comparison={1}
                  month={"In " + (new Date()).toString().split(" ")[3]}
                  show={false}
                />
              </>
            ) : null}
          </div>
          <div className="graphSec" style={{ marginTop: "20px" }}>
            <div className="title">Order Volume Analysis</div>
            <div className="graph">
              <div className="insec">
                <div className="leftlabs">
                  <div className="lib">100</div>
                  <div className="lib">80</div>
                  <div className="lib">60</div>
                  <div className="lib">40</div>
                  <div className="lib">20</div>
                  <div className="lib">0</div>
                </div>
                <div className="midsec">
                  {data?.monthlyPercentage.map((lev) => (
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          marginBottom: "10px",
                          paddingLeft: "5px",
                        }}
                      >
                        {lev.count > 0
                          ? `Orders: ${lev.count} Percent: ${
                              lev.percentage.split(".")[0]
                            }`
                          : null}
                      </p>
                      <div
                        className="level"
                        style={{ "--perc": `${lev.percentage}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="insec">
                <div className="leftlabs"></div>
                <div className="bottomlabs">
                  <div className="lib">Jan</div>
                  <div className="lib">Feb</div>
                  <div className="lib">Mar</div>
                  <div className="lib">Apr</div>
                  <div className="lib">May</div>
                  <div className="lib">Jun</div>
                  <div className="lib">Jul</div>
                  <div className="lib">Aug</div>
                  <div className="lib">Sep</div>
                  <div className="lib">Oct</div>
                  <div className="lib">Nov</div>
                  <div className="lib">Dec</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
