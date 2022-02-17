import { createTheme } from '@mui/material';

const theme = createTheme({
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: ['apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
  },
  palette: {
    primary: { main: '#3E7CB1;' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '40px',
          fontFamily: 'SF UI Text',
        },
      },
    },
  },
});

export default theme;
