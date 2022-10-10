<script>
  import { movies, loading } from "~/store/movie";
  import MovieCard from "~/components/MovieCard";
  import Loader from "~/components/Loader";
</script>

<div class="movie-list">
  <!-- store 내부 컨포넌트의 값을 알고 싶으면 $넣어준다. -->
  {#if $loading}
    <Loader />
  {/if}
  <div class="movies">
    <!-- //writable 사용시 실제 값이라는 명칭으로 통상적으로 변수에 $ 붙인다( $movies) -->
    {#each $movies as movie (movie.imdbID)}
      <!-- MovieCard components는 movie라는 data 를 받아서 활용할 수 있도록 prop 전달한다.   -->
      <MovieCard {movie} />
    {/each}
  </div>
</div>

<style lang="scss">
  .movie-list {
    margin-top: 30px;
    padding: 10px;
    background-color: $color--area;
    border-radius: 4px;
    text-align: center;
    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
