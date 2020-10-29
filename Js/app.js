// "https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalrepasse/2020-01-01/2020-12-31";
// https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalarrecadacao/4/2017

const BASE_URL = 'https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/';
var LabelImpostos = ['ICMS', 'IPVA', 'OUTROS', 'ITCD', 'IRRF', 'TAXAS'];
let LabelRepasses = ['ICMS', 'IPVA', 'FUNDEBICMS', 'FUNDEBIPVA'];

var options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}

var arrays = ['portalarrecadacaoicms',
    'portalarrecadacaoipva',
    'portalportalarrecadacaooutros',
    'portalarrecadacaoitcd',
    'portalarrecadacaoirrf',
    'portalarrecadacaotaxas'
]

var meses = ['NUL', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
var btnRepasse = document.getElementById("repasse");
var btnArrecada = document.getElementById("arrecada");
btnRepasse.addEventListener("click", prepareRepasse, false);
btnArrecada.addEventListener('click', renderArrecadacaoGrafico, false);
document.addEventListener('DOMContentLoaded', function () {
    var now = new Date;
    var mes = now.getMonth();
    var ano = now.getFullYear();
    var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;
    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => prepareImpostoDonut(data, mes, ano, 'impostoChart'))
            prepareArrecada(0, ano, 'arrecadaChart')
            prepareRepasseDonut(mes, ano, 'donnut-repasse')
            prepareRepasseBarra(ano)
        })
        .catch(e => console.log('Erro :' + e.message));

})

function prepareRepasse() {
    var dataInicial = document.getElementById("dtInicial").value;
    var dataFinal = document.getElementById("dtFinal").value;
    let tipo = 'Repasses entre :' + dataInicial + ' a ' + dataFinal + ' : '

    if (dataInicial > dataFinal) {
        alert('Data Inical deve Ser Menor que Data Final!')
    }
    else {
        ObterDadosRepase(dataInicial, dataFinal, 'chartrepasse', tipo);
    }

}

function prepareRepasseBarra(ano) {
    let dataInicial = ano + '-01-01';
    let dataFinal = ano + '-12-31';
    let tipo = 'Repasses do Ano ' + ano + ' : '
    ObterDadosRepase(dataInicial, dataFinal, 'bar-repasse', tipo)

}
function ObterDadosRepase(dInicial, dFinal, canvas, tipo) {
    var url = BASE_URL + 'getportalrepasse/' + dInicial + '/' + dFinal;


    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => prepareGraficoRemessa(data, canvas, tipo))
        })
        .catch(e => console.log('Erro :' + e.message));


};


function prepareGraficoRemessa(data, canvas, tipo) {
    var vArrecadaIcms = mapIcms(data)
    var vArrecadaIpva = mapIpva(data)
    var vFundebIcms = mapFundebIcms(data)
    var vFundebIpva = mapFundebIpva(data)

    renderGraficoRemessa(vArrecadaIcms, vArrecadaIpva, vFundebIcms, vFundebIpva, canvas, tipo);


}

