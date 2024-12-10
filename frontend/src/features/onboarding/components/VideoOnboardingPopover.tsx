import { useRef } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
} from '@chakra-ui/react';
import { YoutubeIframe } from './YoutubeIframe';
import { PlayIcon } from '@/components/icons';

interface VideoOnboardingPopoverProps {
  videoId: string;
  title: string;
}

export const VideoOnboardingPopover = ({
  videoId,
  title,
}: VideoOnboardingPopoverProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <IconButton
          ref={buttonRef}
          icon={<PlayIcon />}
          aria-label="Play video"
          size="sm"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody p={0} h="200px">
          <YoutubeIframe videoId={videoId} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}; 
