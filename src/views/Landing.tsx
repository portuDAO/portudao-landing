import { Box, Typography } from '@mui/material';

import styled from 'styled-components';

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Landing(): JSX.Element {
  return (
    <Container>
      <Typography variant="h3"> Landing </Typography>
    </Container>
  );
}
