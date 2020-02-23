import React from 'react';

const timespans = [
  { chart: 'week', display: 'Last 7 days', data: '7day' },
  { chart: '1month', display: 'Last month', data: '1month' },
  { chart: '3month', display: 'Last 3 months', data: '3month' },
  { chart: '6month', display: 'Last 6 months', data: '6month' },
  { chart: '12month', display: 'Last 12 months', data: '12month' },
  { chart: 'overall', display: 'Overall', data: 'overall' },
];

export default function GraphHeader({ activeTimespan, handleChange }) {
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
