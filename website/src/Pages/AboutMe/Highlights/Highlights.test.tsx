import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../../Api/Cache'
import { PageTypes } from '../../../Components/Navigation/PageTypes'
import Highlights from './Highlights'

jest.mock('../../../Api/Cache')

const highlightsDataMockResponse = [
  {
    id: 'highlights\\20180113-light-and-spark-npo.pin',
    contents:
      '<p>Light &amp; Spark NPO&#39;s first event happened on the 13th and 14th of January 2018 at <a href="https://www.ruiacollege.edu/Default.aspx">Ramnarain Ruia College</a>, Mumbai. We taught 36 Computer Science students and gave an online presence to 1 NGO – Healing Dove Foundation.</p>\n<p>I conceptualized this event remotely and put a team together to help me pull this event off. A lot of the pre-event duration was contacting NGO&#39;s, sponsors, and finding locations for the event. I also had to prepare content that we would be delivering at the event and also had to train up the team to then be able to mentor students.</p>\n<p>The 2-day event itself was very fast-paced. We delivered presentations, then jumped into hands-on sessions where the students worked in groups to develop a WordPress site for the non-profit. Students in each group were paired so that they could learn faster, share knowledge and frequently communicate the whole time. There were a couple of graphic designers on-site to assist with any graphical requirements that any of the groups had. Representatives from the NGO were also on-site to talk about their requirements and what they&#39;d like to get out of this 2-day event. We were aiming to give the students a work-like environment during these 2-days and having them communicate directly with other stakeholders was a key skill to learn. At the end of the 2-day event, each group presented their learnings and the website before the entire audience.</p>\n<p>Read more about this event <a href="https://lightandsparknpo.github.io/2019-11-20-ruia-mumbai-2018/">here</a>.</p>\n',
    title: 'Project - Light & Spark NPO - Ruia Jan 2018 Event',
    date: '13 Jan 2018',
    description:
      'A 2-day workshop where we taught industry-relevant technologies to students and helped an NGO with their online requirements. This event was conducted at Ruia College, Mumbai.',
    website: 'https://lightandsparknpo.github.io/2019-11-20-ruia-mumbai-2018/',
    github: '',
    madeUsing: [],
    category: 'Offline workshop',
    image:
      'https://files.clydedsouza.net/portfolio/lightandsparknpo-siteteaser.png',
    imageDescription: 'Light & Spark NPO - Ruia Jan 2018 Event',
    excerpt:
      '<p>Light &amp; Spark NPO&apos;s first event happened on the 13th and 14th of January 2018 at <a href="https://www.ruiacollege.edu/Default.aspx">Ramnarain Ruia College</a>, Mumbai. We taught 36 Computer Science students and gave an online presence to 1 NGO &#x2013; Healing Dove Foundation.</p>',
  },
  {
    id: 'highlights\\20190307-developing-nuget-skillshare.pin',
    contents:
      '<p>NuGet is the Microsoft-supported mechanism for sharing code. It is a definition of how re-usable code is created for .NET projects and bundled into NuGet packages. It is a tool that helps you create a NuGet package. It is a platform where you can publish your NuGet packages to and share it with other developers. It is a package manager that is integrated with Visual Studio which you can use to consume these NuGet packages. How amazing is that!</p>\n<p>In this class you will learn how to develop your very own NuGet package and then publish it to nuget.org! Doesn’t that sound exciting? You will learn what is NuGet in more depth, how to align your thinking when taking the NuGet approach and a lot more.</p>\n<p>This class is for you if:</p>\n<ul>\n<li>You’ve consumed NuGet in the past and want to learn how to develop and distribute your own,</li>\n<li>You’ve not consumed NuGet but want to learn what NuGet is and learn the entire lifecycle right from development to consumption,</li>\n<li>Or, you don’t want to learn about NuGet specifically but want to learn how to align your thinking while developing an independent unit of code that could potentially be reused, how to manage versioning of your code and a lot more that I would classify as &#39;derived knowledge&#39;.</li>\n</ul>\n<p>Read more about the class contents and start learning about NuGet <a href="https://skl.sh/2W5AA5w">here</a>.</p>\n',
    title: 'Project - Developing and distributing NuGet packages',
    date: '07 Mar 2019',
    description:
      'Learn how to develop your very own NuGet package and then publish it to nuget.org.',
    website: 'https://skl.sh/2W5AA5w',
    github: '',
    madeUsing: [],
    category: 'Skillshare online class',
    image: 'https://files.clydedsouza.net/portfolio/ddnp.png',
    imageDescription:
      'Developing and distributing NuGet packages – Skillshare class',
    excerpt:
      '<p>NuGet is the Microsoft-supported mechanism for sharing code. It is a definition of how re-usable code is created for .NET projects and bundled into NuGet packages. It is a tool that helps you create a NuGet package. It is a platform where you can publish your NuGet packages to and share it with other developers. It is a package manager that is integrated with Visual Studio which you can use to consume these NuGet packages. How amazing is that!</p>',
  },
  {
    id: 'highlights\\20191114-mama-tell-me-a-story.pin',
    contents:
      '<p>Mama, Tell Me a Story is a collection of twelve short bedtime stories that parents will love reading to their kids over and over again. As each story unfolds, it helps paint a picture and holds the power to unlock your child’s superpower—their imagination!</p>\n<p>The stories are engaging and revolves around characters that your kids will absolutely love. They will learn to face their fears with Daisy, learn to believe in themselves like Alex, they will understand the power of telling the truth like Charlie, and learn the value of sharing with George and his friends—and these are just to name a few.</p>\n<p>Mama, Tell Me a Story helps your child to absorb these important messages at a young age because these values, combined with the power to exercise their imagination, will eventually help build a strong foundation for their growth and shape their future.</p>\n<p>Mama, Tell Me a Story is available on <a href="http://bit.ly/MamaTellMeAStory">Amazon</a>, <a href="https://bit.ly/MamaTellMeAStoryGoogleBooks">Google Books</a> and many <a href="https://mamatellmeastory.clydedsouza.net/">other platforms</a>.</p>\n',
    title: 'Project - Mama, Tell Me a Story',
    date: '14 Nov 2019',
    description:
      'Mama, Tell Me a Story is a collection of twelve short bedtime stories that parents will love reading to their kids over and over again. The stories are engaging and revolves around characters that your kids will absolutely love. Each story holds the power to unlock your child’s superpower—their imagination!',
    website: 'http://mamatellmeastory.clydedsouza.net/',
    github: '',
    madeUsing: [],
    category: 'Bedtime stories',
    image: 'https://files.clydedsouza.net/portfolio/mama-tell-me-a-story.png',
    imageDescription:
      'Mama, Tell Me a Story is a collection of twelve short bedtime stories',
    excerpt:
      '<p>Mama, Tell Me a Story is a collection of twelve short bedtime stories that parents will love reading to their kids over and over again. As each story unfolds, it helps paint a picture and holds the power to unlock your child&#x2019;s superpower&#x2014;their imagination!</p>',
  },
  {
    id: 'highlights\\20201112-dotnetconf.pin',
    contents: '<p>Content to be added.</p>\n',
    title: 'Project - .NET Conf 2020',
    date: '12 Nov 2020',
    description:
      'I had this amazing opportunity to speak at the .NET Conference 2020. I spoke on how to add health checks to a .NET Core application and also include its dependencies.',
    website: 'https://youtu.be/cFslS0b_2dg',
    github: '',
    madeUsing: [],
    category: 'Conference speaker',
    image: 'https://files.clydedsouza.net/portfolio/dotnetconf-teaser.png',
    imageDescription: "Clyde D'Souza speaking at the .NET Conference 2020.",
    excerpt: '<p>Content to be added.</p>',
  },
  {
    id: 'highlights\\20230511-ai-tell-me-a-story.pin',
    contents:
      '<p>Looking for the perfect bedtime storybook to ignite your child&#39;s imagination and instill important values? Look no further than AI, Tell Me a Story, a collection of fifty captivating short stories, each with a valuable life lesson to teach kids.</p>\n<p>From the importance of kindness and empathy to the power of determination and perseverance, each story is crafted to entertain and educate young readers. With no distracting illustrations, your child can fully immerse themselves in the richly woven narrative and let their imagination take flight. As you read these tales together, you&#39;ll watch as your child develops these important traits that will serve them well throughout their lives. With each page turn, your child will be transported to a world of wonder and learning, making this book a bedtime favorite for years to come.</p>\n<p>Don&#39;t miss out on this must-have addition to your child&#39;s (virtual) bookshelf. So cozy up, settle in, and get ready to share the magic of storytelling with your child. Order now and start creating unforgettable bedtime memories with your little one!</p>\n',
    title: 'Project - AI, Tell Me a Story',
    date: '11 May 2023',
    description:
      "Looking for the perfect bedtime storybook to ignite your child's imagination and instill important values? Look no further than AI, Tell Me a Story, a collection of fifty captivating short stories, each with a valuable life lesson to teach kids.",
    website: 'http://aitellmeastory.clydedsouza.net/',
    github: '',
    madeUsing: [],
    category: 'Bedtime stories',
    image: 'https://files.clydedsouza.net/portfolio/aitellmeastory.png',
    imageDescription:
      'AI, Tell Me a Story is a collection of fifty short bedtime stories',
    excerpt:
      '<p>Looking for the perfect bedtime storybook to ignite your child&apos;s imagination and instill important values? Look no further than AI, Tell Me a Story, a collection of fifty captivating short stories, each with a valuable life lesson to teach kids.</p>',
  },
]

