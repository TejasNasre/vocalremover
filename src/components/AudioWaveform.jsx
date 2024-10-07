"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.esm.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins//regions.esm.js";
import { FileContext } from "../contexts/fileContext";
import { Button, Slider, Stack, Group, Text } from "@mantine/core";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconReload,
  IconScissors,
  IconVolume,
  IconZoomIn,
} from "@tabler/icons-react";

export default function AudioWaveform() {
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [duration, setDuration] = useState(0);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  const { fileURL } = useContext(FileContext);

  useEffect(() => {
    let wavesurfer = null;

    if (waveformRef.current && !wavesurferRef.current) {
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#00FF8E",
        progressColor: "#00FF8E",
        responsive: true,
        plugins: [
          TimelinePlugin.create({
            container: timelineRef.current,
          }),
          RegionsPlugin.create({}),
        ],
      });

      wavesurfer.on("ready", () => {
        setDuration(Math.floor(wavesurfer.getDuration()));
        setIsAudioLoaded(true);
      });

      wavesurfer.on("play", () => setIsPlaying(true));
      wavesurfer.on("pause", () => setIsPlaying(false));
      wavesurfer.on("finish", () => setIsPlaying(false));

      wavesurferRef.current = wavesurfer;
    }

    return () => {
      if (wavesurfer) {
        wavesurfer.unAll();
        wavesurfer.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (wavesurferRef.current && fileURL) {
      wavesurferRef.current.load(fileURL);
    }
  }, [fileURL]);

  useEffect(() => {
    if (wavesurferRef.current && isAudioLoaded) {
      wavesurferRef.current.setVolume(volume);
      wavesurferRef.current.zoom(zoom);
    }
  }, [volume, zoom, isAudioLoaded, duration]);

  const handlePlayPause = () => {
    if (wavesurferRef.current && isAudioLoaded) {
      wavesurferRef.current.playPause();
    }
  };

  const handleReload = () => {
    if (wavesurferRef.current && isAudioLoaded) {
      wavesurferRef.current.stop();
      wavesurferRef.current.play();
    }
  };

  const handleTrim = () => {
    if (wavesurferRef.current && isAudioLoaded) {
      const regions = wavesurferRef.current.regions.list;
      const region = regions[Object.keys(regions)[0]];
      if (region) {
        console.log("Trimming from", region.start, "to", region.end);
      }
    }
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#17171E" }}>
      <Stack spacing="md">
        <div ref={waveformRef} id="waveform" />
        <div ref={timelineRef} id="wave-timeline" />
        <Group position="apart">
          <Group>
            <Button
              onClick={handlePlayPause}
              disabled={!isAudioLoaded}
              variant="light"
              color={isPlaying ? "red" : "blue"}
            >
              {isPlaying ? (
                <IconPlayerPause size={16} />
              ) : (
                <IconPlayerPlay size={16} />
              )}
            </Button>
            <Button
              onClick={handleReload}
              disabled={!isAudioLoaded}
              variant="light"
            >
              <IconReload size={16} />
            </Button>
            <Button
              onClick={handleTrim}
              disabled={!isAudioLoaded}
              variant="light"
              color="green"
            >
              <IconScissors size={16} />
              <Text ml={5}>Trim</Text>
            </Button>
          </Group>
          <Group>
            <Slider
              value={zoom}
              onChange={setZoom}
              min={1}
              max={1000}
              label={(value) => `${value}x`}
              disabled={!isAudioLoaded}
              style={{ width: 200 }}
              labelAlwaysOn
            />
            <IconZoomIn size={20} />
          </Group>
          <Group>
            <Slider
              value={volume}
              onChange={setVolume}
              min={0}
              max={1}
              step={0.05}
              label={(value) => `${Math.round(value * 100)}%`}
              disabled={!isAudioLoaded}
              style={{ width: 200 }}
              labelAlwaysOn
            />
            <IconVolume size={20} />
          </Group>
        </Group>
      </Stack>
    </div>
  );
}
