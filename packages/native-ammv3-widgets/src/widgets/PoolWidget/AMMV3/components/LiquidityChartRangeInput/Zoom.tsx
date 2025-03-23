import { Box, ButtonBase } from '@native-ammv3/components';
import {
  ScaleLinear,
  select,
  zoom,
  ZoomBehavior,
  zoomIdentity,
  ZoomTransform,
} from 'd3';
import { useEffect, useMemo, useRef } from 'react';
import { ZoomLevels } from './types';

export default function Zoom({
  svg,
  xScale,
  setZoom,
  width,
  height,
  resetBrush,
  showResetButton,
  zoomLevels,
}: {
  svg: SVGElement | null;
  xScale: ScaleLinear<number, number>;
  setZoom: (transform: ZoomTransform) => void;
  width: number;
  height: number;
  resetBrush: () => void;
  showResetButton: boolean;
  zoomLevels: ZoomLevels;
}) {
  const zoomBehavior = useRef<ZoomBehavior<Element, unknown>>();

  const [zoomIn, zoomOut, zoomInitial, zoomReset] = useMemo(
    () => [
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .transition()
          .call(zoomBehavior.current.scaleBy, 2),
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .transition()
          .call(zoomBehavior.current.scaleBy, 0.5),
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .transition()
          .call(zoomBehavior.current.scaleTo, 0.5),
      () =>
        svg &&
        zoomBehavior.current &&
        select(svg as Element)
          .call(
            zoomBehavior.current.transform,
            zoomIdentity.translate(0, 0).scale(1),
          )
          .transition()
          .call(zoomBehavior.current.scaleTo, 0.5),
    ],
    [svg],
  );

  useEffect(() => {
    if (!svg) {
      return;
    }

    zoomBehavior.current = zoom()
      .scaleExtent([zoomLevels.min, zoomLevels.max])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', ({ transform }: { transform: ZoomTransform }) =>
        setZoom(transform),
      );

    select(svg as Element).call(zoomBehavior.current);
  }, [
    height,
    width,
    setZoom,
    svg,
    xScale,
    zoomBehavior,
    zoomLevels,
    zoomLevels.max,
    zoomLevels.min,
  ]);

  useEffect(() => {
    // reset zoom to initial on zoomLevel change
    zoomInitial();
  }, [zoomInitial, zoomLevels]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Box
        sx={{
          mr: 'auto',
          typography: 'h6',
          fontWeight: 500,
        }}
      >
        Per
      </Box>
      {showResetButton && (
        <ButtonBase
          onClick={() => {
            resetBrush();
            zoomReset();
          }}
          disabled={false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
        </ButtonBase>
      )}
      <ButtonBase onClick={zoomIn} disabled={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="11.5"
            stroke="#454851"
            stroke-opacity="0.1"
          />
          <mask id="path-2-inside-1_63_1439" fill="white">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.25 12.5V15.75H12.75V12.5H16V11H12.75V7.75H11.25V11H8V12.5H11.25Z"
            />
          </mask>
          <path
            d="M11.25 15.75H10.25V16.75H11.25V15.75ZM11.25 12.5H12.25V11.5H11.25V12.5ZM12.75 15.75V16.75H13.75V15.75H12.75ZM12.75 12.5V11.5H11.75V12.5H12.75ZM16 12.5V13.5H17V12.5H16ZM16 11H17V10H16V11ZM12.75 11H11.75V12H12.75V11ZM12.75 7.75H13.75V6.75H12.75V7.75ZM11.25 7.75V6.75H10.25V7.75H11.25ZM11.25 11V12H12.25V11H11.25ZM8 11V10H7V11H8ZM8 12.5H7V13.5H8V12.5ZM12.25 15.75V12.5H10.25V15.75H12.25ZM12.75 14.75H11.25V16.75H12.75V14.75ZM11.75 12.5V15.75H13.75V12.5H11.75ZM16 11.5H12.75V13.5H16V11.5ZM15 11V12.5H17V11H15ZM12.75 12H16V10H12.75V12ZM11.75 7.75V11H13.75V7.75H11.75ZM11.25 8.75H12.75V6.75H11.25V8.75ZM12.25 11V7.75H10.25V11H12.25ZM8 12H11.25V10H8V12ZM9 12.5V11H7V12.5H9ZM11.25 11.5H8V13.5H11.25V11.5Z"
            fill="#1A1A1B"
            fill-opacity="0.5"
            mask="url(#path-2-inside-1_63_1439)"
          />
        </svg>
      </ButtonBase>
      <ButtonBase onClick={zoomOut} disabled={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="11.5"
            stroke="#454851"
            stroke-opacity="0.1"
          />
          <rect
            x="8.375"
            y="11.375"
            width="7.25"
            height="0.75"
            stroke="#1A1A1B"
            stroke-opacity="0.5"
            stroke-width="0.75"
          />
        </svg>
      </ButtonBase>
    </Box>
  );
}
