<script>
  import { movies } from "~/store/movie";
  import MovieCard from "~/components/MovieCard";
</script>

<div class="movie-list">
  <div class="movies">
    {#each $movies as movie (movie.imdbID)}
      <!-- MovieCard components는 movie라는 data 를 받아서 활용할 수 있도록 prop 전달한다.   -->
      <MovieCard {movie} />
    {/each}
  </div>
</div>

<style lang="scss">
  .movie-list {
    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
