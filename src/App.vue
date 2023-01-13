<template>
  <div id="app">
    <SideBar />
    <router-view />
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0
}

html,
body,
#app {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  /* -webkit-font-smoothing 是webkit在自己的渲染引擎中增加的对字体抗锯齿的调整。这个属性仅在 Mac OS X/macOS 下生效。平滑像素级别的字体 */
  -webkit-font-smoothing: antialiased;
  /*  Firefox的 -moz-osx-font-smoothing 这个属性仅在 Mac OS X / macOS 下生效.用灰度抗锯齿渲染文本 */
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}

a {
  text-decoration: none;
  color: #444;
}

ul,
li {
  list-style: none;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}
#app{
  display: flex;
  align-items: stretch;
}
</style>
