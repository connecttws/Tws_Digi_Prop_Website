"use client";

import dynamic from "next/dynamic";
import type { LightingPreset, CameraPreset } from "./ArchitecturalVillaViewer";

export type { LightingPreset, CameraPreset };

export const ClientVillaViewer = dynamic(
  () => import("./ArchitecturalVillaViewer").then((mod) => mod.ArchitecturalVillaViewer),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full min-h-[480px] flex items-center justify-center bg-[#F7F5F0]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#B79A69]/30 border-t-[#B79A69] rounded-full animate-spin" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#A69B8A] font-light">
            Initializing Spatial Architecture...
          </span>
        </div>
      </div>
    ),
  }
);
