<template>
  <div class="box">
    <div class="subject">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
  & .subject {
    width: 100%;
    height: 100%;
    background-color: #aaaaaa;
  }
}
</style>