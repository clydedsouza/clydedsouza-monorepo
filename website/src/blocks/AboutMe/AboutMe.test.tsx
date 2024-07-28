import * as apiCacheModule from "@/api/Cache";
import { emptyProject } from "@/test-util/emptyProject";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import AboutMe from "./AboutMe";

jest.mock("../../Api/Cache");

const highlightsDataMockResponse = [
  {
    ...emptyProject,
    id: "123-amazing-alloy",
    title: "Amazing alloy",
    date: "01 May 2020",
  },
  {
    ...emptyProject,
    id: "012-zinger-zebra",
    title: "Zinger zebra",
    date: "01 Jul 2017",
  },
  {
    ...emptyProject,
    id: "020-madness-monkey",
    title: "Madness monkey",
    date: "30 March 2023",
  },
];

describe("About me", () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, "getCachedProjectData")
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [...highlightsDataMockResponse],
        })
      );
  });

  it("should render about me", async () => {
    const { container } = render(<AboutMe />);
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

    expect(container).toMatchSnapshot();
  });
});
