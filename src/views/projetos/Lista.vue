<template>
  <router-link to="/projetos/novo" class="button">
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>
    <span>Novo projeto</span>
  </router-link>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.nome }}</td>
        <td>
          <router-link :to="`/projetos/${projeto.id}`" class="button">
            <span class="icon is-small">
              <i class="fas fa-pencil-alt"></i>
            </span>
          </router-link>
          <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { computed } from '@vue/reactivity';
import { TIPOS_ACOES } from '@/store/tipo-acoes';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Lista',
  methods: {
    excluir(id: string) {
      this.store.dispatch(TIPOS_ACOES.REMOVER_PROJETO, id)
    }
  },
  setup() {
    const store = useStore(key);
    return {
      store,
      projetos: computed(() => store.state.projeto.projetos),
    };
  },
});
</script>

<style scoped>
.projectos {
  padding: 1.5rem;
}
</style>
