import { Box, Typography } from '@mui/material';

import styled from 'styled-components';
import Portudao from 'icons/portudao.jpg';
import spacing from 'theme/spacing';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${spacing.xxl}px;
`;

export default function Landing(): JSX.Element {
  return (
    <Container>
      <img src={Portudao} alt="" />
    </Container>
  );
}
