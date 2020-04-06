<template>
  <div>
    <div>Selecciona el tipo de tárifa con el que quieres renovar.</div>
    <div>
      <template v-for="rate in rates">
          <radio :key="rate._id" 
                :group="'renewal'" 
                :custom_id="rate._id"
                :value="rate._id === current_rate">
                {{rate.items[0].description}}
                </radio>
      </template>
    </div>

  </div>
</template>

<script>
import Radio from '../blocks/Radio.vue';
import mock from '../../../assets/mocks/flat_rate/multiple_flat_rate_renewal_options';
    import ButtonSet from '../layouts/ButtonSet.vue';
    import Button from '../blocks/Button.vue';

export default {
  components: {
    radio: Radio,
  },
  computed: {
    rates () {
      if(!mock) return null;
      var res = [].concat(mock.data.flatRateCustomers.items[0].flatRateSeller.items[0].compatibleFlatRatesOnRenewal);
      res.push({"_id": -1,
                 "sellerCode": "001027008600036",
                 "items": [ {
                   "description": "No renovar"
                    }
                  ]
      })
      return res;
    },
    current_rate () {
      if(!mock) return null;
      var renewals = mock.data.flatRateCustomers.items[0].renewals
      return renewals[renewals.length -1].upgradeSellerItem._id;
    }
  },
}
</script>

<style>

</style>
