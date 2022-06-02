import { Box, Button, Typography } from '@mui/material';
import spacing from 'theme/spacing';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { ReactComponent as Metamask } from 'icons/metamask.svg';
import { ReactComponent as Coinbase } from 'icons/coinbase.svg';
import useAuth from 'hooks/useAuth';
import { connect, signMessage } from 'wallets';
import getUserNonce from 'api/user';

const StyledCard = styled(Box)`
  margin: ${spacing.lg}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .MuiButton-root {
    min-width: 200px !important;
    margin-bottom: ${spacing.md}px;
    margin-top: ${spacing.md}px;
    height: 80px !important;
    border: 1px solid #e1e1e1;
  }
`;

interface Props {
  handleClose: any;
}

export default function WalletConnection({ handleClose }: Props): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  // @ts-ignore
  const { login, setProvider } = useAuth();

  const signIn = async (provider: string) => {
    try {
      const { accounts, error } = await connect(provider);
      if (error) {
        enqueueSnackbar(
          // @ts-ignore
          `No wallet provider detected. Please install.`,
          {
            variant: 'error',
          }
        );
        return;
      }
      const res = await getUserNonce({ publicAddress: accounts[0] });

      if (res && res.nonce) {
        console.log('User nonce', res.nonce);
        const { nonce } = res;
        const message = await signMessage(nonce, provider);
        await login({ publicAddress: accounts[0], message });
        handleClose();
        setProvider(provider);
        global.localStorage.setItem('walletProvider', provider);
        enqueueSnackbar(
          // @ts-ignore
          `Success, logged in!`,
          {
            variant: 'success',
          }
        );
      }
    } catch (error) {
      console.log('Sign in error', error);
      enqueueSnackbar(
        // @ts-ignore
        error?.response?.data?.message || `Failed to log in!`,
        {
          variant: 'error',
        }
      );
    }
  };

  return (
    <StyledCard>
      <Typography variant="body1">Connect wallet </Typography>
      <Button variant="outlined" fullWidth onClick={() => signIn('metamask')}>
        <Metamask />
      </Button>
      <Button variant="outlined" fullWidth onClick={() => signIn('coinbase')}>
        <Coinbase />
      </Button>
    </StyledCard>
  );
}
