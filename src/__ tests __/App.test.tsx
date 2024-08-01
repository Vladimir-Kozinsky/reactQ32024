import { render } from '@testing-library/react';
import Loader from '../components/loader/Loader.tsx';

test('Renders the Loader', () => {
  render(<Loader />);
  expect(true).toBeTruthy();
});
