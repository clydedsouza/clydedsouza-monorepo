import * as analyticsModule from "@/api/Analytics";
import { AnalyticsLinkType } from "@/api/IAnalytics";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SocialIcons from "./SocialIcons";

jest.mock("../../../api/Analytics");

describe("Social icons", () => {
  it("should render social icons", () => {
    const { container } = render(<SocialIcons />);
    expect(container).toMatchSnapshot();
  });

  it("should send analytics event when social icon is clicked", async () => {
    const sendLinkClickedEventMock = jest
      .spyOn(analyticsModule, "sendLinkClickedEvent")
      .mockImplementation(jest.fn());
    const user = userEvent.setup();

    render(<SocialIcons />);

    await user.click(screen.getAllByRole("link")[0]);
    expect(sendLinkClickedEventMock).toHaveBeenCalledWith({
      link: "https://linkedin.com/in/clydedz/",
      type: AnalyticsLinkType.SocialIcons,
    });
  });
});
