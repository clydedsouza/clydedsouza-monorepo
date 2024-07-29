import * as analyticsModule from "@/api/Analytics";
import { render } from "@testing-library/react";
import { PageTypes } from "../Navigation/PageTypes";
import { PageViewAnalytics } from "./PageViewAnalytics";

jest.mock("../../api/Analytics");

describe("Page View Analytics", () => {
  it("should render component", () => {
    const { container } = render(
      <PageViewAnalytics page={PageTypes.Platforms} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should initialize analytics when component is rendered", async () => {
    const sendPageViewEventMock = jest
      .spyOn(analyticsModule, "sendPageViewEvent")
      .mockImplementation(jest.fn());

    render(<PageViewAnalytics page={PageTypes.Platforms} />);

    expect(sendPageViewEventMock).toHaveBeenCalledWith(PageTypes.Platforms);
  });
});
