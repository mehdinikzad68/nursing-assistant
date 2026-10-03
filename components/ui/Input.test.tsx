import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input type="text" placeholder="سؤالت را بنویس..." />);
    expect(screen.getByPlaceholderText("سؤالت را بنویس...")).toBeInTheDocument();
  });

  it("forwards the value prop", () => {
    render(<Input type="text" value="مقدار" readOnly onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("مقدار");
  });

  it("applies a custom className", () => {
    render(<Input type="text" className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("uses theme border tokens", () => {
    render(<Input type="text" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-app-border");
  });
});
