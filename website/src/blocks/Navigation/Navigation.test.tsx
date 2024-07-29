import * as analyticsModule from "@/api/Analytics";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextNavigationModule from "next/navigation";
import Navigation from "./Navigation";
import { PageTypes } from "./PageTypes";

jest.mock("../../api/Analytics");
jest.mock("next/navigation");

describe("Navigation", () => {
  beforeEach(() => {
    jest.spyOn(nextNavigationModule, "usePathname").mockReturnValue("/");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render navigation", () => {
    const { container } = render(<Navigation />);
    expect(container).toMatchSnapshot();
  });

  it("should set Platforms link to active if its visited directly", async () => {
    jest
      .spyOn(nextNavigationModule, "usePathname")
      .mockReturnValueOnce("/platforms");

    render(<Navigation />);

    const platformsLink = screen.getByRole("link", { name: /Platforms/i });
    expect(platformsLink).toHaveClass("active");
  });

  it.each(["//Portfolio", "/Portfolio/", "/portfolio", "/PORTFOLIO"])(
    "should set Portfolio link to active when path detected is %s",
    async (pathName: string) => {
      jest
        .spyOn(nextNavigationModule, "usePathname")
        .mockReturnValueOnce(pathName);

      render(<Navigation />);

      const portfolioLink = screen.getByRole("link", { name: /Portfolio/i });
      expect(portfolioLink).toHaveClass("active");
    }
  );

  it.each(["", "/random", "//", "#123@8"])(
    "should default to About link as active when path detected is %s",
    async (pathName: string) => {
      jest
        .spyOn(nextNavigationModule, "usePathname")
        .mockReturnValueOnce(pathName);

      render(<Navigation />);

      const aboutLink = screen.getByRole("link", { name: /About/i });
      expect(aboutLink).toHaveClass("active");
    }
  );

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
