<template>
  <div class="card">
    <div class="card__top">
      <img :src="item.main_image_thumb_300" class="card__img" />
    </div>
    <div class="card__bot">
      <span class="card__cat-name">{{ item.category?.name }}</span>
      <span class="card__present-name">{{ item.present_name }}</span>
      <span class="card__comment-name">{{ item.comment_name }}</span>
      <span class="card__price">{{ item.price }} ₽</span>
      <button class="card__btn" :disabled="outOfStock">
        {{ outOfStock ? "Нет в наличии" : "В корзину" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
  computed: {
    outOfStock() {
      return !(this.item.allowed && this.item.available);
    },
  },
};
</script>

<style scoped>
.card {
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 0px 0px 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.card__top,
.card__bot {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card__img {
  width: 100%;
  margin-bottom: 6px;
}
.card__cat-name {
  margin-bottom: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #979797;
}
.card__present-name {
  margin-bottom: 9px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #272727;
}
.card__comment-name {
  margin-bottom: 14px;
  min-height: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #272727;
}
.card__price {
  margin-bottom: 22px;
  font-weight: 600;
  font-size: 26px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #272727;
}
.card__btn {
  margin-bottom: 23px;
  cursor: pointer;
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 60.2%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  height: 48px;
  transition: all 0.2s ease-out;
}
.card__btn:disabled {
  cursor: default;
  border: 2px solid rgba(151, 151, 151, 0.3);
  background: #fff;
  color: #26262680;
}
</style>
