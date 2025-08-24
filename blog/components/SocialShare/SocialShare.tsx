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
import { useEffect, useState } from 'react'

export const SocialShare = ({ title, summary }: { title: string; summary?: string }) => {
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    setPageUrl(window.location.href)
  }, [window.location.href])

  return (
    <div className="my-6">
      <h2 className="mb-2 text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
        Share this page
      </h2>
      <div className="flex gap-1">
        <EmailShareButton url={pageUrl} subject={title} body={summary}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <LinkedinShareButton url={pageUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <FacebookShareButton url={pageUrl} quote={title} title={title} hashtag={'#clydedsouzablog'}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <RedditShareButton url={pageUrl} title={title}>
          <RedditIcon size={32} round />
        </RedditShareButton>
        <TwitterShareButton url={pageUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton url={pageUrl} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton url={pageUrl} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  )
}
