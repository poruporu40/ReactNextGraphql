import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../redux/slices/counterSlice';
import { RootState } from '../redux/store';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>カウンター: {count}</h1>
      <button onClick={() => dispatch(increment())}>増加</button>
      <button onClick={() => dispatch(decrement())}>減少</button>
      <button onClick={() => dispatch(reset())}>リセット</button>
    </div>
  );
};

export default Counter; 