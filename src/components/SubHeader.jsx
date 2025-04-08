import "../styles.css";

export default function SubHeader({ category }) {
  return (
    <div className="sub-header">
      <h1 className="sub-title">
        {category === "NEW RELEASES" ? "FRESH DROPS" : category}
      </h1>
      <p className={`description ${category === "NEW RELEASES" ? "" : "hide"}`}>
        Level up your style with the newest kicks inspired by shonen heroes and
        rivals!
      </p>
    </div>
  );
}
