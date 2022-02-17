import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getEvent } from 'api/poap';
import styled from 'styled-components';
import EventCard from 'components/Event/EventCard';

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Event(): JSX.Element {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      // @ts-ignore
      const res = await getEvent(eventId);
      if (res) {
        setEvent(res);
      }
    };
    fetchEvent();
  }, []);

  return <Container>{event && <EventCard event={event} />}</Container>;
}
