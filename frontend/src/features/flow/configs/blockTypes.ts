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

interface BlockTypeConfig {
  type: BlockType
  label: string
  icon: typeof ChatIcon
  category: 'bubbles' | 'inputs' | 'logic'
}

export const blockTypeConfigs: BlockTypeConfig[] = [
  // Bubbles
  {
    type: 'text',
    label: 'Text',
    icon: ChatIcon,
    category: 'bubbles',
  },
  {
    type: 'image',
    label: 'Image',
    icon: ViewIcon,
    category: 'bubbles',
  },
  {
    type: 'video',
    label: 'Video',
    icon: ViewOffIcon,
    category: 'bubbles',
  },

  // Inputs
  {
    type: 'email',
    label: 'Email',
    icon: EmailIcon,
    category: 'inputs',
  },
  {
    type: 'phone',
    label: 'Phone',
    icon: PhoneIcon,
    category: 'inputs',
  },
  {
    type: 'date',
    label: 'Date',
    icon: CalendarIcon,
    category: 'inputs',
  },
  {
    type: 'choice',
    label: 'Choice',
    icon: CheckIcon,
    category: 'inputs',
  },
  {
    type: 'file',
    label: 'File',
    icon: AttachmentIcon,
    category: 'inputs',
  },
  {
    type: 'payment',
    label: 'Payment',
    icon: LockIcon,
    category: 'inputs',
  },
  {
    type: 'rating',
    label: 'Rating',
    icon: StarIcon,
    category: 'inputs',
  },

  // Logic
  {
    type: 'set_variable',
    label: 'Set Variable',
    icon: SettingsIcon,
    category: 'logic',
  },
  {
    type: 'condition',
    label: 'Condition',
    icon: RepeatIcon,
    category: 'logic',
  },
  {
    type: 'redirect',
    label: 'Redirect',
    icon: ExternalLinkIcon,
    category: 'logic',
  },
  {
    type: 'script',
    label: 'Script',
    icon: EditIcon,
    category: 'logic',
  },
] 