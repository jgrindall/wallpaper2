<template>
  <div class="hello">
    <canvas ref="canvas" width="1024" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {Points, Point, Edge} from '@/types'
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
    gr.lineStyle(2, 0xffffff)

    const getPt = (i:number)=>this.points.pts[i]
    
    this.points.edges.forEach( (edge:Edge, i:number) => {
      const pa = getPt(edge.a)
      const pb = getPt(edge.b)

      gr.moveTo(pa.x, pa.y)
      gr.lineTo(pb.x, pb.y)
    })

    app.stage.addChild(gr)
  }
})

</script>

<style scoped>
  canvas{
    border:2px solid #ccc;
  }
</style>