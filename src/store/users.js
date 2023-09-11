import axios from 'axios';
import personApi from '@/server/api';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const Store = {
  state: {
    people: [],
  },
  mutations: {
    setPeople(state, people) {
      state.people = people;
    },
    addPerson(state, person) {
      state.people.push(person);
    },
    removePerson(state, personId) {
      state.people = state.people.filter(person => person.id !== personId);
    },
  },
  actions: {
    async fetchPeople({ commit }) {
      try {
        const response = await personApi.get('/'); 
        commit('setPeople', response.data);
      } catch (error) {
        console.error('Error fetching people:', error);

      }
    },
    async addPerson({ commit }, newPerson) {
      try {
        const response = await personApi.post('/', newPerson);
        newPerson.id = response.data.id;
        commit('addPerson', newPerson);
      } catch (error) {
        console.error('Error adding person:', error);

      }
    },
    async removePerson({ commit }, personId) {
      try {
        await personApi.delete(`/${personId}`);
        commit('removePerson', personId);
      } catch (error) {
        console.error('Error removing person:', error);

      }
    },
  },
  getters: {
    getPeople(state) {
      return state.people;
    },
  },
};

export default Store;
