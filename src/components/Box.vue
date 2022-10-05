<template>
  <div class="box has-text-weight-bold" :style="estilo">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Box',
  data() {
    return {
      estilo: {
        background: '#faf0ca',
      }
    }
  }
});
</script>
