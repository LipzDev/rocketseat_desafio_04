import { BrowserRouter as Router } from 'react-router-dom';
import { FoodProvider } from '../src/hooks/useFood.tsx'

import Routes from './routes';

import { ThemeProvider } from "styled-components";
import GlobalStyle from './styles/global';
import theme from "../src/styles/theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <FoodProvider>
      <Router>
        <Routes />
      </Router>
    </FoodProvider>
  </ThemeProvider>
);

export default App;
