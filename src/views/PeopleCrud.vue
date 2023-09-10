<template>
  <div class="data-table-container">
    <!-- filter -->
    <div class="filter-controls">
      <v-text-field
        v-model="filterName"
        label="Proucurar por Nome"
        @input="applyFilters"
      ></v-text-field>
      <v-text-field
        v-model="filterCpf"
        label="Proucurar por CPF"
        @input="applyFilters"
      ></v-text-field>
    </div>
    <v-btn @click="openAddDialog" class="mb-2 tableBtn"
      >Adicionar Usuário</v-btn
    >

    <!-- Add Data Dialog -->
    <v-dialog v-model="dialogAddData" max-width="400">
      <v-card>
        <v-card-title>Adicionar Detalhes</v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Nome"></v-text-field>
          <v-text-field v-model="cpf" label="Cpf" maxlength="14"></v-text-field>
          <v-text-field
            placeholder="dd/mm/yyyy"
            v-model="dataNascimento"
            label="Data de Nascimento"
          />
        </v-card-text>
        <v-card-actions class="mt-n5 border border-black">
          <v-btn class="tableBtn" @click="register">Salvar</v-btn>
          <v-btn class="tableBtn" @click="closeAddDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- table -->
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Cpf</th>
          <th>Data de Nascimento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) in filteredPeople" :key="person.id">
          <td>{{ person.id }}</td>
          <td>{{ person.nome }}</td>
          <td>{{ person.cpf }}</td>
          <td>{{ person.dataNascimento }}</td>
          <td class="separate">
            <v-btn class="tableBtn" @click="editItem(index)">EDITAR</v-btn>
            <v-btn class="tableBtn" @click="deleteItem(person.id)"
              >DELETAR</v-btn
            >
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Data Dialog -->
    <v-dialog v-model="showEditForm" max-width="400">
      <v-card>
        <v-card-title>Editar Detalhes</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.nome" label="Name"></v-text-field>
          <v-text-field v-model="editedItem.cpf" label="Cpf"></v-text-field>
          <v-text-field
            v-model="editedItem.dataNascimento"
            label="Data de Nascimento"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="ml-3 mt-n5">
          <v-btn class="tableBtn" @click="updateItem">Editar</v-btn>
          <v-btn class="tableBtn" @click="cancelEdit">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="dialogVisible" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar Ação</v-card-title>
        <v-card-text
          >Você tem certeza que deseja deletar o usuário?</v-card-text
        >
        <v-card-actions>
          <v-btn class="tableBtn" text @click="cancelAction">Cancelar</v-btn>
          <v-btn class="tableBtn" text @click="executeAction">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";

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

    function isValidCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");

      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

      let sum = 0;
      let remainder;

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }

      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }

      if (remainder !== parseInt(cpf.substring(9, 10))) return false;

      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }

      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }

      if (remainder !== parseInt(cpf.substring(10, 11))) return false;

      return true;
    }

    // Add a new person
    const register = async () => {
      try {
        const newPerson = {
          id: people.value.length + 1,
          nome: name.value,
          cpf: cpf.value,
          dataNascimento: dataNascimento.value,
        };

        if (isValidCPF(newPerson.cpf)) {
          console.log(`${newPerson.cpf} é um CPF válido.`);
        } else {
          console.log(`${newPerson.cpf} é um CPF inválido.`);
        }

        const response = await peopleApi.post("/", newPerson);
        console.log(newPerson);

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
        const response = await peopleApi.put(
          `/${editedItem.value.id}`,
          editedItem.value
        );

        if (response.status === 200) {
          const index = people.value.findIndex(
            (person) => person.id === editedItem.value.id
          );

          if (index !== -1) {
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
            const index = people.value.findIndex(
              (person) => person.id === itemToDeleteId.value
            );
            if (index !== -1) {
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

    // Filtering
    const filterName = ref("");
    const filterCpf = ref("");

    const filteredPeople = computed(() => {
      let filtered = [...people.value];

      if (filterName.value) {
        const keyword = filterName.value.toLowerCase();
        filtered = filtered.filter((person) =>
          person.nome.toLowerCase().includes(keyword)
        );
      }

      if (filterCpf.value) {
        const keyword = filterCpf.value.toLowerCase();
        filtered = filtered.filter((person) =>
          person.cpf.toLowerCase().includes(keyword)
        );
      }

      return filtered;
    });

    const applyFilters = () => {
      // Triggered when the filter fields change
      // Update the filteredPeople computed property
    };
    watchEffect(() => {
      const cleanedCpf = cpf.value.replace(/\D/g, "");

      const formattedCpf = `${cleanedCpf.slice(0, 3)}.${cleanedCpf.slice(
        3,
        6
      )}.${cleanedCpf.slice(6, 9)}-${cleanedCpf.slice(9, 11)}`;

      cpf.value = formattedCpf;
    });

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
      itemToDeleteId,
      filterName,
      filterCpf,
      filteredPeople,
      openAddDialog,
      closeAddDialog,
      register,
      editItem,
      updateItem,
      cancelEdit,
      deleteItem,
      cancelAction,
      executeAction,
      applyFilters,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
.data-table-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.separate {
  display: flex;
  gap: 1rem;
}

/* Style the "ADD DATA" button */
.tableBtn {
  background-color: $backgroundBlack;
  color: $TextColor;

  &:hover {
    background-color: $backgroundYellow;
    transition-duration: 0.5s;
  }
}

/* Style the Add Data Dialog */
.v-dialog {
  border-radius: 8px;
}

/* Style the Filter Controls */
.filter-controls {
  gap: 1rem;
  width: 45rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

/* Style the Data Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: $TextColor;
}

.data-table th {
  background-color: $backgroundBlack;
  color: $TextColor;
  font-weight: bold;
  text-align: left;
  padding: 10px;
}

.data-table td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

.data-table tbody tr:hover {
  background-color: #f2f2f2;
}

/* Style the Edit Data Dialog */
.v-dialog.edit-dialog {
  border-radius: 8px;
}

/* Style the Confirmation Dialog */
.v-dialog.confirm-dialog {
  border-radius: 8px;
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
  .data-table-container {
    padding: 10px;
  }

  .filter-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-controls .v-text-field {
    width: 100%;
  }

  .data-table th,
  .data-table td {
    padding: 5px;
    font-size: 12px;
  }

  .separate {
    display: flex;
    flex-direction: column;
  }
}
</style>