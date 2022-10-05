<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos" />
    <Botao :desabilitado="cronometroRodando" texto="play" icone="fas fa-play" @clicado="iniciar" />
    <Botao :desabilitado="!cronometroRodando" texto="stop" icone="fas fa-stop" @clicado="finalizar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Temporizador',
  emits: ['aoTemporizadorFinalizado'],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  components: {
    Cronometro,
    Botao,
  },
  methods: {
    iniciar(): void {
      // começar a contagen
      // 1s = 1000ms
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar(): void {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>
