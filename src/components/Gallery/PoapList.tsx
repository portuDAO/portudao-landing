import { Grid } from "@mui/material"
import PoapListCard from "./PoapListCard"

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line react/prop-types
export default function PoapList({ poaps }) {
  return (
    <Grid container spacing={4}>
      {
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        poaps.map((poap) => (
          <Grid key={poap.id} item sm={12} md={6} lg={4} xl={2}>
            <PoapListCard poap={poap} />
          </Grid>
        ))
      }
    </Grid>
  )
}
