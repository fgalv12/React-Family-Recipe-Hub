import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RecipeDetail from "./RecipeDetail";

describe("RecipeDetail Component", () => {
  // Test to ensure recipe details are rendered correctly
  test("renders recipe details", () => {
    const recipe = {
      name: "Spaghetti",
      category: "Dinner",
      image: "spaghetti.jpg",
      ingredients: ["1 Cup of Spaghetti", "1/2 Cup of Marinara Sauce"],
      instructions: ["Boil water in a pot.", "Add spaghetti to boiling water."],
    };

    render(
      <RecipeDetail recipe={recipe} onEdit={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText("Spaghetti")).toBeInTheDocument();
    expect(screen.getByText("Dinner")).toBeInTheDocument();
    expect(screen.getByText("1 Cup of Spaghetti")).toBeInTheDocument();
    expect(screen.getByText("Boil water in a pot.")).toBeInTheDocument();
    expect(screen.getByAltText("Spaghetti")).toBeInTheDocument();
  });

  // Test if Edit button calls the onEdit handler with the correct recipe
  test("calls onEdit handler when Edit button is clicked", () => {
    const recipe = { name: "Spaghetti", category: "Dinner" };
    const onEdit = jest.fn();

    render(
      <RecipeDetail recipe={recipe} onEdit={onEdit} onDelete={() => {}} />
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith(recipe);
  });

  // Test if Delete button calls the onDelete handler with the correct recipe
  test("calls onDelete handler when Delete button is clicked", () => {
    const recipe = { name: "Spaghetti", category: "Dinner" };
    const onDelete = jest.fn();

    render(
      <RecipeDetail recipe={recipe} onEdit={() => {}} onDelete={onDelete} />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith(recipe);
  });

  // Test for XSS prevention
  test("does not render potentially harmful HTML in user input", () => {
    render(
      <RecipeDetail
        recipe={{ name: '<script>alert("XSS")</script>', category: "Test" }}
      />
    );
    expect(screen.getByText(/<script>alert/)).toBeInTheDocument(); // HTML tags should be escaped
  });
});
