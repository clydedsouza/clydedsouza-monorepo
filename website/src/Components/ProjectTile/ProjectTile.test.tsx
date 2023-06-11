import { render } from '@testing-library/react'
import { IProject } from '../../Types/ProjectData'
import ProjectTile from './ProjectTile'

const emptyProject: IProject = {
  title: '',
  description: '',
  image: '',
  imageDescription: '',
  category: '',
  date: '',
  id: '',
  madeUsing: [],
  hasWebsite: true,
  website: 'test',
  onGithub: true,
  github: 'test',
}

const projectWithoutLinks: IProject = {
  id: '20121201-tulips-cover',
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
}

const projectWithoutDescription: IProject = {
  id: '20181024-chemelonj',
  title: 'Chameleon',
  date: '24 Oct 2018',
  description: '',
  hasWebsite: true,
  website: 'https://chemeleon.net',
  onGithub: true,
  github: 'https://github.com/chemeleon/chemeleon.github.io/',
  madeUsing: ['html', 'sass'],
  category: 'Website',
  image: 'https://files.clydedsouza.net/images/projects/chemeleon.jpg',
  imageDescription: 'test',
}

const projectWithAllInfo: IProject = {
  id: '20170701-profile-sticker',

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
}

describe('Project tile', () => {
  it('should render tile', () => {
    render(<ProjectTile {...projectWithAllInfo} />)
    expect(document.body).toMatchSnapshot()
  })

  it('should render tile with empty project', () => {
    render(<ProjectTile {...emptyProject} />)
    expect(document.body).toMatchSnapshot()
  })

  it('should render tile without links', () => {
    render(<ProjectTile {...projectWithoutLinks} />)
    expect(document.body).toMatchSnapshot()
  })

  it('should render tile without description', () => {
    render(<ProjectTile {...projectWithoutDescription} />)
    expect(document.body).toMatchSnapshot()
  })
})
