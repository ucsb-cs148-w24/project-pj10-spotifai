{/* <InfoBox isVisible = {boxVis} infoText = {boxText} position = {position}/> */}
const InfoBox = (props) => {
    const boxVis = props.isVisible;
    const boxText = props.infoText;
    const position = props.position;
    return (
        <div style = {{
            display: boxVis ? "block" : "none",
            position: "absolute",
            left: position.x + 10,
            top: position.y - 30,
            border: "1px solid black",
            backgroundColor: "white",
            padding: "5px",
            zIndex: 100
        }}>
            {boxText}
        </div>
    );
}
    
export default InfoBox;