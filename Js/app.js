
$('document').ready(function () {

    var myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
        
    };

    //const url = "https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalrepasse/2018-06-19/2018-07-04";
    const url = "https://viacep.com.br/ws/69301110/json/";
    console.log('Iniciando');

    fetch(url,myInit)
    .then(response => { response.json()
        .then(data => console.log(data))
    })
    .catch(e => console.log('Erro :'+ e.message));






    //      .then(function(response){
    //          return response.json()})
    //         .then(function(data){
    //          console.log(data)
    //     })
    //    .catch(function(err) { console.error(err) })


    // fetch(url, myInit)
    //     .then(function(response){
    //          return response.json()
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //     })
    //     .catch(function(err) { console.error(err); });
        



})

function grafico(nome, vendas) {


    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {

        type: 'horizontalBar',
        data: {
            labels: nome,


            datasets: [{
                label: 'Gráfico',
                backgroundColor: ['green', 'blue', 'yellow'],
                borderColor: 'rgb(255, 99, 132)',
                data: vendas
            }]
        },

        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}