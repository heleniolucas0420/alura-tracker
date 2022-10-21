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
import { TIPOS_NOTIFICACAO } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';

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
      if (!tarefa.projeto) {
        this.notificar(
          TIPOS_NOTIFICACAO.FALHA,
          'Erro ao adicionar tarefa',
          'Ups :( Erro ao adicionar uma nova tarefa. Selecione um projeto'
        );

        return;
      }
      this.store.commit(TIPOS_MUTACOES.ADICIONAR_TAREFA, tarefa);
      this.notificar(
        TIPOS_NOTIFICACAO.SUCESSO,
        'Tarefa adicionada com sucesso',
        'Boa :) Você completou mais uma tarefa!'
      );
    },
  },
  setup() {
    const store = useStore(key);
    const { notificar } = useNotificador();
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
      notificar,
    };
  },
});
</script>
