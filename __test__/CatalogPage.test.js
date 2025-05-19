import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CatalogPage from "../app/list/page";

// Mock next/navigation useSearchParams
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn().mockImplementation((key) => {
      if (key === "q") return "test-query";
      return null;
    }),
  }),
}));

// Mock window.innerWidth and resize event for responsiveness
function setWindowWidth(width) {
  window.innerWidth = width;
  window.dispatchEvent(new Event("resize"));
}

describe("CatalogPage", () => {
  beforeEach(() => {
    // Default to desktop view
    setWindowWidth(1200);
  });

  it("renders main heading and product list", () => {
    render(<CatalogPage />);
    expect(screen.getByText(/🛍️ New Items 🛍️/i)).toBeInTheDocument();
    // ProductList should receive searchQuery from URL param (test-query)
    // Since ProductList is imported component, just check existence
    expect(screen.getByText(/🛍️ New Items 🛍️/i)).toBeTruthy();
  });

  it("shows sidebar filter on desktop", () => {
    render(<CatalogPage />);
    expect(screen.getByText("PRODUCT CONDITION")).toBeInTheDocument();
    expect(screen.getByText("FILTER BY PRICE")).toBeInTheDocument();
    expect(screen.getByText("ORDER BY")).toBeInTheDocument();
  });

  it("toggles mobile filter dropdown when button clicked", () => {
    setWindowWidth(500); // Mobile screen
    render(<CatalogPage />);
    const toggleBtn = screen.getByRole("button", { name: /Show Filters/i });
    expect(toggleBtn).toBeInTheDocument();

    // Initially dropdown hidden
    expect(screen.queryByText("PRODUCT CONDITION")).not.toBeInTheDocument();

    // Click button to show filter dropdown
    fireEvent.click(toggleBtn);
    expect(screen.getByText("PRODUCT CONDITION")).toBeInTheDocument();

    // Button text changes to Hide Filters
    expect(screen.getByRole("button", { name: /Hide Filters/i })).toBeInTheDocument();

    // Click again to hide dropdown
    fireEvent.click(screen.getByRole("button", { name: /Hide Filters/i }));
    expect(screen.queryByText("PRODUCT CONDITION")).not.toBeInTheDocument();
  });

  it("toggles product condition selection", () => {
    render(<CatalogPage />);
    const newCondition = screen.getByText("New");
    expect(newCondition).toBeInTheDocument();

    // Initially no selection => font-semibold text-blue-600 class absent
    expect(newCondition.className).not.toContain("font-semibold");

    // Click to select "New"
    fireEvent.click(newCondition);
    expect(newCondition.className).toContain("font-semibold");

    // Click again to deselect
    fireEvent.click(newCondition);
    expect(newCondition.className).not.toContain("font-semibold");
  });

  it("updates price range inputs", () => {
    render(<CatalogPage />);
    const minInput = screen.getByPlaceholderText("Min");
    const maxInput = screen.getByPlaceholderText("Max");

    // Change min price
    fireEvent.change(minInput, { target: { value: "10" } });
    expect(minInput.value).toBe("10");

    // Change max price
    fireEvent.change(maxInput, { target: { value: "100" } });
    expect(maxInput.value).toBe("100");
  });

  it("changes sort option when clicked", () => {
    render(<CatalogPage />);
    // Default sort option is "Default"
    const defaultOption = screen.getByText("Default");
    expect(defaultOption.className).toContain("bg-blue-100");

    const priceLowToHigh = screen.getByText("Price: Low to High");
    fireEvent.click(priceLowToHigh);

    // Now "Price: Low to High" should have selected class
    expect(priceLowToHigh.className).toContain("bg-blue-100");
    // Default option should lose selected class
    expect(defaultOption.className).not.toContain("bg-blue-100");
  });
});
