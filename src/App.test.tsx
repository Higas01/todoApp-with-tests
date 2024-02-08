// src/App.test.tsx
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should work as expected', () => {
    const {getByText} = render(<App />);

    const expectedText = "Click on the Vite and React logos to learn more";
    const elementWithText = getByText(expectedText);

    expect(elementWithText).toBeInTheDocument();
    
  });
});