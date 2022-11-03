<template>
  <Box>
    <div class="columns clicable" @click="tarefaClicada">
      <div class="column is-5">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || '' }}
      </div>
      <div class="column">
        <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" />
      </div>
      <button class="button ml-2 is-danger mr-2" @click="remover(tarefa.id)">
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
      </button>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';
import ITarefa from '@/interfaces/ITarefa';
import { useStore } from 'vuex';
import { key } from '@/store';
import { TIPOS_ACOES } from '@/store/tipo-acoes';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tarefa',
  emits: ['aoClicarTarefa'],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  components: {
    Cronometro,
    Box,
  },
  methods: {
    remover(id: string) {
      this.store.dispatch(TIPOS_ACOES.REMOVER_TAREFA, id);
    },
    tarefaClicada(): void {
      this.$emit('aoClicarTarefa', this.tarefa);
    },
  },
  setup() {
    const store = useStore(key);
    return {
      store,
    };
  },
});
</script>

<style scoped>
.clicable {
  cursor: pointer;
}
</style>
