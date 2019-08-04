import * as React from "react";
import { Result as ResultInterface } from "../App";
import { Card, Flex, Image, Heading, Box } from "rebass";
import styled from "styled-components";
import { MusicLink } from "./MusicLink";
import { ReactComponent as CloseIcon } from "../svg/close.svg";
import { ReactComponent as PlayIcon } from "../svg/play.svg";
import { ReactComponent as PauseIcon } from "../svg/pause.svg";

interface ResultProps {
  result: ResultInterface | null;
  onClose: () => void;
}

const Cover = styled(Image)`
  object-fit: cover;
`;

const Close = styled(CloseIcon)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const Controls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 80px;
  width: 80px;
  pointer-events: none;
`;

const controlStyle = {
  height: 80,
  width: 80,
  fill: "#fff"
};

export const ResultCard: React.FC<ResultProps> = ({ result, onClose }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setPlaying(false);
      });
    }
  }, [audioRef.current]);

  return (
    <Card
      p={4}
      borderRadius={24}
      mx={2}
      boxShadow="small"
      bg="#fff"
      style={{ position: "relative", zIndex: 2, minHeight: 320 }}
    >
      <Close onClick={onClose} height={32} width={32} fill="#444" />
      {result && (
        <Flex flexDirection={['column', 'row']} alignItems="center">
          {result.preview && (
            <audio ref={audioRef} controls={false} src={result.preview} />
          )}
          <Box width={256} height={256} style={{ position: "relative" }} mb={[24, 0]}>
            {result.preview && (
              <Controls>
                {playing ? (
                  <PauseIcon {...controlStyle} />
                ) : (
                  <PlayIcon {...controlStyle} />
                )}
              </Controls>
            )}
            <Cover
              onClick={() => {
                if (audioRef && audioRef.current) {
                  if (!playing) {
                    audioRef.current.play();
                    setPlaying(true);
                  } else {
                    audioRef.current.pause();
                    setPlaying(false);
                  }
                }
              }}
              width={256}
              height={256}
              borderRadius={999}
              src={result.cover}
            />
          </Box>
          <Flex
            justifyContent="space-around"
            flex={1}
            flexDirection="column"
            alignItems="center"
          >
            <Flex flexDirection="column" alignItems="center">
              {result.type !== "artist" && (
                <Heading m="initial" mb={2} lineHeight={1} textAlign="center" fontSize={5} as="h1">
                  {result.title || result.album}
                </Heading>
              )}
              <Heading
                textAlign="center"
                fontSize={result.title || result.album ? 3 : 5}
                as={result.title || result.album ? "h2" : "h1"}
                color="#333"
              >
                {result.artist}
              </Heading>
              {result.type === "track" && (
                <Heading
                  textAlign="center"
                  color="#666"
                  fontWeight={500}
                  fontSize={2}
                  as="h3"
                >
                  {result.album}
                </Heading>
              )}
            </Flex>
            <Box mt={4}>
              {result.urls.map(link => (
                <MusicLink key={link} link={link} />
              ))}
            </Box>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};
