export default function InforContact() {
  return (
    <div className="card text-white  mb-3" style={{ maxWidth: "100%" }}>
      <div
        className="card-header"
        style={{
          backgroundColor: "#67A448",
          display: "flex",
          justifyContent: "center",
          fontSize: "1.3rem",
          fontWeight: "600",
        }}
      >
        Tư vấn đặt tour
      </div>
      <div
        className="card-body text-black"
        style={{ backgroundColor: "#F7F7F7" }}
      >
        <p className="card-text">
          Hotline:{" "}
          <span style={{ color: "#67A448", fontWeight: "600" }}>19009165</span>
        </p>
        <p className="card-text">
          Zalo:{" "}
          <span style={{ color: "#67A448", fontWeight: "600" }}>
            0939729609
          </span>
        </p>
        <p className="card-text">
          Messenger:{" "}
          <span style={{ color: "#67A448", fontWeight: "600" }}>
            Nụ cười cá chép
          </span>
        </p>
        <p className="card-text">
          Email:{" "}
          <span style={{ color: "#67A448", fontWeight: "600" }}>
            nucuoicachep.com
          </span>
        </p>
      </div>
    </div>
  );
}
