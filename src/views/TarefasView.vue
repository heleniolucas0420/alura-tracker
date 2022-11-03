<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <!-- Lista de Tarefas -->
  <div class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @ao-clicar-tarefa="selecionarTarefa"
    />
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </section>
        <i class="fa-solid fa-shield-halved"></i>
        <footer class="modal-card-foot">
          <button @click="salvarAlteracoes" class="button is-success">Salvar Aterações</button>
          <button @click="fecharModal" class="button">Cancel</button>
        </footer>
      </div>
    </div>
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
import { TIPOS_NOTIFICACAO } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { TIPOS_ACOES } from '@/store/tipo-acoes';

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
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      if (!tarefa.projeto) {
        this.notificar(
          TIPOS_NOTIFICACAO.FALHA,
          'Erro ao adicionar tarefa',
          'Ups :( Erro ao adicionar uma nova tarefa. Selecione um projeto',
          5000
        );

        return;
      }

      this.store.dispatch(TIPOS_ACOES.CADASTRAR_TAREFA, tarefa).then(() => {
        this.notificar(
          TIPOS_NOTIFICACAO.SUCESSO,
          'Tarefa adicionada com sucesso',
          'Boa :) Você completou mais uma tarefa!'
        );
      });
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    salvarAlteracoes() {
      this.store.dispatch(TIPOS_ACOES.ALTERAR_TAREFA, this.tarefaSelecionada).then(() => {
        this.tarefaSelecionada = null;
        this.notificar(
          TIPOS_NOTIFICACAO.SUCESSO,
          'Tarefa alterada com sucesso',
          'Falhou o nome é? mais cuidado da próxima vez ;)'
        );
      })
    }
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
