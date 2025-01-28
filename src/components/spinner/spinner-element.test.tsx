import { render, screen } from '@testing-library/react';
import { SpinnerElement } from './spinner-element';

describe('Component: Spinner Element', () => {

  it('should render correctly', () => {
    const expextedText = /Loading... Please, wait!/i;

    render(<SpinnerElement />);

    expect(screen.getByText(expextedText)).toBeInTheDocument();
  });
});
