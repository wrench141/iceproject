export default function DashboardCard({ title, totalSales, comparison, month, show }) {
  
  return (
    <div className="card">
      <p className="sub">{title}</p>
      <div className="subtxt">
        <div className="row">
          <p className="prc">
            ₹{totalSales}
            <span style={{ color: "#5e5e5e" }}>.00</span>
          </p>
          {show ? (
            Math.sign(parseInt(comparison)) > 0 ? (
              <div className="inc">
                <ion-icon name="trending-up"></ion-icon> +{" "}
                {Math.round(comparison)}%
              </div>
            ) : (
              <div className="inc dec">
                <ion-icon name="trending-down"></ion-icon>
                {Math.round(comparison)}%
              </div>
            )
          ) : null}
        </div>
        <p className="mon" style={{ textTransform: "capitalize" }}>
          {month}
        </p>
      </div>
    </div>
  );
}