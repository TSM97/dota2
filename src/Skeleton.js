import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Skeli(){
  return (<Stack spacing={1}>
        <Skeleton variant="rectangular" width={1500} height={60} />
        <Skeleton variant="rectangular" width={1500} height={60} />
        <Skeleton variant="rectangular" width={1500} height={60} />
        </Stack>)
}

export default Skeli