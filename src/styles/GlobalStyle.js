import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #f8d7e2;    /* Soft pink */
    --secondary: #e2c4d5;  /* Lavender */
    --accent: #bf9ba8;     /* Mauve */
    --dark: #6d5a62;       /* Deep mauve */
    --light: #fff9fb;      /* Off-white */
    --font-main: 'Playfair Display', serif;
    --font-body: 'Montserrat', sans-serif;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: var(--font-body);
    background-color: var(--light);
    color: var(--dark);
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5 {
    font-family: var(--font-main);
    font-weight: 400;
  }
`;

export default GlobalStyle;
