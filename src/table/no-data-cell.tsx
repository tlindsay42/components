// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useRef } from 'react';
import InternalStatusIndicator from '../status-indicator/internal';
import { supportsStickyPosition } from '../internal/utils/dom';
import styles from './styles.css.js';
import LiveRegion from '../internal/components/live-region';
import { useResizeObserver } from '@cloudscape-design/component-toolkit/internal';

interface NoDataCellProps {
  totalColumnsCount: number;
  hasFooter: boolean;
  loading?: boolean;
  loadingText?: string;
  empty?: React.ReactNode;
  tableRef: React.RefObject<HTMLTableElement>;
  containerRef: React.RefObject<HTMLElement>;
}

export function NoDataCell({
  totalColumnsCount,
  hasFooter,
  loading,
  loadingText,
  empty,
  tableRef,
  containerRef,
}: NoDataCellProps) {
  const cellContentRef = useRef<HTMLDivElement>(null);

  useResizeObserver(containerRef, ({ contentBoxWidth: containerWidth }) => {
    if (tableRef.current && cellContentRef.current && supportsStickyPosition()) {
      const tablePaddingLeft = parseFloat(getComputedStyle(tableRef.current).paddingLeft) || 0;
      const tablePaddingRight = parseFloat(getComputedStyle(tableRef.current).paddingRight) || 0;
      const contentWidth = containerWidth + tablePaddingLeft + tablePaddingRight;
      cellContentRef.current.style.width = Math.floor(contentWidth) + 'px';
    }
  });

  return (
    <td colSpan={totalColumnsCount} className={clsx(styles['cell-merged'], hasFooter && styles['has-footer'])}>
      <div ref={cellContentRef} className={styles['cell-merged-content']}>
        {loading ? (
          <InternalStatusIndicator type="loading" className={styles.loading} wrapText={true}>
            <LiveRegion visible={true}>{loadingText}</LiveRegion>
          </InternalStatusIndicator>
        ) : (
          <div className={styles.empty}>{empty}</div>
        )}
      </div>
    </td>
  );
}
