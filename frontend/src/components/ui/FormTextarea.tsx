import { FC } from 'react'
import {
  Textarea,
  TextareaProps,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

export interface FormTextareaProps extends TextareaProps {
  label?: string
}

export const FormTextarea: FC<FormTextareaProps> = ({ label, id, ...props }) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

  return (
    <FormControl>
      {label && <FormLabel htmlFor={textareaId}>{label}</FormLabel>}
      <Textarea id={textareaId} {...props} />
    </FormControl>
  )
}