function renderGraficoRemessa(vIcms, vIpva, vFundebIcms, vFundebIpva, canvas, tipo) {

    var labelIcms = []
    var valorIcms = []
    var valorIpva = []
    var valorFundeIcms = []
    var valorFundeIpva = []

    for (var i in vIcms) {
        labelIcms.push(vIcms[i].munId.substr(0, 6))
        valorIcms.push(vIcms[i].icms)
    }
    for (var i in vIpva) {
        valorIpva.push(vIpva[i].ipv)
    }
    for (var i in vFundebIcms) {
        valorFundeIcms.push(vFundebIcms[i].fundebicms)
    }

    for (var i in vFundebIpva) {
        valorFundeIpva.push(vFundebIpva[i].fundebipva)
    }
    for (var i in vFundebIpva) {
        valorFundeIpva.push(vFundebIpva[i].fundebipva)
    }


    var ttotalIcms = valorIcms.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })

    var ttotalIpva = valorIpva.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var tvalorFundeIcms = valorFundeIcms.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })

    var tvalorFundeIpva = valorFundeIpva.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })

    var TotalPeriodo = ttotalIcms + ttotalIpva + tvalorFundeIcms + tvalorFundeIpva


    document.getElementById(canvas).innerHTML = '&nbsp;';
    document.getElementById(canvas).innerHTML = '<canvas id=' + chartrepasse + '></canvas>'

    var ctx = document.getElementById(canvas).getContext('2d');

    var chart = new Chart(ctx, {

        type: 'bar',
        data: {
            labels: labelIcms,
            datasets: [{
                label: 'ICMS',
                backgroundColor: 'rgba(0, 123, 255,1)',
                borderColor: 'rgba(0, 123, 255,0.7)',
                pointBorderColor: 'rgba(0, 123, 255,0.7)',
                pointBackgroundColor: 'rgba(0, 123, 255,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointBorderWidth: 1,
                minBarLength: 3,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorIcms
            },
            {
                label: 'IPVA',
                backgroundColor: 'rgba(108, 117, 125,1)',
                borderColor: 'rgba(108, 117, 125,0.7)',
                pointBorderColor: 'rgba(108, 117, 125,0.7)',
                pointBackgroundColor: 'rgba(108, 117, 125,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(25,25,112,1)',
                pointBorderWidth: 1,
                minBarLength: 3,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorIpva

            },
            {
                label: 'FUNDEBICMS',
                backgroundColor: 'rgba(40, 167, 69,1)',
                borderColor: 'rgba(40, 167, 69,0.7)',
                pointBorderColor: 'rgba(40, 167, 69,0.7)',
                pointBackgroundColor: 'rgba(40, 167, 69,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(138,43,226,1)',
                pointBorderWidth: 1,
                minBarLength: 3,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorFundeIcms

            },
            {
                label: 'FUNDEBIPVA',
                backgroundColor: 'rgba(23, 162, 184,1)',
                borderColor: 'rgba(23, 162, 184,0.6)',
                pointBorderColor: 'rgba(23, 162, 184,0.6)',
                pointBackgroundColor: 'rgba(23, 162, 184,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(138,43,226,1)',
                pointBorderWidth: 1,
                minBarLength: 3,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorFundeIpva
            }
            ]
        },
        options: {
            legend: {
                position: 'bottom',
                label: {
                    boxerwidth: 10,
                    fontSize: 14
                }
            },
            title: {
                display: true,
                fontSize: 16,
                text: tipo + TotalPeriodo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            },

            layout: {
                padding: {
                    left: 10,
                    right: 15,
                    top: 5,
                    bottom: 5
                    // with: 10,
                    // heigh: 10
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                mode: 'index',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex]
                            .label + ' :' + (data.datasets[tooltipItem.datasetIndex])
                                .data[tooltipItem.index]
                                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    }
                }
            }
        }
    });
}

function prepareImpostoDonut(data, mes, ano, canvas) {
    arrays = arrays.map(function (campo) {
        var novoConteudo = data.map(function (objeto) {
            return objeto[campo];
        });
        return novoConteudo;
    });
    document.getElementById('icmsvalor').innerHTML = parseFloat2Decimals(data[0]["portalarrecadacaoicms"])
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    document.getElementById('ipvavalor').innerHTML = parseFloat2Decimals(data[0]["portalarrecadacaoipva"])
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    document.getElementById('outrosvalor').innerHTML = parseFloat2Decimals(data[0]["portalportalarrecadacaooutros"])
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    document.getElementById('irrfvalor').innerHTML = parseFloat2Decimals(data[0]["portalarrecadacaoirrf"])
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    document.getElementById('itcdvalor').innerHTML = parseFloat2Decimals(data[0]["portalarrecadacaoitcd"])
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    document.getElementById('taxasvalor').innerHTML = parseFloat2Decimals(data[0]["portalarrecadacaotaxas"])
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    dados = arrays.map(a => parseFloat2Decimals(a, 2));

    let mesano = document.querySelectorAll('.mesvalue');

    mesano.forEach(ma => { ma.innerHTML = meses[mes] + ' / ' + ano });
    renderImpostGraficoDonut(dados, mes, canvas)
}

