
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';
import Recipe from './models/Recipe';

/* Global State of the App
search object
current recipe object
shopping list object
liked recipes
*/
const state = {};

// ******* RECIPE CONTROLLER *******

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  if (id) {
    // prepare ui for changes

    // create new recipe object
    state.recipe = new Recipe(id);
    try {
      // get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      // call time and servings
      state.recipe.calcServings();
      state.recipe.calcTime();
      // render recipe
    } catch (err) {
      alert(err);
    }

  }
}
// multiple event listeners
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



// ******* SERACH CONTROLLER *******
const controlSearch = async () => {
  // get the query from the view
  const query = searchView.getInput();

  if (query){
    // new search object and add to State
    state.search = new Search(query);

    // prepare ui for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

try{
  // search for recipes
  await state.search.getResults();

  // render results on ui
  clearLoader();
  searchView.renderResults(state.search.result);
} catch (err) {
  alert(err);
  clearLoader();
}

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
 const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});




/* url
forkify-api.herokuapp.com
search.js
const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
recipe.js
const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
  */
