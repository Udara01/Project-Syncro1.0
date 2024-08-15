import React from 'react';

const SelectedSectionContent = ({ currentTab, content }) => {
  return (
    <div>
      <h2>{currentTab}</h2>
      <div>{content}</div>
    </div>
  );
};

export default SelectedSectionContent;

