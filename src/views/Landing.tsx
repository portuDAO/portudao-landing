import { Box, Typography } from '@mui/material';

import styled from 'styled-components';
import Portudao from 'icons/portudao.jpg';
import spacing from 'theme/spacing';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin-bottom: ${spacing.xxl}px;
  }
`;

export default function Landing(): JSX.Element {
  return (
    <Container>
      <Typography variant="h3"> Landing </Typography>
      <img src={Portudao} alt="" />
    </Container>
  );
}
