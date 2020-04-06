<template>
  <div :class="['notification',{'_no_action':!action}]">
    <div class="notification-body">
      <div v-if="icon" class="notification-icon">
        <i :class="[icon,{icon}]"></i>
      </div>
      <div class="notification-text">
        <slot name="content">lorem ipsun dolor</slot>
      </div>
    </div>
    <div v-if="action" class="notification-action">
        <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'icon': {
      default: null
    },
    'action': {
      type: Boolean,
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/variables.less';
  .notification{
    padding-top: 1rem;
    min-height: 90px;
    width: 100%;
    display: flex;
    flex-direction: column;
    &._no_action{
      padding-bottom: 1rem;
    }
    &._yellow{
      background-color: #FFE386;
      color: #AA8734
    }

    &._green {
      background-color: #8AF4C4;
      color: #31AF6A;
    }

    &._grey{
      background-color: #e1e1e1;
      color: #242424
    }
    &-body{
      flex-grow: 1;
      display: flex;
      color: inherit;
      a{
        color: inherit;
      }
    }
    &-icon{
      flex-shrink: 0;
      flex-grow: 0;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      i{
        font-size: 32px;
      }
    }
    &-text{
      flex-grow: 1;
      font-weight: 500;
      font-size: 14px;
      padding: 1rem 2rem;
      text-align: center;
      p{
        margin: 0 0 .75rem 0;
        &:last-of-type{
          margin-bottom: 0;
        }
      }
    }
    &-action{
      flex-grow: 1;
      display: flex;      
      align-items: center;
      justify-content: center;
      font-size: 11px;
      min-height: 32px;
      a{
        text-decoration: none;
        color: inherit;
      }
    }
  }
  @media only screen and (min-width: 56.25em) {
    .notification{
      min-height: 90px;
      flex-wrap: wrap;
      flex-direction: row;
      padding-bottom: 0;
      padding-top: 0;
      &._no_action{
        padding-bottom: 0;
      }
      &-body{
        flex: 1 1;
      }
      &-icon{
        width: 96px;
      }
      &-action{
        flex: 0 0 96px;
      }
    }
  }
</style>
