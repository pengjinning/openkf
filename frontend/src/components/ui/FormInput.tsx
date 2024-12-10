import { FC } from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

export interface FormInputProps extends ChakraInputProps {
  label?: string
}

export const FormInput: FC<FormInputProps> = ({ label, id, ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <FormControl>
      {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}
      <ChakraInput id={inputId} {...props} />
    </FormControl>
  )
} 