function prepareRepasseDonut(mes, ano, canvas) {
    let lMes = mes + 1
    var url = BASE_URL + 'getportalrepasse/' + ano + '-' + lMes + '-01/' + ano + '-' + lMes + '-31';

    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => prepareDadosRepasse(data, lMes, ano))

        })
        .catch(e => console.log('Erro :' + e.message));

}
//
function prepareDadosRepasse(data, mes, ano) {

    let repasse = data.map(item => item)

    let repasseIcms = mapRepasse(repasse, 'portalrepasseicms')
    let repasseIpva = mapRepasse(repasse, 'portalrepasseipva')
    let repasseFundebIcms = mapRepasse(repasse, 'portalrepassefundebicms')
    let repasseFundebIpva = mapRepasse(repasse, 'portalrepassefundebipva')

    let totalRepasseIcms = parseFloat2Decimals(repasseIcms.reduce((acumulador, valorAtual) => { return acumulador + valorAtual }, 0))
    let totalRepasseIpva = parseFloat2Decimals(repasseIpva.reduce((acumulador, valorAtual) => { return acumulador + valorAtual }, 0) + .05)
    let totalRepasseFundebIcms = parseFloat2Decimals(repasseFundebIcms.reduce((acumulador, valorAtual) => { return acumulador + valorAtual }, 0))
    let totalRepasseFundebIpva = parseFloat2Decimals(repasseFundebIpva.reduce((acumulador, valorAtual) => { return acumulador + valorAtual }, 0))
    let dados = [].concat(totalRepasseIcms, totalRepasseIpva, totalRepasseFundebIcms, totalRepasseFundebIpva)
    let totalRepase = totalRepasseIcms + totalRepasseIpva + totalRepasseFundebIcms + totalRepasseFundebIpva

    renderRepasseDonut(dados, totalRepase, mes, ano)

}

function mapRepasse(data, imposto) {
    return data.map(item => {
        return parseFloat2Decimals(item[imposto])
    })
}

function renderRepasseDonut(dados, totalRepasse, mes, ano) {
    {
        var ctx = document.getElementById('donnut-repasse').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: LabelRepasses,
                datasets: [{
                    label: 'Donut',
                    backgroundColor: [
                        'rgba(0, 123, 255, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(111, 66, 193, 1)',
                        'rgba(40, 167, 69, 0.98)'
                    ],
                    borderColor: 'rgba(220,220,220,0.3)',
                    pointBackgroundColor: 'rgba(211,211,211,0.5)',
                    pointHoverBackgroundColor: ['write'],
                    // pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointBorderWidth: 1,
                    data: dados
                }]
            },
            options: {
                legend: {
                    position: 'bottom',
                    label: {
                        boxerwidth: 12,
                        fontSize: 14
                    }
                },
                title: {
                    display: true,
                    fontSize: 16,
                    text: 'Repasse do Mes :' + meses[mes] + '/' + ano + ' : ' + totalRepasse.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 5,
                        bottom: 3,
                        with: 10,
                        heigh: 10
                    }
                },


                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function (tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                        },
                        // afterLabel: function (tooltipItem, data) {
                        //             var dataset = data['datasets'][0];
                        //             console.log(dataset['data'][tooltipItem['index']])
                        //             console.log(dataset["_meta"][0]['total'])

                        // var percent = ((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100).toFixed(2)

                        //     return '(' + percent + '%)';
                        // }
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

    }

}

