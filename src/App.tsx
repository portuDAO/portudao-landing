import 'App.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import materialUITheme from 'theme/materialUITheme';
import routes from 'routes';
import { SnackbarProvider } from 'notistack';
import { WalletProvider } from 'contexts/WalletContext';

function App(): JSX.Element {
  const content = useRoutes(routes);

  return (
    <WalletProvider>
      <ThemeProvider theme={materialUITheme}>
        <SnackbarProvider maxSnack={3}>{content}</SnackbarProvider>
      </ThemeProvider>
    </WalletProvider>
  );
}

export default App;
