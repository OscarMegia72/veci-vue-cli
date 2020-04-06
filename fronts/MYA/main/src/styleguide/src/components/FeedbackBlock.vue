<template>
  <div class="feedback_block">
    <div class="feedback_block-image">
      <img :src="`${$assets_base}/stylesheets/images/my_account/feedback.svg`" alt="">
    </div>
    <div>
      <slot name="title" />
    </div>
    <div>
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  .feedback_block {
    margin: 2rem 0;
    padding: 0 1rem;
    &-image {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      max-height: 60px;
      margin-bottom: 1.5rem;
      img {
        width: 64px;
        height: 64px;
      }
    }
  }
</style>
