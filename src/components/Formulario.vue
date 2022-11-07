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
              v-for="projeto in projetos"
              :value="projeto.id"
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
import { defineComponent, ref, computed} from 'vue';
import Temporizador from './Temporizador.vue';
import ITarefa from '@/interfaces/ITarefa';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  setup(props, { emit }) {
    const store = useStore(key);
    const projetos = computed(() => store.state.projeto.projetos);
    const descricao = ref('');
    const idProjeto = ref('');

    const finalizar = (tempoDecorrido: number): void => {
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((project) => project.id === idProjeto.value),
      } as ITarefa);
      descricao.value = '';
    };

    return {
      projetos,
      descricao,
      idProjeto,
      finalizar,
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
