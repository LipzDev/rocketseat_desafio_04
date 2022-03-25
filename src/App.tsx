import { BrowserRouter as Router } from 'react-router-dom';
import { FoodProvider } from './hooks/useFood'

import Routes from './routes';

import { ThemeProvider } from "styled-components";
import GlobalStyle from './styles/global';
import theme from "./styles/theme";

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
