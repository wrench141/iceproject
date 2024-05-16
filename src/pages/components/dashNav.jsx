import "../../style/dashboard.css";

export default function DashboardNavbar({incCount}){
    return (
      <nav className="navb">
        <div>
          <div className="title">Frosty Creations</div>
          <div className="links">
            <p onClick={() => incCount(0)} className="link">
              <ion-icon
                style={{ fontSize: "14px" }}
                name="stats-chart-outline"
              ></ion-icon>
              Home
            </p>
            <p onClick={() => incCount(1)} className="link">
              <ion-icon
                style={{ fontSize: "14px" }}
                name="bag-handle-outline"
              ></ion-icon>
              Products
            </p>
            <p onClick={() => incCount(2)} className="link">
              <ion-icon
                style={{ fontSize: "14px" }}
                name="wine-outline"
              ></ion-icon>
              Recipes
            </p>
            <p onClick={() => incCount(3)} className="link">
              <ion-icon
                style={{ fontSize: "14px" }}
                name="archive-outline"
              ></ion-icon>
              Orders
            </p>
            {/* <p onClick={() => incCount(4)} className="link">
              <ion-icon
                style={{ fontSize: "14px" }}
                name="reader-outline"
              ></ion-icon>
              Reviews
            </p>
            <p onClick={() => incCount(5)} className="link">
              <ion-icon
                style={{ fontSize: "14px" }}
                name="storefront-outline"
              ></ion-icon>
              Ads
            </p> */}
          </div>
        </div>
        <a href="" className="link del">
          Logout
        </a>
      </nav>
    );
}