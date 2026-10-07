import React from "react";

const Image = ({ src, className, alt = "" }) => {
  return <img src={src} className={className} alt={alt} />;
};

export default Image;
