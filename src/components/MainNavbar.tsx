/* eslint-disable no-underscore-dangle */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, IconButton, Menu, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import styled from 'styled-components';
import PortudaoLogo from 'icons/logo_final.png';
import spacing from 'theme/spacing';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import WalletConnection from './WalletConnection';
import MenuDrawer from './MenuDrawer';

interface Props {
  isMobile: boolean;
}

const MenuItem = styled(Typography)`
  width: 80px;
  cursor: pointer;
`;

const StyledLogoBox = styled(Box)<Props>`
  margin-right: ${(p) => (p.isMobile ? 0 : `${spacing.xxl}px`)};
  img {
    width: 130px;
  }
`;

const Container = styled(Box)`
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
`;

const StyledBox = styled(Box)`
  display: flex;
  border-radius: 16px !important;
  background: rgba(0, 1, 25, 0.03);
  color: black;
  width: 200px;
  height: 52px;
`;

const StyledToolbar = styled(Toolbar)<Props>`
  padding: 0 !important;
  margin: 0 !important;
  justify-content: ${(p) => p.isMobile && 'space-between'};
`;

const StyledMenu = styled(Menu)`
  width: 200px;
`;

export default function MainNavbar(): JSX.Element {
  const [openConnect, setOpenConnect] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const openMenu = Boolean(anchorEl);

  // @ts-ignore
  const { isAuthenticated, publicAddress, logout, user } = useAuth();

  const goToLanding = () => navigate('/');
  const goToEvents = () => navigate('/events');
  const goToMembership = () => navigate('/membership');
  const goToGallery = () => navigate('/gallery');

  const handleClose = () => setOpenConnect(false);

  // @ts-ignore
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  console.log('isMobile', isMobile);

  return (
    <Container>
      <AppBar
        position="static"
        elevation={0}
        style={{
          backgroundColor: 'white',
        }}
      >
        <StyledToolbar isMobile={isMobile}>
          <StyledLogoBox isMobile={isMobile}>
            <IconButton onClick={goToLanding}>
              <img src={PortudaoLogo} alt="" />
            </IconButton>
          </StyledLogoBox>

          {isMobile ? (
            <>
              {isAuthenticated && (
                <StyledBox style={{ cursor: 'pointer' }}>
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
              <MenuDrawer setOpenConnect={setOpenConnect} />
            </>
          ) : (
            <>
              <Box style={{ marginRight: `${spacing.xxl}px` }}>
                <Button variant="contained">
                  <MenuItem variant="body1" onClick={() => goToEvents()}>
                    <Typography>Events</Typography>
                  </MenuItem>
                </Button>
              </Box>
              <Box style={{ marginRight: `${spacing.xxl}px` }}>
                <Button variant="contained" onClick={() => goToMembership()}>
                  <Typography>Membership</Typography>
                </Button>
              </Box>
              <Box style={{ flexGrow: 1 }}>
                <Button variant="contained">
                  <MenuItem variant="body1" onClick={() => goToGallery()}>
                    <Typography>Gallery</Typography>
                  </MenuItem>
                </Button>
              </Box>
              {!isAuthenticated && (
                <Tooltip title="Connect">
                  <Button variant="contained">
                    <Typography variant="body2" onClick={() => setOpenConnect(true)}>
                      Connect
                    </Typography>
                  </Button>
                </Tooltip>
              )}
              {isAuthenticated && (
                <>
                  <StyledBox style={{ cursor: 'pointer' }}>
                    <Typography variant="body2" style={{ margin: 'auto', fontWeight: 'bold' }}>
                      {/* @ts-ignore */}
                      {`${publicAddress.substr(0, 4)} ... ${publicAddress.substr(
                        publicAddress.length - 4,
                        publicAddress.length
                      )}
                            `}
                    </Typography>
                  </StyledBox>
                  <StyledBox
                    style={{ marginLeft: `${spacing.md}px`, cursor: 'pointer' }}
                    onClick={handleClickMenu}
                  >
                    <Avatar
                      style={{
                        background: '#DF4C2A',
                        height: '52px',
                        width: '52px',
                        borderRadius: '16px',
                        boxShadow:
                          '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                      }}
                    />
                    <Typography variant="body2" style={{ margin: 'auto', fontWeight: 'bold' }}>
                      {/* @ts-ignore */}
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                  </StyledBox>
                  <StyledMenu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        logout();
                        handleCloseMenu();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </StyledMenu>
                </>
              )}{' '}
            </>
          )}
        </StyledToolbar>
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