function renderImpostGraficoDonut(dados, mes, canvas) {

    var totalImpostos = dados.reduce(function (acumulador, valorAtual) {
        return acumulador + valorAtual
    })
    var ctx = document.getElementById(canvas).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: LabelImpostos,
            datasets: [{
                label: 'Donut',
                backgroundColor: [
                    'rgba(0, 123, 255, 1)',
                    'rgba(108, 117, 125, 1)',
                    'rgba(111, 66, 193, 1)',
                    'rgba(40, 167, 69, 0.98)',
                    'rgba(23, 162, 184, 1)',
                    'rgba(255, 193, 7, 1)'
                ],
                borderColor: 'rgba(220,220,220,0.3)',
                pointBackgroundColor: 'rgba(211,211,211,0.5)',
                pointHoverBackgroundColor: ['write'],
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointBorderWidth: 1,
                data: dados
            }]
        },
        options: {
            legend: {
                position: 'bottom',
                label: {
                    boxerwidth: 12,
                    fontSize: 14
                }
            },
            title: {
                display: true,
                fontSize: 16,
                text: 'Arrecadação Mês ' + meses[mes] + ' : ' + totalImpostos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 3,
                    with: 10,
                    heigh: 10
                }
            },
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function (tooltipItem, data) {
                        return data['datasets'][0]['data'][tooltipItem['index']].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                    },
                    afterLabel: function (tooltipItem, data) {
                        var dataset = data['datasets'][0];
                        var percent = ((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100).toFixed(2)
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

}

function renderArrecadacaoGrafico() {
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    var canvas = 'impostoChartConsulta'
    var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;

    if (mes > 12) {
        alert('Mes de Esta entre "0" e "12" ')
    }
    prepareArrecada(parseInt(mes), parseInt(ano), canvas)
}

function prepareArrecada(mes, ano, canvas) {
    var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;
    let tipo = ''
    if (mes > 0) {
        tipo = 'Arrecadação mes ' + meses[mes] + '/' + ano + ' : '
    }
    else
        tipo = `Arrecadação anual de ${ano} :`
    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => renderArrecadaGraficoBar(data, canvas, tipo))
        })
        .catch(e => console.log('Erro :' + e.message));
}

function renderArrecadaGraficoBar(data, canvas, tipo) {
    if (data.length > 0) {
        var ArrecadaIcms = mapArrecadaIcms(data)
        var ArrecadaIpva = mapArrecadaIpva(data)
        var ArrecadaOutros = mapArrecadaOutros(data)
        var ArrecadaItcd = mapArrecadaItcd(data)
        var ArrecadaIrrf = mapArrecadaIrrf(data)
        var ArrecadaTaxas = mapArrecadaTaxas(data)
        GraficoArrecada(ArrecadaIcms, ArrecadaIpva, ArrecadaOutros, ArrecadaItcd, ArrecadaIrrf, ArrecadaTaxas, canvas, tipo)
    } else {
        throw alert('Nenhuma Informação Seleionada para os dados Informados')
    }
}

