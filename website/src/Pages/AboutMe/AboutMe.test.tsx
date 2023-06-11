import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import AboutMe from './AboutMe'

jest.mock('../../Api/Cache')

const pinnedDataMockResponse = [
  {
    id: '20121201-tulips-cover',
    contents:
      '<p>For about two years, from December 2012 to December 2014, I was a member of my parishes editorial board responsible for putting together the monthly (sometimes quarterly) bulletin called Tulips that would then be distributed to all members of the parish. My responsibility was to put together a cover design for each magazine.</p>\n<p>Before each magazine was published, we would come up with a theme. I would then take the theme and try and come up with a visual to be printed on the cover page. At that time, I wasn&#39;t illustrating myself so I would pick up images from the internet and put it together using Photoshop (apologies for not giving credits!).</p>\n<p>Overall, I really liked the process of challenging myself every time to produce a different visual that conveys the theme.</p>\n',
    title: 'Tulips cover page designs',
    date: '01 Dec 2012',
    description:
      'I was responsible for designing the cover page for Tulips - a church bulletin. Each cover page was designed in accordance to a theme for that particular issue and conveyed the underlying meaning of the theme.',
    hasWebsite: false,
    website: '',
    onGithub: false,
    github: '',
    madeUsing: ['Photoshop'],
    category: 'Graphic Design',
    image: 'https://files.clydedsouza.net/images/projects/tulips-collage.jpg',
    imageDescription: "Church magazine cover designs by Clyde D'Souza",
    excerpt:
      '<p>For about two years, from December 2012 to December 2014, I was a member of my parishes editorial board responsible for putting together the monthly (sometimes quarterly) bulletin called Tulips that would then be distributed to all members of the parish. My responsibility was to put together a cover design for each magazine.</p>',
  },
  {
    id: '20170701-profile-sticker',
    contents:
      '<p>Add a sticker to your profile picture using Profile Sticker in just 4 easy steps.</p>\n',
    title: 'Profile Sticker',
    date: '01 Jul 2017',
    description:
      'Profile Sticker is a web app that allows a user to add a sticker from different themes to their profile picture. The user can choose to upload a picture from and download to a computer or Facebook.',
    hasWebsite: true,
    website: 'https://profilesticker.net',
    onGithub: true,
    github: 'https://github.com/profilesticker/profilesticker.github.io/',
    madeUsing: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'Mustache.js'],
    category: 'Website',
    image:
      'https://files.clydedsouza.net/images/projects/profilesticker-website.png',
    imageDescription:
      'Add a sticker to your profile picture using Profile Sticker in just 4 easy steps.',
    excerpt:
      '<p>Add a sticker to your profile picture using Profile Sticker in just 4 easy steps.</p>',
  },
]

describe('About me', () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, 'getCachedProjectData')
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [pinnedDataMockResponse[0], pinnedDataMockResponse[1]],
        })
      )
  })

  it('should render about me', async () => {
    render(<AboutMe />)
    await waitForElementToBeRemoved(() =>
      screen.queryByText('Contents are loading...')
    )

    expect(document.body).toMatchSnapshot()
  })
})