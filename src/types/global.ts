export {}

declare global {
  const process: {
    env: Record<string, any> & {
      NODE_ENV: 'development' | 'test' | 'production'
    }
  }
}
