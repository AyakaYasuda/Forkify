import * as model from './model.js';
import recipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    
    if (!id) return;
    recipeView.renderSpinner();
    
    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
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
    resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  searchView.addHandlerSearch(controllSearchResults);
};

init();
