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

  const mintNFT = async (signature: string, message: string) => {
    const res = await mint(signature, message);
    console.log(res);
  };

  const fetchSignature = async () => {
    const res = await getNonceSignature('metamask');
    if (res) {
      console.log('res', res);
      const { sig } = res;
      const msg = '1653469595976';
      await mintNFT(sig, msg);
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
