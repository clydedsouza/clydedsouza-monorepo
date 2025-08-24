import siteMetadata from '@/data/siteMetadata'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'

const getCurrentUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return siteMetadata.siteUrl
}

export const SocialShare = ({ title, summary }: { title: string; summary?: string }) => {
  const pathname = getCurrentUrl()
  return (
    <div className="my-6">
      <h2 className="mb-2 text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
        Share this page
      </h2>
      <div className="flex gap-1">
        <EmailShareButton url={pathname} subject={title} body={summary}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <LinkedinShareButton url={pathname}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <FacebookShareButton
          url={pathname}
          quote={title}
          title={title}
          hashtag={'#clydedsouzablog'}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <RedditShareButton url={pathname} title={title}>
          <RedditIcon size={32} round />
        </RedditShareButton>
        <TwitterShareButton url={pathname} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton url={pathname} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton url={pathname} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  )
}
