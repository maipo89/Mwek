export default ({ app }) => {
    if (process.client) {
      window.pagesense=window.pagesense||function(){(pagesense.q=pagesense.q||[]).push(arguments);};pagesense.l=+new Date;
      var z=document.createElement("script");
      z.type="text/javascript";
      z.async=true;
      z.src="https://cdn-eu.pagesense.io/js/onqor/321b1340911140abb82ae8d5e9e41d89.js";
      var s=document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(z,s);
    }
  };