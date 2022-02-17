import { Box, Typography } from '@mui/material';

import styled from 'styled-components';
import spacing from 'theme/spacing';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Events from 'components/POAP/Events';
import getEvents from 'api/poap';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-right: ${spacing.xxxl}px;
  margin-left: ${spacing.xxxl}px;
  margin-top: ${spacing.xxl}px;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing.lg}px;
`;

export default function Landing(): JSX.Element {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents('portudao');
      if (events) setRows(events);
    };
    fetchEvents();
  }, []);
  return (
    <Container>
      <StyledBox>
        <Typography variant="h4"> Events </Typography>
        <AiFillPlusCircle
          style={{
            width: '50px',
            height: '50px',
            color: '#3E7CB1',
          }}
        />
      </StyledBox>

      <Events rows={rows} />
    </Container>
  );
}
