document.addEventListener('DOMContentLoaded', function () {

var ctx =  document.getElementById('myChart').getContext('2d');
var data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First dataset',
        backgroundColor: ['red','blue','green', 'white', 'black', 'dark', 'silver'],
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45]
    }]
}

console.log(data)



var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          label: function(tooltipItem, data) {
            return data['datasets'][0]['data'][tooltipItem['index']];
          },
          afterLabel: function(tooltipItem, data) {
            var dataset = data['datasets'][0];
            var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
            return '(' + percent + '%)';
          }
        },
        backgroundColor: '#FFF',
        titleFontSize: 16,
        titleFontColor: '#0066ff',
        bodyFontColor: '#000',
        bodyFontSize: 14,
        displayColors: false
      }
    }
  });

})