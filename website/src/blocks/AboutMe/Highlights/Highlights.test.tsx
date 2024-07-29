import * as apiCacheModule from "@/api/Cache";
import { emptyProject } from "@/test-util/emptyProject";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { PageTypes } from "../../../blocks/Navigation/PageTypes";
import Highlights from "./Highlights";

jest.mock("../../../api/Cache");

const highlightsDataMockResponse = [
  {
    ...emptyProject,
    id: "highlights\\20180113-light-and-spark-npo.pin",
    title: "Project - Light & Spark NPO - Ruia Jan 2018 Event",
    date: "13 Jan 2018",
  },
  {
    ...emptyProject,
    id: "highlights\\20190307-developing-nuget-skillshare.pin",
    title: "Project - Developing and distributing NuGet packages",
    date: "07 Mar 2019",
  },
  {
    ...emptyProject,
    id: "highlights\\20191114-mama-tell-me-a-story.pin",
    title: "Project - Mama, Tell Me a Story",
    date: "14 Nov 2019",
  },
  {
    ...emptyProject,
    id: "highlights\\20201112-dotnetconf.pin",
    title: "Project - .NET Conf 2020",
    date: "12 Nov 2020",
  },
  {
    ...emptyProject,
    id: "highlights\\20230511-ai-tell-me-a-story.pin",
    title: "Project - AI, Tell Me a Story",
    date: "11 May 2023",
  },
];

describe("Highlights", () => {
  describe("given API returns a single item", () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, "getCachedProjectData")
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [highlightsDataMockResponse[0]],
          })
        );
    });

    it("should render highlights", async () => {
      const { container } = render(<Highlights />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

      expect(container).toMatchSnapshot();
    });

    it("should call API with correct page type", async () => {
      render(<Highlights />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

      expect(apiCacheModule.getCachedProjectData).toHaveBeenCalledTimes(1);
      expect(apiCacheModule.getCachedProjectData).toHaveBeenCalledWith(
        PageTypes.Highlights
      );
    });
  });

  describe("given API returns multiple items", () => {
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

    it("should render highlights", async () => {
      const { container } = render(<Highlights />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

      expect(container).toMatchSnapshot();
    });

    it("should sort items in descending order", async () => {
      render(<Highlights />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

      const headings = screen.getAllByRole("heading", { name: /Project -/ });

      expect(headings[0]).toHaveTextContent(
        highlightsDataMockResponse[4].title
      );
      expect(headings[1]).toHaveTextContent(
        highlightsDataMockResponse[3].title
      );
      expect(headings[2]).toHaveTextContent(
        highlightsDataMockResponse[2].title
      );
    });

    it("should show max 3 highlight items", async () => {
      render(<Highlights />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
      const headings = screen.getAllByRole("heading", { name: /Project -/ });
      expect(headings).toHaveLength(3);
    });
  });

  describe("given API returns no items", () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, "getCachedProjectData")
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [],
          })
        );
    });

    it("should render highlights", async () => {
      const { container } = render(<Highlights />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

      expect(container).toMatchSnapshot();
    });
  });

  describe("given API returns an error", () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, "getCachedProjectData")
        .mockImplementationOnce(() => Promise.reject("Error"));
    });

    it("should render highlights", async () => {
      const { container } = render(<Highlights />);
      await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

      expect(container).toMatchSnapshot();
    });
  });
});
