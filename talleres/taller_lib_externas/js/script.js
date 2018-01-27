//IIFF
(function(){

  let contexto = document.getElementById("graficoIncidencia").getContext('2d');
  let grafico = new Chart(contexto, {
    type: 'bar',
    data: {
      labels: ["2012", "2013", "2014", "2015", "2016", "2017"],
      datasets: [{
        label: '# de Casos Reportados en Servicios de Salud Pública',
        data: [1023, 2365, 3165, 5576, 6923, 10342],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ]
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
})();