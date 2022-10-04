import React, { DOMAttributes } from 'react';

export interface LegendItemProps extends DOMAttributes<HTMLDivElement> {
  label: string;
  color: string;
  isActive: boolean;
}

export const LegendItem: React.FC<LegendItemProps> = ({
  label,
  color,
  isActive,
  onClick,
  ...rest
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`ez-legend-key${!isActive ? ' ez-legend-disable' : ''}`}
      {...rest}
    >
      <div
        className="ez-legend-box"
        style={{
          backgroundColor: isActive ? color : 'rgba(255, 255, 255, 0)',
          border: `${color} 2px solid`,
        }}
      ></div>
      <span className="ez-legend-text">{label}</span>
    </div>
  );
};
