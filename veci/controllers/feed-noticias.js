module.exports= (function(){
    let map=new Map()
    // map.set('abc','https://www.abc.es/rss/feeds/abcPortada.xml')
    map.set('20minutos','https://www.20minutos.es/rss/')
    map.set('elmundo','https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml')
    map.set('clarin','https://www.clarin.com/rss/lo-ultimo/')
    map.set('elpais','http://ep00.epimg.net/rss/tags/ultimas_noticias.xml')
    map.set('marca','https://e00-marca.uecdn.es/rss/portada.xml')
    map.set('as','https://as.com/rss/tags/ultimas_noticias.xml')
    return map
})()