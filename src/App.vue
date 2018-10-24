<template>
  <div id="tabBarApp">
    <!--<img src="./assets/image.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

#app {

}
  * {
    margin: 0;
    padding: 0;
  }
  ul li {
    outline: none;
    list-style: none;
  }
</style>
