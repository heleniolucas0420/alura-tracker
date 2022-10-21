<template>
  <form @submit.prevent="salvar">
    <div class="field">
      <label for="nomeDoProjecto" class="label">Nome do Projecto</label>
      <input
        type="text"
        class="input"
        v-model="nomeDoProjecto"
        id="nomeDoProjecto"
      />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';
import { TIPOS_NOTIFICACAO } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (projecto) => projecto.id === this.id
      );

      this.nomeDoProjecto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeDoProjecto: '',
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(TIPOS_MUTACOES.ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjecto,
        });
      } else {
        this.store.commit(
          TIPOS_MUTACOES.ADICIONAR_PROJETO,
          this.nomeDoProjecto
        );
      }

      this.notificar(
        TIPOS_NOTIFICACAO.SUCESSO,
        'Novo projecto adicionado',
        'Prontinho :) O seu projecto já está disponível para uso'
      );

      this.nomeDoProjecto = '';
      this.$router.push('/projetos');
    },
  },
  setup() {
    const store = useStore(key);
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>

<style>
.projectos {
  padding: 1.5rem;
}
</style>
