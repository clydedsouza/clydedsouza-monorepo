import { IProject } from "@/api/IProjectData";
import { render } from "@testing-library/react";
import MadeUsing from "./MadeUsing";

describe("Made using", () => {
  it.each([
    {
      madeUsing: [],
    },
    {
      madeUsing: ["html"],
    },
    {
      madeUsing: ["html", "javascript"],
    },
  ])(
    "should render made using component when $madeUsing is supplied",
    ({ madeUsing }) => {
      const project: Partial<IProject> = {
        madeUsing,
      };
      const { container } = render(<MadeUsing {...project} />);
      expect(container).toMatchSnapshot();
    }
  );
});
