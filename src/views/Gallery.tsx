import { Box, CircularProgress, Typography } from '@mui/material';

import styled from 'styled-components';
import spacing from 'theme/spacing';

import { useEffect, useState } from 'react';
import getTokenTransactions from 'api/blackscout';
import useWallet from 'hooks/useWallet';
import { getToken } from 'api/poap';
import PoapList from 'components/Gallery/PoapList';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  margin-top: ${spacing.xxl}px;
`;

export default function Landing(): JSX.Element {
  const { publicAddress, connected } = useWallet();
  const [poaps, setPoaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPOAPs = async () => {
      setIsLoading(true);
      const tokenTransactions = await getTokenTransactions(publicAddress);

      console.log('tokenTransactions', tokenTransactions);
      if (tokenTransactions.result) {
        // @ts-ignore
        const poapTransactions = tokenTransactions.result.filter((tt) => {
          if (tt.tokenName === 'POAP') {
            return true;
          }
          return false;
        });

        console.log('poapTransactions', poapTransactions);

        // @ts-ignore
        const tokenIds = poapTransactions.map((tt) => tt.tokenID);

        console.log('Token ids', tokenIds);

        const retrivedPoaps = await Promise.all(
          // @ts-ignore
          tokenIds.map(async (tokenId) => {
            return getToken(tokenId);
          })
        );
        console.log('poaps', retrivedPoaps);

        setIsLoading(false);
        // @ts-ignore
        setPoaps(retrivedPoaps);
      }
    };
    if (connected) getPOAPs();
  }, [publicAddress]);

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: `${spacing.lg}px` }}>
        {' '}
        My Gallery{' '}
      </Typography>
      {isLoading && <CircularProgress />}
      {!isLoading && poaps.length === 0 && (
        <Typography variant="h6">No Poaps found on connected wallet.</Typography>
      )}
      {!isLoading && poaps.length > 0 && <PoapList poaps={poaps} />}
    </Container>
  );
}
