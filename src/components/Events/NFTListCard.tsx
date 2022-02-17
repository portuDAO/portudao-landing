/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Card, Typography, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import spacing from 'theme/spacing';
import { useNavigate } from 'react-router-dom';
import AvatarPlaceholder from 'icons/AvatarPlaceholder.png';

const StyledCard = styled(Card)`
  background: #f7f7f8;
  border: 1px solid #f0f0f1;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: ${spacing.md}px;
`;

const StyledImg = styled('img')({
  top: 0,
  right: 0,
  width: 'auto',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// @ts-ignore
export default function NFTListCard({ event }) {
  const { id, name, start_date, image_url } = event;

  const navigate = useNavigate();

  const goToNFTView = () => navigate(`/portudao-landing/event/${id}`);

  return (
    <StyledCard
      onClick={() => {
        goToNFTView();
      }}
    >
      <Box sx={{ position: 'relative', height: '100px' }}>
        <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
          <Typography variant="h6">{`${name}`}</Typography>
          {/* @ts-ignore */}
          <Box display="flex" flexDirection="column">
            <Typography variant="body1">{`Start date: ${start_date}`}</Typography>
          </Box>
        </Box>
        {image_url ? (
          <StyledImg src={image_url} alt="" />
        ) : (
          <StyledImg src={AvatarPlaceholder} alt="" />
        )}
      </Box>
    </StyledCard>
  );
}
