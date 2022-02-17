import { Box, Button, Typography } from '@mui/material';
import spacing from 'theme/spacing';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { ReactComponent as Metamask } from 'icons/metamask.svg';
import { ReactComponent as Coinbase } from 'icons/coinbase.svg';
import useWallet from 'hooks/useWallet';
import connect from 'wallets';

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
  const { setWallet } = useWallet();

  const connectTo = async (provider: string) => {
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
      setWallet(accounts[0]);
      handleClose();
    } catch (error) {
      console.log('Connect error', error);
      enqueueSnackbar(
        // @ts-ignore
        error?.response?.data?.message || `Failed wallet connection in!`,
        {
          variant: 'error',
        }
      );
    }
  };

  return (
    <StyledCard>
      <Typography variant="body1">Connect wallet </Typography>
      <Button variant="outlined" fullWidth onClick={() => connectTo('metamask')}>
        <Metamask />
      </Button>
      <Button variant="outlined" fullWidth onClick={() => connectTo('coinbase')}>
        <Coinbase />
      </Button>
    </StyledCard>
  );
}
