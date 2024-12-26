export * from '@chakra-ui/react'
export { FormInput as Input } from './FormInput'
export { FormSwitch as Switch } from './FormSwitch'
export { FormTextarea as Textarea } from './FormTextarea'
export { Select } from './Select'

// Dialog 相关组件的别名导出
export { 
  Modal as Dialog,
  ModalOverlay as DialogOverlay,
  ModalContent as DialogContent,
  ModalHeader as DialogHeader,
  ModalHeader as DialogTitle,
  ModalBody as DialogBody,
  ModalFooter as DialogFooter,
  ModalCloseButton as DialogCloseButton
} from '@chakra-ui/react'

// 类型导出
export type { 
  ModalProps as DialogProps,
  ModalHeaderProps as DialogHeaderProps 
} from '@chakra-ui/react'

// 自定义组件
export { ColorPicker } from './ColorPicker' 