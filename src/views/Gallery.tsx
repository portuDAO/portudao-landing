import { Box, CircularProgress, Typography } from '@mui/material';

import styled from 'styled-components';
import spacing from 'theme/spacing';

import { useEffect, useState } from 'react';
import getTokenTransactions from 'api/blackscout';
import useWallet from 'hooks/useWallet';
import { getToken, getTokens } from 'api/poap';
import PoapList from 'components/Gallery/PoapList';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  margin-top: ${spacing.xxl}px;
  margin-bottom: ${spacing.lg}px;
`;

export default function Landing(): JSX.Element {
  const { publicAddress, connected } = useWallet();
  const [poaps, setPoaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPOAPs = async () => {
      setIsLoading(true);
      const tokens = await getTokens(publicAddress);

      console.log('tokens', tokens);
      if (tokens) {
        // @ts-ignore
        const tokenIds = tokens.map((token) => token.tokenId);

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
      setIsLoading(false);
    };
    if (connected) getPOAPs();
  }, [publicAddress]);

  return (
    <Container>
      {poaps && (
        <>
          <Typography variant="h4" style={{ marginBottom: `${spacing.lg}px` }}>
            My Gallery
          </Typography>
          {isLoading && <CircularProgress />}
          {!isLoading && poaps.length === 0 && (
            <Typography variant="h6">No Poaps found on connected wallet.</Typography>
          )}
          {!isLoading && poaps.length > 0 && <PoapList poaps={poaps} />}
        </>
      )}
    </Container>
  );
}
