<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
console.clear()
import cvs from './canvas_main.ts'
import $ from 'jquery'
import drag_class from './drag.ts'

$(() => {
  const rt_cvs = new cvs($('#container')[0])
  const offset = -5
  var keyed: boolean = false
  var stoped: boolean = false
  var keywasd: any = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

  const d = async () => { // 移动检测Emm.eee.aaa....
    if (stoped) return

    if (keywasd.ArrowUp) {
      rt_cvs.moveCamera(0, -offset)
    }
    if (keywasd.ArrowDown) {
      rt_cvs.moveCamera(0, offset)
    }
    if (keywasd.ArrowLeft) {
      rt_cvs.moveCamera(-offset, 0)
    }
    if (keywasd.ArrowRight) {
      rt_cvs.moveCamera(offset, 0)
    }

    requestAnimationFrame(() => { d() })
  }

  /* 监听并设置 */
  // 键盘
  $('html').on('keydown', () => {
    if (keyed) return
    stoped = false
    keyed = true
    d()
  })
  $('html').on('keyup', () => {
    if (keywasd.ArrowDown == false && keywasd.ArrowUp == false && keywasd.ArrowLeft == false && keywasd.ArrowRight == false) {
      keyed = false
      stoped = true
    }
  })

  /* 键盘/触摸是否WASD */
  // 键盘
  $('html').on('keydown', (e) => {
    if (e.originalEvent == null) return
    keywasd[e.originalEvent.code] = true
  })
  $('html').on('keyup', (e) => {
    if (e.originalEvent == null) return
    keywasd[e.originalEvent.code] = false
  })
  // 触摸
  new drag_class($('html')[0], (e: any) => {
    rt_cvs.moveCamera(e.x, e.y)
  })
})
</script>