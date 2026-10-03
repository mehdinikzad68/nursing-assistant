import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>کلیک کن</Button>);
    expect(screen.getByText("کلیک کن")).toBeInTheDocument();
  });

  it("applies primary variant class", () => {
    render(<Button variant="primary">اصلی</Button>);
    expect(screen.getByText("اصلی")).toHaveClass("bg-brand");
  });

  it("applies large size class", () => {
    render(<Button size="lg">بزرگ</Button>);
    expect(screen.getByText("بزرگ")).toHaveClass("min-h-[48px]");
  });

  it("calls onClick handler", () => {
    let clicked = false;
    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        کلیک
      </Button>,
    );
    screen.getByText("کلیک").click();
    expect(clicked).toBe(true);
  });

  it("has a 44px min touch target by default", () => {
    render(<Button>دکمه</Button>);
    expect(screen.getByText("دکمه")).toHaveClass("min-h-[44px]");
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>غیرفعال</Button>);
    expect(screen.getByText("غیرفعال")).toBeDisabled();
  });
});
