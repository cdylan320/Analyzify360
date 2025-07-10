"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Lazy loading wrapper for heavy components
export const LazyComponent: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}> = ({ children, fallback = null, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return (
    <div ref={setRef}>
      {isVisible ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        <div className="min-h-[200px] flex items-center justify-center">
          {fallback || (
            <div className="animate-pulse bg-slate-200 rounded-lg w-full h-48" />
          )}
        </div>
      )}
    </div>
  );
};

// Professional Loading Skeleton
export const LoadingSkeleton: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = "" }) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-slate-200 rounded ${i === lines - 1 ? "w-3/4" : "w-full"
            }`}
        />
      ))}
    </div>
  );
};

// Image optimization wrapper
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}> = ({ src, alt, className = "", width, height, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-200 animate-pulse"
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />

      {hasError && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <span className="text-slate-400 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

// Smooth page transitions
export const PageTransition: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

// Preload critical resources
export const usePreloadResources = () => {
  useEffect(() => {
    // Preload critical fonts
    const fontUrls = [
      "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
    ];

    fontUrls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = url;
      document.head.appendChild(link);
    });

    // Preload critical images
    const criticalImages = ["/hero-bg.jpg", "/team-1.jpg", "/team-2.jpg"];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
};

// Viewport-based animation trigger
export const useViewportAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isVisible };
};

// Professional error boundary
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex items-center justify-center bg-slate-50 rounded-lg">
            <div className="text-center">
              <div className="text-slate-400 mb-2">⚠️</div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Something went wrong
              </h3>
              <p className="text-slate-500 text-sm">
                Please refresh the page or try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined") {
      import("web-vitals").then(
        ({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
          onCLS(console.log);
          onFCP(console.log);
          onLCP(console.log);
          onTTFB(console.log);
          onINP(console.log);
        }
      );
    }

    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}`);
        }
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, []);
};

// Smooth scroll to element
export const useSmoothScroll = () => {
  const scrollToElement = (elementId: string, offset = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return { scrollToElement };
};

// Memory usage optimization
export const useMemoryOptimization = () => {
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      // Force garbage collection if available (development only)
      if (process.env.NODE_ENV === "development" && window.gc) {
        window.gc();
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(cleanupInterval);
  }, []);
};
