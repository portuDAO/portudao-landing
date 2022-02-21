import { Box } from '@mui/material';

import styled from 'styled-components';
import Portudao from 'icons/portudao.jpg';

const Container = styled(Box)`
  display: flex;
  // 100 - 1x navbar - 1x spacing.xxl
  min-height: calc(100vh - 120px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.img`
  max-width: 350px !important;
`;

export default function Landing(): JSX.Element {
  return (
    <Container>
      <StyledImg src={Portudao} alt="" />
    </Container>
  );
}
