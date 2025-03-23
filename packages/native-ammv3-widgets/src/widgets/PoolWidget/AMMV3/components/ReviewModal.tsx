import { Box, Button } from '@native-ammv3/components';
import { t } from '@lingui/macro';
import Dialog from '../../../../components/Dialog';
import { useWidgetDevice } from '../../../../hooks/style/useWidgetDevice';
import { Currency, CurrencyAmount, Price } from '../sdks/sdk-core';
import { Position } from '../sdks/v3-sdk';
import { Bound, Field } from '../types';
import { PositionPreview } from './PositionPreview';

export interface ReviewModalProps {
  position?: Position;
  existingPosition?: Position;
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> };
  priceLower?: Price<Currency, Currency>;
  priceUpper?: Price<Currency, Currency>;
  outOfRange: boolean;
  ticksAtLimit: { [bound in Bound]?: boolean | undefined };
  on: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const ReviewModal = ({
  on,
  onClose,
  position,
  outOfRange,
  ticksAtLimit,
  onConfirm,
  loading,
}: ReviewModalProps) => {
  const { isMobile } = useWidgetDevice();

  return (
    <Dialog
      open={on}
      onClose={onClose}
      modal
      title={t`Confirm  Add Liquidity`}
      height={72 + 449}
    >
      <Box
        sx={{
          flex: 1,
          px: 20,
          pb: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 28,
          width: isMobile ? undefined : 560,
        }}
      >
        <Box
          sx={{
            pt: 0,
            px: 0,
          }}
        >
          {position ? (
            <PositionPreview
              position={position}
              inRange={!outOfRange}
              ticksAtLimit={ticksAtLimit}
              title={t`Selected Range`}
            />
          ) : null}
        </Box>

        <Button fullWidth isLoading={loading} onClick={onConfirm}>
          {t`Confirm`}
        </Button>
      </Box>
    </Dialog>
  );
};
