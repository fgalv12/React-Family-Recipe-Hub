describe('Recipe Hub App', () => {
  //Test if the Recipe Hub App can be accessed
  it('should access the Family Recipe Hub App', () => {
    cy.visit('http://localhost:3000')
  })

  //Test if the view can be reset when the Home button is clicked
  it('should reset the search and display all recipes when Home is clicked', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Search for recipes"]').type('Spaghetti');
    cy.get('button').contains('Search').click();
    cy.get('.recipe-card').contains('Spaghetti').should('be.visible');
    cy.get('button').contains('Home').click();
    cy.get('input[placeholder="Search for recipes"]').should('have.value', '');
    cy.get('.recipe-card').should('contain', 'Spaghetti');
    cy.get('.recipe-card').should('contain', 'Pecan Pie');
  });

  //Test if the search functionality works
  it('should allow users to search and view a recipe', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Search for recipes"]').type('Spaghetti');
    cy.get('button').contains('Search').click();
    cy.get('.recipe-card').contains('Spaghetti').click();
    cy.get('.recipe-name').should('contain', 'Spaghetti');
  });

  //Test if the add functionality works
  it('should allow users to add a new recipe', () => {
    cy.visit('http://localhost:3000');
    cy.get('button').contains('Add').click();
    cy.get('input[placeholder="Recipe Name"]').type('New Recipe');
    cy.get('input[placeholder="Category"]').type('Dinner');
    cy.get('textarea[placeholder="Instructions (separate by periods)"]').type('Step 1. Step 2.');
    cy.get('button').contains('Save').click();
    cy.get('.recipe-list').contains('New Recipe').should('be.visible');
  });

  //Test if the edit functionality works
  it('should allow users to edit an existing recipe', () => {
    cy.visit('http://localhost:3000');
    cy.get('.recipe-card').contains('Spaghetti').click();
    cy.get('button').contains('Edit').click();
    cy.get('input[placeholder="Recipe Name"]').clear().type('Updated Spaghetti');
    cy.get('textarea[placeholder="Instructions (separate by periods)"]').clear().type('Boil water. Add spaghetti. Cook for 10 minutes.');
    cy.get('button').contains('Save').click();
    cy.get('.recipe-list').contains('Updated Spaghetti').should('be.visible');
  });

  //Test if different views can be navigated
  it('should navigate between different views', () => {
    cy.visit('http://localhost:3000');
    // Check that the home page initially displays recipes
    cy.get('.recipe-card').contains('Spaghetti').should('be.visible');
    // Click the "Add" button and check that the form is displayed
    cy.get('button').contains('Add').click();
    cy.get('input[placeholder="Recipe Name"]').should('be.visible');
    // Click the "Home" button and verify that the home page is displayed again
    cy.get('button').contains('Home').click();
    cy.get('.recipe-card').contains('Spaghetti').should('be.visible');
    // Click on a recipe to view its details
    cy.get('.recipe-card').contains('Spaghetti').click();
    cy.get('.recipe-name').should('contain', 'Spaghetti');
  });

  //Test if the delete functionality works
  it('should allow users to delete a recipe', () => {
    cy.visit('http://localhost:3000');
    cy.get('.recipe-card').contains('Spaghetti').click();
    cy.get('button').contains('Delete').click();
    cy.get('.recipe-list').should('not.contain', 'Spaghetti');
  });

  //Test if the input validation works
  it('should show validation messages on empty form submission', () => {
    cy.visit('http://localhost:3000');
    cy.get('button').contains('Add').click();
    cy.get('button').contains('Save').click();
    cy.get('input[placeholder="Recipe Name"]:invalid').should('exist');
    cy.get('textarea[placeholder="Instructions (separate by periods)"]:invalid').should('exist');
  }); 
})
