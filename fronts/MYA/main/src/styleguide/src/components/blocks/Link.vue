<template functional>
  <a :href="props.href" v-on="listeners" :class="['link_new',props.type]" :title="props.title" :target="props.target">
    <slot></slot>
  </a>
</template>

<script>
export default {
    props: ['type','href','title','target'],
}
</script>

<style lang="less">
@import '../../assets/variables.less';
// As seen in section "botones" of My_account UI KIT
//https://xd.adobe.com/spec/cba77c46-b618-4ec3-59ed-c508849cf736-bd96/#screen/ac3c6b00-437e-421a-87d6-59cc804ade0f/BOTONES%20-%20iPhone%205%2FSE

@button-min-height: 64px;
@button-min-height-tablet: 50px;

.link_new {
  border: none;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  background-color: transparent;
  border-radius: 0;
  width: 100%;
  color: inherit;

  &._cta {
    border: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    background-color: transparent;
    border-radius: 0;
    color: #242424;
    text-decoration: underline;
    font-weight: 500;
    font-size: 13px;
    text-align: left;
    width: auto;
  }
  &._secondary {
    border: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    background-color: transparent;
    border-radius: 0;
    color: #242424;
    text-decoration: underline;
    font-weight: 500;
    font-size: 13px;
    text-align: left;
    width: auto;
  }
  &._alt {
    display: inline-block;
    border: none;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    background-color: transparent;
    border-radius: 0;
    color: #484848;
    text-decoration: underline;
    font-weight: 500;
    font-size: 13px;
    text-align: left;
    width: auto;
    &:hover{
      color: #008c2e;
      text-decoration: none;
    }
  }
  //Types
  &._button {
    text-decoration: none;
    &._primary {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: @button-min-height;
      padding: 1.5rem;
      color: white;
      font-size: 13px;
      text-transform: uppercase;
      font-weight: 500;
      transition: opacity 0.3s ease-in-out;
      &:disabled {
        opacity: 0.5;
        cursor: auto;
        pointer-events: none;
      }

      //Modifiers

      &._cta {
        border: solid 1px @primary_button_color;
        background-color: @primary_button_color;
        &:hover {
          border: solid 1px @secondary_button_color;
          background-color: @secondary_button_color;
        }
      }

      &._warning {
        border: solid 1px #ff5068;
        background-color: #ff5068;
        color: white;
        &:hover {
          background-color: #d30000;
          border-color: #d30000;
        }
      }
    }

    &._secondary {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: @button-min-height;
      padding: 1.5rem;
      font-size: 13px;
      text-transform: uppercase;
      font-weight: 500;

      //Modifiers
      &._cta {
        border: solid 1px #4fa04f;
        background-color: white;
        color: #4fa04f;
        &:hover {
          color: white;
          border: solid 1px #347e34;
          background-color: #347e34;
        }
      }
      &._warning {
        color: #ff5068;
        border: solid 1px #ff5068;
        background-color: white;
        &:hover {
          background-color: #d30000;
          border-color: #d30000;
          color: white;
        }
      }
    }

    &._terciary {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: @button-min-height;
      padding: 1.5rem;
      font-size: 13px;
      text-transform: uppercase;
      text-decoration: underline;
      font-weight: 500;

      //Modifiers
      &._cta {
        border: solid 1px transparent;
        background-color: transparent;
        color: #4fa04f;
        &:hover {
          color: #347e34;
        }
      }

      &._warning {
        border: solid 1px transparent;
        background-color: transparent;
        color: #ff5068;
        &:hover {
          color: #d30000;
        }
      }
    }

    &._radius{
      display: inline-flex;
      width: auto;
      align-items: center;
      justify-content: center;
      &._cta{
        border: solid 1px #4fa04f;
        border-radius: 50px;
        padding: .5rem 1rem;
        font-weight: 500;
        color: #4fa04f;
        min-width: 120px;
        &:hover{
          background: #4fa04f;
          color: white;
        }
      }
    }

    &._primary_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: @button-min-height;
      text-transform: uppercase;
      transition: opacity 0.3s ease-in-out;
      &:disabled {
        opacity: 0.5;
        cursor: auto;
        pointer-events: none;
      }
      > span:first-of-type {
        padding: 1rem;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: @button-min-height;
      }
      > span:last-of-type {
        padding: 1rem;
        width: @button-min-height;
        height: @button-min-height;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      //Modifiers

      &._cta {
        > span:first-of-type {
          text-transform: uppercase;
          color: white;
          border: solid 1px #4fa04f;
          background-color: #4fa04f;
          border-right: none;
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 500;
        }
        > span:last-of-type {
          color: white;
          border: solid 1px #347e34;
          background-color: #347e34;
          border-left: none;
        }
        &:hover {
          > span:first-of-type {
            background-color: #347e34;
          }
        }
      }

      &._warning {
        > span:first-of-type {
          text-transform: uppercase;
          color: white;
          border: solid 1px #ff5068;
          background-color: #ff5068;
          border-right: none;
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 500;
        }
        > span:last-of-type {
          color: white;
          border: solid 1px #d30000;
          background-color: #d30000;
          border-left: none;
        }
        &:hover {
          > span:first-of-type {
            border-color: #d30000;
            background-color: #d30000;
          }
        }
      }
    }

    &._contextual_with_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: @button-min-height;
      padding: 1.5rem;
      color: #9c9c9c;
      background-color: #fafafa;
      border: solid 1px #c5c5c5;
      font-size: 13px;
      text-transform: uppercase;
      font-weight: 500;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);

      //Modifiers

      &._arrow_up {
        position: relative;
        &:before {
          position: absolute;
          content: '';
          top: -6px;
          left: ~'calc(50% - 5px)';
          width: 10px;
          height: 10px;
          border: solid 1px #c5c5c5;
          background-color: #fafafa;
          transform: rotate(45deg);
          border-bottom: none;
          border-right: none;
        }
      }

      &._arrow_down {
        position: relative;
        &:before {
          position: absolute;
          content: '';
          top: 62px;
          left: ~'calc(50% - 5px)';
          width: 10px;
          height: 10px;
          border: solid 1px #c5c5c5;
          background-color: #fafafa;
          transform: rotate(45deg);
          border-top: none;
          border-left: none;
        }
      }

      &._warning{
        color: white;
        background-color: #d30000;
        border: solid 1px #d30000;
          &._arrow_up {
            &:before {
              border: solid 1px #d30000;
              background-color: #d30000;
            }
          }

          &._arrow_down {
            &:before {
              border: solid 1px #d30000;
              background-color: #d30000;
            }
          }
      }
    }
  }
}

@media @l-up {
  .link_new {
    &._button{
      border: none;
      cursor: pointer;
      text-decoration: none;
      outline: none;
      background-color: transparent;
      border-radius: 0;
      width: 100%;
      //Types

      &._primary,
      &._secondary,
      &._terciary {
        padding: 1rem 1.5rem;
        font-size: 11px;
        min-height: @button-min-height-tablet;
        min-width: 150px;
      }

      &._primary_icon {
        padding: 1rem 1.5rem;
        font-size: 11px;
        min-height: @button-min-height-tablet;
        min-width: 150px;
        > span:first-of-type {
          height: @button-min-height-tablet;
        }
        > span:last-of-type {
          width: @button-min-height-tablet;
          height: @button-min-height-tablet;
        }
      }

      &._contextual_with_icon {
        min-height: @button-min-height-tablet;
      }
    }
  }
}

@media @print {
  .link_new {
    text-decoration: none !important;
  }
}
</style>