import React from 'react';
import './styles.css';

type Props = {
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({
  title,
  setSelectedTab,
  index,
  selectedTab,
}) => {
  return (
    <li className="story-tabbed-list-item">
      <button
        onClick={() => setSelectedTab(index)}
        className={
          selectedTab === index
            ? 'story-tabbed-list-button-selected'
            : 'story-tabbed-list-button'
        }
      >
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
