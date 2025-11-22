import { useParams } from "react-router-dom";

const StatsPage = () => {
  const { code } = useParams();
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Stats Coming Soon…</h1>
      <p>Short code: {code}</p>
    </div>
  );
};

export default StatsPage;
