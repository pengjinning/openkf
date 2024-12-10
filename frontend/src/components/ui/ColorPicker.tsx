import { FC } from 'react'
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'

interface ColorPickerProps {
  label?: string
  value: string
  onChange: (color: string) => void
  'aria-label'?: string
}

export const ColorPicker: FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  'aria-label': ariaLabel
}) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Box position="relative">
        <Input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={ariaLabel || label}
          height="40px"
          padding={2}
          cursor="pointer"
        />
      </Box>
    </FormControl>
  )
} 