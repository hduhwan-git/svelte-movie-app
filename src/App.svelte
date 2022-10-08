<script>
  import Router from "svelte-spa-router";
  import routes from "~/routes";
  import Header from "~/components/Header";
  import Footer from "~/components/Footer";
</script>

<Header />
<Router {routes} />
<Footer />
