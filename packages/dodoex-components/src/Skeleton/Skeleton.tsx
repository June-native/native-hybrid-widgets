// source for https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Skeleton/Skeleton.js
import * as React from 'react';
import { keyframes, alpha, useTheme } from '@mui/system';
import { Box, BoxProps } from '../Box';

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;

const Skeleton = React.forwardRef(function Skeleton(
  props: BoxProps & {
    component: BoxProps['component'];
    variant?: 'circular' | 'rounded';
    width?: number | string;
    height?: number | string;
  },
  ref,
) {
  const {
    sx,
    variant: variantProps,
    width,
    height: heightProps,
    ...other
  } = props;
  const variant = variantProps || 'rounded';
  const height =
    variant === 'circular' ? heightProps ?? width : heightProps ?? '1.2rem';
  const borderRadius = variant === 'circular' ? '50%' : 4;
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      {...other}
      sx={{
        width,
        height,
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === 'light' ? 0.11 : 0.13,
        ),
        borderRadius,
        animation: '${pulseKeyframe} 2s ease-in-out 0.5s infinite',
        ...sx,
      }}
    />
  );
});

export default Skeleton;
