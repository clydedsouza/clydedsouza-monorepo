import { render } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("should render avatar", () => {
    const { container } = render(<Avatar />);
    expect(container).toMatchSnapshot();
  });
});
