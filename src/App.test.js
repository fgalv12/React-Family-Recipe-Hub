import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Family Recipe Hub App", () => {
  // Test if the app renders the header and navigation buttons
  test("renders the header and navigation buttons", () => {
    render(<App />);
    expect(screen.getByText("Family Recipe Hub")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  // Test if the RecipeList component is displayed when Home is clicked
  test("displays the RecipeList when Home is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Home"));
    expect(screen.getByText("Spaghetti")).toBeInTheDocument(); //If Spaghetti is one of the recipes
  });

  // Test if the RecipeForm component is displayed when Add is clicked
  test("displays the RecipeForm when Add is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByPlaceholderText("Recipe Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Instructions (separate by periods)")
    ).toBeInTheDocument();
  });

  // Test if clicking a recipe displays the RecipeDetail component
  test("displays the RecipeDetail when a recipe is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Spaghetti"));
    expect(screen.getByText("Ingredients:")).toBeInTheDocument();
    expect(screen.getByText("Instructions:")).toBeInTheDocument();
  });

  // Test if the search functionality works correctly
  test("filters recipes based on the search term", () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText("Search for recipes");
    fireEvent.change(searchInput, { target: { value: "Pecan Pie" } });
    fireEvent.click(screen.getByText("Search"));
    expect(screen.queryByText("Spaghetti")).not.toBeInTheDocument();
    expect(screen.getByText("Pecan Pie")).toBeInTheDocument();
  });

  // Test if the Home button clears the search and resets the view
  test("resets the search and view when Home is clicked", () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText("Search for recipes");
    fireEvent.change(searchInput, { target: { value: "Pecan Pie" } });
    fireEvent.click(screen.getByText("Search"));
    expect(screen.getByText("Pecan Pie")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Home"));
    expect(searchInput.value).toBe("");
    expect(screen.getByText("Spaghetti")).toBeInTheDocument(); //If default recipe
  });

  // Test if handleSaveRecipe correctly adds a new recipe
  test("adds a new recipe when handleSaveRecipe is called", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Add"));
    // Simulate filling out the RecipeForm
    fireEvent.change(screen.getByPlaceholderText("Recipe Name"), {
      target: { value: "New Recipe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Dessert" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Ingredients (separate by commas)"),
      { target: { value: "Sugar, Flour, Butter" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Instructions (separate by periods)"),
      { target: { value: "Mix ingredients. Bake for 30 minutes." } }
    );

    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("New Recipe")).toBeInTheDocument();
  });

  // Test if editing a recipe works and displays the form with the correct values
  test("displays the RecipeForm with existing data when editing a recipe", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Spaghetti"));
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByPlaceholderText("Recipe Name").value).toBe("Spaghetti");
    expect(
      screen.getByPlaceholderText("Instructions (separate by periods)").value
    ).toContain("Boil water in a pot.");
  });

  // Test if a recipe can be deleted
  test("deletes a recipe when the Delete button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Spaghetti"));
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.queryByText("Spaghetti")).not.toBeInTheDocument();
  });
});
