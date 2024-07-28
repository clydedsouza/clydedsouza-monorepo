import * as apiCacheModule from "@/api/Cache";
import { emptyProject } from "@/test-util/emptyProject";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import RootLayout from "./layout";

jest.mock("../api/Cache");

const projectDataMockResponse = [
  {
    ...emptyProject,
    id: "123-amazing-alloy",
    title: "Amazing alloy",
    date: "01 May 2020",
  },
];

describe("Layout", () => {
  beforeEach(() => {
    jest.spyOn(apiCacheModule, "getCachedProjectData").mockImplementation(() =>
      Promise.resolve({
        app: {},
        data: [...projectDataMockResponse],
      })
    );
  });

  it("should layout page", async () => {
    const { baseElement } = render(
      <RootLayout>{"Body of the website"}</RootLayout>,
      {
        container: document.body,
      }
    );
    await waitForElementToBeRemoved(() => screen.queryAllByRole("progressbar"));
    expect(baseElement).toMatchSnapshot();
  });
});
