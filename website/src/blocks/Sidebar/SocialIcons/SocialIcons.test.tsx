import { render } from "@testing-library/react";
import SocialIcons from "./SocialIcons";

describe("Social icons", () => {
  it("should render social icons", () => {
    const { container } = render(<SocialIcons />);
    expect(container).toMatchSnapshot();
  });
});
