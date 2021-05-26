<template>
  <div id="app">
    <h1>DLExchanger</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router/router'

export default {
  name: 'App', router
}
</script>

<style>
h1 {
  background: blue;
  color: white;
  height: 40px;
  padding-left: 20px;
  border: solid;
  margin: -1%;
  padding: 10px;
}
</style>
