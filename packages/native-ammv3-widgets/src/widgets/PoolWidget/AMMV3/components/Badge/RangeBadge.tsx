import {
  alpha,
  Box,
  BoxProps,
  Tooltip,
  useTheme,
} from '@native-ammv3/components';
import { t } from '@lingui/macro';

export default function RangeBadge({
  removed,
  inRange,
}: {
  removed?: boolean;
  inRange?: boolean;
}) {
  const theme = useTheme();

  const sx: BoxProps['sx'] = {
    py: 2,
    px: 2,
    color: '#48D1A5',
    borderRadius: 4,
    backgroundColor: '#2FBA901A',
    typography: 'h6',
    lineHeight: '15px',
  };

  return removed ? (
    <Tooltip title={t`Your position has 0 liquidity, and is not earning fees.`}>
      <Box
        sx={{
          ...sx,
          color: theme.palette.warning.main,
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
        }}
      >{t`Closed`}</Box>
    </Tooltip>
  ) : inRange ? (
    <Tooltip
      title={t`The price of this pool is within your selected range. Your position is currently earning fees.`}
    >
      <Box sx={sx}>{t`In range`}</Box>
    </Tooltip>
  ) : (
    <Tooltip
      title={t`The price of this pool is outside of your selected range. Your position is not currently earning fees.`}
    >
      <Box
        sx={{
          ...sx,
          color: theme.palette.error.main,
          backgroundColor: alpha(theme.palette.error.main, 0.1),
        }}
      >{t`Out of range`}</Box>
    </Tooltip>
  );
}
