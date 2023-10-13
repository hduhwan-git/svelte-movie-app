<script>
  import { malls, loading, message } from "~/store/movie";
  import MallCard from "~/components/MallCard";
  import Loader from "~/components/Loader";
  console.log($malls.length, $malls.length, $malls, !$malls.length);
</script>

<div class:no-result={!$malls.length} class="movie-list">
  <!-- store 내부 컨포넌트의 값을 알고 싶으면 $넣어준다. -->
  {#if $loading}
    <Loader />
  {/if}
  <div class="message">
    {$message}
  </div>
  <div class="malls">
    <!-- //writable 사용시 실제 값이라는 명칭으로 통상적으로 변수에 $ 붙인다( $malls) -->
    {#each $malls as mall (mall.id)}
      <!-- MallCard components는 movie라는 data 를 받아서 활용할 수 있도록 prop 전달한다.   -->
      <MallCard {mall} />
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
    &.no-result {
      padding: 70px 0;
    }
    .message {
      color: $color--primary;
      font-size: 20px;
      text-align: center;
    }
    .malls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
