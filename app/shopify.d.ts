declare const shopify: {
  saveBar: {
    show: (id: string) => Promise<void>
    hide: (id: string) => Promise<void>
    toggle: (id: string) => Promise<void>
  }
  toast: {
    show: (message: string, options?: { duration?: number; isError?: boolean }) => void
  }
}
