
$('document').ready(function () {

    var myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'

    };

    //const url = "https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalrepasse/2018-06-19/2018-07-04";
    const url = "https://viacep.com.br/ws/69301110/json/";
    console.log('Iniciando');

    var aLabel = [];
    var aValorIcms = [];

    for (var i in vrepase ) {

        aLabel.push(vrepase[i].portalrepassedata.substring(0,10))
        aValorIcms.push(vrepase[i].portalrepasseicms)
    }

    grafico(aLabel, aValorIcms)
    
    // Obter Dado Api

    // fetch(url, myInit)
    //     .then(response => {
    //         response.json()
    //             .then(data => console.log(data))
    //     })
    //     .catch(e => console.log('Erro :' + e.message));



})

function grafico(nome, valor) {


    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {

        type: 'doughnut',
        data: {
            labels: nome,


            datasets: [{
                label: 'Gráfico',
                backgroundColor: ['green', 'blue', 'yellow'],
                borderColor: 'rgb(255, 99, 132)',
                data: valor
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

//   Repase
const vrepase =

    [
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "81",
            "portalrepasseicms": "265766.91",
            "portalrepasseipva": "304839.62",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "142651.64"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "101",
            "portalrepasseicms": "9238.18",
            "portalrepasseipva": "2536.93",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2943.78"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "121",
            "portalrepasseicms": "6494.14",
            "portalrepasseipva": "938.67",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1858.21"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "141",
            "portalrepasseicms": "8502.21",
            "portalrepasseipva": "812.45",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2328.66"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "161",
            "portalrepasseicms": "7203.97",
            "portalrepasseipva": "1104.98",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2077.23"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "181",
            "portalrepasseicms": "17128.5",
            "portalrepasseipva": "2163.09",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "4822.89"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "201",
            "portalrepasseicms": "7321.8",
            "portalrepasseipva": "899.66",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2055.37"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "221",
            "portalrepasseicms": "6806.35",
            "portalrepasseipva": "510.43",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1829.2"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "241",
            "portalrepasseicms": "8049.95",
            "portalrepasseipva": "3989.27",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "3009.81"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "242",
            "portalrepasseicms": "6654.68",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1663.67"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "243",
            "portalrepasseicms": "7343.1",
            "portalrepasseipva": "1456.19",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2199.82"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "261",
            "portalrepasseicms": "11855.62",
            "portalrepasseipva": "8929.67",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "5196.33"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "281",
            "portalrepasseicms": "7290.62",
            "portalrepasseipva": "935.14",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2056.43"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "301",
            "portalrepasseicms": "6968.52",
            "portalrepasseipva": "662.55",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1907.77"
        },
        {
            "portalrepassedata": "2018-06-19 00:00:00",
            "portalrepassemunicipiocod": "321",
            "portalrepasseicms": "6480.38",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1620.1"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "81",
            "portalrepasseicms": "3907219.54",
            "portalrepasseipva": "616591.92",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1130952.86"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "101",
            "portalrepasseicms": "135816.79",
            "portalrepasseipva": "6549.21",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "35591.5"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "121",
            "portalrepasseicms": "95474.8",
            "portalrepasseipva": "870.93",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "24086.43"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "141",
            "portalrepasseicms": "124996.7",
            "portalrepasseipva": "808.96",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "31451.41"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "161",
            "portalrepasseicms": "105910.37",
            "portalrepasseipva": "1903.43",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "26953.45"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "181",
            "portalrepasseicms": "251817.62",
            "portalrepasseipva": "6593.16",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "64602.7"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "201",
            "portalrepasseicms": "107642.74",
            "portalrepasseipva": "2552.62",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "27548.84"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "221",
            "portalrepasseicms": "100064.8",
            "portalrepasseipva": "561.83",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "25156.66"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "241",
            "portalrepasseicms": "118347.81",
            "portalrepasseipva": "5790.78",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "31034.64"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "242",
            "portalrepasseicms": "97834.94",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "24458.73"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "243",
            "portalrepasseicms": "107955.79",
            "portalrepasseipva": "2396.82",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "27588.15"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "261",
            "portalrepasseicms": "174297.58",
            "portalrepasseipva": "9556.35",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "45963.48"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "281",
            "portalrepasseicms": "107184.33",
            "portalrepasseipva": "4661.67",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "27961.5"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "301",
            "portalrepasseicms": "102448.88",
            "portalrepasseipva": "932.05",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "25845.23"
        },
        {
            "portalrepassedata": "2018-06-26 00:00:00",
            "portalrepassemunicipiocod": "321",
            "portalrepasseicms": "95272.51",
            "portalrepasseipva": "490.97",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "23940.87"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "81",
            "portalrepasseicms": "436290.48",
            "portalrepasseipva": "973469.74",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "352440.06"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "101",
            "portalrepasseicms": "151.66",
            "portalrepasseipva": "27.01",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "44.67"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "121",
            "portalrepasseicms": "10660.97",
            "portalrepasseipva": "608.26",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2817.3"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "141",
            "portalrepasseicms": "13957.46",
            "portalrepasseipva": "4347.63",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "4576.28"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "161",
            "portalrepasseicms": "11826.23",
            "portalrepasseipva": "2984.09",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "3702.58"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "181",
            "portalrepasseicms": "28118.62",
            "portalrepasseipva": "5711.17",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "8457.45"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "201",
            "portalrepasseicms": "12019.67",
            "portalrepasseipva": "4125.31",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "4036.25"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "221",
            "portalrepasseicms": "11173.5",
            "portalrepasseipva": "2864.52",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "3509.51"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "241",
            "portalrepasseicms": "13215.03",
            "portalrepasseipva": "10992.9",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "6051.98"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "242",
            "portalrepasseicms": "10924.5",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2731.13"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "243",
            "portalrepasseicms": "12054.63",
            "portalrepasseipva": "5271.23",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "4331.47"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "261",
            "portalrepasseicms": "19462.53",
            "portalrepasseipva": "11106.98",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "7642.38"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "281",
            "portalrepasseicms": "11968.49",
            "portalrepasseipva": "2027.58",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "3499.01"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "301",
            "portalrepasseicms": "11439.71",
            "portalrepasseipva": "1491.92",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "3232.91"
        },
        {
            "portalrepassedata": "2018-07-03 00:00:00",
            "portalrepassemunicipiocod": "321",
            "portalrepasseicms": "10638.38",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2659.6"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "81",
            "portalrepasseicms": "143421.9",
            "portalrepasseipva": "12472.27",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "38973.55"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "101",
            "portalrepasseicms": "49.85",
            "portalrepasseipva": "2.35",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "13.05"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "121",
            "portalrepasseicms": "3504.58",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "876.15"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "141",
            "portalrepasseicms": "4588.24",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1147.06"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "161",
            "portalrepasseicms": "3887.64",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "971.91"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "181",
            "portalrepasseicms": "9243.44",
            "portalrepasseipva": "82.64",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "2331.52"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "201",
            "portalrepasseicms": "3951.23",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "987.91"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "221",
            "portalrepasseicms": "3673.07",
            "portalrepasseipva": "595.01",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1067.02"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "241",
            "portalrepasseicms": "4344.18",
            "portalrepasseipva": "106.3",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1112.63"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "242",
            "portalrepasseicms": "3591.22",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "897.8"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "243",
            "portalrepasseicms": "3962.72",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "990.68"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "261",
            "portalrepasseicms": "6397.92",
            "portalrepasseipva": "389.04",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1696.74"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "281",
            "portalrepasseicms": "3934.4",
            "portalrepasseipva": "723.82",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1164.55"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "301",
            "portalrepasseicms": "3760.58",
            "portalrepasseipva": "278.01",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "1009.65"
        },
        {
            "portalrepassedata": "2018-07-04 00:00:00",
            "portalrepassemunicipiocod": "321",
            "portalrepasseicms": "3497.16",
            "portalrepasseipva": "0",
            "portalrepassefundebicms": null,
            "portalrepassefundebipva": null,
            "portalrepassefundef": "874.29"
        }
    ]
const varrecda = [
    {
        "portalarrecadacaoano": "2017",
        "portalarrecadacaomes": "4",
        "portalarrecadacaoicms": "65033043.67",
        "portalarrecadacaoipva": "15124480.45",
        "portalportalarrecadacaooutros": "5865278.64",
        "portalarrecadacaotaxas": "0",
        "portalarrecadacaoirrf": "0",
        "portalarrecadacaoitcd": "0"
    }
]


