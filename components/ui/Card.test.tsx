import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>محتوای کارت</Card>);
    expect(screen.getByText("محتوای کارت")).toBeInTheDocument();
  });

  it("applies a custom className", () => {
    render(<Card className="mb-3">کارت</Card>);
    expect(screen.getByText("کارت")).toHaveClass("mb-3");
  });

  it("accepts a style prop", () => {
    render(<Card style={{ textAlign: "center" }}>کارت</Card>);
    expect(screen.getByText("کارت")).toHaveStyle({ textAlign: "center" });
  });

  it("uses theme surface tokens", () => {
    render(<Card>کارت</Card>);
    expect(screen.getByText("کارت")).toHaveClass("bg-app-card");
  });
});
