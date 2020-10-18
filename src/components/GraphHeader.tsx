import { MouseEvent, KeyboardEvent } from 'react';

import { Timespan } from '../context/ProfileContext';

const timespans = [
  { chart: 'week', data: '7day', display: 'Last 7 days' },
  { chart: '1month', data: '1month', display: 'Last month' },
  { chart: '3month', data: '3month', display: 'Last 3 months' },
  { chart: '6month', data: '6month', display: 'Last 6 months' },
  { chart: '12month', data: '12month', display: 'Last 12 months' },
  { chart: 'overall', data: 'overall', display: 'Overall' },
];

type GraphHeaderProps = {
  activeTimespan: Timespan;
  handleChange: (
    event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>,
    timespan: Timespan
  ) => void;
};

export function GraphHeader({
  activeTimespan,
  handleChange,
}: GraphHeaderProps): JSX.Element {
  return (
    <div className="horizontalOptions clearit">
      <ul>
        {timespans.map(({ chart, display, data }) => {
          const onClick = (
            event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>
          ) => handleChange(event, data);

          return (
            <li
              className={[`chart${chart}`, activeTimespan === data && 'current']
                .filter(Boolean)
                .join(' ')}
              key={chart}
            >
              <span
                role="link"
                tabIndex={-1}
                onClick={onClick}
                onKeyUp={onClick}
              >
                {display}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
