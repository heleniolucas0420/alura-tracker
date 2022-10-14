<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qaul tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizar" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import ITarefa from '@/interfaces/ITarefa';
import { useStore } from 'vuex';
import { key } from '@/store';
import { computed } from '@vue/reactivity';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  data() {
    return {
      descricao: '',
      idProjeto: '',
    };
  },
  components: {
    Temporizador,
  },
  methods: {
    finalizar(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find((project) => project.id === this.idProjeto),
      } as ITarefa);
      this.descricao = '';
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projetos),
    };
  },
});
</script>

<style>
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
