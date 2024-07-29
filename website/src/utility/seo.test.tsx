import { render } from "@testing-library/react";
import { generateMetadata } from "./seo";

describe("SEO", () => {
  it("should render default seo information", () => {
    const meta = generateMetadata({
      title: undefined,
      description: undefined,
      image: undefined,
    });
    const { container } = render(<>{JSON.stringify(meta)}</>);
    expect(container).toMatchSnapshot();
  });

  it("should render seo information when test page title is passed", () => {
    const meta = generateMetadata({
      title: "Test page",
      description: undefined,
      image: undefined,
    });
    const { container } = render(<>{JSON.stringify(meta)}</>);
    expect(container).toMatchSnapshot();
  });

  it("should render seo information when test description is passed", () => {
    const meta = generateMetadata({
      title: undefined,
      description: "Test description",
      image: undefined,
    });
    const { container } = render(<>{JSON.stringify(meta)}</>);
    expect(container).toMatchSnapshot();
  });

  it("should render seo information when test image is passed", () => {
    const meta = generateMetadata({
      title: undefined,
      description: undefined,
      image: "test.jpg",
    });
    const { container } = render(<>{JSON.stringify(meta)}</>);
    expect(container).toMatchSnapshot();
  });
});