describe('Highlights', () => {
  describe('given api returns a single item', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [highlightsDataMockResponse[0]],
          })
        )
    })

    it('should render highlights', async () => {
      render(<Highlights />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      expect(document.body).toMatchSnapshot()
    })

    it('should call API with correct page type', async () => {
      render(<Highlights />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      expect(apiCacheModule.getCachedProjectData).toBeCalledTimes(1)
      expect(apiCacheModule.getCachedProjectData).toBeCalledWith(
        PageTypes.Highlights
      )
    })
  })

  describe('given api returns multiple items', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [
              highlightsDataMockResponse[0],
              highlightsDataMockResponse[1],
              highlightsDataMockResponse[2],
              highlightsDataMockResponse[3],
              highlightsDataMockResponse[4],
            ],
          })
        )
    })

    it('should render highlights', async () => {
      render(<Highlights />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      expect(document.body).toMatchSnapshot()
    })

    it('should sort items in descending order', async () => {
      render(<Highlights />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      const headings = screen.getAllByRole('heading', { name: /Project -/ })
      expect(headings[0]).toHaveTextContent(highlightsDataMockResponse[4].title)
      expect(headings[1]).toHaveTextContent(highlightsDataMockResponse[3].title)
      expect(headings[2]).toHaveTextContent(highlightsDataMockResponse[2].title)
    })

    it('should show max 3 highlight items', async () => {
      render(<Highlights />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      const headings = screen.getAllByRole('heading', { name: /Project -/ })
      expect(headings).toHaveLength(3)
    })
  })

  describe('given api returns no items', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [],
          })
        )
    })

    it('should render highlights', async () => {
      render(<Highlights />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      expect(document.body).toMatchSnapshot()
    })
  })

  describe('given api returns an error', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() => Promise.reject('Error'))
    })

    it('should render highlights', async () => {
      render(<Highlights />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      expect(document.body).toMatchSnapshot()
    })
  })
})
