import { FC } from 'react'
import { Stack, Input, ColorPicker, Select } from '@/components/ui'
import { BotTheme, ThemePath } from '@/types/bot'

interface BotThemeFormProps {
  theme: BotTheme
  onChange: (theme: BotTheme) => void
}

export const BotThemeForm: FC<BotThemeFormProps> = ({ theme, onChange }) => {
  const handleChange = (path: ThemePath, value: string) => {
    const newTheme = { ...theme }
    let current = newTheme as any
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }
    current[path[path.length - 1]] = value
    
    onChange(newTheme)
  }

  return (
    <Stack spacing={6}>
      <Stack spacing={4}>
        <Select
          label="Font Family"
          value={theme.general.font}
          onChange={e => handleChange(['general', 'font'], e.target.value)}
          aria-label="Select font family"
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
        </Select>

        <ColorPicker
          label="Background Color"
          value={theme.general.background}
          onChange={color => handleChange(['general', 'background'], color)}
          aria-label="Select background color"
        />

        <Input
          label="Container Width"
          value={theme.general.containerWidth}
          onChange={e => handleChange(['general', 'containerWidth'], e.target.value)}
          placeholder="e.g., 600px"
          aria-label="Container width"
        />
      </Stack>

      <Stack spacing={4}>
        <ColorPicker
          label="Host Bubble Background"
          value={theme.chat.hostBubbles.backgroundColor}
          onChange={color => handleChange(['chat', 'hostBubbles', 'backgroundColor'], color)}
          aria-label="Host bubble background color"
        />

        <ColorPicker
          label="Host Bubble Text"
          value={theme.chat.hostBubbles.color}
          onChange={color => handleChange(['chat', 'hostBubbles', 'color'], color)}
          aria-label="Host bubble text color"
        />

        <ColorPicker
          label="Guest Bubble Background"
          value={theme.chat.guestBubbles.backgroundColor}
          onChange={color => handleChange(['chat', 'guestBubbles', 'backgroundColor'], color)}
          aria-label="Guest bubble background color"
        />

        <ColorPicker
          label="Guest Bubble Text"
          value={theme.chat.guestBubbles.color}
          onChange={color => handleChange(['chat', 'guestBubbles', 'color'], color)}
          aria-label="Guest bubble text color"
        />
      </Stack>

      <Textarea
        label="Custom CSS"
        value={theme.customCss || ''}
        onChange={e => handleChange(['customCss'], e.target.value)}
        placeholder="Enter custom CSS..."
        rows={6}
        fontFamily="mono"
        aria-label="Custom CSS"
      />
    </Stack>
  )
}

const defaultTheme: BotTheme = {
  general: {
    font: 'Inter',
    background: '#ffffff',
    containerWidth: '600px'
  },
  chat: {
    hostBubbles: {
      backgroundColor: '#f7f7f7',
      color: '#303235'
    },
    guestBubbles: {
      backgroundColor: '#ff8e21',
      color: '#ffffff'
    },
    inputs: {
      backgroundColor: '#ffffff',
      color: '#303235',
      placeholderColor: '#9095a0'
    },
    buttons: {
      backgroundColor: '#0042da',
      color: '#ffffff'
    }
  }
} 