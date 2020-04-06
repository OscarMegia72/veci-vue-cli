let server_debug = true;
// private
function getLogDate(){
    let date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
// public
export default {
    state: {
        debug: server_debug,
        stack_debug: [],
    },
    mutations: {
        setStackDebug(state,value){
            if(state.debug){
              state.stack_debug.unshift(
                {d: getLogDate(),v:value}
              )
              console.info('stack_debug',{d: getLogDate(),v:value})
            }
          }
    },
    actions: {
        setStackDebug({commit},message){
            commit('setStackDebug',message)
          }
    }
}