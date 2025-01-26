import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
function FileInputWithIcon() {
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
        <MdOutlineAddPhotoAlternate className="w-7 h-7" />
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

export default FileInputWithIcon;
