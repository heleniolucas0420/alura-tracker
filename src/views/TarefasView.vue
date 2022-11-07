<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <!-- Lista de Tarefas -->
  <div class="lista">
    <Box v-if="listaEstaVazia && !filtro">
      Você não está muito produtivo hoje :(
    </Box>
    <div class="field" v-if="!listaEstaVazia || filtro">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Pesquise uma tarefa"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @ao-clicar-tarefa="selecionarTarefa"
    />
    <Modal :mostrar="tarefaSelecionada !== null">
      <template #cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <buttton
          @click="fecharModal"
          class="delete"
          aria-label="close"
        ></buttton>
      </template>
      <template #corpo>
        <label for="descricaoDaTarefa" class="label">Descrição</label>
        <input
          type="text"
          class="input"
          v-model="tarefaSelecionada.descricao"
          id="descricaoDaTarefa"
        />
      </template>
      <template #rodape>
        <button @click="salvarAlteracoes" class="button is-success">
          Salvar Aterações
        </button>
        <button @click="fecharModal" class="button">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import Modal from '@/components/Modal.vue';
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
    Modal,
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
      this.store
        .dispatch(TIPOS_ACOES.ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => {
          this.fecharModal();
          this.notificar(
            TIPOS_NOTIFICACAO.SUCESSO,
            'Tarefa alterada com sucesso',
            'Falhou o nome é? mais cuidado da próxima vez ;)'
          );
        });
    },
  },
  setup() {
    const store = useStore(key);
    const { tarefa } = store.state;
    const { notificar } = useNotificador();
    const filtro = ref('');

    // const tarefas = computed(() =>
    //   tarefa.tarefas.filter(
    //     (tar) => !filtro.value || tar.descricao.toLocaleLowerCase().includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(TIPOS_ACOES.OBTER_TAREFAS, filtro.value);
    });

    return {
      store,
      tarefas: computed(() => tarefa.tarefas),
      notificar,
      filtro,
    };
  },
});
</script>
