"use client";
import { useState } from "react";

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, alt = "Image not found", className = "w-full h-[200px] object-fill", ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const displaySrc = hasError ? imgSrc : src;

  return (
    // eslint-disable-next-line  
    <img
      alt={alt}
      className={className}
      src={displaySrc}
      onError={handleError}
      loading="lazy"
      key={src}  
      {...rest}
    />
  );
};

export default ImageWithFallback;

