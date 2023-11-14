import "../../App.css";

const CustomButton = (props) => {

  return (
    <div
      className="custombutton-container"
      style={{
        width: "180px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        backgroundColor: props.type === "primary" ? "#FFFFFF": (props.type === "secondary" ? "#000000": "#1E5AF9"),
        borderRadius: props.type === "primary" ? "3px": "7px",
        padding: "0px 30px 5px 30px",
        cursor: "pointer",
        fontFamily: "'SF Pro Display', sans-serif",
      }}
      onClick={props.onClick}
    >
      <p
        className="custombutton-p"
        style={{
          width: "100%",
          fontSize: "20px",
          textAlign: "center",
          color: props.type === "primary" ? "#3A3A3A": "#FFFFFF",
        }}
      >
        {props.text}
      </p>
    </div>
  );
};

export default CustomButton;