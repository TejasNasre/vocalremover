"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Slider,
  Text,
  Stack,
  Group,
  Title,
  Select,
} from "@mantine/core";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { IconPlayerPlayFilled, IconPlayerPause } from "@tabler/icons-react";

interface Region {
  id: string;
  start: number;
  end: number;
  color: string;
}

export default function AudioEditor() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4ae1a1",
        progressColor: "#1db954",
        cursorColor: "#1db954",
        barWidth: 2,
        barRadius: 3,
        height: 150,
        normalize: true,
        plugins: [RegionsPlugin.create()],
      });

      const audioFile = localStorage.getItem("audioFile");
      if (audioFile) {
        fetch(audioFile)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.blob();
          })
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            wavesurfer.current?.load(url);
          })
          .catch((error) => {
            console.error("Failed to fetch audio file:", error);
          });
      }

      wavesurfer.current.on("ready", () => {
        if (wavesurfer.current) {
          setDuration(wavesurfer.current.getDuration());
        }
      });

      wavesurfer.current.on("audioprocess", () => {
        if (wavesurfer.current) {
          setCurrentTime(wavesurfer.current.getCurrentTime());
        }
      });

      (
        wavesurfer.current as WaveSurfer & {
          on: (
            event: "region-created",
            callback: (region: Region) => void
          ) => void;
        }
      ).on("region-created", (region: Region) => {
        setRegions((prevRegions) => [...prevRegions, region]);
      });

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
          wavesurfer.current = null; // Ensure the reference is cleared
        }
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(wavesurfer.current.isPlaying());
    }
  };

  const handleCut = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      const duration = wavesurfer.current.getDuration();
      (
        wavesurfer.current as WaveSurfer & {
          addRegion: (options: Region) => void;
        }
      ).addRegion({
        id: `${Date.now()}`,
        start: currentTime,
        end: duration,
        color: "rgba(255, 0, 0, 0.3)",
      });
    }
  };

  const handleRemove = () => {
    if (wavesurfer.current) {
      const regionsPlugin = wavesurfer.current
        ?.getActivePlugins()
        .find((plugin) => plugin instanceof RegionsPlugin) as RegionsPlugin;
      if (regionsPlugin) {
        regionsPlugin.getRegions().forEach((region) => {
          region.remove();
        });
      }
      setRegions([]);
    }
  };

  const handleSave = async () => {
    if (wavesurfer.current && regions.length > 0) {
      try {
        const audioContext = (
          wavesurfer.current as WaveSurfer & {
            backend: { ac: AudioContext; buffer: AudioBuffer };
          }
        ).backend.ac;
        const originalBuffer = (
          wavesurfer.current as WaveSurfer & {
            backend: { buffer: AudioBuffer };
          }
        ).backend.buffer;

        // Sort regions by start time
        const sortedRegions = regions.sort((a, b) => a.start - b.start);

        // Create a new buffer for the edited audio
        const newDuration = sortedRegions.reduce(
          (acc, region) => acc + (region.end - region.start),
          0
        );
        const newBuffer = audioContext.createBuffer(
          originalBuffer.numberOfChannels,
          Math.ceil(newDuration * originalBuffer.sampleRate),
          originalBuffer.sampleRate
        );

        // Copy the audio data from the original buffer to the new buffer, excluding the cut regions
        for (
          let channel = 0;
          channel < originalBuffer.numberOfChannels;
          channel++
        ) {
          const channelData = newBuffer.getChannelData(channel);
          let newBufferOffset = 0;

          sortedRegions.forEach((region) => {
            const startOffset = Math.floor(
              region.start * originalBuffer.sampleRate
            );
            const endOffset = Math.floor(
              region.end * originalBuffer.sampleRate
            );
            const regionLength = endOffset - startOffset;

            channelData.set(
              originalBuffer
                .getChannelData(channel)
                .subarray(startOffset, endOffset),
              newBufferOffset
            );
            newBufferOffset += regionLength;
          });
        }

        // Create a new Blob with the edited audio data
        const audioData = await audioBufferToWave(newBuffer);
        const blob = new Blob([audioData], { type: `audio/${audioFormat}` });

        // Create a download link and trigger the download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `edited_audio.${audioFormat}`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);

        console.log("Audio saved successfully");
      } catch (error) {
        console.error("Error saving audio:", error);
      }
    } else {
      console.warn("No regions to save or wavesurfer is not initialized");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ backgroundColor: "#17171E", width: "100%", padding: "5rem" }}>
      <Stack gap="xl" align="center" my="xl">
        <Title order={1}>Audio Cutter</Title>
        <div ref={waveformRef} style={{ width: "100%" }} />
        <Group align="apart" style={{ width: "100%" }}>
          <Text>{formatTime(currentTime)}</Text>
          <Text>{formatTime(duration)}</Text>
        </Group>
        <Slider
          value={currentTime}
          max={duration}
          step={0.1}
          onChange={(value) => {
            if (wavesurfer.current) {
              wavesurfer.current.seekTo(value / duration);
            }
          }}
          style={{ width: "100%" }}
        />
        <Group align="apart" style={{ width: "100%" }}>
          <Button onClick={handlePlayPause}>
            {isPlaying ? <IconPlayerPause /> : <IconPlayerPlayFilled />}
          </Button>
          <Button onClick={handleCut}>Cut</Button>
          <Button onClick={handleRemove}>Remove</Button>
          <Select
            value={audioFormat}
            onChange={(value) => setAudioFormat(value as string)}
            data={[
              { value: "mp3", label: "MP3" },
              { value: "wav", label: "WAV" },
            ]}
            style={{ width: "100px" }}
          />
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Stack>
    </div>
  );
}

// Helper function to convert AudioBuffer to WAV format
async function audioBufferToWave(abuffer: AudioBuffer) {
  const numOfChan = abuffer.numberOfChannels;
  const length = abuffer.length * numOfChan * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const channels: Float32Array[] = [];
  let sample;
  let offset = 0;
  let pos = 0;

  // write WAVE header
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(abuffer.sampleRate);
  setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit (hardcoded in this demo)

  setUint32(0x61746164); // "data" - chunk
  setUint32(length - pos - 4); // chunk length

  // write interleaved data
  for (let i = 0; i < abuffer.numberOfChannels; i++) {
    channels.push(abuffer.getChannelData(i));
  }

  while (pos < length) {
    for (let i = 0; i < numOfChan; i++) {
      // interleave channels
      sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
      view.setInt16(pos, sample, true); // write 16-bit sample
      pos += 2;
    }
    offset++; // next source sample
  }

  return buffer;

  function setUint16(data: number) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: number) {
    view.setUint32(pos, data, true);
    pos += 4;
  }
}
