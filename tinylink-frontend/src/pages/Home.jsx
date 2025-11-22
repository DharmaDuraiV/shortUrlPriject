import { useState, useEffect } from "react";
import LinkTable from "../components/LinkTable";
import { createLink, getLinks, deleteLink } from "../api/links";

const Home = () => {
  const [links, setLinks] = useState([]);
  const [code, setCode] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await getLinks();
        console.log("API RESPONSE:", res);
        setLinks(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error loading links:", error);
        setLinks([]);
      }
    };

    fetchLinks(); // safe call inside useEffect
  }, []);

  const refreshLinks = async () => {
    const res = await getLinks();
    setLinks(Array.isArray(res.data) ? res.data : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLink({ code, target });
    setCode("");
    setTarget("");
    refreshLinks();
  };

  const handleDelete = async (id) => {
    await deleteLink(id);
    refreshLinks();
  };

  return (
    <div className="home-container">
      <style>
        {`
  .home-container {
    max-width: 1000px;
    margin: 60px auto;
    padding: 40px 30px;
    font-family: "Inter", sans-serif;
    background: linear-gradient(135deg, #ffffff, #eef2f7);
    border-radius: 22px;
    color: #1a1a1a;
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    transition: 0.3s ease-in-out;
  }

  .home-container:hover {
    box-shadow: 0 10px 40px rgba(0,0,0,0.25);
    transform: translateY(-3px);
background: linear-gradient(135deg, #fdf3ff, #ffffff, #f3e8ff);

  }

  h1 {
    font-size: 64px;
    font-weight: 900;
    text-align: center;
    margin-bottom: 40px;
    text-transform: uppercase;
    letter-spacing: 4px;

    /* Multicolor animated gradient */
    background: linear-gradient(
      90deg,
      #ff0000,
      #ff7f00,
      #ffff00,
      #00ff00,
      #00ffff,
      #0000ff,
      #8b00ff,
      #ff00ff,
      #ff1493
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* Animation */
    animation: rainbow 4.5s linear infinite, glow 3s ease-in-out infinite;
    position: relative;
  }

  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes glow {
    0% { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
    50% { text-shadow: 0 0 26px rgba(255,255,255,0.9); }
    100% { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
  }

  form {
    display: flex;
    gap: 16px;
    padding: 25px;
    background: #ffffff;
    border: 1px solid #d8dce4;
    border-radius: 18px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    margin-bottom: 35px;
  }

  input {
    padding: 16px;
    border-radius: 14px;
    border: 1px solid #b9c8d9;
    font-size: 16px;
    width: 100%;
    background: #f1f4f9;
    color: #111;
    transition: 0.25s ease-in-out;
  }

  input::placeholder {
    color: #8e9ab0;
  }

  input:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 12px rgba(59,130,246,0.4);
    outline: none;
  }

  button {
    background: linear-gradient(90deg,#3b82f6,#9333ea);
    color: white;
    padding: 14px 35px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    transition: 0.25s ease-in-out;
  }

  button:hover {
    background: linear-gradient(90deg,#1d4ed8,#7e22ce);
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  }

  button:active {
    transform: scale(0.96);
  }

  /* Responsive */
  @media (max-width: 900px) {
    form { flex-wrap: wrap; padding: 20px; }
    h1 { font-size: 52px; }
  }

  @media (max-width: 600px) {
    form { flex-direction: column; }
    button { width: 100%; }
    h1 { font-size: 42px; letter-spacing: 2px; }
    input { width: 100% !important; }
  }
`}
      </style>

      <h1>TinyLink Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Custom Code (6-8 chars)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: "33%" }}
          required
        />

        <input
          type="text"
          placeholder="https://example.com"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          style={{ width: "100%" }}
          required
        />

        <button type="submit">Create</button>
      </form>

      <LinkTable links={links} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
