import { alpha, Box, BoxProps, useTheme } from '@native-ammv3/components';
import { t } from '@lingui/macro';

export interface AMMV3Props {
  sx?: BoxProps['sx'];
}

export const AMMV3 = ({ sx }: AMMV3Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 4,
        px: 8,
        color: theme.palette.primary.main,
        borderRadius: 4,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        typography: 'h6',
        ...sx,
      }}
    >{t`AMM V3`}</Box>
  );
};
