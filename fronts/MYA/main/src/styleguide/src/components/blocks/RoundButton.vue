<template>
  <button class="round_button" @click="click()">
    <span class="round_button-icon">
      <i :class="['icon',icon]"></i>
    </span>
    <span class="round_button-text">
      <slot></slot>
    </span>    
  </button>
</template>

<script>
export default {
  name: 'round-button',
  props: {
    icon: {
      type: String,
      required: true,
    }
  },
  methods: {
    click: function(){
      this.$emit('button-clicked');
    }
  }

}
</script>

<style lang="less" scoped>
@import '../../assets/variables.less';
@base_circle_buttons_width: 50px;
.round_button{
  border: none;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;


  &-icon{    
    align-self: center;
    background-color: white;
    border: solid 2px #c5c5c5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .8rem;  
    width: @base_circle_buttons_width;
    height: @base_circle_buttons_width;
    color: @white55;  
    transition: all .25s ease-in-out;
    > i {
      color: inherit;
      font-size: @font-size-xl;
    }
  }
  
  &-text{
    font-size: 12px;
    color: #242424;
    text-align: center;
    width: 100%;
    margin: 0;
    padding: .25rem .5rem 0 .5rem;
    line-height: 1.5;
    text-transform: uppercase;
  }

  &:hover{
   .round_button{
    &-icon{
      border-color: #242424;
      color: #242424;
    }
   } 
  }

  &:disabled{
    pointer-events: none;
    .round_button{  
      &-icon{
        border-color: #E1E1E1;  
        color: #E1E1E1;    
      }
      &-text{
        color: #E1E1E1;
      }
    }

  }
}
</style>
