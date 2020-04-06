let server_debug = false;
let mock_debug = false;
let mock_user = {}
let list_users = false;
import summary from './data_mocks/summary.json'
// private
function getMockValues(){
  if( location.hostname.includes("oidc") || location.hostname.includes("nft")){
    server_debug = true
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    mock_user['id'] = params.get('id')
  }
   
} 
function getLogDate(){
  let date = new Date()
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
function getMockCuc(){
  let uri = window.location.search.substring(1); 
  let params = new URLSearchParams(uri);
  if(params.get('cuc')){
    return  params.get('cuc')
  }
  return null;
}
getMockValues()
//-exports
export default {
  state: {
    debug: server_debug,
    stack_debug: [],
    mock: mock_debug,
    mock_cuc: getMockCuc(),
    list: list_users,
    mock_user: mock_user,
    stack_errors:[],
    errors:{
      error400:{
        show:false,
        head: '',
        message:''
      }
      
    },
    client_empty: false,
    hasAnyReservations:false,
    endXhrResume:false,
    mock_list_ids:[],
    resume:[],
    hasResume:false,
    icons_max_overflow:false,
    reservation_group_oldies:{
      hasReservations:false,
      listReservations:[]
    },
    reservation_group_actives:{
      hasReservations:false,
      listReservations:[]
    },
    sheets:{
      fullCover:''
    },
    
    
  },
  mutations: {
    setClientEmpty(state,value){
      state.client_empty = value;
    },
    setSheetsFullCover(state,value){
      state.sheets.fullCover = value;
    },
    setEndXhrResume(state,value){
      state.endXhrResume = value
    },
    setResGroupOldies(state,value){
      
      if(value.length > 0) state.reservation_group_oldies.hasReservations = true;
      state.reservation_group_oldies.listReservations = value;
    },
    setResGroupActives(state,value){
      if(value.length > 0) state.reservation_group_actives.hasReservations = true;
      state.reservation_group_actives.listReservations = value;
    },
    setStackDebug(state,value){
      if(state.debug){
        state.stack_debug.unshift(
          {d: getLogDate(),v:value}
        )
        console.info('stack_debug',{d: getLogDate(),v:value})
      }
    },
    setStackErrors(state,value){
      if(state.debug){
        state.stack_errors.unshift(
          {d: getLogDate(),v:value}
        )
        console.error({d: getLogDate(),v:value})
      }
    },
    setError400(state,value){
      state.errors.error400 = value
    },
    setListIds(state,value){
      state.mock_list_ids = value
    },
    setResume(state,value){
      if(value )state.hasResume = true;
      state.resume = value
    },

  },
  actions: {

    setStackDebug({commit},message){
      commit('setStackDebug',message)
    },
    async getProxyApiTravelResume(){
      await this.dispatch('getMockApiTravelResume')
    },
    getActives(){
      return this.state.reservation_group_actives;
    },
    getOldies(){
      return this.state.reservation_group_oldies;
    },
    
    
    getApiTravelResume({commit}){
      commit('setEndXhrResume',false)
      commit('setStackDebug','getApiXX_TravelResume >')
      let pseudo_cuc = getMockCuc()
      let urlApiResume = `/viajes/api/resume`
      commit('setStackDebug',urlApiResume)
      if(pseudo_cuc){
        urlApiResume = `/viajes/api/resume?cuc=${pseudo_cuc}`
      }
      let dataTravels = summary;
      console.log(dataTravels)
      commit('setResume',dataTravels)
      if(dataTravels.length == 0 ){
          commit('setClientEmpty', true)
      }
      else{
          let tempOldies = []
          let tempActives = []
          dataTravels.forEach(rv =>{
            if(rv.groupStatus == "oldies-canceled"){
             tempOldies.push(rv)
            }
            if(rv.groupStatus == "active-pending"){
              tempActives.push(rv)
            }
          })
          commit('setResGroupActives',tempActives)
          commit('setResGroupOldies',tempOldies)
          commit('setEndXhrResume',true)
      }
    },
    setViewModal400({commit},value){
      commit('setError400',{
        show: value.show,
        head:value.head,
        message:value.message
      })

    }
    
  }
}
