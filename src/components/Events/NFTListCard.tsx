/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Card, Typography, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import spacing from 'theme/spacing';
import { useNavigate } from 'react-router-dom';
import AvatarPlaceholder from 'icons/AvatarPlaceholder.png';

const StyledTypography = styled(Typography)`
  width: '50%';
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  hover {
    overflow: visible;
  }
`;

const StyledCard = styled(Card)`
  background: #f7f7f8;
  border: 1px solid #f0f0f1;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: ${spacing.md}px;
  height: 120px;
  display: flex;
`;

const StyledImg = styled('img')({
  width: '50%',
});

// @ts-ignore
export default function NFTListCard({ event }) {
  const { id, name, start_date, image_url } = event;

  const navigate = useNavigate();

  const goToNFTView = () => navigate(`/event/${id}`);

  return (
    <StyledCard
      onClick={() => {
        goToNFTView();
      }}
    >
      <Box display="flex">
        <Box display="flex" flexDirection="column" justifyContent="space-between" width="50%">
          <StyledTypography variant="h6">{`${name}`}</StyledTypography>

          <StyledTypography variant="body1">{`${start_date}`}</StyledTypography>
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
