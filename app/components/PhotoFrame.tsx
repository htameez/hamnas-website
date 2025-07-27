import React from 'react';

interface PhotoFrameProps {
  image: string;
  style?: React.CSSProperties;
}

const PhotoFrame = ({ image }: PhotoFrameProps) => {
  return (
    <div className="bg-[#ffffff] shadow-md p-4 my-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <img
        src={image}
        className="w-60 h-auto mb-3 object-cover"
      />
    </div>
  );
};

export default PhotoFrame;