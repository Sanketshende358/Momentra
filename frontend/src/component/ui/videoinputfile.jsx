import React from "react";
import { PiVideoBold } from "react-icons/pi";
function VideoInputWithIcon() {
  return (
    <div style={{ display: "flex", }}>
      <label
        htmlFor="file-upload"
        style={{
          display: "flex",
          cursor: "pointer",
          backgroundColor: "#fffff",
        }}
      >
        <PiVideoBold className="h-7 w-7"/>
      </label>
      <input
        id="file-upload"
        type="file"
        style={{
          display: "none",
        }}
      />
    </div>
  );
}

export default VideoInputWithIcon;
