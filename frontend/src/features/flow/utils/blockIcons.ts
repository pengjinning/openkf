import { BlockType } from '@/types/flow'
import {
  ChatIcon,
  AttachmentIcon,
  EmailIcon,
  PhoneIcon,
  CalendarIcon,
  CheckIcon,
  StarIcon,
  SettingsIcon,
  RepeatIcon,
  ExternalLinkIcon,
  ViewIcon,
  ViewOffIcon,
  LockIcon,
  EditIcon,
} from '@chakra-ui/icons'

export const getBlockIcon = (type: BlockType) => {
  switch (type) {
    case 'text':
      return ChatIcon
    case 'image':
      return ViewIcon
    case 'video':
      return ViewOffIcon
    case 'email':
      return EmailIcon
    case 'phone':
      return PhoneIcon
    case 'date':
      return CalendarIcon
    case 'choice':
      return CheckIcon
    case 'file':
      return AttachmentIcon
    case 'payment':
      return LockIcon
    case 'rating':
      return StarIcon
    case 'set_variable':
      return SettingsIcon
    case 'condition':
      return RepeatIcon
    case 'redirect':
      return ExternalLinkIcon
    case 'script':
      return EditIcon
    default:
      return ChatIcon
  }
} 