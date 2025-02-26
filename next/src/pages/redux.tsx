import React from 'react';
import Counter from '../components/Counter';
import Link from 'next/link';

const Redux: React.FC = () => {
  return (
    <div>
      <h1>ReduxとNext.jsのサンプル</h1>
      <Counter />
      <Link href="/anotherRedux">別のページへ移動</Link>
    </div>
  );
};

export default Redux;
