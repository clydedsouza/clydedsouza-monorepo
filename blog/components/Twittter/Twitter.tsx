import { Tweet } from 'react-tweet'

export default function Twitter({ tweetId }: { tweetId: string }) {
  return <Tweet id={tweetId} />
}
