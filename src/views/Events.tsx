import { Box, Typography } from '@mui/material';

import styled from 'styled-components';
import spacing from 'theme/spacing';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useEffect, useMemo, useState } from 'react';
import { getEvents } from 'api/poap';
import NFTList from 'components/Events/NFTList';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  min-height: calc(100vh - 148px);
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

  const sortedEvents = useMemo(() => {
    // @ts-ignore
    return rows.sort((a, b) => {
      // @ts-ignore
      const aStartDate = new Date(a.start_date.replace('-', ' '));
      // @ts-ignore
      const bStartDate = new Date(b.start_date.replace('-', ' '));
      // @ts-ignore
      if (aStartDate > bStartDate) return 1;
      if (aStartDate < bStartDate) return -1;
      return 0;
    });
  }, [rows]);

  return (
    <Container>
      <StyledBox>
        <Typography variant="h4"> All Events </Typography>
        <AiFillPlusCircle
          style={{
            width: '50px',
            height: '50px',
            color: '#3E7CB1',
          }}
        />
      </StyledBox>

      <NFTList events={sortedEvents} />
    </Container>
  );
}
