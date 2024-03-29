export default function DashboardCard({title, amount, month, profit, percent, show}){
    return (
      <div className="card">
        <p className="sub">Total {title}</p>
        <div className="subtxt">
          <div className="row">
            <p className="prc">
              {amount}
              <span style={{ color: "#5e5e5e" }}>.00</span>
            </p>
            {
                show ? (
                    profit ? (
                        <div className="inc">
                            <ion-icon name="trending-up"></ion-icon> + {percent}%
                        </div>
                        ) : (
                        <div className="inc dec">
                            <ion-icon name="trending-down"></ion-icon> - {percent}%
                        </div>
                        )
                ) : null
            }
          </div>
          <p className="mon">In {month}</p>
        </div>
      </div>
    );
}