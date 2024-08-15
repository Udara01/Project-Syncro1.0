import React from 'react';

const Tabs = ({ currentTab, onTabChange }) => {
  const tabs = ['Overview', 'Tasks', 'Team', 'Documents', 'Timeline', 'Budget'];

  return (
    <div>
      {tabs.map(tab => (
        <button
          key={tab}
          className={currentTab === tab ? 'active' : ''}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
