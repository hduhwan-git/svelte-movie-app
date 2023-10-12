
import Home from './Home.svelte'
import About from './About.svelte'
import Movie from './Movie.svelte'
import Mall from './Mall.svelte'

export default {
    '/':Home,
    '/about':About,
    '/movie/:id':Movie,
    '/mall/:good':Mall  
};