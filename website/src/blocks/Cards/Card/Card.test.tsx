import { IProject } from "@/api/IProjectData";
import { emptyProject } from "@/test-util/emptyProject";
import { render } from "@testing-library/react";
import Card from "./Card";

const projectWithoutLinks: IProject = {
  id: "20121201-tulips-cover",
  title: "Tulips cover page designs",
  date: "01 Dec 2012",
  description:
    "I was responsible for designing the cover page for Tulips - a church bulletin. Each cover page was designed in accordance to a theme for that particular issue and conveyed the underlying meaning of the theme.",
  website: "",
  github: "",
  madeUsing: ["Photoshop"],
  category: "Graphic Design",
  image: "https://files.clydedsouza.net/portfolio/tulips-collage.jpg",
  imageDescription: "Church magazine cover designs by Clyde D'Souza",
};

const projectWithoutDescription: IProject = {
  id: "20181024-chemelonj",
  title: "Chameleon",
  date: "24 Oct 2018",
  description: "",
  website: "https://chemeleon.net",
  github: "https://github.com/chemeleon/chemeleon.github.io/",
  madeUsing: ["html", "sass"],
  category: "Website",
  image: "https://files.clydedsouza.net/portfolio/chemeleon.jpg",
  imageDescription: "test",
};

const projectWithAllInfo: IProject = {
  id: "20170701-profile-sticker",
  title: "Profile Sticker",
  date: "01 Jul 2017",
  description:
    "Profile Sticker is a web app that allows a user to add a sticker from different themes to their profile picture. The user can choose to upload a picture from and download to a computer or Facebook.",
  website: "https://profilesticker.net",
  github: "https://github.com/profilesticker/profilesticker.github.io/",
  madeUsing: ["HTML", "CSS", "SCSS", "JavaScript", "Mustache.js"],
  category: "Website",
  image: "https://files.clydedsouza.net/portfolio/profilesticker-website.png",
  imageDescription:
    "Add a sticker to your profile picture using Profile Sticker in just 4 easy steps.",
};

describe("Card", () => {
  it("should render card", () => {
    const { container } = render(<Card {...projectWithAllInfo} />);
    expect(container).toMatchSnapshot();
  });

  it("should render card with empty project", () => {
    const { container } = render(<Card {...emptyProject} />);
    expect(container).toMatchSnapshot();
  });

  it("should render card without links", () => {
    const { container } = render(<Card {...projectWithoutLinks} />);
    expect(container).toMatchSnapshot();
  });

  it("should render card without description", () => {
    const { container } = render(<Card {...projectWithoutDescription} />);
    expect(container).toMatchSnapshot();
  });
});
