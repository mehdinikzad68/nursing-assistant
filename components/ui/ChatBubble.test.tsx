import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatBubble } from "./ChatBubble";

describe("ChatBubble", () => {
  it("renders children", () => {
    render(<ChatBubble role="assistant">پاسخ دستیار</ChatBubble>);
    expect(screen.getByText("پاسخ دستیار")).toBeInTheDocument();
  });

  it("right-aligns assistant messages", () => {
    const { container } = render(<ChatBubble role="assistant">پاسخ دستیار</ChatBubble>);
    expect(container.querySelector(".chat-bubble")).toHaveClass("justify-end");
  });

  it("left-aligns user messages", () => {
    const { container } = render(<ChatBubble role="user">پیام کاربر</ChatBubble>);
    expect(container.querySelector(".chat-bubble")).toHaveClass("justify-start");
  });

  it("styles the assistant bubble with theme tokens", () => {
    render(<ChatBubble role="assistant">پاسخ</ChatBubble>);
    const bubble = screen.getByText("پاسخ").closest("div");
    expect(bubble).toHaveClass("bg-chip-teal-bg");
  });
});
