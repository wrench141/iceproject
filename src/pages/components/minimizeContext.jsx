import React, { useState } from "react";

const DescriptionPreview = ({ description, maxLength = 20 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedDescription =
    description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div onClick={toggleExpand}>
      {isExpanded ? description : truncatedDescription}
    </div>
  );
};

export default DescriptionPreview;
