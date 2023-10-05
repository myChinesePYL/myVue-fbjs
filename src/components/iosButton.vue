<template>
  <label>
    <input type="checkbox">
    <span>
      <span></span>
    </span>
  </label>
</template>

<style scoped lang="scss">
$height-r: 31px;
$width-box: 65px;
$transition-eio: cubic-bezier(0, 0, 0.36, 1);

input {
  display: none;
}

input+span {
  transition: 0.2s all $transition-eio;
  display: block;
  width: $width-box;
  height: $height-r;
  background-color: rgba(127.5, 127.5, 127.5, 0.7) !important;
  border-radius: 100px;
  position: relative;
}

input+span>span {
  transition: 0.2s all $transition-eio;
  display: block;
  width: $height-r - 8px;
  height: $height-r - 8px;
  background-color: white !important;
  position: absolute;
  left: calc(8px / 2);
  top: calc(8px / 2);
  border-radius: 100px;
}

input:active+span>span {
  width: calc(($height-r - 8px) * 1.5);
}

input:checked+span {
  background-color: rgba(0, 255, 0, 0.7) !important;
}

input:checked+span>span {
  left: calc($width-box - $height-r + (8px / 2));
}

input:checked:active+span>span {
  left: calc(($width-box - $height-r + (8px / 2)) - (8px * 1.5) + 1px);
}
</style>