import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ISeo } from './ISeo'

export const WEBSITE_BASE_URL = 'https://clydedsouza.net/'

function Seo(props: ISeo) {
  const titlePrefix = props.title ? `${props.title} – ` : ''
  const title = `${titlePrefix}Clyde D'Souza – Software Engineer and Author`

  const defaultDescription =
    "Clyde D'Souza is software engineer and author based in Auckland, New Zealand. Feel free to send him a tweet @ClydeDz"
  const description = props.description ?? defaultDescription

  const defaultOgImage = 'https://files.clydedsouza.net/site/ogimage.png'
  const image = props.image ?? defaultOgImage

  const url = `${WEBSITE_BASE_URL}${props.title?.toLowerCase() ?? ''}`

  return (
    <HelmetProvider>
      <Helmet
        title={title}
        defaultTitle="Clyde D'Souza – Software Engineer and Author"
        htmlAttributes={{ lang: 'en' }}
        meta={[
          {
            name: `description`,
            content: description,
          },
          {
            property: 'og:url',
            content: url,
          },

          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:description',
            content: description,
          },
          {
            property: 'og:image',
            content: image,
          },
          {
            property: 'twitter:card',
            content: description,
          },
          {
            property: 'twitter:title',
            content: title,
          },
          {
            property: 'twitter:description',
            content: description,
          },
          {
            property: 'twitter:image',
            content: image,
          },
        ]}
      >
        <link rel="canonical" href={url} />
      </Helmet>
    </HelmetProvider>
  )
}

export default Seo
