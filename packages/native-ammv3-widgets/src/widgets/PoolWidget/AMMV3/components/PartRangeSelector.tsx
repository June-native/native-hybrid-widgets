import { t } from '@lingui/macro';
import { Box, BoxProps, Button } from '@native-ammv3/components';
import { FeeAmount } from '../sdks/v3-sdk/constants';
import { FEE_AMOUNT_DETAIL } from './shared';

export interface PartRangeSelectorProps {
  feeAmount: FeeAmount;
  handleSetFullRange: (part: number) => void;
}

export const PartRangeSelector = ({
  feeAmount,
  handleSetFullRange,
}: PartRangeSelectorProps) => {
  const commonSx: BoxProps['sx'] = {
    py: 4,
    px: 12,
    height: 26,
    typography: 'h6',
    fontWeight: 600,
    borderColor: '#1C241C1A',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '25%',
  };

  const partPriceRangeList = FEE_AMOUNT_DETAIL[feeAmount].partPriceRangeList;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
      }}
    >
      {partPriceRangeList.map(({ label, value }, index) => (
        <Button
          key={index}
          size={Button.Size.small}
          variant={Button.Variant.outlined}
          onClick={() => handleSetFullRange(value)}
          sx={commonSx}
        >
          {label}
        </Button>
      ))}

      <Button
        size={Button.Size.small}
        variant={Button.Variant.outlined}
        onClick={() => handleSetFullRange(1)}
        sx={{ ...commonSx, flexBasis: '50%' }}
      >{t`Full range`}</Button>
    </Box>
  );
};
