/* eslint-disable no-underscore-dangle */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@mui/material';
import styled from 'styled-components';
import PortudaoLogo from 'icons/portuDAO-logo.png';
import spacing from 'theme/spacing';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import useWallet from 'hooks/useWallet';
import WalletConnection from './WalletConnection';

const MenuItem = styled(Typography)`
  width: 80px;
  color: black;
  cursor: pointer;
`;

const StyledIconButton = styled(IconButton)`
  width: 80px;
`;

const StyledLogoBox = styled(Box)`
  margin-right: ${spacing.xxl}px;
  img {
    width: 60px;
  }
`;

const Container = styled(Box)`
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
`;

const StyledBox = styled(Box)`
  display: flex;
  border-radius: 26px 26px 26px 26px !important;
  background: rgba(0, 1, 25, 0.03);
  color: black;
  width: 200px;
  height: 52px;
`;

export default function MainNavbar(): JSX.Element {
  const [openConnect, setOpenConnect] = useState(false);
  const navigate = useNavigate();

  // @ts-ignore
  const { connected, publicAddress } = useWallet();

  const goToLanding = () => navigate('portudao-landing/');
  const goToPOAP = () => navigate('portudao-landing/POAP');

  const handleClose = () => setOpenConnect(false);

  return (
    <Container>
      <AppBar
        position="static"
        elevation={0}
        style={{
          backgroundColor: 'white',
        }}
      >
        <Toolbar>
          <StyledLogoBox>
            <StyledIconButton onClick={goToLanding}>
              <img src={PortudaoLogo} alt="" />
            </StyledIconButton>
          </StyledLogoBox>

          <Box style={{ flexGrow: 1 }}>
            <MenuItem variant="h6" onClick={() => goToPOAP()}>
              POAP
            </MenuItem>
          </Box>

          {!connected && (
            <Tooltip title="Connect">
              <Button variant="contained">
                <Typography variant="body2" onClick={() => setOpenConnect(true)}>
                  Connect
                </Typography>
              </Button>
            </Tooltip>
          )}

          {connected && (
            <StyledBox>
              <Typography variant="body2" style={{ margin: 'auto', fontWeight: 'bold' }}>
                {/* @ts-ignore */}
                {`${publicAddress.substr(0, 4)} ... ${publicAddress.substr(
                  publicAddress.length - 4,
                  publicAddress.length
                )}
                            `}
              </Typography>
            </StyledBox>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={openConnect}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 18 },
        }}
      >
        <WalletConnection handleClose={handleClose} />
      </Dialog>
    </Container>
  );
}
