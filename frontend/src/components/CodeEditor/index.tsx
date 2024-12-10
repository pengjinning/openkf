import { FC } from 'react'
import Editor from '@monaco-editor/react'
import { Box, Text } from '@/components/ui'

interface CodeEditorProps {
  label?: string
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  minHeight?: string
}

export const CodeEditor: FC<CodeEditorProps> = ({
  label,
  value,
  onChange,
  language = 'javascript',
  placeholder,
  minHeight = '200px'
}) => {
  return (
    <Box>
      {label && (
        <Text mb={2} fontWeight="medium">
          {label}
        </Text>
      )}
      <Box
        borderWidth={1}
        borderRadius="md"
        overflow="hidden"
        minHeight={minHeight}
      >
        <Editor
          value={value}
          onChange={value => onChange(value || '')}
          language={language}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            wrappingStrategy: 'advanced',
            lineNumbers: 'on',
            automaticLayout: true,
            tabSize: 2,
            fontSize: 14
          }}
        />
      </Box>
    </Box>
  )
} 