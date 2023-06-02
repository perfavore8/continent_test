<template>
  <aside class="aside">
    <ul class="list aside__list">
      <li class="list__item list__item_selected">Все продукты</li>
      <li class="list__item">1</li>
    </ul>
  </aside>
</template>

<script>
export default {};
</script>

<style scoped>
.aside {
  max-width: 300px;
}
.aside__list {
  padding: 0;
  align-items: start;
}
.list__item {
  padding: 8px 12px;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #e9eef3;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}
.list__item_selected {
  color: #202648;
  background: #e9eef3;
}
</style>
