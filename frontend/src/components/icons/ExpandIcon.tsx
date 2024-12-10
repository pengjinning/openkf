import { Icon, IconProps } from '@chakra-ui/react'

export const ExpandIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M4 20h16v-2H4v2zm0-6h16v-2H4v2zm0-8v2h16V6H4zm0-4h16V0H4v2z"
    />
  </Icon>
)

export default ExpandIcon 