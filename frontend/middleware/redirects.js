export default async function ({ app, redirect }) {
    console.log('Before the asynchronous operation');
    try {
      const response = await fetch(
        this.$store.state.apiroute.url + '/api/redirects?populate=*'
      ).then((res) => {
        return res.json();
      });
  
      // Loop through the redirection rules
      response.forEach((rule) => {
        // Apply the redirection rule
        app.router.addRoute({
          path: rule.from,
          redirect: rule.to,
          statusCode: rule.statusCode || 301, // Default to 301 redirect if statusCode is not provided
        });
      });
    } catch (error) {
      // Handle error if fetching redirection rules fails
      console.error('Failed to fetch redirection rules:', error);
    }
}