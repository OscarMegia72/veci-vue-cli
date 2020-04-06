<template>
    <div class="start-rating">
        <div v-for='n in stars_number' :key=n >
             <star-icon
                :key=n
             />
        </div>
       
    </div>
</template>
<script>
import StarIcon from './star_icon'
export default {
    props:{
        stars_number:{
            type: Number,
            default:1
        },
        stars_style:"blue-star-icon"
        
    },
    components:{
        'star-icon': StarIcon
    }
}
</script>
<style lang="less">
.start-rating{
    display: flex;
    flex-flow: row;
}
</style>
