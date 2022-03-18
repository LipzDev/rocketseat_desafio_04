import { BrowserRouter as Router } from 'react-router-dom';
import {FoodProvider} from '../src/hooks/useFood.jsx'

import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <FoodProvider>
      <Router>
        <Routes />
      </Router>
    </FoodProvider>
  </>
);

export default App;
