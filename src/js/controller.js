import * as model from './model.js';
import recipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
    
    // 2) Rendering recipe
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    // TEST
    controlServeings();
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controllSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    
    // 2) Load search results
    await model.loadSearchResults(query);
    
    // 3) Render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
    
    // 4) Render initial pagination page
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controllPagination = function (goToPage) {
  // 1) Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW initial pagination page
  paginationView.render(model.state.search);
};

const controlServeings = function () {
  // Update the recipe servings (in state)
  model.updateServings(8);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  searchView.addHandlerSearch(controllSearchResults);
  paginationView.addHandlerClick(controllPagination);
};

init();
