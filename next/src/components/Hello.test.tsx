import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hello from './Hello';

test('renders Hello component', () => {
  render(<Hello />);
  const helloElement = screen.getByText(/Hello, World!/i);
  expect(helloElement).toBeInTheDocument();
});

// テスト系のライブラリをインストールしてこのコードだけエラーが出ないようにした。