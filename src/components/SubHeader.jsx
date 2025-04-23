import "../styles.css";

export default function SubHeader({ category }) {
  return (
    <div className="sub-header">
      {/* Sub-Title changes based on the category chosen */}
      <h1 className="sub-title">
        {category === "NEW RELEASES" ? "FRESH DROPS" : category}
      </h1>
      {/* A description is shown if the category chosen is 'NEW RELEASES' */}
      <p className={`description ${category === "NEW RELEASES" ? "" : "hide"}`}>
        Level up your style with the newest kicks inspired by shonen heroes and
        rivals!
      </p>
    </div>
  );
}
