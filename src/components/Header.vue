<template>
  <v-app-bar app color="primary">
    <v-toolbar-title class="ml-6">
      <router-link to="/">
        <v-img max-height="40" src="https://escriba.com.br/wp-content/themes/escriba/assets/images/logo.png" />
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn to="/people" class="white--text">Pessoas</v-btn>

    </v-toolbar-items>
  </v-app-bar>
</template>

<style lang="scss" scoped>
@import "../scss/app.scss";
.v-app-bar {
  box-shadow: $borderShadow;
}

.v-btn {
  background-color: $backgroundBlack;
  color: $TextColor;
  font-weight: bold;
  transition: background-color 0.5s;
}

.v-btn:hover {
  background-color: $backgroundYellow;
}
</style>
