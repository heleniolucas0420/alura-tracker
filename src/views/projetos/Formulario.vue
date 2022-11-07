<template>
  <form @submit.prevent="salvar">
    <div class="field">
      <label for="nomeDoProjecto" class="label">Nome do Projecto</label>
      <input
        type="text"
        class="input"
        id="nomeDoProjecto"
        v-model="nomeDoProjeto"
      />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { TIPOS_MUTACOES } from '@/store/tipos-mutacoes';
import { TIPOS_NOTIFICACAO } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { TIPOS_ACOES } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Formulario',
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore(key);
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref('');
    const router = useRouter();

    if (props.id) {
      const { projetos } = store.state.projeto;
      const projeto = projetos.find((projecto) => projecto.id === props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(TIPOS_ACOES.ALTERAR_PROJETO, {
            id:props.id,
            nome: nomeDoProjeto.value,
          })
          .then(({ data }) => {
            store.commit(TIPOS_MUTACOES.ALTERAR_PROJETO, data);
            nomeDoProjeto.value = '';
            router.push('/projetos');
          });
      } else {
        store
          .dispatch(TIPOS_ACOES.CADASTRAR_PROJETO, nomeDoProjeto)
          .then(({ data }) => {
            store.commit(TIPOS_MUTACOES.ADICIONAR_PROJETO, data);
            notificar(
              TIPOS_NOTIFICACAO.SUCESSO,
              'Novo projecto adicionado',
              'Prontinho :) O seu projecto já está disponível para uso'
            );
            nomeDoProjeto.value = '';
            router.push('/projetos');
          });
      }
    }

    return {
      nomeDoProjeto,
      salvar
    };
  },
});
</script>

<style>
.projectos {
  padding: 1.5rem;
}
</style>
