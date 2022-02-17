import { Grid } from '@mui/material';
import NFTListCard from './NFTListCard';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line react/prop-types
export default function NFTList({ events }) {
  return (
    <Grid container spacing={4}>
      {
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        events.map((event) => (
          <Grid key={event.fancy_id} item sm={12} md={6} lg={4} xl={4}>
            <NFTListCard event={event} />
          </Grid>
        ))
      }
    </Grid>
  );
}
