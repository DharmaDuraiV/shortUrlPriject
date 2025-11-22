const LinkTable = ({ links, onDelete }) => {
  if (!Array.isArray(links) || links.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "18px",
          color: "#777",
        }}
      >
        No links found
      </p>
    );
  }

  return (
    <>
      <style>
        {`
.table-wrapper {
  width: 100%;
  margin: 30px auto;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.10);
  overflow: hidden;
}

/* Header row */
.thead {
  background: linear-gradient(90deg, #4f9aff, #7b2fff);
  display: grid;
  grid-template-columns: 28% 52% 20%;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  align-items: center;
}

/* Header cell */
.th {
  padding: 14px 0;
  font-size: 18px;
  border-bottom: 1px solid rgba(255,255,255,0.3);
}

/* Body rows */
.tbody {
  display: grid;
  grid-template-columns: 28% 52% 20%;
  border-bottom: 1px solid #efefef;
  align-items: center;
  transition: 0.2s;
}

.tbody:hover {
  background: #f8faff;
}

/* Body cells */
.td {
  padding: 12px;
  font-size: 15px;
  color: #222;
  word-break: break-word;
}

/* Link style */
.short-link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
.short-link:hover {
  text-decoration: underline;
}

/* Delete button */
.delete-btn {
  background: #e63946;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s;
}

.delete-btn:hover {
  background: #c62828;
  transform: translateY(-2px);
}

.tbodysecond {
  text-align: justify;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .thead, .tbody {
    grid-template-columns: 30% 40% 30%;
  }

  .th {
    font-size: 16px;
  }

  .td {
    font-size: 14px;
  }
}
`}
      </style>

      <div className="table-wrapper">
        <div className="thead">
          <div className="th thfirst">Short Code</div>
          <div className="th thsecond">Original URL</div>
          <div className="th ththird">Action</div>
        </div>

        <section>
          {links.map((item) => (
            <div key={item._id} className="tbody">
              <div className="td tbodyfirst">
                <a
                  className="short-link"
                  href={`http://localhost:3000/${item.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://localhost:3000/{item.code}
                </a>
              </div>

              <div className="td tbodysecond">
                <a
                  href={item.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="short-link"
                >
                  {item.target}
                </a>
              </div>

              <div className="td tbodythird">
                <button
                  className="delete-btn"
                  onClick={() => onDelete(item.code)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default LinkTable;
