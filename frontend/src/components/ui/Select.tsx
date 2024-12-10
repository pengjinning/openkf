import { FC, forwardRef } from 'react'
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

export interface SelectProps extends ChakraSelectProps {
  label?: string
  title?: string
  'aria-labelledby'?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, placeholder = '请选择', ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

    return (
      <FormControl>
        {label && <FormLabel htmlFor={selectId}>{label}</FormLabel>}
        <ChakraSelect
          ref={ref}
          id={selectId}
          aria-label={label || placeholder}
          title={label || placeholder}
          {...props}
        />
      </FormControl>
    )
  }
)

Select.displayName = 'Select'

export default Select 