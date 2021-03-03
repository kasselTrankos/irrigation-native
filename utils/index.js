// log :: String -> a -> a
const log = label => x =>
  (console.log(`${label}:`, x), x)