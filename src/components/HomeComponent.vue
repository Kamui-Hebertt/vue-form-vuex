<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="100" src="https://escriba.com.br/wp-content/themes/escriba/assets/images/logo.png" />

      <div class="text-body-2 font-weight-light mt-2">Bem vindo ao desafio técnico</div>
      <div class="py-14" />
      <v-row class="d-flex align-center justify-center">


        <v-col cols="auto">
          <p class=" font-weight-bold">Clique abaixo para visualizar</p>
          <router-link to="/people">
            <v-btn class="btn"> Pessoas </v-btn>
          </router-link>
        </v-col>


      </v-row>
    </v-responsive>
  </v-container>
</template>

<style lang="scss" scoped>
@import "../scss/app.scss";


.btn {
  margin-top: 3rem;
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
