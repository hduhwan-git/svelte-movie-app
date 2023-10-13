<script>
  import { link } from "svelte-spa-router";
  import Loader from "./Loader.svelte";
  let imageLoading = true;
  export let mall; //  export 사용해서 mall prop 받는다.

  console.log('mall',mall);

  if (mall.thumbnail_url == "" || mall.thumbnail_url == undefined ) {
    imageLoading = false;
  } else {
    const img = document.createElement("img");
    img.src = mall.thumbnail_url;
    img.addEventListener("load", () => {
      imageLoading = false;
    });
  }

  const cn1 = mall.base_discounted_price.toString() .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const cn2 = mall.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const persents = (mall.price/mall.base_discounted_price);


  console.log('cn1',cn1, 'cn2',cn2, persents);
  
</script>

<a use:link href={`/mall/${mall.id}`} class="mall">
  {#if imageLoading}
    <Loader scale=".5" absolute />
  {/if}

  <!-- poster 배경으로 사용 다 다른 이미지 사이즈 때문에. -->
  <div class="poster" style="background-image: url({mall.thumbnail_url})">
    {#if mall.Poster === "N/A"}
      OMDbAPI<br />N/A
    {/if}
  </div>

  <div class="info">
    <div class="poster" style="background-image: url({mall.thumbnail_url});" />
    <div class="brand_name">{mall.name}/(수량:{mall.stock})</div>
    <div class="name">{cn1} 할인:{mall.sale_rate}% </div>
    <!-- <div class="price">{mall.base_discounted_price}</div> -->
  </div>
</a>

<style lang="scss">
  .mall {
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
      .name, .brand_name {
        position: relative;
        color: $color--primary;
        font-size: 12px;
      }
      .price {
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
