import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        /* box-sizing: border-box; */
        margin: 0;
        padding: 0;
        font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
            'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol', 'Noto Color Emoji';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;
