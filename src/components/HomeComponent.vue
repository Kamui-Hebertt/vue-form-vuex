<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <h2 class="mt-2">Bem vindo ao desafio técnico</h2>
      <div class="py-14" />
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto" class="col-btns">
          <p class="font-weight-bold">Clique abaixo para visualizar</p>

          <router-link to="/people">
            <v-btn class="btn"> Pessoas </v-btn>
          </router-link>
          <v-spacer class="mb-2"></v-spacer>
          <v-btn class="btn" disabled> Produtos </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<style lang="scss" scoped>
@import "../scss/app.scss";

.btn {
  margin-top: 2rem;
  size: "x-large";
  background-color: $backgroundBlack;
  color: $TextColor;
  transition-duration: 0.5s;
  &:hover {
    background-color: $backgroundYellow;
    transition-duration: 0.5s;
  }
}
</style>
