<template>
  <div class="notificacoes">
    <article class="message is-success">
      <div class="message-header">
        <p>Success</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">Notificação de mensagem</div>
    </article>
    <article class="message is-warning">
      <div class="message-header">
        <p>Warning</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">Notificação de mensagem</div>
    </article>
    <article class="message is-danger">
      <div class="message-header">
        <p>Error</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">Notificação de mensagem</div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Notificacao',
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
