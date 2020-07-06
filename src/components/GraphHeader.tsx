import React, { MouseEvent } from 'react';

import { Timespan } from '../context/ProfileContext';

const timespans = [
  { chart: 'week', data: '7day', display: 'Last 7 days' },
  { chart: '1month', data: '1month', display: 'Last month' },
  { chart: '3month', data: '3month', display: 'Last 3 months' },
  { chart: '6month', data: '6month', display: 'Last 6 months' },
  { chart: '12month', data: '12month', display: 'Last 12 months' },
  { chart: 'overall', data: 'overall', display: 'Overall' },
];

interface GraphHeaderProps {
  activeTimespan: Timespan;
  handleChange: (event: MouseEvent<HTMLSpanElement>, Timespan) => void;
}

export default function GraphHeader({
  activeTimespan,
  handleChange,
}: GraphHeaderProps) {
  return (
    <div className="horizontalOptions clearit">
      <ul>
        {timespans.map(({ chart, display, data }) => (
          <li
            className={[`chart${chart}`, activeTimespan === data && 'current']
              .filter(Boolean)
              .join(' ')}
            key={chart}
          >
            <span onClick={event => handleChange(event, data)}>{display}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
