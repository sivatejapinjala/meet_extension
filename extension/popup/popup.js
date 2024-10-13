fetch('http://127.0.0.1:5000/get-results')
  .then(response => response.json())
  .then(data => {
    document.getElementById('result').innerHTML = JSON.stringify(data);
  });
