<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
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

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  data() {
    return {
      descricao: '',
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
      } as ITarefa);
      this.descricao = '';
    },
  },
});
</script>

<style>
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>