const WORK_HISTORY = [
  { org: "Bayer", years: "2022–2026" },
  { org: "University of Phoenix", years: "2021" },
  { org: "Wunderman Thompson", years: "2017–2020" },
  { org: "a la mode, inc", years: "2014–2017" },
  { org: "U.S. Air Force", years: "2013–2014" },
  { org: "OKC Humane Society", years: "2012–2013" },
];

function WorkHistory() {
  return (
    <div className="hero__work">
      <ul className="hero__work-list">
        {WORK_HISTORY.map(({ org, years }) => (
          <li key={org}>
            <span className="hero__work-org">{org}</span>{" "}
            <span className="hero__work-years">{years}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkHistory;
