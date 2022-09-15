class ResizeObserver {
  observe() {
    // do nothing
  }

  unobserve() {
    // do nothing
  }

  disconnect() {
    // do nothing
  }
}

// eslint-disable-next-line
(window as any).ResizeObserver = ResizeObserver;
export default ResizeObserver;
