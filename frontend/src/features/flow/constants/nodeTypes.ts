import { TextBlock } from '../components/nodes/TextBlock'
import { InputBlock } from '../components/nodes/InputBlock'
import { ButtonBlock } from '../components/nodes/ButtonBlock'
import { WebhookBlock } from '../components/nodes/WebhookBlock'
import { ApiBlock } from '../components/nodes/ApiBlock'
import { ConditionBlock } from '../components/nodes/ConditionBlock'
import { ScriptBlock } from '../components/nodes/ScriptBlock'
import { IntegrationBlock } from '../components/nodes/IntegrationBlock'
import { LogicBlock } from '../components/nodes/LogicBlock'
import { StartBlock } from '../components/nodes/StartBlock'
import { EndBlock } from '../components/nodes/EndBlock'
import { GroupBlock } from '../components/nodes/GroupBlock'
import { CommentBlock } from '../components/nodes/CommentBlock'
import { NodeType } from '@/types/nodes'

export const nodeTypes = {
  [NodeType.TEXT]: TextBlock,
  [NodeType.INPUT]: InputBlock,
  [NodeType.BUTTON]: ButtonBlock,
  [NodeType.WEBHOOK]: WebhookBlock,
  [NodeType.API]: ApiBlock,
  [NodeType.CONDITION]: ConditionBlock,
  [NodeType.SCRIPT]: ScriptBlock,
  [NodeType.INTEGRATION]: IntegrationBlock,
  [NodeType.LOGIC]: LogicBlock,
  start: StartBlock,
  end: EndBlock,
  group: GroupBlock,
  comment: CommentBlock
}

export const nodeConfig = {
  [NodeType.TEXT]: {
    label: 'Text',
    description: 'Send a text message',
    color: 'blue'
  },
  [NodeType.INPUT]: {
    label: 'Input',
    description: 'Ask for user input',
    color: 'green'
  },
  [NodeType.BUTTON]: {
    label: 'Buttons',
    description: 'Show clickable buttons',
    color: 'purple'
  },
  [NodeType.WEBHOOK]: {
    label: 'Webhook',
    description: 'Call external webhook',
    color: 'orange'
  },
  [NodeType.API]: {
    label: 'API',
    description: 'Make API requests',
    color: 'red'
  },
  [NodeType.CONDITION]: {
    label: 'Condition',
    description: 'Add conditional logic',
    color: 'yellow'
  },
  [NodeType.SCRIPT]: {
    label: 'Script',
    description: 'Run custom code',
    color: 'gray'
  },
  [NodeType.INTEGRATION]: {
    label: 'Integration',
    description: 'Connect to services',
    color: 'cyan'
  },
  [NodeType.LOGIC]: {
    label: 'Logic',
    description: 'Advanced logic control',
    color: 'pink'
  },
  start: {
    label: 'Start',
    description: 'Flow starting point',
    color: 'green',
    allowsChildren: false,
    allowsParents: false
  },
  end: {
    label: 'End',
    description: 'Flow ending point',
    color: 'red',
    allowsChildren: false,
    allowsParents: true
  },
  group: {
    label: 'Group',
    description: 'Group of blocks',
    color: 'purple',
    allowsChildren: true,
    allowsParents: true
  },
  comment: {
    label: 'Comment',
    description: 'Add notes',
    color: 'gray'
  }
} 