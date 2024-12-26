import { FC } from 'react'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  Icon,
  Text,
  Stack,
} from '@chakra-ui/react'
import { blockTypeConfigs } from '../configs/blockTypes'

export const FlowSidebar: FC = () => {
  const categories = {
    bubbles: blockTypeConfigs.filter(b => b.category === 'bubbles'),
    inputs: blockTypeConfigs.filter(b => b.category === 'inputs'),
    logic: blockTypeConfigs.filter(b => b.category === 'logic'),
  }

  return (
    <Box w="280px" h="full" borderRightWidth={1} bg="white">
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem>
          <AccordionButton py={2}>
            <Text fontWeight="medium">Bubbles</Text>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack spacing={1}>
              {categories.bubbles.map(({ type, label, icon }) => (
                <Button
                  key={type}
                  leftIcon={<Icon as={icon} />}
                  variant="ghost"
                  justifyContent="flex-start"
                  size="sm"
                  w="full"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('blockType', type)
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton py={2}>
            <Text fontWeight="medium">Inputs</Text>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack spacing={1}>
              {categories.inputs.map(({ type, label, icon }) => (
                <Button
                  key={type}
                  leftIcon={<Icon as={icon} />}
                  variant="ghost"
                  justifyContent="flex-start"
                  size="sm"
                  w="full"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('blockType', type)
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton py={2}>
            <Text fontWeight="medium">Logic</Text>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack spacing={1}>
              {categories.logic.map(({ type, label, icon }) => (
                <Button
                  key={type}
                  leftIcon={<Icon as={icon} />}
                  variant="ghost"
                  justifyContent="flex-start"
                  size="sm"
                  w="full"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('blockType', type)
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}