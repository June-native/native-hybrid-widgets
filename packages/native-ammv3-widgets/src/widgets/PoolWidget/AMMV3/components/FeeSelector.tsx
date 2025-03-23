import { t } from '@lingui/macro';
import { Box, Button, ButtonBase, useTheme } from '@native-ammv3/components';
import { useState } from 'react';
import { useWidgetDevice } from '../../../../hooks/style/useWidgetDevice';
import { Actions, Types } from '../reducer';
import { FeeAmount } from '../sdks/v3-sdk/constants';
import { FEE_AMOUNT_DETAIL } from './shared';

export interface FeeSelectorProps {
  disabled: boolean;
  feeAmountList?: FeeAmount[];
  feeAmount?: FeeAmount;
  dispatch: React.Dispatch<Actions>;
}

export const FeeSelector = ({
  disabled,
  feeAmount,
  feeAmountList = [FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH],
  dispatch,
}: FeeSelectorProps) => {
  const theme = useTheme();
  const { isMobile } = useWidgetDevice();

  const [active, setActive] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        px: 20,
        py: 12,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#4548511A',
        borderRadius: 12,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...(disabled
            ? {
                opacity: 0.3,
              }
            : undefined),
        }}
      >
        <Box
          sx={{
            typography: 'body1',
            color: theme.palette.text.primary,
            fontWeight: 600,
          }}
        >
          {feeAmount
            ? `${FEE_AMOUNT_DETAIL[feeAmount].label} ${t`fee tier`}`
            : t`Fee tier`}
        </Box>
        <Button
          size={Button.Size.small}
          variant={Button.Variant.second}
          disabled={disabled}
          onClick={() => setActive((prev) => !prev)}
          sx={{
            color: theme.palette.text.primary,
            typography: 'body1',
            lineHeight: '19px',
            fontWeight: 600,
            py: 4,
            px: 6,
            height: '27px',
            borderRadius: 4,
          }}
        >
          {active ? t`Less` : t`More`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M4.5 7.99988L5.5575 6.94238L9 10.3774L12.4425 6.94238L13.5 7.99988L9 12.4999L4.5 7.99988Z"
              fill="#1C241C"
            />
          </svg>
        </Button>
      </Box>

      {active && (
        <>
          <Box
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: '#E8E9E8',
            }}
          />
          <Box
            sx={{
              ...(isMobile
                ? {
                    display: 'grid',
                    gap: 8,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  }
                : {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }),
            }}
          >
            {feeAmountList.map((fee) => {
              const isSelected = feeAmount === fee;
              return (
                <ButtonBase
                  key={fee}
                  disabled={disabled}
                  onClick={() => {
                    dispatch({
                      type: Types.UpdateFeeAmount,
                      payload: fee,
                    });
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    px: 0,
                    py: 0,
                    typography: 'body1',
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  {isSelected ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="17"
                        height="17"
                        rx="8.5"
                        stroke={theme.palette.primary.main}
                      />
                      <rect
                        x="4.5"
                        y="4.5"
                        width="9"
                        height="9"
                        rx="4.5"
                        fill={theme.palette.primary.main}
                        stroke={theme.palette.primary.main}
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="17"
                        height="17"
                        rx="8.5"
                        stroke={theme.palette.text.secondary}
                      />
                    </svg>
                  )}

                  {FEE_AMOUNT_DETAIL[fee].label}
                </ButtonBase>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};
