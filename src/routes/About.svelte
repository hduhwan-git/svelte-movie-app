<script>
  import { querystring } from "svelte-spa-router";
  import qs from "qs";

  $: query = qs.parse($querystring);
  $: name = query.name || "Robin";
  $: email = query.email || "hduhwan@nate.com";
  $: blog = query.blog || "https://github.com/hduhwan-git";
  $: image = query.image || "Robin.jfif";
  $: phone = query.phone || "+82-10-3209-3409"; //sevlte label 문법 $: ~~

  console.log($querystring, qs.parse($querystring), image);
</script>

<div class="user-profile">
  <div class="photos">
    <div class="photo">
      <img src="/assets/svelte.png" alt="User" />
    </div>
    <div class="photo">
      <img src="/assets/{image}" alt="User" />
    </div>
  </div>
  <div class="details">
    <div class="name">{name}</div>
    <div class="email">{email}</div>
    <div class="blog">{blog}</div>
    <div class="phone">{phone}</div>
  </div>
</div>

<style lang="scss">
  .user-profile {
    padding: 80px 0;
    .photos {
      display: flex;
      justify-content: center;
      .photo {
        flex-shrink: 0;
        width: 230px;
        height: 230px;
        padding: 30px;
        box-sizing: border-box;
        background-color: $color--area;
        border-radius: 50%;
        border: 12px solid $color--black;
        &:first-child {
          margin-right: -80px;
        }
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }
    .details {
      margin-top: 20px;
      text-align: center;
      .name {
        font-size: 40px;
        font-family: "Oswald", sans-serif;
        // border: 1px solid red;
        margin-bottom: 20px;
      }
    }
  }
</style>
