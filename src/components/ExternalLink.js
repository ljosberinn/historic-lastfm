import React from 'react';

export default function ExternalLink({ children, ...rest }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
