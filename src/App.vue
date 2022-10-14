<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @ao-tema-alterado="alterarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <router-view></router-view> <!-- onde serão renderizadas as rotas -->
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
  },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    alterarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style>
.lista {
  padding: 2.5rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2d2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
