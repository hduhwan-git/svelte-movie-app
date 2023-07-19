const production = process.env.NODE_ENV==='production'
//console.log(production)
function babelOptions(){
    
    return {
        
        plugins:production ? ["transform-remove-console"] : []
        //plugins:production && ["transform-remove-console"]
    }
}

module.exports= {
  preprocess:require('svelte-preprocess')({
      scss:{
          prependData:'@import "./src/scss/main.scss";'
      },
      postcss:{
          plugins:[
              require('autoprefixer')()
          ]
      },
      //svelte conponent 사용 
      babel:babelOptions()
  })
}