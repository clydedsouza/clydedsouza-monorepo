import * as analyticsModule from "@/api/Analytics";
import { AnalyticsLinkType } from "@/api/IAnalytics";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bio from "./Bio";

jest.mock("../../../api/Analytics");

describe("Bio", () => {
  it("should render bio", () => {
    const { container } = render(<Bio />);
    expect(container).toMatchSnapshot();
  });

  it("should send analytics event when link from bio is clicked", async () => {
    const sendLinkClickedEventMock = jest
      .spyOn(analyticsModule, "sendLinkClickedEvent")
      .mockImplementation(jest.fn());
    const user = userEvent.setup();

    render(<Bio />);

    const companyLink = screen.getByRole("link", { name: /Xero/i });
    await user.click(companyLink);

    expect(sendLinkClickedEventMock).toHaveBeenCalledWith({
      link: "https://www.xero.com/nz/",
      type: AnalyticsLinkType.GeneralWebsite,
    });
  });
});
