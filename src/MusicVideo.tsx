import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  Video,
  staticFile,
  useCurrentFrame,
} from "remotion";

const SCENES = 8;
const FADE_FRAMES = 20;

const SceneClip: React.FC<{ src: string; durationInFrames: number }> = ({
  src,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden" }}>
      <Video
        src={src}
        style={{
          width: "100%",
          height: "100%",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          objectFit: "cover" as any,
        }}
        loop
      />
    </AbsoluteFill>
  );
};

export const MusicVideoComp: React.FC<{ totalFrames: number }> = ({
  totalFrames,
}) => {
  const framesPerScene = Math.floor(totalFrames / SCENES);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Audio src={staticFile("demo-track.mp3")} />
      {Array.from({ length: SCENES }, (_, i) => {
        const from = i * framesPerScene;
        const duration =
          i < SCENES - 1
            ? framesPerScene + FADE_FRAMES
            : totalFrames - from;

        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <SceneClip
              src={staticFile(`scene${i + 1}.mp4`)}
              durationInFrames={duration}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
