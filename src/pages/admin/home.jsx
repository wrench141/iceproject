import DashboardCard from "../components/dashboardCard";

export default function Dhome() {
  const percs = [20, 30, 40, 12, 45, 67, 88, 33, 42, 33, 67, 23];
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
            <DashboardCard
              title={"Sales"}
              amount={"₹1200"}
              month="March"
              profit={false}
              percent={"12"}
              show={true}
            />
            <DashboardCard
              title={"Orders Placed"}
              amount={"12"}
              month="March"
              profit={true}
              show={true}
              percent={"12"}
            />
            <DashboardCard
              title={"Orders Canceled"}
              amount={"13"}
              month="March"
              profit={true}
              show={true}
              percent={"12"}
            />
          </div>
          <div className="graphSec">
            <div className="title">Sales Stats</div>
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
                  {percs.map((lev) => (
                    <div
                      className="level"
                      style={{ "--perc": `${lev}%` }}
                    ></div>
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
