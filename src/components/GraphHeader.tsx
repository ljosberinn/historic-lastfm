import type { MouseEvent, KeyboardEvent } from 'react';

import { Timespan } from '../context/ProfileContext';

const timespans = [
  { chart: 'week', data: Timespan['7day'], display: 'Last 7 days' },
  { chart: '1month', data: Timespan['1month'], display: 'Last month' },
  { chart: '3month', data: Timespan['3month'], display: 'Last 3 months' },
  { chart: '6month', data: Timespan['6month'], display: 'Last 6 months' },
  { chart: '12month', data: Timespan['12month'], display: 'Last 12 months' },
  { chart: 'overall', data: Timespan.overall, display: 'Overall' },
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
          ) => {
            handleChange(event, data);
          };

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
