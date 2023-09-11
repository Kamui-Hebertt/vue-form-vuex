<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-footer class="footer" app>

    <div class="text-center">&copy; Feito por Hebertt Nascimento com ❤️</div>
  </v-footer>
</template>

<style lang="scss" scoped>
@import "../scss/app.scss";
.footer {
  display:flex;
  justify-content: center;
  background-color: $backgroundBlack;
  color: $TextColor;

  border:1px solid $TextColor;
}

.text-center {
  text-align: center;
}
</style>
