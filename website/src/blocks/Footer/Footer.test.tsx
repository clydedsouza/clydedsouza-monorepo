import * as apiCacheModule from "@/api/Cache";
import { emptyProject } from "@/test-util/emptyProject";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Footer from "./Footer";

jest.mock("../../Api/Cache");

const ctaDataMockResponse = [
  {
    ...emptyProject,
    id: "ai-tell-me-a-story",
    title: "Purchase my book AI, Tell Me a Story from these platforms.",
    website: "https://aitellmeastory.clydedsouza.net",
  },
];

describe("Footer", () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, "getCachedProjectData")
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [...ctaDataMockResponse],
        })
      );
  });

  it("should render footer", async () => {
    const { container } = render(<Footer />);
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    expect(container).toMatchSnapshot();
  });
});
