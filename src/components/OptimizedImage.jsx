import React from 'react';

function OptimizedImage({ src, alt, className, ...props }) {
  // Convert image path to WebP format if available
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        {...props}
      />
    </picture>
  );
}

export default OptimizedImage;