function GraficoArrecada(ArrecadaIcms, ArrecadaIpva, ArrecadaOutros, ArrecadaItcd, ArrecadaIrrf, ArrecadaTaxas, canvas, tipo) {
    var labelIcms = []
    var valorIcms = []
    var valorIpva = []
    var valorOutros = []
    var valorItcd = []
    var valorIrrf = []
    var valorTaxas = []
    // console.log(ArrecadaIcms)
    for (var i in ArrecadaIcms) {
        labelIcms.push(meses[ArrecadaIcms[i].mes])
        valorIcms.push(ArrecadaIcms[i].icms)
    }
    for (var i in ArrecadaIpva) {
        valorIpva.push(ArrecadaIpva[i].ipva)
    }
    for (var i in ArrecadaOutros) {
        valorOutros.push(ArrecadaOutros[i].outros)
    }

    for (var i in ArrecadaItcd) {
        valorItcd.push(ArrecadaItcd[i].itcd)
    }

    for (var i in ArrecadaIrrf) {
        valorIrrf.push(ArrecadaIrrf[i].irrf)
    }
    for (var i in ArrecadaTaxas) {
        valorTaxas.push(ArrecadaTaxas[i].taxas)
    }
    // console.log(valorIcms)
    var vtotalIcms = valorIcms.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var vtotalIpva = valorIpva.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var vtotalOutros = valorOutros.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var vtotalItcd = valorItcd.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var vtotalIrrf = valorIrrf.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var vtotalTaxas = valorTaxas.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var TotalAno = vtotalIcms + vtotalIpva + vtotalOutros + vtotalItcd + vtotalIrrf + vtotalTaxas


    if (canvas === 'impostoChartConsulta') {
        document.getElementById("divcanvas").innerHTML = '&nbsp;';
        document.getElementById('divcanvas').innerHTML = '<canvas id=' + canvas + '></canvas>';
    }
    var ctx = document.getElementById(canvas).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelIcms,
            datasets: [{
                label: 'ICMS',
                backgroundColor: 'rgba(0, 123, 255,1)',
                borderColor: 'rgba(0, 123, 255,0.7)',
                pointBorderColor: 'rgba(0, 123, 255,0.7)',
                pointBackgroundColor: 'rgba(0, 123, 255,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointBorderWidth: 1,
                minBarLength: 2,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorIcms
            },
            {
                label: 'IPVA',
                backgroundColor: 'rgba(108, 117, 125,1)',
                borderColor: 'rgba(108, 117, 125,0.7)',
                pointBorderColor: 'rgba(108, 117, 125,0.7)',
                pointBackgroundColor: 'rgba(108, 117, 125,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(25,25,112,1)',
                pointBorderWidth: 1,
                minBarLength: 2,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorIpva
            },
            {
                label: 'ITCD',
                backgroundColor: 'rgba(40, 167, 69,.9)',
                borderColor: 'rgba(40, 167, 69,0.7)',
                pointBorderColor: 'rgba(40, 167, 69,0.5)',
                pointBackgroundColor: 'rgba(40, 167, 69,0.5)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(139,69,19,1)',
                pointBorderWidth: 1,
                minBarLength: 2,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorItcd
            },
            {
                label: 'IRRF',
                backgroundColor: 'rgba(23, 162, 184,1)',
                borderColor: 'rgba(23, 162, 184,0.7)',
                pointBorderColor: 'rgba(255,0,0,0.7)',
                pointBackgroundColor: 'rgba(23, 162, 184,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(139,0,0,1)',
                pointBorderWidth: 1,
                minBarLength: 2,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorIrrf
            },
            {
                label: 'TAXAS',
                backgroundColor: 'rgba(255, 193, 7,.8)',
                borderColor: 'rgba(255, 193, 7,0.7)',
                pointBorderColor: 'rgba(255, 193, 7,0.7)',
                pointBackgroundColor: 'rgba(255, 193, 7,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,140,0,1)',
                minBarLength: 2,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorTaxas
            },
            {
                label: 'OUTROS',
                backgroundColor: 'rgba(111, 66, 193,.8)',
                borderColor: 'rgba(111, 66, 193,0.7)',
                pointBorderColor: 'rgba(111, 66, 193,0.7)',
                pointBackgroundColor: 'rgba(111, 66, 193,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(138,43,226,1)',
                minBarLength: 2,
                barPercentage: 1.1,
                categoryPercentage: .98,
                data: valorOutros
            },
            ]
        },

        options: {
            legend: {
                position: 'bottom',
                label: {
                    boxerwidth: 10,
                    fontSize: 12,
                    fontColor: 'rgb(245, 245, 245)'
                }
            },
            title: {
                display: true,
                fontSize: 16,
                text: tipo + TotalAno.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            }
            ,
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 5,
                    with: 10,
                    heigh: 10
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                mode: 'index',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex]
                            .label + ' :' + (data.datasets[tooltipItem.datasetIndex])
                                .data[tooltipItem.index]
                                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    }
                }
            }
        }
    });
}

function mapArrecadaIcms(data) {

    var retorno = data.map(function (item) {
        return {

            mes: item.portalarrecadacaomes,
            icms: parseFloat2Decimals(item.portalarrecadacaoicms)
        }

    }
    )
    // console.log(retorno)
    return retorno
}

function mapArrecadaIpva(data) {

    var retorno = data.map(function (item) {
        return {

            mes: item.portalarrecadacaomes,
            ipva: parseFloat2Decimals(item.portalarrecadacaoipva)
        }

    }
    )
    return retorno

}

function mapArrecadaOutros(data) {

    var retorno = data.map(function (item) {
        return {

            mes: item.portalarrecadacaomes,
            outros: parseFloat2Decimals(item.portalportalarrecadacaooutros)
        }

    }
    )
    return retorno

}

function mapArrecadaItcd(data) {

    var retorno = data.map(function (item) {
        return {

            mes: item.portalarrecadacaomes,
            itcd: parseFloat2Decimals(item.portalarrecadacaoitcd)

        }


    }
    )
    return retorno
}

function mapArrecadaIrrf(data) {

    var retorno = data.map(function (item) {
        return {

            mes: item.portalarrecadacaomes,
            irrf: parseFloat2Decimals(item.portalarrecadacaoirrf)
        }

    }
    )
    return retorno
}

