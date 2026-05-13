import { ALL_FORMATS, Input, UrlSource } from "mediabunny";
import { Composition, staticFile } from "remotion";
import { MusicVideoComp } from "./MusicVideo";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MusicVideo"
        component={MusicVideoComp}
        width={1920}
        height={1080}
        fps={FPS}
        defaultProps={{ totalFrames: 8640 }}
        calculateMetadata={async () => {
          const input = new Input({
            source: new UrlSource(staticFile("demo-track.mp3"), {
              getRetryDelay: () => null,
            }),
            formats: ALL_FORMATS,
          });
          const durationInSeconds = await input.computeDuration();
          const totalFrames = Math.floor(durationInSeconds * FPS);
          return {
            durationInFrames: totalFrames,
            fps: FPS,
            props: { totalFrames },
          };
        }}
      />
    </>
  );
};
