<template>
  <div>
    <h1>Moonshine icons</h1>
    <div class="grid">
      <template v-for="icon in icons">
        <div>
          <span :class="icon[0]"></span>
          <p>{{icon[0]}}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const iconsRender = `
.logo.eci:before                { content: "\e911" }
.logo.eci                       { color: @brand_color }
.logo.hipercor:before           { content: "\e912" }
.logo.hipercor, .logo.hipercor-food { color: @hipercor_color }
.logo.hipercor-food:before       { content: "\e96f" }
.icon.i-cne:before              { content: "\e915" }
.icon.i-cne:hover               { color: #61BBCC }
.icon.i-cnc:before              { content: "\e913" }
.icon.i-cnc:hover               { color: #E99292 }
.icon.i-cncar:before            { content: "\e914" }
.icon.i-cncar:hover             { color: #A6D09F }
.icon.i-shop-return:before      { content: "\e918" }
.icon.i-shop-return:hover       { color: #cac9aa }
.icon.android:before            { content: "\e901" }
.icon.android:hover             { color:#90BE4E!important }
.icon.apple:before              { content: "\e902" }
.icon.apple:hover               { color:@white0!important }
.icon.facebook:before           { content: "\e903" }
.icon.facebook:hover            { color:#3b5998!important }
.icon.facebook-big:before       { content: "\e905" }
.icon.facebook-big:hover        { color:#3b5998!important }
.icon.google-plus:before        { content: "\e90d" }
.icon.google-plus:hover         { color:#d34836!important }
.icon.google-plus-big:before    { content: "\e90c" }
.icon.google-plus-big:hover     { color:#d34836!important }
.icon.kedin-big:before          { content: "\e906" }
.icon.kedin-big:hover           { color:#B00000!important }
.icon.pinterest:before          { content: "\e90f" }
.icon.pinterest:hover           { color:#CB2027!important }
.icon.pinterest-big:before      { content: "\e90e" }
.icon.pinterest-big:hover       { color:#CB2027!important }
.icon.rss:before                { content: "\e910" }
.icon.tuenti:before             { content: "\e907" }
.icon.tuenti:hover              { color:#8bcff2!important }
.icon.tuenti-big:before         { content: "\e908" }
.icon.tuenti-big:hover          { color:#8bcff2!important }
.icon.twitter:before            { content: "\e909" }
.icon.twitter:hover             { color:#55ACEE!important }
.icon.twitter-big:before        { content: "\e90a" }
.icon.twitter-big:hover         { color:#55ACEE!important }
.icon.instagram-big:before      { content: "\e900" }
.icon.instagram-big:hover       { color:#B7388D!important }
.icon.youtube-big:before        { content: "\e90b" }
.icon.youtube-big:hover         { color:#bb0000!important }
.icon.whatsapp-small:before     { content: "\e904" }
.icon.fb-messenger:before       { content: "\e96d" }
.icon.fb-messenger:hover        { color:#0084ff!important}
.icon.fb-messenger-big:before   { content: "\e96c" }
.icon.fb-messenger-big:hover    { color:#0084ff!important}
.icon.list-2:before             { content: "\e922" }
.icon.list-3:before             { content: "\e923" }
.icon.list-4:before             { content: "\e924" }
.icon.search:before             { content: "\e954" }
.icon.mail:before               { content: "\e948" }
.icon.check:before              { content: "\e95a" }
.icon.delete:before             { content: "\e92a" }
.icon.cross:before              { content: "\e958" }
.icon.burger:before             { content: "\e921"; margin-right:10px}
.icon.info:before               { content: "\e944" }
.icon.info-solid:before         { content: "\e946" }
.icon.info-circle:before        { content: "\e945" }
.icon.department-stores:before  { content: "\e92c" }
.icon.euro:before               { content: "\f153" }
.icon.qrcode:before             { content: "\f029" }
.icon.checkbox:before           { content: "\e925" }
.icon.checkbox_selected:before  { content: "\e926" }
.icon.sort:before               { content: "\e957" }
.icon.phone:before              { content: "\e94f"; margin-right: .3em; }
.icon.close-session:before      { content: "\e927" }
.icon.help:before               { content: "\e92f" }
.icon.shopping-bag:before       { content: "\e955" }
.icon.user:before               { content: "\e95f" }
.icon.orders:before             { content: "\e94c" }
.icon.plus-circle:before        { content: "\e952" }
.icon.plus-solid:before         { content: "\e953" }
.icon.plus:before               { content: "\e951" }
.icon.minus:before              { content: "\e949" }
.icon.minus-circle:before       { content: "\e94a" }
.icon.minus-solid:before        { content: "\e94b" }
.icon.spinner:before            { content: "\e959" }
.icon.calendar:before           { content: "\f073" }
.icon.delivery:before           { content: "\e92b" }
.icon.i-delivery-truck:before   { content: "\e937" }
.icon.submenu:before            { content: "\e91f" }
.icon.doc:before                { content: "\e92d" }
.icon.pdf:before                { content: "\e94e" }
.icon.play-button:before        { content: "\e950" }
.icon.arrow-up:before           { content: "\e920"; font-size: .7em }
.icon.arrow-down:before         { content: "\e91c"; font-size: .7em }
.icon.arrow-left:before         { content: "\e91d";  font-size: .7em }
.icon.arrow-right:before        { content: "\e91e"; font-size: .7em }
.icon.edit-item:before          { content: "\e969" }
.icon.i-up:before               { content: "\e91b" }
.icon.i-gift:before             { content: "\e938" }
.icon.i-contrast:before         { content: "\e936" }
.icon.i-comparison:before       { content: "\e935" }
.icon.kebab:before              { content: "\e96a" }
.icon.wishlist-plus:before      { content: "\e965" }
.icon.wishlist-minus:before     { content: "\e964" }
.icon.i-wishlist:before         { content: "\e941" }
.icon.i-wishlist-border:before  { content: "\e942" }
.icon.i-settings:before         { content: "\e963" }
.icon.solid-circle:before       { /*content: "\e956"*/ }
.icon.i-lock:before             { content: "\e947" }
.icon.i-unlock:before           { content: "\e95e" }
.icon.i-comment:before          { content: "\e928" }
.icon.i-comment-solid:before    { content: "\e929" }
.icon.i-no-comment-solid:before { content: "\e93d" }
.icon.i-geo:before              { content: "\e96b" }
.icon.i-sound:before            { content: "\e93f" }
.icon.i-sound-b:before          { content: "\e940" }
.icon.i-add-list:before         { content: "\e932" }
.icon.i-added-list:before       { content: "\e933"; color: @brand_color2;}
.icon.i-language:before         { content: "\e939" }
.icon.i-new-list:before         { content: "\e93b" }
.icon.i-new-quicklist:before    { content: "\e93c" }
.icon.i-reorder:before          { content: "\e93e" }
.icon.i-market-bag:before       { content: "\e93a" }
.icon.i-building:before         { content: "\e934" }
.icon.i-world:before            { content: "\e943" }
.icon.i-eci-card:before         { content: "\e916" }
.icon.i-clipboard:before        { content: "\e917" }
.icon.i-share:before            { content: "\e95c" }
.icon.i-star:before             { content: "\e962" }
.icon.i-star-border:before      { content: "\e961" }
.icon.i-calculator:before       { content: "\e970" }
.icon.i-enter:before            { content: "\e971" }
.icon.trash:before              { content: "\f014" }
.icon.print:before              { content: "\f02f" }
.icon.shopping-cart:before      { content: "\f07a" }
.icon.credit-card:before        { content: "\f09d" }
.icon.zoom-in:before            { content: "\f00e" }
.icon.zoom-in                   { margin: 0 .3em .3em 0; font-size: 1.2em}
.icon.zoom-out:before           { content: "\f010" }
.icon.i-jewelry:before          { content: "\e649" }
.icon.i-bra:before              { content: "\e643" }
.icon.i-kids:before             { content: "\e64a" }
.icon.i-kshoes:before           { content: "\e64b" }
.icon.i-bshoes:before           { content: "\e644" }
.icon.i-mshoes:before           { content: "\e64d" }
.icon.i-wshoes:before           { content: "\e659" }
.icon.i-mbsize:before           { content: "\e64c" }
.icon.i-wbsize:before           { content: "\e658" }
.icon.i-petitte:before          { content: "\e64f" }
.icon.i-pants:before            { content: "\e64e" }
.icon.i-mjeans:before           { content: "\e968" }
.icon.i-wjeans:before           { content: "\e967" }
.icon.i-gloves:before           { content: "\e645" }
.icon.i-hat:before              { content: "\e646" }
.icon.i-belt:before             { content: "\e642" }
.icon.i-babies:before           { content: "\e641" }
.icon.i-polo:before             { content: "\e650" }
.icon.i-premama:before          { content: "\e651" }
.icon.i-shirt:before            { content: "\e652" }
.icon.i-suit:before             { content: "\e653" }
.icon.i-trunks:before           { content: "\e654" }
.icon.i-tshirt:before           { content: "\e655" }
.icon.i-underwear:before        { content: "\e656" }
.icon.i-wbottom:before          { content: "\e657" }
.icon.i-wtop:before             { content: "\e65a" }
.icon.i-dgown:before            { content: "\e919" }
.icon.i-pajama:before           { content: "\e91a" }
.icon.i-socks:before            { content: "\e930" }
.icon.i-swimsuit:before         { content: "\e95b" }
.icon.i-bswimsuit:before        { content: "\e960" }
.icon.i-pants-lingerie:before   { content: "\e94d" }
.icon.i-tshirt-lingerie:before  { content: "\e966" }
.icon.i-panties:before          { content: "\e95d" }`;

export default {
  computed: {
    icons() {
      var arr = iconsRender
        .replace(/(\r\n\t|\n|\r\t)/gm, '')
        .split('}')
        .map(a =>
          a.split('{').map(f => {
            var e = f
              .trim()
              .replace(/\./g, ' ')
              .replace(':before', '')
              .replace(':hover', '');
            return e;
          })
        );
      return arr;
    }
  }
};
</script>

<style lang="less">
@import '../../assets/reset';
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 200px));
  grid-auto-rows: 100px;
  grid-gap: 20px;
  > * {
    display: flex;
    flex-direction: column;
    > span {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    > p {
      margin: 0;
      padding: 5px;
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>
