<template>
  <div class="hello">
    <canvas ref="canvas" width="1024" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {Points} from '@/types'
import * as PIXI from "pixi.js"

export default defineComponent({
  components:{
    
  },
  props:{
    points:{
      required: true,
      type: Object as PropType<Points>
    }
  },
  mounted(){
    const ref = this.$refs["canvas"] as HTMLCanvasElement
    var app = new PIXI.Application({
      width: 1024,
      height: 500,
      backgroundColor: 0x2c3e50,
      view: ref
    })

    const gr  = new PIXI.Graphics()
    gr.beginFill(0xdddddd, 0.5)
    
    this.points.pts.forEach(p=>{
      gr.drawCircle(p.x, p.y, 10)
    
    })
    
    gr.endFill()
    app.stage.addChild(gr)
  }
})

</script>

<style scoped>
  canvas{
    border:2px solid #ccc;
  }
</style>