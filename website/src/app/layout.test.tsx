import * as apiCacheModule from "@/api/Cache";
import { emptyProject } from "@/test-util/emptyProject";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import RootLayout from "./layout";

jest.mock("../api/Cache");

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

describe("Layout", () => {
  beforeEach(() => {
    jest.spyOn(apiCacheModule, "getCachedProjectData").mockImplementation(() =>
      Promise.resolve({
        app: {},
        data: [...highlightsDataMockResponse],
      })
    );
  });

  it("should layout page", async () => {
    const { baseElement } = render(
      <RootLayout children={<>Body of the website</>} />,
      {
        container: document.body,
      }
    );
    await waitForElementToBeRemoved(() => screen.queryAllByRole("progressbar"));
    expect(baseElement).toMatchSnapshot();
  });
});
