import './App.css';
import LandingPage from './LandingPage/LandingPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#4D4D4D',
      main: '#4D4D4D',
      dark: '#4D4D4D'
    },
    secondary: {
      light: '#4D4D4D',
      main: '#4D4D4D',
      dark: '#4D4D4D'
    },
    
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
