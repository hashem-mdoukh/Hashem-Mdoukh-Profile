declare global {
  interface Window {
    /** Set by the splash release script once the overlay is gone; the hero starts typing then. */
    __splashDone?: boolean;
  }
}

export {};
