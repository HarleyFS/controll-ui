<template>
  <div class="card-loding">
    <div class="card-spinner">
      <i class="fas fa-spinner fa-spin-pulse"></i>
    </div>
  </div>
</template>

<style scoped>
.card-loding {
  position: fixed;
  top: 45%;
  width: 52%;
  margin: auto;
  z-index: 999;
  right: 0px;
}
.card-spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

i {
  font-size: 100px;
  color: var(--primary);
  opacity: 0.5;
}
</style>
