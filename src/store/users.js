import axios from 'axios';
import personApi from '@/server/api'; // Import 'personApi'

axios.defaults.baseURL = process.env.VUE_APP_API_URL; // Set the base URL for axios

const Store = {
  state: {
    people: [], // Initialize an empty array for people
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
        const response = await personApi.get('/'); // Use 'personApi' for API requests
        commit('setPeople', response.data);
      } catch (error) {
        console.error('Error fetching people:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    },
    async addPerson({ commit }, newPerson) {
      try {
        const response = await personApi.post('/', newPerson); // Use 'personApi' for API requests
        newPerson.id = response.data.id; // Use the ID returned from the server
        commit('addPerson', newPerson);
      } catch (error) {
        console.error('Error adding person:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    },
    async removePerson({ commit }, personId) {
      try {
        await personApi.delete(`/${personId}`); // Use 'personApi' for API requests
        commit('removePerson', personId);
      } catch (error) {
        console.error('Error removing person:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    },
  },
  getters: {
    getPeople(state) {
      return state.people;
    },
  },
};

export default Store; // Export the store object as default
