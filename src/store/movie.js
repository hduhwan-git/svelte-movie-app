import axios from 'axios';
import _unionBy from 'lodash/unionBy';
import { get, writable} from 'svelte/store'

export const movies = writable([])

export  async function searchMovies(payload){
  const {title, type, year, number} = payload
  const OMDB_API_KEY = '8c5962a0'


  const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}`)
  
  const { Search, totalResults} = res.data;
  movies.set(Search); 
  
  //올림처리 
  //14/10 => 1.4* 2
  //7/10 => 0.7 => 
  const pageLength = Math.ceil(totalResults)/10 
  console.log(res, pageLength );
   
  
  if(pageLength > 1){
    for(let page = 2; page <= pageLength; page++){
      if(page > (number/10)) break
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
      console.log('r', res);
      const { Search } = res.data;
      /*
      movies.update($movies=>{
        //중복이 발생될 수 있다.
        //$movies.push(...Search)
        //return $movies
      })
      */
      
      movies.update($movies=> _unionBy($movies, Search, 'imdbID'))
    } 

  }
  console.log(get(movies))
  
}

