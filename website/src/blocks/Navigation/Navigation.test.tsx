import { render } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("should render navigation", async () => {
    render(<Navigation />);
    expect(document.body).toMatchSnapshot();
  });
});
