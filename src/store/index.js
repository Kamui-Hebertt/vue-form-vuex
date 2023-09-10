import { createStore } from "vuex";
/* import postsModule from './posts'; */
import peopleModule from './users';
/* import gradesModule from './grades'; */

const store = createStore({
  modules: {
  /*   posts: postsModule, */
    people: peopleModule,
  /*   grades: gradesModule */
  }
});


export default store;
