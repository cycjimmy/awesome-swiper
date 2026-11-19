// jsdom implements neither `ResizeObserver` nor `matchMedia`, both of which
// swiper touches while it bootstraps. The stubs are intentionally inert.

if (!('ResizeObserver' in globalThis)) {
  class ResizeObserverStub {
    observe(): void {
      // noop
    }

    unobserve(): void {
      // noop
    }

    disconnect(): void {
      // noop
    }
  }

  Object.defineProperty(globalThis, 'ResizeObserver', {
    writable: true,
    value: ResizeObserverStub,
  })
}

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {
        // noop
      },
      removeEventListener: () => {
        // noop
      },
      addListener: () => {
        // noop
      },
      removeListener: () => {
        // noop
      },
      dispatchEvent: () => false,
    }),
  })
}
