import * as analyticsModule from "@/api/Analytics";
import { render } from "@testing-library/react";
import { RegisterAnalytics } from "./RegisterAnalytics";

jest.mock("../../api/Analytics");

describe("Register Analytics", () => {
  it("should render component", () => {
    const { container } = render(<RegisterAnalytics />);
    expect(container).toMatchSnapshot();
  });

  it("should initialize analytics when component is rendered", async () => {
    const initAnalyticsWithSuperPropertiesMock = jest
      .spyOn(analyticsModule, "initAnalyticsWithSuperProperties")
      .mockImplementation(jest.fn());

    render(<RegisterAnalytics />);

    expect(initAnalyticsWithSuperPropertiesMock).toHaveBeenCalledTimes(1);
  });
});
