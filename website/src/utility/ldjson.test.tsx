import { render } from "@testing-library/react";
import { JSONLD } from "./ldjson";

describe("LD-JSON", () => {
  it("should render default LD-JSON information", () => {
    const { container } = render(<>{JSON.stringify(JSONLD)}</>);
    expect(container).toMatchSnapshot();
  });
});