function mapArrecadaTaxas(data) {

    var retorno = data.map(function (item) {
        return {

            mes: item.portalarrecadacaomes,
            taxas: parseFloat2Decimals(item.portalarrecadacaotaxas)
        }

    }
    )
    // console.log(retorno)
    return retorno
}

function mapIcms(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.municipionome,
            icms: parseFloat2Decimals(item.portalrepasseicms),
        }

    }
    )
    return totalIcms(retorno)
}

function mapIpva(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.municipionome,
            ipv: parseFloat2Decimals(item.portalrepasseipva)
        }
    })
    return totalIpva(retorno)
}


function mapFundebIcms(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.municipionome,
            fundebicms: parseFloat2Decimals(item.portalrepassefundebicms)
        }
    })
    return totalFundebIcms(retorno)
}

function totalFundebIcms(data) {
    var retorno = data.reduce(function (acumulador, valor) {
        var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
        if (indice == -1) {
            acumulador.push(valor);
        } else {
            acumulador[indice].fundebicms += valor.fundebicms;
        }
        return acumulador;
    }, []);
    return retorno
}

function mapFundebIpva(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.municipionome,
            fundebipva: parseFloat2Decimals(item.portalrepassefundebipva)
        }
    })
    return totalFundebIpva(retorno)
}

function mapFundef(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.municipionome,
            fundef: parseFloat2Decimals(item.portalrepassefundef)
        }
    })
    return totalFundef(retorno)
}


function totalIcms(data) {
    var retorno = data.reduce(function (acumulador, valor) {
        var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
        if (indice == -1) {
            acumulador.push(valor);
        } else {
            acumulador[indice].icms += valor.icms;
        }
        return acumulador;
    }, []);
    return retorno
}

function totalIpva(data) {
    var retorno = data.reduce(function (acumulador, valor) {
        var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
        if (indice == -1) {
            acumulador.push(valor);
        } else {
            acumulador[indice].ipv += valor.ipv;
        }
        return acumulador;
    }, []);
    return retorno
}

function totalFundebIpva(data) {
    var retorno = data.reduce(function (acumulador, valor) {
        var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
        if (indice == -1) {
            acumulador.push(valor);
        } else {
            acumulador[indice].fundebipva += valor.fundebipva;
        }
        return acumulador;
    }, []);
    return retorno
}

function totalFundef(data) {
    var retorno = data.reduce(function (acumulador, valor) {
        var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
        if (indice == -1) {
            acumulador.push(valor);
        } else {
            acumulador[indice].fundef += valor.fundef;
        }
        return acumulador;
    }, []);
    return retorno
}

function FormataStringData(data) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[4];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

function formata_data(data) { // dd/mm/yyyy -> yyyy-mm-dd
    data_formatada = data.substr(6, 4) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2) + ' 00:00:00';
    return new Date(data_formatada);
}

function leftPadZeros(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
};

function parseFloat2Decimals(value) {
    if (value != null) {
        return parseFloat(parseFloat(value).toFixed(2));
    }
    else { return 0; }
}

function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

// afterLabel: function(tooltipItem, data) {
//     var procento = 0;
//     for (i = 0; i < 4; i++) {
//         procento += data.datasets[tooltipItem.datasetIndex].data[i]
//     }
//     return 'Equivale a:' +
//         parseInt((data.datasets[tooltipItems.datasetIndex]
//             .data[tooltipItem.index] / procento) * 100) + '%'
// },
// label: function(tooltipItem, data) {
//     return data.datasets[tooltipItem.datasetIndex].
//         label + ': R$ ' +
//         data.datasets[tooltipItem.datasetIndex]
//             .data[tooltipItem.index]
//     label: function(tooltipItems, data) {
//         return data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index] +
//             ' : R$ ' + data.datasets[tooltipItem.datasetIndex]
//                 .data


//         function totalArrecadaIcms(data) {
//             var retorno = data.reduce(function (acumulador, valor) {
//                 var indice = acumulador.map((o) => o.munId).indexOf(valor.mes);
//                 if (indice == -1) {
//                     acumulador.push(valor);
//                 } else {
//                     acumulador[indice].icms += valor.icms;
//                 }
//                 return acumulador;
//             }, []);
//             console.log(retorno)
//             return retorno
//         }
