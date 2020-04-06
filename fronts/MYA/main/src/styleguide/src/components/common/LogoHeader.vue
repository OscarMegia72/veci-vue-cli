<template>
  <div class="logo_header">
    <a href="/" >
      <img :src="_logo_image">
    </a>
  </div>
</template>

<script>
const vue_conf = window.vue_conf;

export default {
  computed: {
    _logo_image() {
      const logo = {'cuenta': 'brand_mya_eci_208_90.svg',
                    'conta': 'brand_mya_eci_pt_208_90.svg',
                    'account': 'brand_mya_eci_en_208_90.svg',
                    'sfera': 'brand_mya_sfera_208_90.svg'}[vue_conf.domain_configuration.name] || 'brand_mya_eci_208_90.svg'
      return process.env.VUE_APP_ASSETS_BASE + `/stylesheets/images/my_account/${logo}`
    }
  }
}
</script>

<style lang="less" scoped>
  .logo_header{
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: block;
      text-decoration: none;
      width: 100%;
      max-width: 280px;
      img {
        width: 100%;
      }
    }
  }
</style>
