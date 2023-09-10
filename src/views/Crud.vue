<template>
  <div class="data-table-container">
    <v-btn @click="openAddDialog" class="mt-3" color="blue">ADD DATA</v-btn>

    <!-- Add Data Dialog -->
    <v-dialog v-model="dialogAddData" max-width="400">
      <v-card>
        <v-card-title>ADD Details</v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-text-field v-model="cpf" label="Cpf"></v-text-field>
          <v-text-field v-model="dataNascimento" label="Data de Nascimento"></v-text-field>
        </v-card-text>
        <v-card-actions class="mt-n5">
          <v-btn color="primary" @click="register">Save</v-btn>
          <v-btn @click="closeAddDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Data Table -->
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Cpf</th>
          <th>Data de Nascimento</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) in people" :key="person.id">
          <td>{{ person.id }}</td>
          <td>{{ person.nome }}</td>
          <td>{{ person.cpf }}</td>
          <td>{{ person.dataNascimento }}</td>
          <td>
            <v-btn color="green" @click="editItem(index)">EDIT</v-btn>
            <v-btn color="red" @click="deleteItem(person.id)">DELETE</v-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Data Dialog -->
    <v-dialog v-model="showEditForm" max-width="400">
      <v-card>
        <v-card-title>Edit Details</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.nome" label="Name"></v-text-field>
          <v-text-field v-model="editedItem.cpf" label="Cpf"></v-text-field>
          <v-text-field v-model="editedItem.dataNascimento" label="Data de Nascimento"></v-text-field>
        </v-card-text>
        <v-card-actions class="ml-3 mt-n5">
          <v-btn color="primary" @click="updateItem">Update</v-btn>
          <v-btn @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="dialogVisible" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Action</v-card-title>
        <v-card-text>Are you sure you want to delete the item and fetch users?</v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="cancelAction">No</v-btn>
          <v-btn color="green" text @click="executeAction">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import peopleApi from "@/server/api";

export default defineComponent({
  name: "addPeople",

  setup() {
    // Data
    const people = ref([]);
    const dialogAddData = ref(false);
    const showEditForm = ref(false);
    const dialogVisible = ref(false);
    const name = ref("");
    const cpf = ref("");
    const dataNascimento = ref("");
    const editedItem = ref({
      id: null,
      nome: "",
      cpf: "",
      dataNascimento: "",
    });
    const itemToDeleteId = ref(null);

    // Fetch data on component mount
    const fetchPeople = async () => {
      try {
        const response = await peopleApi.get("/");
        people.value = response.data;
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    // Add a new person
    const register = async () => {
      try {
        const newPerson = {
          id: people.value.length + 1,
          nome: name.value,
          cpf: cpf.value,
          dataNascimento: dataNascimento.value,
        };

        const response = await peopleApi.post("/", newPerson);

        if (response.status === 201) {
          people.value.push(newPerson);
          closeAddDialog();
          name.value = "";
          cpf.value = "";
          dataNascimento.value = "";
        }
      } catch (error) {
        console.error("Error adding person:", error);
      }
    };

    // Open the add data dialog
    const openAddDialog = () => {
      dialogAddData.value = true;
    };

    // Close the add data dialog
    const closeAddDialog = () => {
      dialogAddData.value = false;
    };

    // Edit a person
    const editItem = (index) => {
      editedItem.value = { ...people.value[index] };
      showEditForm.value = true;
    };

  // Update a person
const updateItem = async () => {
  try {
    const response = await peopleApi.put(`/${editedItem.value.id}`, editedItem.value);

    if (response.status === 200) {
      // Find the index of the edited item in the people array
      const index = people.value.findIndex((person) => person.id === editedItem.value.id);

      if (index !== -1) {
        // Update the item in the people array
        people.value[index] = { ...editedItem.value };
        showEditForm.value = false;
      }
    }

    fetchPeople();

  } catch (error) {
    console.error("Error updating person:", error);
  }
};

    // Cancel the edit operation
    const cancelEdit = () => {
      showEditForm.value = false;
    };

    // Delete a person (show confirmation dialog)
    const deleteItem = (id) => {
      itemToDeleteId.value = id;
      dialogVisible.value = true;
    };

    // Cancel the action (close confirmation dialog)
    const cancelAction = () => {
      itemToDeleteId.value = null;
      dialogVisible.value = false;
    };

    // Execute the delete action
    const executeAction = async () => {
      if (itemToDeleteId.value !== null) {
        try {
          const response = await peopleApi.delete(`/${itemToDeleteId.value}`);

          if (response.status === 204) {
            const index = people.value.findIndex((person) => person.id === itemToDeleteId.value);
            if (index !== -1) {
              // Remove the deleted item from the people array
              people.value.splice(index, 1);
            }
          }
          fetchPeople();
          itemToDeleteId.value = null;
          dialogVisible.value = false;
        } catch (error) {
          console.error("Error deleting person:", error);
        }
      }
    };

    // Fetch data on component mount
    onMounted(fetchPeople);

    return {
      people,
      dialogAddData,
      showEditForm,
      dialogVisible,
      name,
      cpf,
      dataNascimento,
      editedItem,
      openAddDialog,
      closeAddDialog,
      register,
      editItem,
      updateItem,
      cancelEdit,
      deleteItem,
      cancelAction,
      executeAction,
    };
  },
});
</script>
