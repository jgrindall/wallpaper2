<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <CanvasView :points='getPoints()'></CanvasView>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import CanvasView from '@/components/CanvasView.vue';
import {points} from '@/points'

export default defineComponent({
  components:{
    HelloWorld,
    CanvasView
  },
  methods:{
    getPoints(){
      return reactive(points)
    }
  }
})
</script>
