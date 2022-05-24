import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import spacing from 'theme/spacing';
import getNonceSignature from 'api/membership';
import mint from 'contracts/membership';
import useAuth from 'hooks/useAuth';
import approve from 'contracts/usdc';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  min-height: calc(100vh - 148px);
`;

export default function Membership(): JSX.Element {
  const { provider, publicAddress } = useAuth();

  const mintNFT = async (sig: string, nonce: string) => {
    const res = await mint(provider, publicAddress, sig, nonce);
  };

  const fetchSignature = async () => {
    const res = await getNonceSignature();
    if (res) {
      const { signature, nonce } = res;
      await mintNFT(signature, nonce);
    }
  };

  const approveToken = async () => {
    const res = await approve();
  };

  return (
    <Container>
      <Button variant="contained" onClick={approveToken}>
        APPROVE TOKEN
      </Button>
      <Button variant="contained" onClick={fetchSignature}>
        MINT NFT
      </Button>
    </Container>
  );
}
