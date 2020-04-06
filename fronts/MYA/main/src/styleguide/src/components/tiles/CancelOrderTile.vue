<template functional>
  <div :class="['cancel_order_tile',props.icon]">
    <div class="cancel_order_tile-icon">
      <i :class="['icon',props.icon]"></i>
    </div>
    <div class="cancel_order_tile-info">
      <span>{{props.idx}}</span>
      <span>{{props.id}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['idx', 'id', 'icon']
};
</script>

<style scoped lang="less">
.cancel_order_tile {
  display: grid;
  grid-template-columns: 44px 1fr;
  grid-column-gap: 0.5rem;
  width: 100%;
  min-height: 65px;
  align-items: center;
  justify-content: center;
  &.cross {
    border-left: solid 3px #fc4965;
  }
  &.check {
    border-left: solid 3px #88cc88;
  }
  &-icon {
    i {
      color: inherit;
      &.cross {
        color: #fc4965;
        font-size: 48px;
      }
      &.check {
        color: #88cc88;
        font-size: 40px;
      }
    }
    text-align: center;
  }
  &-info {
    font-size: 12px;
    text-transform: uppercase;
    span:nth-of-type(1) {
      font-weight: 500;
      display: block;
      color: #242424;
    }
    span:nth-of-type(2) {
      display: block;
      color: #8f8f8f;
    }
  }
}
</style>
