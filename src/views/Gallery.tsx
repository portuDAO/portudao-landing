import { Box, CircularProgress, Typography } from '@mui/material';

import styled from 'styled-components';
import spacing from 'theme/spacing';

import { useEffect, useState } from 'react';
import useWallet from 'hooks/useAuth';
import { getToken, getTokens } from 'api/poap';
import PoapList from 'components/Gallery/PoapList';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  min-height: calc(100vh - 148px);
`;

export default function Landing(): JSX.Element {
  const { publicAddress, isAuthenticated } = useWallet();
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
    if (isAuthenticated) getPOAPs();
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
