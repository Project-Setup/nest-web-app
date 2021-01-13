import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import Link from 'next/link';
import { AppDispatch } from '~client/features/redux/store';
import { globalSelectCount } from '~client/features/count/countSelectors';
import { plus, times } from '~client/features/count/countSlice';
import rem from '~client/features/styles/rem';
import transition from '~client/features/styles/transition';

const buttonStyles = css`
  padding: ${rem(4)} ${rem(8)};
  border-radius: ${rem(10)};
  cursor: pointer;
  border: ${rem(2)} solid #4caf50;
  ${transition(100)('all')};
  font-size: ${rem(16)};
  margin: ${rem(10)} ${rem(20)};
  outline: None;

  &:hover {
    background-color: #4caf50;
    color: white;
    box-shadow: 0 ${rem(12)} ${rem(16)} 0 rgba(0, 0, 0, 0.24),
      0 ${rem(17)} ${rem(50)} 0 rgba(0, 0, 0, 0.19);
  }

  &:active {
    background-color: white;
    color: black;
    box-shadow: 0 ${rem(3)} ${rem(4)} 0 rgba(0, 0, 0, 0.24),
      0 ${rem(4)} ${rem(13)} 0 rgba(0, 0, 0, 0.19);
  }
`;

const CountPage: FC = () => {
  const count = useSelector(globalSelectCount);
  const [plusInput, setPlusInput] = useState(0);
  const [timesInput, setTimesInput] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  return (
    <main>
      current number:
      {count}
      <br />
      <label>
        plus:
        <input
          type="number"
          value={plusInput}
          onChange={(event) => {
            setPlusInput(parseInt(event.target.value, 10));
          }}
        />
        <button
          css={buttonStyles}
          type="button"
          onClick={() => {
            dispatch(plus(plusInput));
          }}
        >
          dispatch
        </button>
      </label>
      <br />
      <label>
        times:
        <input
          type="number"
          value={timesInput}
          onChange={(event) => {
            setTimesInput(parseInt(event.target.value, 10));
          }}
        />
        <button
          css={buttonStyles}
          type="button"
          onClick={() => {
            dispatch(times(timesInput));
          }}
        >
          dispatch
        </button>
      </label>
      <br />
      <Link href="/">
        <a>index</a>
      </Link>
    </main>
  );
};

export default CountPage;
