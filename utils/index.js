// log :: String -> a -> a
export const log = label => x =>
  (console.log(`${label}:`, x), x)