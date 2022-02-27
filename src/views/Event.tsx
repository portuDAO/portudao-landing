import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getEvent, getEventPoaps } from 'api/poap';
import canClaim from 'api/event';
import styled from 'styled-components';
import EventCard from 'components/Event/EventCard';
import spacing from 'theme/spacing';
import EventPoaps from 'components/Event/EventsPoaps';

const Container = styled(Box)`
  min-height: calc(100vh - 168px);
  display: flex;
  margin-right: ${spacing.xxl}px;
  margin-left: ${spacing.xxl}px;
  margin-top: ${spacing.xxl}px;
  margin-bottom: ${spacing.lg}px;
`;

export default function Event(): JSX.Element {
  const [event, setEvent] = useState(null);
  const [hasClaim, setHasClaim] = useState(false);
  const [eventPoaps, setEventPoaps] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      // @ts-ignore
      const res = await getEvent(eventId);
      if (res) {
        setEvent(res);
        console.log('res id ', res);
        const poaps = await getEventPoaps(res.id);
        console.log('Event poaps', poaps);
        setEventPoaps(poaps.tokens);
      }
    };
    const checkClaim = async () => {
      // @ts-ignore
      const res = await canClaim(eventId);
      if (res) setHasClaim(res.links);
    };
    checkClaim();
    fetchEvent();
  }, []);

  return (
    <Container>
      {event && (
        <Box display="flex" flexDirection="column" width="100%">
          <EventCard event={event} />
          {/* @ts-ignore */}
          <EventPoaps rows={eventPoaps} hasClaim={hasClaim} />
        </Box>
      )}
    </Container>
  );
}
