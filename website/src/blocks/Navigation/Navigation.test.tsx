import * as analyticsModule from "@/api/Analytics";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "./Navigation";
import { PageTypes } from "./PageTypes";

jest.mock("../../api/Analytics");

describe("Navigation", () => {
  it("should render navigation", () => {
    const { container } = render(<Navigation />);
    expect(container).toMatchSnapshot();
  });

  it("should send analytics event when nav item is clicked", async () => {
    const sendNavigationClickedEventMock = jest
      .spyOn(analyticsModule, "sendNavigationClickedEvent")
      .mockImplementation(jest.fn());
    const user = userEvent.setup();

    render(<Navigation />);

    await user.click(screen.getByRole("link", { name: /Portfolio/i }));
    expect(sendNavigationClickedEventMock).toHaveBeenCalledWith(
      PageTypes.Portfolio
    );
  });

  it("should set active class when nav item is clicked", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    const platformsLink = screen.getByRole("link", { name: /Platforms/i });
    await user.click(platformsLink);
    expect(platformsLink).toHaveClass("active");
  });
});
