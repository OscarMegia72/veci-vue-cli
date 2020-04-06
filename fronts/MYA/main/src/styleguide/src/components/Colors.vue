<template>
  <div>
    <h1>Variables de color</h1>
    <template v-for="(section, index) in colors">
      <div :key="`color${index}`">
        <h2>{{section.name}}</h2>
        <div class="grid">
          <template v-for="color in section.values">
            <div>
              <span v-bind:style="{background: color.value}"></span>
              <p>{{color.name}} {{color.value}}</p>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Colors from '../../assets/colors';


export default {
  computed: {
    colors () {
      if(!Colors.length) return null;
      Colors.forEach(c => {
        c.values = c.values.map(v => {
          var s = v.split(':');
          console.log('S ', s)
          return {
            name: s[0].trim(),
            value: s[1].trim()
          }
        })
      })
      console.log(Colors)
      return Colors
    }
  }
}
</script>

<style scoped lang="less">

.grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, 140px);
  grid-auto-rows: 100px;
  grid-gap: 20px;

  >*{
    display: flex;
    flex-direction: column;
    > span{
      flex-grow: 1;
    }
    > p{
      margin: 0;
      padding: 5px;
      font-size: 12px;
      text-align: left;
    }
  }
}

</style>

