import React from 'react';

export enum AppState {
  INVITATION = 'INVITATION',
  ACCEPTED = 'ACCEPTED',
  ERROR = 'ERROR'
}

export interface SparkleProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}