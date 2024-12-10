interface YoutubeIframeProps {
  videoId: string;
}

export const YoutubeIframe = ({ videoId }: YoutubeIframeProps) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}; 
