import React from 'react';

interface ContentCardProps {
  image: string;
  title: string;
  githubLink: string;
  style?: React.CSSProperties;
}

const ContentCard = ({ image, title, githubLink }: ContentCardProps) => {
  return (
    <div className="bg-[#ffffff] shadow-md p-4 my-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-60 h-auto mb-3 object-cover"
      />
      <div>
        <h3 className="text-xl text-[#454525] mb-2">{title}</h3>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-700 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default ContentCard;