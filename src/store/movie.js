import axios from 'axios';
import _unionBy from 'lodash/unionBy';//ID중복제거 
import { writable, get } from 'svelte/store'



export const movies = writable([]) 
export const loading = writable(false) //영화 목록 로딩 끝나고 이미지 로딩 
export const theMovie = writable({})
export const message = writable('Search for the movie title!')

export  async function searchMovies(payload){

  console.log('payload',payload  )
  if(get(loading)) return  // 로딩중엔 다시 검색 하지 못하게 
  loading.set(true)
  message.set('')
  let total = 0
  
  try{
    
    const res = await _fetchMovie({
      ...payload, 
      page:1
    })
    const { Search, totalResults } = res.data;
    console.log(totalResults)
    movies.set(Search); 
    total = parseInt(totalResults,10)
  }catch(msg){
    movies.set([])
    message.set(msg)
    loading.set(false)
    return
  }
  
  //올림처리 
  //14/10 => 1.4* 2
  //7/10 => 0.7 => 
  const pageLength = Math.ceil(total)/10 
  console.log(pageLength ) 
   

  
  if(pageLength > 1){
    for(let page = 2; page <= pageLength; page++){
      if(page > (payload.number/10)) break
      const res = await _fetchMovie({
        ...payload,
        page
      })

      //res.data 안에 있는 { Search } 데이터 구조 분해
      const { Search } = res.data;
      //writable 사용시 실제 값이라는 명칭으로 통상적으로 변수에 $ 붙인다( $movies) 그렇게 안해도 된다.
      movies.update($movies=> _unionBy($movies, Search, 'imdbID'))
      /*
      movies.update($movies=>{
        //중복이 발생될 수 있다.
        //$movies.push(...Search)
        //return $movies
      })
      */
      
      
    } 

  }
  //console.log(get(movies)) //get 문법을 사용해서 실제 값을 반환한다.
  loading.set(false); //다시 검색 할 수 있도록 변경   
}

export async function searchMovieWithId(id){
  if(get(loading)) return  // 로딩중엔 다시 검색 하지 못하게 
  loading.set(true)
  
  

  const res = await _fetchMovie({
    id
  })

  theMovie.set(res.data)
  loading.set(false)
}

async function _fetchMovie(payload) {
  console.log('_fetchMovie payload', payload)
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '8c5962a0'

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(url)
      console.log('res.data', res.data)
      if (res.data.Error) {
        reject(res.data.Error)
      }
      resolve(res)
    } catch (error) {
      console.log(error.response.status)
      reject(error.message)
    }
  })
}

