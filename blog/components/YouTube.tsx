function getYouTubeEmbedSuffix(url: string): string | null {
  const videoMatch = url.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  if (videoMatch) return videoMatch[1]

  const playlistMatch = url.match(/[?&]list=([A-Za-z0-9_-]+)/)
  if (playlistMatch) return `?listType=playlist&list=${playlistMatch[1]}`

  return null
}

export default function YouTube({ url }: { url: string }) {
  if (!url) return <></>

  return (
    <div>
      <iframe
        className="aspect-video w-full"
        src={'https://www.youtube.com/embed/' + getYouTubeEmbedSuffix(url)}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  )
}
