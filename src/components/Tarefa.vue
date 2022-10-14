<template>
  <Box>
    <div class="columns">
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
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tarefa',
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
      this.store.commit(TIPOS_MUTACOES.REMOVER_TAREFA, id);
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
