/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { DatePicker, cn } from '@heroui/react';
import { ZonedDateTime } from '@internationalized/date';

export interface DateInputProps {
  className?: string;

  /** Label */
  label?: string;

  /** Value handling */
  value?: ZonedDateTime;
  defaultValue?: ZonedDateTime;

  /** UI */
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  labelPlacement?: 'inside' | 'outside' | 'outside-left';
  hideTimeZone?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;

  /** Events */
  onChange?: (value: ZonedDateTime | null) => void;
}

const DateInput = React.memo(
  React.forwardRef<HTMLDivElement, DateInputProps>(
    (
      {
        className,
        label = 'Event Date',
        value,
        defaultValue,
        size = 'md',
        radius = 'md',
        hideTimeZone = true,
        isDisabled = false,
        isRequired = true,
        isInvalid = false,
        labelPlacement = 'inside',
        onChange,
        ...rest
      },
      ref
    ) => {
      return (
        <div ref={ref} className={cn('w-full max-w-md', className)}>
          <DatePicker
            label={label}
            value={value}
            defaultValue={defaultValue}
            hideTimeZone={hideTimeZone}
            showMonthAndYearPickers
            isDisabled={isDisabled}
            isRequired={isRequired}
            isInvalid={isInvalid}
            size={size}
            radius={radius}
            variant="faded"
            labelPlacement={labelPlacement}
            onChange={(val) => onChange?.(val)}
            className={cn('shadow-md rounded-xl', className)}
            classNames={{
              label: 'font-semibold',
              inputWrapper: 'bg-white rounded-xl',
              timeInput: 'bg-primary-200 p-3',
              calendarContent: 'bg-primary-200 font-semibold',                 
            }}
            {...rest}
          />
        </div>
      );
    }
  )
);

DateInput.displayName = 'DateInput';
export { DateInput };
