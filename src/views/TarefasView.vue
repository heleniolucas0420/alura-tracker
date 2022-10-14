<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <!-- Lista de Tarefas -->
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import ITarefa from '../interfaces/ITarefa';
import { useStore } from 'vuex';
import { key } from '@/store';
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';

export default defineComponent({
  name: 'TarefasView',
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.commit(TIPOS_MUTACOES.ADICIONAR_TAREFA, tarefa);
    },
  },
  setup() {
    const store = useStore(key);
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    }
  }
});
</script>
