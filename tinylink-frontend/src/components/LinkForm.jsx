import { useState } from "react";

const LinkForm = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ code: code || undefined, target });
    setCode("");
    setTarget("");
  };

  return (
    <div className="form-wrapper">
      <style>
        {`
        .form-wrapper {
          background: #ffffff;
          padding: 26px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0px 6px 22px rgba(0,0,0,0.10);
          margin-bottom: 32px;
          font-family: "Inter", sans-serif;
        }

        h2 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #0f172a;
        }

        .form-input {
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 16px;
          width: 100%;
          background: #f8fafc;
          margin-bottom: 14px;
        }

        .form-input:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 6px rgba(37,99,235,0.35);
          outline: none;
        }

        .btn-submit {
          background: #2563eb;
          color: white;
          padding: 14px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          width: 150px;
          font-size: 16px;
          font-weight: 600;
        }

        .btn-submit:hover {
          background: #1d4ed8;
        }
      `}
      </style>

      <form onSubmit={handleSubmit}>
        <h2>Create New Short Link</h2>

        <input
          type="text"
          placeholder="Custom Code (optional)"
          className="form-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          type="text"
          placeholder="https://example.com"
          className="form-input"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />

        <button className="btn-submit">Create</button>
      </form>
    </div>
  );
};

export default LinkForm;
