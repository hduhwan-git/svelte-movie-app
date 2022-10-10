import axios from 'axios';
import _unionBy from 'lodash/unionBy';//ID중복제거 
import { get, writable} from 'svelte/store'

export const movies = writable([]) 
export const loading = writable(false) //영화 목록 로딩 끝나고 이미지 로딩 

export  async function searchMovies(payload){
  if(get(loading)) return  // 로딩중엔 다시 검색 하지 못하게 
  loading.set(true)

  const {title, type, year, number} = payload // search.svelte searchmovies({}) 객체를 받아서 동일한 변수 만들어 넣는다.
  const OMDB_API_KEY = '8c5962a0'
  const movieapiurl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}`
  console.log(movieapiurl)

  const res = await axios.get(movieapiurl)
  
  const { Search, totalResults } = res.data;
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

      //res.data 안에 있는 { Search } 데이터 구조 분해
      const { Search } = res.data;
      /*
      movies.update($movies=>{
        //중복이 발생될 수 있다.
        //$movies.push(...Search)
        //return $movies
      })
      */
      //writable 사용시 실제 값이라는 명칭으로 통상적으로 변수에 $ 붙인다( $movies) 그렇게 안해도 된다.
      movies.update($movies=> _unionBy($movies, Search, 'imdbID'))
    } 

  }
  //console.log(get(movies)) //get 문법을 사용해서 실제 값을 반환한다.
  loading.set(false); //다시 검색 할 수 있도록 변경   
}

