import { Box, Button, Typography } from '@mui/material';
import PortudaoLogo from 'icons/logo_final.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import spacing from 'theme/spacing';

const Container = styled(Box)`
  display: flex;
  // 100 - 1x navbar
  min-height: calc(100vh - 146px);
  justify-content: end;
  align-items: end;
  flex-direction: column;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  h4,
  h5 {
    text-align: right;
    margin-bottom: ${spacing.sm}px;
    font-weight: bold;
  }
`;

export default function Landing(): JSX.Element {
  const navigate = useNavigate();
  const goToEvents = () => navigate('/events');

  return (
    <Container>
      <img style={{ width: '25%' }} src={PortudaoLogo} alt="" />
      <Typography variant="h4">O potencial disruptivo</Typography>
      <Typography variant="h4">da tecnologia Blockchain</Typography>
      <Typography variant="h4">em Portugal.</Typography>
      <Typography variant="h5">Faz aqui o claim dos POAPs</Typography>
      <Typography variant="h5">das reuniões semanais da portuDAO.</Typography>
      <Button
        variant="contained"
        style={{ marginBottom: `${spacing.xl}px`, width: '150px' }}
        onClick={goToEvents}
      >
        <Typography variant="body2">CLAIM</Typography>
      </Button>
    </Container>
  );
}
