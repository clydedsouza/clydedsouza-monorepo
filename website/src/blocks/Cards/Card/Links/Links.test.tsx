import * as analyticsModule from "@/api/Analytics";
import { AnalyticsLinkType } from "@/api/IAnalytics";
import { IProject } from "@/api/IProjectData";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Links from "./Links";

jest.mock("../../../../api/Analytics");

describe("Links", () => {
  it.each([
    {
      website: "https://www.google.com/",
      github: "https://github.com/",
    },
    {
      website: "",
      github: "https://github.com/",
    },
    {
      website: "https://www.google.com/",
      github: "",
    },
    {
      website: "",
      github: "",
    },
  ])(
    "should render links component when website is $website and github is $github",
    ({ website, github }) => {
      const project: Partial<IProject> = {
        website,
        github,
      };
      const { container } = render(<Links {...project} />);
      expect(container).toMatchSnapshot();
    }
  );

  it.each([
    {
      website: undefined,
      github: "https://github.com/",
      expectedProps: {
        link: "https://github.com/",
        type: AnalyticsLinkType.CardGitHub,
      },
    },
    {
      website: "https://website.com/",
      github: undefined,
      expectedProps: {
        link: "https://website.com/",
        type: AnalyticsLinkType.CardWebsite,
      },
    },
  ])(
    "should send analytics event when website is $website and github is $github",
    async ({ website, github, expectedProps }) => {
      const sendLinkClickedEventMock = jest
        .spyOn(analyticsModule, "sendLinkClickedEvent")
        .mockImplementation(jest.fn());
      const user = userEvent.setup();

      render(
        <Links
          {...{
            website,
            github,
          }}
        />
      );

      await user.click(screen.getAllByRole("link")[0]);
      expect(sendLinkClickedEventMock).toHaveBeenCalledWith(expectedProps);
    }
  );
});
