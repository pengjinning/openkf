import { FC } from 'react'
import { Stack, Box, Text, ColorPicker, Input, Select, Switch } from '@/components/ui'

interface ThemeEditorProps {
  theme: string
  onChange: (theme: string) => void
}

interface ThemeConfig {
  general: {
    font: string
    background: string
    containerWidth: string
  }
  chat: {
    hostBubbles: {
      backgroundColor: string
      color: string
    }
    guestBubbles: {
      backgroundColor: string
      color: string
    }
    inputs: {
      backgroundColor: string
      color: string
      placeholderColor: string
    }
    buttons: {
      backgroundColor: string
      color: string
    }
  }
  customCss?: string
}

export const ThemeEditor: FC<ThemeEditorProps> = ({ theme, onChange }) => {
  const themeConfig: ThemeConfig = theme ? JSON.parse(theme) : getDefaultTheme()

  const handleChange = (path: string, value: any) => {
    const newConfig = { ...themeConfig }
    const keys = path.split('.')
    let current: any = newConfig
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value

    onChange(JSON.stringify(newConfig))
  }

  return (
    <Stack spacing={6}>
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          General
        </Text>
        <Stack spacing={4}>
          <Select
            label="Font Family"
            value={themeConfig.general.font}
            onChange={e => handleChange('general.font', e.target.value)}
          >
            <option value="Open Sans">Open Sans</option>
            <option value="Roboto">Roboto</option>
            <option value="Inter">Inter</option>
          </Select>

          <ColorPicker
            label="Background Color"
            value={themeConfig.general.background}
            onChange={color => handleChange('general.background', color)}
          />

          <Input
            label="Container Width"
            value={themeConfig.general.containerWidth}
            onChange={e => handleChange('general.containerWidth', e.target.value)}
            placeholder="e.g. 600px"
          />
        </Stack>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Chat Bubbles
        </Text>
        <Stack spacing={4}>
          <Box>
            <Text mb={2}>Host Bubbles</Text>
            <Stack direction="row" spacing={4}>
              <ColorPicker
                label="Background"
                value={themeConfig.chat.hostBubbles.backgroundColor}
                onChange={color => handleChange('chat.hostBubbles.backgroundColor', color)}
              />
              <ColorPicker
                label="Text Color"
                value={themeConfig.chat.hostBubbles.color}
                onChange={color => handleChange('chat.hostBubbles.color', color)}
              />
            </Stack>
          </Box>

          <Box>
            <Text mb={2}>Guest Bubbles</Text>
            <Stack direction="row" spacing={4}>
              <ColorPicker
                label="Background"
                value={themeConfig.chat.guestBubbles.backgroundColor}
                onChange={color => handleChange('chat.guestBubbles.backgroundColor', color)}
              />
              <ColorPicker
                label="Text Color"
                value={themeConfig.chat.guestBubbles.color}
                onChange={color => handleChange('chat.guestBubbles.color', color)}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Custom CSS
        </Text>
        <Input
          as="textarea"
          rows={6}
          value={themeConfig.customCss || ''}
          onChange={e => handleChange('customCss', e.target.value)}
          placeholder="Enter custom CSS..."
          fontFamily="mono"
        />
      </Box>
    </Stack>
  )
}

const getDefaultTheme = (): ThemeConfig => ({
  general: {
    font: 'Open Sans',
    background: '#ffffff',
    containerWidth: '600px'
  },
  chat: {
    hostBubbles: {
      backgroundColor: '#f7f8ff',
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
}) 