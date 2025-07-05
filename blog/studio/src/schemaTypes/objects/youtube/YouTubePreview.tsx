import {Flex, Text} from '@sanity/ui'
import ReactPlayer from 'react-player'

export function YouTubePreview(props: Record<string, any>) {
  const url = props.url

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === 'string' ? <ReactPlayer src={url} /> : <Text>Add a YouTube URL</Text>}
    </Flex>
  )
}
