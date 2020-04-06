const $rest =  window.geci.rest;
let server_debug = false;
let mock_debug = false;
let mock_user = {}
let list_users = false;
let route_resume = '/viajes/api/resume/'
import i18n from '../i18n';
function getMockValues(){
  if( location.hostname.includes("oidc") || location.hostname.includes("nft")){
    server_debug = true
  }
   
} 
function getLogDate(){
  let date = new Date()
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
function getQueryParams(){
  let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    return {booking_code: "booking_code",id: window.id_travels }
    // return {booking_code: params.get('booking_code'),id: params.get('id') }
}
function getMockCuc(){
  let uri = window.location.search.substring(1); 
  let params = new URLSearchParams(uri);
  if(params.get('cuc')){
    return  params.get('cuc')
  }
  return null;
}
function getMockState(){
  let uri = window.location.search.substring(1); 
  let params = new URLSearchParams(uri);
  if(params.get('idmock')){
    return  params.get('idmock')
  }
  return null;
}
function getHeaderV2(){
  let uri = window.location.search.substring(1); 
  let params = new URLSearchParams(uri);
  if(params.get('headerv2')){
    console.log("headerV2",Boolean(params.get('headerv2')))
    return  Boolean(params.get('headerv2'))
  }
  return false;

}
getMockValues()
//-exports
// https://oidc.ave.elcorteingles.es:2001/viajes?mock=true&type=nif&id=123456
export default {
  state: {
    debug: server_debug,
    stack_debug: [],
    mock: mock_debug,
    stack_errors:[],
    errors:{
      error400:{
        show:false,
        head: '',
        message:''
      }
      
    },
    client_empty: false,
    endXhrDetails:false,
    mock_list_ids:[],
    sheets:{
      fullCover:''
    },
    showHeaderV2:getHeaderV2(),
    showUI:false,
    data_ssr: getQueryParams(),
    // 
    // data scheme for avoid vue error
    // 
    api_data:{
      hasInsurance: false,
      agency: {
        code: null,
        name: null,
        telephone: null,
        fax: null,
        email: null,
        url: null,
        openingHours: null,
        address: {
            streetName: null,
            postalCode: null,
            city: null,
            province: null,
            country: null
        }
      },
      generalDetails:{
        bookingStatus:{},
        cancellationPolicies:{
          text: null
        }
        
      },
      services:{
        flights:[],
        insurance:[],
        trains: [
          {
              serviceId: null,
              locatorNumber: null,
              company: {
                  code: null,
                  name: null
              },
              cancellationFee: {
                  amount: null,
                  currency: null
              },
              serviceIconUrl: null,
              segments: [
                  {
                      departureDate: null,
                      departureTime: null,
                      originCity: null,
                      arrivalDate: null,
                      arrivalTime: null,
                      destinationCity: null,
                      travelTime: null,
                      ticketUrl: null,
                      className: null,
                      wagonNumber: null,
                      wagonType: null,
                      seat: null,
                      trainType: null,
                      rateDescription: null
                  }
              ],
              status: {
                  code: null,
                  description: null
              },
              cancellationDate: null
          }
      ],
      hotels:[
        {
          serviceId: null,
            status: {
                code: null,
                description: null
            },
            serviceIconUrl: null,
            groupId: null,
            hotelCode: null,
            name: null,
            category: null,
            address: {
                streetName: null,
                postalCode: null,
                city: null,
                province: null,
                country: null
            },
            entryDate: null,
            locatorNumber: null,
            numberOfNights: null,
            roomType: null,
            numberOfGuests: null,
            dataSheetUrl: null,
            accommodationType: null,
        }
        
      ]
      },
      hotels_grouped:[
        {
          serviceId: null,
            status: {
                code: null,
                description: null
            },
            serviceIconUrl: null,
            groupId: null,
            hotelCode: null,
            name: null,
            category: null,
            address: {
                streetName: null,
                postalCode: null,
                city: null,
                province: null,
                country: null
            },
            entryDate: null,
            locatorNumber: null,
            numberOfNights: null,
            roomType: null,
            numberOfGuests: null,
            dataSheetUrl: null,
            accommodationType: null,
        }
      ],
      travellers:{
        travellersList:[]
      },
      amounts: {
        paidAmount: {
            amount: null,
            currency: null,
            payments: []
        },
        pendingAmount: {
             amount: null

        },
        cancellationFee: null,
        insuranceAmount: {
            amount: null

        },
        totalPrice: {
            amount: null

        },
        discounts: [{
            amount: null,
            discountType:null

      }]
    }
      
    }
  },
  mutations: {
    setClientEmpty(state,value){
      state.client_empty = value;
    },
    setSheetsFullCover(state,value){
      state.sheets.fullCover = value;
    },
    setEndXhrDetails(state,value){
      state.endXhrDetails = value
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
      }
    },
    setStackErrors(state,value){
      if(state.debug){
        state.stack_errors.unshift(
          {d: getLogDate(),v:value}
        )
      }
    },
    setError400(state,value){
      state.errors.error400 = value
    },
    setListIds(state,value){
      state.mock_list_ids = value
    },
    setApiDAta(state,value){
      if(value.insurance.length>0)value.hasInsurance = true;
      if(value) state.showUI = true
      state.api_data = value
    }
  },
  actions: {
    setStackDebug({commit},message){
      commit('setStackDebug',message)
    },
    // path: '/viajes/mock/api/details',
    getApiTravelDetails({commit}){
        commit('setEndXhrDetails',false)
        commit('setStackDebug',window.id_travels)
        let url_api_call= `/viajes/api/details/${this.state.data_ssr.id}`

        let mock_cuc = getMockCuc();
        if(mock_cuc){
          url_api_call += "?cuc="+mock_cuc;
        }
        if(getMockState()){
          if(!mock_cuc){
            url_api_call+=`?idmock=true`
          }else{
            url_api_call+=`&idmock=true`
          }
          
        }
        // $rest.getP(`/viajes/mock/api/details?id=${this.state.data_ssr.id.trim()}&booking_code=${this.state.data_ssr.booking_code.trim()}`)
        $rest.getP(url_api_call)
       
        .then(result=>{
          
          commit('setApiDAta',result.data)
          commit('setEndXhrDetails',true)
          commit('setStackDebug',result.data)
          
        }).catch(error =>{
          commit('setStackErrors',error)
          commit('setClientEmpty', true)
          if(error.response.status === 400){
            commit('setStackDebug','SHOW ERROR 400')
            commit('setError400',{
              show:true,
              head:'ERROR MENSAJE DEBUG',
              message: error.response.description
            })
          }
          commit('setEndXhrDetails',true)
          return error
        })  
         
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
