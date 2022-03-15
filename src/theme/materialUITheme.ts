import { createTheme } from '@mui/material';

const theme = createTheme({
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: ['Poppins', 'BlinkMacSystemFont', 'sans-serif'].join(','),
  },
  palette: {
    primary: { main: '#DF4C2A;' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '50px',
          fontFamily: 'Poppins',
          borderRadius: '16px',
          width: '150px',
        },
      },
    },
  },
});

export default theme;
