function myRequest() {
  console.log('Request URL');
  const url = 'https://api.coindesk.com/v1/bpi/currentprice/INR.json';
  console.log(url);
  fetch(url)
      .then(data => data.json())
      .then(response => console.log(response))
}

export default myRequest;