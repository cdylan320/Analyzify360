"use client";

import { useEffect } from "react";
import {
  usePreloadResources,
  usePerformanceMonitor,
  useMemoryOptimization,
} from "./PerformanceOptimizations";

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  usePreloadResources();
  usePerformanceMonitor();
  useMemoryOptimization();

  return <>{children}</>;
};
