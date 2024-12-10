import { FC } from 'react'
import {
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

export interface FormSwitchProps extends ChakraSwitchProps {
  label?: string
}

export const FormSwitch: FC<FormSwitchProps> = ({ label, id, ...props }) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

  return (
    <FormControl display="flex" alignItems="center">
      {label && <FormLabel htmlFor={switchId} mb="0">{label}</FormLabel>}
      <ChakraSwitch id={switchId} {...props} />
    </FormControl>
  )
} 