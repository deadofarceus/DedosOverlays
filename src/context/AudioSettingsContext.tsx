import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AudioSettingsContextValue = {
  buzzerVolume: number; // 0..100
  setBuzzerVolume: (value: number) => void;
};

const AudioSettingsContext = createContext<AudioSettingsContextValue | null>(null);

const clamp01to100 = (value: number) => Math.min(100, Math.max(0, Math.round(value)));
const STORAGE_KEY = "dedos.audio.buzzerVolume";

export function AudioSettingsProvider({ children }: { children: React.ReactNode }) {
  const [buzzerVolume, setBuzzerVolumeState] = useState<number>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw == null ? NaN : Number(raw);
    return Number.isFinite(parsed) ? clamp01to100(parsed) : 10;
  });

  const setBuzzerVolume = (value: number) => setBuzzerVolumeState(clamp01to100(value));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(buzzerVolume));
  }, [buzzerVolume]);

  const value = useMemo<AudioSettingsContextValue>(
    () => ({ buzzerVolume, setBuzzerVolume }),
    [buzzerVolume]
  );

  return <AudioSettingsContext.Provider value={value}>{children}</AudioSettingsContext.Provider>;
}

export function useAudioSettings() {
  const ctx = useContext(AudioSettingsContext);
  if (!ctx) {
    throw new Error("useAudioSettings must be used within <AudioSettingsProvider />");
  }
  return ctx;
}

