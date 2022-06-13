/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, Card, Typography, Rating } from "@mui/material"
import { styled } from "@mui/material/styles"
import spacing from "theme/spacing"
import { useNavigate } from "react-router-dom"
import AvatarPlaceholder from "icons/AvatarPlaceholder.png"

const StyledCard = styled(Card)`
  background: #f7f7f8;
  border: 1px solid #f0f0f1;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: ${spacing.md}px;
  min-height: 230px;
`

const StyledImg = styled("img")({
  maxWidth: "100%",
})

// @ts-ignore
export default function PoapListCard({ poap }) {
  const { event, supply } = poap

  const navigate = useNavigate()

  const goToEvent = () => navigate(`/event/${event.id}`)

  return (
    <StyledCard
      onClick={() => {
        goToEvent()
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{`Supply ${supply.total}`}</Typography>
          <Typography variant="h6">{`#${supply.order}`}</Typography>
        </Box>

        {event.image_url ? (
          <StyledImg src={event.image_url} alt="" />
        ) : (
          <StyledImg src={AvatarPlaceholder} alt="" />
        )}
        <Typography variant="h6">{event.name}</Typography>
      </Box>
    </StyledCard>
  )
}
