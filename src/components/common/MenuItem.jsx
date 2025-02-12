import { Link } from "react-router-dom";

export default function MenuItem({ title, icon, linkTo }) {
  return (
    <Link to={linkTo}>
      <div className="menuNewItem rounded" style={{ paddingLeft: "2rem" }}>
        <p className="mb-2" style={{ fontSize: "2.3rem" }}>
          {icon}
        </p>
        <p
          style={{
            width: "70%",
            marginLeft: "1.8rem",
            fontWeight: "300",
            lineHeight: "1.7rem",
            fontSize: "1.15rem",
          }}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}
