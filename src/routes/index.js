
import Home from './Home.svelte'
import MallHome from './MallHome.svelte'
import About from './About.svelte'
import Movie from './Movie.svelte'
import Mall from './Mall.svelte'

export default {
    '/movie':Home,
    '/':MallHome,
    '/about':About,
    '/movie/:id':Movie,
    '/mall/:id':Mall  
};