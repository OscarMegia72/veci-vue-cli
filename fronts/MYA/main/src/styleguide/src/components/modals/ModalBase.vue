<script>
export default {
  props: {
    close_outside: {
      default: false
    },
  },
  methods: {
    maskClicked: function () {
      if(this.close_outside) this.$emit('close');
    },

    close: function () {
      this.$emit('close')
    },
  }
}
</script>

<style lang="less">
  @import '../../assets/variables.less';
  .modal_base {
    &-viewport {
      position: fixed;
      z-index: 9000011;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display:flex;
      align-items: center;
      justify-content: center
    }
    &-fog {
      width: 100%;
      height: 100vh;
      height: calc(var(--vh,1vh) * 100);
      background-color: rgba(0,0,0,.5);
      position: fixed;
    }
    &-wrapper {

      &._action {
        background-color: #fff;
        display: flex;
        flex-direction: row;
        min-height: 250px;
        max-height: 90vh;
        max-height: calc(var(--vh,1vh) * 90);
        max-width: 90vw;
        display: flex;
        flex-direction: column;
        position: static;
        z-index: 1;
      }

      &._static {
        background-color: #fff;
        display: flex;
        flex-direction: row;
        max-height: 90vh;
        max-height: calc(var(--vh,1vh) * 90);
        max-width: 90vw;
        display: flex;
        flex-direction: column;
        position: static;
        z-index: 1;
      }

      &._message {
        background-color: #fff;
        display: flex;
        flex-direction: row;
        min-height: 250px;
        max-height: 90vh;
        max-height: calc(var(--vh,1vh) * 90);
        max-width: 90vw;
        display: flex;
        flex-direction: column;
        position: static;
        z-index: 1;
      }


    }

    &-header {
      &._action {
        flex: 0 0 30px;
        padding: .5rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        > button {
          .reset-button();
          cursor: pointer;
          i{
            font-size: 30px;
          }
        }
      }
      &._message {
        flex: 0 0 90px;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        > div {
          font-size: 30px;
          display: flex;
        }
        > h3 {
          padding: 0 1rem;
        }
      }
    }

    &-body {
      &._action {
        overflow-y: auto;
        flex: 1 0;
        max-height: ~"calc(85vh - 62px)";
        padding: 1.5rem 1rem;
      }

      &._static {
        overflow-y: auto;
        flex: 0 1;
        max-height: ~"calc(85vh - 62px)";
        padding: 2.5rem 1rem;
        text-align: center;
      }

      &._message {
        padding: 1.5rem 1rem;
        text-align: center;
        overflow-y: auto;
      }
    }
    &-footer {
      &._message {
        flex: 0 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 1rem;
        > * {
          flex: 1;
          max-width: 250px;
        }
        > * + * {
          margin-left: .5rem;
        }

      }
    }
  }

  .modal_base-enter,
  .modal_base-leave-active  {
    opacity: 0;
  }
  .modal_base_wrapper-enter,
  .modal_base_wrapper-leave-active{
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  @media @l-up {
    .modal_base {
      &-wrapper{
        &._action {
          max-height: 550px;
        }
        &._static {
          max-height: 550px;
        }
        &._message {
          max-width: 550px;
        }
      }
      &-header {
        &._message {
          flex-basis: 120px;
          justify-content: center;
          flex-direction: column;
          >div {
            font-size: 40px;
            margin-bottom: 1rem;
          }
        }
      }

      &-body {
        &._message{
          padding: 1.5rem 3rem
        }
      }
    }
  }

</style>