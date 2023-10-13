<script>
    import Loader from "~/components/Loader";
    import { searchMovieWithId, theMall, theInfo, loading } from "~/store/movie";
  
    let imageLoading = true;
    let name = "Having harnessed her ever-growing power after lifting the dreadful curse of the eternal winter in Frozen (2013), the beautiful conjurer of snow and ice, Queen Elsa, now rules the peaceful kingdom of Arendelle, enjoying a happy life with her sister, Princess Anna. However, a melodious voice that only Elsa can hear keeps her awake, inviting her to the mystical enchanted forest that the sisters' father told them about a long time ago. Now, unable to block the thrilling call of the secret siren, Elsa, along with Anna, Kristoff, Olaf, and Sven summons up the courage to follow the voice into the unknown, intent on finding answers in the perpetually misty realm in the woods. More and more, an inexplicable imbalance is hurting not only her kingdom but also the neighboring tribe of Northuldra. Can Queen Elsa put her legendary magical skills to good use to restore peace and stability?"
    export let params = {};
    console.log('params:',params, 'theMall:' );
    searchMovieWithId(params.id, 'mall');
    
    console.log('theMall:',  theMall);
  
    function requestDifferentSizeImage(url, size = 700) {
      const src = url.replace("SX300", `SX${size}`);
      const img = document.createElement("img");
      img.src = src;
      img.addEventListener("load", () => {
        imageLoading = false;
      });
      return src;
    }
  </script>
  
  <div class="container">
    <!--  $ 붙여서 DATA 활용할 수 있다.  -->
    {#if $loading}
      <div class="skeleton-loader">
        <div class="poster" />
        <div class="skeletons">
          <div class="skeleton title" />
          <div class="skeleton specs" />
          <div class="skeleton plot" />
          <div class="skeleton etc" />
          <div class="skeleton etc" />
          <div class="skeleton etc" />
        </div>
        <Loader absolute />
      </div>
    {:else}
    <div class="movie-details">
      <div
        style="background-image: url({requestDifferentSizeImage(
           $theMall.goods.thumbnail_urls[0]
        )});"
        class="poster"
      >
        {#if imageLoading}
          <Loader scale=".7" absolute />
        {/if}
      </div>
      <div class="specs">
        <div class="title">{$theMall.goods.name}</div>
        <div class="labels">
          <span>{$theMall.goods.category.full_label}</span>
          <span class="dot">·</span>
          <span>{$theMall.goods.category.type}</span>
          <span class="dot">·</span>
          <span>{$theMall.goods.brand_name},Code:{$theMall.goods.brand_id}</span>
          
        </div>
   
  
        <div class="plot">{name}</div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            {#each $theMall.goods.delivery_info.shipping_arrival_probability_list as rating (rating.average_date)}
              <div class="rating" title={rating.Source}>
                <img
                  src="/assets/{rating.average_date}.png"
                  alt={rating.average_date}
                  height="30"
                />
                <span>{rating.probability}</span>
              </div>
            {/each}
          </div>
        </div>
  
        <div>
          <h3>Seller id</h3>
          {$theMall.goods.seller_id}
        </div>
        <div>
          <h3>is_only_adult</h3>
          {$theMall.goods.is_only_adult}
        </div>
        <div>
          <h3>is_use_seller_shop</h3>
          {$theMall.goods.is_use_seller_shop}
        </div>
        <div>
          <h3>degree_360_image_urls</h3>
          {$theMall.goods.degree_360_image_urls}
        </div>
      </div>
    </div>
    <div class='info'>
      
        <section class="m_prodetail-info">
          <h4 class="m_prodetail-info-title">  
            <table>  
              <colgroup> <col style="width: 209px;">상품정보고시<col></colgroup>
              <tbody>    
              {#each $theInfo.mandatory as Info, index }
                <!-- MovieCard components는 movie라는 data 를 받아서 활용할 수 있도록 prop 전달한다.   -->
                <tr><th scope="row"><b>{index}  {Info.title} </b></th> <td>{Info.content} </td></tr>
              {/each}
              </tbody>
            </table>
        </section>
    </div>
     
    {/if}
  </div>
  
  <style lang="scss">
    .skeleton-loader {
      display: flex;
      .skeletons {
        flex: 1;
        .skeleton {
          width: 100%;
          height: 100px;
          background-color: $color--area;
          border-radius: 8px;
          margin-top: 20px;
          &:first-child {
            margin-top: 0;
          }
          &.title {
            height: 100px;
          }
          &.specs {
            width: 60%;
            height: 30px;
          }
          &.plot {
            height: 300px;
          }
          &.etc {
            width: 40%;
            height: 50px;
          }
        }
      }
    }
    .movie-details {
      color: $color--white-50;
      display: flex;
    }
    .poster {
      flex-shrink: 0;
      width: 500px;
      height: 500px * 3/2;
      margin-right: 70px;
      border-radius: 10px;
      background-position: center;
      background-size: cover;
      position: relative;
      background-color: $color--area;
    }
    .specs {
      .title {
        font-family: "Oswald", sans-serif;
        font-size: 30px;
        color: $color--white;
        line-height: 1;
        margin-bottom: 30px;
        // border: 1px solid;
      }
      .labels {
        color: $color--primary;
        .dot {
          margin: 0 6px;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      color: $color--white;
      margin: 24px 0 6px;
      font-family: Oswald, sans-serif;
      font-size: 20px;
    }
    .m_prodetail-info-title {
      padding: 0 0 17px 2px;
      font-size: 2rem;
      text-align: left
    }
  
    .m_prodetail-info table {
        border: 1px solid #101010;
        border-width: 1px 0;
        font-size: 1.4rem;
        line-height: 1.9rem
    }
  
    .m_prodetail-info table tr:nth-of-type(n+2) {
        border-top: 1px solid #e6e6e6
    }
  
    .m_prodetail-info table tr>* {
        //padding: 14px 0;
        text-align: left
    }
  
    .m_prodetail-info table tr th {
        padding-left: 25px;
        height: 49px;
        vertical-align: top;
        color: #5c5c5c
    }
  
    .m_prodetail-info table td strong {
        font-variation-settings: "wght" 700
    }
  
    .m_prodetail-info table td ul {
        padding-left: 12px
    }
  
    .m_prodetail-info table td p+ul {
        margin-top: 9px
    }
  
    .m_prodetail-info table td ul li {
        position: relative;
        padding-left: 8px
    }
  
    .m_prodetail-info table td ul li:before {
        position: absolute;
        top: 0;
        left: 0;
        content: "-"
    }
  
    .m_prodetail-info table td dl:not(:first-child) {
        margin-top: 19px
    }
  
    .m_prodetail-info table td dl dd ul {
        margin-top: 9px
    }
  
    .m_prodetail-info+.m_prodetail-info {
        margin-top: 84px;
    }
    table {
        padding: 0 0 17px 2px;
        font-size: 2rem;
        text-align: left;
      }
      :root,body {
          width: 100%;
          height: 100%
      }
  
      :root {
          /* background-color:transparent; */
          /* color:#101010; */
          font-variation-settings: "wght" 500;
          font-size: 10px;
          /* line-height:1; */
          /* font-family:PretendardVariable,sans-serif; */
          letter-spacing: -.25px;
          word-break: break-all;
          -webkit-text-size-adjust: none;
          text-size-adjust: none
      }
    
  </style>
  