<template>
  <section class="projectos">
    <h1 class="title">Projectos</h1>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { computed } from '@vue/reactivity';

export default defineComponent({
  name: 'ProjetosView',
  setup() {
    const store = useStore(key);
    return {
      store,
      projetos: computed(() => store.state.projeto.projetos),
    };
  },
});
</script>

<style scoped>
.projectos {
  padding: 1.5rem;
}
</style>
