import ElhadarIcon from "../assets/images/logo.svg";

const Logo = ({ height }) => (
    <img
        style={{
            objectFit: "fill",
            transform: "scale(1.5)",
        }}
        alt="Elhadar Logo"
        height={height || 150}
        src={ElhadarIcon}
    />
);
export default Logo;
