<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components:{
    
  },
  props:{
    msg:{
      required: true,
    }
  }
})

</script>