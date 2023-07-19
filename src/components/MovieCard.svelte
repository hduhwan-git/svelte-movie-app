<script>
  import { link } from "svelte-spa-router";
  import Loader from "./Loader.svelte";
  let imageLoading = true;
  export let movie; //  export 사용해서 movie prop 받는다.
  if (movie.Poster === "N/A") {
    imageLoading = false;
  } else {
    const img = document.createElement("img");
    img.src = movie.Poster;
    img.addEventListener("load", () => {
      imageLoading = false;
    });
  }
</script>

<a use:link href={`/movie/${movie.imdbID}`} class="movie">
  {#if imageLoading}
    <Loader scale=".5" absolute />
  {/if}

  <!-- poster 배경으로 사용 다 다른 이미지 사이즈 때문에. -->
  <div class="poster" style="background-image: url({movie.Poster})">
    {#if movie.Poster === "N/A"}
      OMDbAPI<br />N/A
    {/if}
  </div>

  <div class="info">
    <div class="poster" style="background-image: url({movie.Poster});" />
    <div class="year">{movie.Year}</div>
    <div class="title">{movie.Title}</div>
  </div>
</a>

<style lang="scss">
  .movie {
    width: 200px;
    height: 300px;
    display: block;
    margin: 10px;
    border-radius: 6px;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &:hover {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 6px solid $color--primary;
        box-sizing: border-box;
      }
    }
    .poster {
      width: 100%;
      height: 100%;
      background-color: $color--area;
      background-position: center;
      background-size: cover;
      display: flex;
      justify-items: center;
      align-items: center;
      font-family: "Oswald", snas-serif;
      color: $color--white-5;
      font-size: 20px;
      text-align: center;
    }
    .info {
      width: 100%;
      height: 66px;
      padding: 14px;
      box-sizing: border-box;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      .poster {
        position: absolute;
        bottom: 0;
        left: 0;
        transform: scale(2);
        filter: blur(5px);
        &::after {
          content: "";
          background-color: $color--black-50;
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
        }
      }
      .year {
        position: relative;
        color: $color--primary;
        font-size: 12px;
      }
      .title {
        position: relative;
        font-size: 15px;
        color: $color--white;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
