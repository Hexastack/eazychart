import React, { useState } from 'react';
import TabTitle from './TabTitle';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import coy from 'react-syntax-highlighter/dist/esm/styles/prism/coy';
import './styles.css';

type Props = {
  tabbedClassName: string;
  children: React.ReactElement[];
  showTabs: boolean;
};

const Tabs: React.FC<Props> = ({ children, tabbedClassName, showTabs }) => {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);
  const [showCopied, setShowCopied] = useState(false);

  children = Array.isArray(children) ? children : [children];

  React.useEffect(() => {
    if (showCopied) {
      setTimeout(() => {
        setShowCopied(false);
      }, 700);
    }
  }, [showCopied]);

  const selectedTab = children[selectedTabIdx];

  return (
    <div className="story-tabbed-code-container">
      {showTabs ? (
        <ul className="story-tabbed-code-list">
          {children.map((item: any, index: any) => (
            <TabTitle
              key={index}
              title={item.props.title}
              index={index}
              setSelectedTab={setSelectedTabIdx}
              selectedTab={selectedTabIdx}
            />
          ))}
        </ul>
      ) : null}
      <div className="story-tabbed-code-block-container">
        <div className={`story-tabbed-code-block ${tabbedClassName}`}>
          <SyntaxHighlighter
            language={selectedTab.props.language}
            wrapLines={true}
            style={coy}
          >
            {selectedTab.props.code}
          </SyntaxHighlighter>
        </div>
        <div className="story-copy-code">
          <button
            className="story-copy-code-button"
            onClick={() => {
              navigator.clipboard.writeText(selectedTab.props.code);
              setShowCopied(true);
            }}
          >
            {showCopied ? 'Copied!' : 'copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
