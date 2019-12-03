
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

/* Global State of the App
search object
current recipe object
shopping list object
liked recipes
*/
const state = {};

const controlSearch = async () => {
  // get the query from the view
  const query = searchView.getInput();

  if (query){
    // new search object and add to State
    state.search = new Search(query);

    // prepare ui for results
    searchView.clearInput();
    searchView.clearResults();

    // search for recipes
    await state.search.getResults();

    // render results on ui
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});






/* url
forkify-api.herokuapp.com
search.js
const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
recipe.js
const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
  */
