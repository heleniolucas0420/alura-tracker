<template>
  <div class="notificacoes">
    <article
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
      class="message"
      :class="contexto[notificacao.tipo]"
    >
      <div class="message-header">
        <p>{{ notificacao.titulo }}</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { key } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { TIPOS_NOTIFICACAO } from '@/interfaces/INotificacao';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Notificacao',
  data() {
    return {
      contexto: {
        [TIPOS_NOTIFICACAO.SUCESSO]: 'is-success',
        [TIPOS_NOTIFICACAO.ATENCAO]: 'is-warning',
        [TIPOS_NOTIFICACAO.FALHA]: 'is-danger',
      },
    };
  },
  setup() {
    const store = useStore(key);

    return {
      store,
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
}
</style>
