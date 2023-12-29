import { CircularProgress,Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';


const LoadingMessage = (props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                   {/* {`${Math.round(props.value)}%`} */}
                    <CircularProgress variant='indeterminate' color='warning' value={100} />
                </Typography>
            </Box>
        </Box>
    );
}
export default LoadingMessage;
