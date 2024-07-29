import { render } from "@testing-library/react";
import Loader from "./Loader";
import { LoaderTypes } from "./LoaderTypes";

describe("Loader", () => {
  it("should render default loader", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });

  it.each([LoaderTypes.Primary, LoaderTypes.Inverse])(
    "should render %s variant loader",
    (variant) => {
      const { container } = render(<Loader variant={variant} />);
      expect(container).toMatchSnapshot();
    }
  );
});
