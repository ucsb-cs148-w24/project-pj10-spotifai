import React from 'react'

const LyricAnalysis = () => {

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5px', // Adjust spacing between rows
  };
  
  const columnStyle = {
    flex: 1,
    padding: '15px',
    border: '1px solid #000',
    borderRadius: '8px',
  };

  return (
    <div>
      {/* First Row */}
      <div style={rowStyle}>
        <div style={columnStyle}>Word count</div>
        <div style={columnStyle}>Word density</div>
      </div>

      {/* Second Row */}
      <div style={rowStyle}>
        <div style={columnStyle}>Reptition rate</div>
        <div style={columnStyle}>Sentiment Analysis</div>
      </div>

      {/* Third Row */}
      <div style={rowStyle}>
        <div style={columnStyle}>Keywords</div>
        <div style={columnStyle}>Genre</div>
      </div>
    </div>
  );
};
  
export default LyricAnalysis;