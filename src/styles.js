import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Sour Gummy', sans-serif;
    font-size: 16px;
  }
`;

export const theme = {
  bg: '#f0f8ff',
  text: '#333',
  accent: '#ffffff',
  border: '#ccc',
  shadow: 'rgba(0,0,0,0.15)',
  overlay: 'rgba(0,0,0,0.3)',
};

