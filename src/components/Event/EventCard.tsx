/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Card, Typography, Rating, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import spacing from 'theme/spacing';
import { useNavigate } from 'react-router-dom';
import AvatarPlaceholder from 'icons/AvatarPlaceholder.png';
import { AiOutlineCloseCircle, AiOutlineCheck } from 'react-icons/ai';

const StyledCard = styled(Card)`
  display: flex;
  background: #f7f7f8;
  border: 1px solid #f0f0f1;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: ${spacing.md}px;
  flex-direction: column;
`;

const Container = styled(Box)`
  display: flex;
`;

// @ts-ignore
export default function NFTListCard({ event }) {
  const {
    name,
    start_date,
    end_date,
    expiry_date,
    country,
    description,
    fancy_id,
    virtual_event,
    private_event,
    image_url,
    id,
  } = event;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid key={event.id} item xs={12} sm={12} md={6} lg={6} xl={6}>
          <StyledCard>
            <Typography variant="h5">{`${name}`}</Typography>
            <Typography variant="h6">{`${description}`}</Typography>
            <img src={image_url} alt="" style={{ maxWidth: '350px', borderRadius: '12px' }} />
          </StyledCard>
        </Grid>
        <Grid key={event.fancy_id} item xs={12} sm={12} md={6} lg={6} xl={6}>
          <StyledCard>
            <Typography variant="h5">{`${country}`}</Typography>
            <Typography variant="h5">{`Start Date: ${start_date}`}</Typography>
            <Typography variant="h5">{`End Date: ${end_date}`}</Typography>
            <Typography variant="h5">{`Expiry Date: ${expiry_date}`}</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">Virtual Event</Typography>
              <AiOutlineCheck />
            </Box>
            <Box display="flex" justify-content="space-between" alignItems="center">
              <Typography variant="h5" style={{ color: 'black' }}>
                Private Event
              </Typography>
              <AiOutlineCloseCircle />
            </Box>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
}
