import React from 'react';
import { staticFile, Img } from 'remotion';

interface ServiceIconProps {
  type: string;
  size?: number;
  style?: React.CSSProperties;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  type,
  size = 24,
  style = {},
}) => {
  return (
    <Img
      src={staticFile(`icons/${type}.svg`)}
      width={size}
      height={size}
      style={{ display: 'inline-block', ...style }}
    />
  );
};
