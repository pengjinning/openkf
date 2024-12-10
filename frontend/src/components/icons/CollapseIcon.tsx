import { Icon, IconProps } from '@chakra-ui/react'

export const CollapseIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M4 20h16v-2H4v2zm0-6h16v-2H4v2zm0-8v2h16V6H4z"
    />
  </Icon>
)

export default CollapseIcon 