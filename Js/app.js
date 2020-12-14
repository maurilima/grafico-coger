// "https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalrepasse/2020-01-01/2020-12-31";
// https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalarrecadacao/4/2017

let listMuncipio = [
    { municipiocod: "201", municipionome: "CAROEBE" },
    { municipiocod: "221", municipionome: "IRACEMA" },
    { municipiocod: "241", municipionome: "MUCAJAÍ" },
    { municipiocod: "242", municipionome: "NORMANDIA" },
    { municipiocod: "243", municipionome: "PACARAIMA" },
    { municipiocod: "261", municipionome: "RORAINÓPOLIS" },
    { municipiocod: "281", municipionome: "SÃO JOÃO DA BALIZA" },
    { municipiocod: "301", municipionome: "SÃO LUIZ DO ANAUÁ" },
    { municipiocod: "101", municipionome: "ALTO ALEGRE" },
    { municipiocod: "121", municipionome: "AMAJARI" },
    { municipiocod: "81", municipionome: "BOA VISTA" },
    { municipiocod: "141", municipionome: "BONFIM" },
    { municipiocod: "161", municipionome: "CANTÁ" },
    { municipiocod: "181", municipionome: "CARACARAÍ" },
    { municipiocod: "321", municipionome: "UIRAMUTÃ" }
];
const BASE_URL = 'https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/';
var labelImpostos = ['ICMS', 'IPVA', 'OUTROS', 'ITCD', 'IRRF', 'TAXAS'];
let labelRepasses = ['ICMS', 'IPVA', 'FUNDEBICMS', 'FUNDEBIPVA'];

var options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}
let dados = null;
let mesArrecada = 0;
let anoArrecada = 0;
let dataInicial = null;
let dataFinal = null;
let selectedMunicipio = '0'

var arrays = ['portalarrecadacaoicms',
    'portalarrecadacaoipva',
    'portalportalarrecadacaooutros',
    'portalarrecadacaoitcd',
    'portalarrecadacaoirrf',
    'portalarrecadacaotaxas'
]

listMuncipio.sort(function (a, b) {
    return a.municipionome < b.municipionome ? -1 : a.municipionome > b.municipionome ? 1 : 0;
});

// 
let meses = ['NUL', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
let btnRepasse = document.getElementById("repasse");
let btnArrecada = document.getElementById("arrecada");
let btnArrecadaPdf = document.getElementById("arrecada-pdf")
let btnArrecadaCvs = document.getElementById("arrecada-cvs")
let btnArrecadaJson = document.getElementById("arrecada-json")
let btnRepassePdf = document.getElementById("repasse-pdf")
let btnRepasseCvs = document.getElementById("repasse-cvs")
let btnRepasseJson = document.getElementById("repasse-json")
let selectMunicipio = document.getElementById('municipios');

btnArrecadaPdf.disabled = true;
btnArrecadaCvs.disabled = true;
btnArrecadaJson.disabled = true;

btnRepassePdf.disabled = true;
btnRepasseCvs.disabled = true;
btnRepasseJson.disabled = true;

btnArrecadaPdf.addEventListener('click', gerarPdfArrecada, false);
btnArrecadaCvs.addEventListener('click', gerarCvsArrecada, false);
btnArrecadaJson.addEventListener('click', gerarJsonArrecada, false);

btnRepassePdf.addEventListener('click', gerarPdfRepasse, false);
btnRepasseCvs.addEventListener('click', gerarCvsRepasse, false);
btnRepasseJson.addEventListener('click', gerarJsonRepasse, false);

btnArrecada.addEventListener('click', renderArrecadacaoGrafico, false);
btnRepasse.addEventListener("click", prepareRepasse, false);

selectMunicipio.addEventListener('change', municipioSelecionado, false);

function municipioSelecionado() {
    selectedMunicipio = selectMunicipio.value;
}


document.addEventListener('DOMContentLoaded', function () {
    var now = new Date;
    let mes = now.getMonth();
    var ano = now.getFullYear();
    let elementos = '<option value = "0"  selected disables> Todos </option>';

    // Carregar lista de Municipios
    for (let i = 0; i < listMuncipio.length; i++) {
        elementos += '<option value="' + listMuncipio[i].municipiocod + '">' + listMuncipio[i].municipionome + '</option>'
    }
    selectMunicipio.innerHTML = elementos;
    getApiArrecadaco(mes, ano);
})



function renderGhartBarRepasseMuncipio(data, canvas, texto) {
    let tipo = 'Municipio :'+selectedMunicipio + ' ' +texto

    let valorIcms = mapRepasse(data, 'portalrepasseicms')
    let valorIpva = mapRepasse(data, 'portalrepasseipva')
    let valorFundeIcms = mapRepasse(data, 'portalrepassefundebicms')
    let valorFundeIpva = mapRepasse(data, 'portalrepassefundebipva')

    var totalIcms = valorIcms.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var totalIpva = valorIpva.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var tvalorFundeIcms = valorFundeIcms.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var tvalorFundeIpva = valorFundeIpva.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })


    var totalPeriodo = (totalIcms + totalIpva + tvalorFundeIcms + tvalorFundeIpva)

    

    // document.getElementById("divcanvas").innerHTML = '&nbsp;';
    // document.getElementById('divcanvas').innerHTML = '<canvas id=' + canvas + '></canvas>';


    document.getElementById("divremesa").innerHTML = '&nbsp;';

    document.getElementById("divremesa").innerHTML = '<canvas id=' + canvas + '></canvas>'

    var ctx = document.getElementById(canvas).getContext('2d');

    var chart = new Chart(ctx, {

        type: 'bar',
        data: {
            labels: '',
            datasets: [{
                label: 'ICMS',
                backgroundColor: 'rgba(0, 123, 255,1)',
                borderColor: 'rgba(0, 123, 255,0.7)',
                pointBorderColor: 'rgba(0, 123, 255,0.7)',
                pointBackgroundColor: 'rgba(0, 123, 255,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: [totalIcms]
            },
            {
                label: 'IPVA',
                backgroundColor: 'rgba(108, 117, 125,1)',
                borderColor: 'rgba(108, 117, 125,0.7)',
                pointBorderColor: 'rgba(108, 117, 125,0.7)',
                pointBackgroundColor: 'rgba(108, 117, 125,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(25,25,112,1)',
                data: [totalIpva]

            },
            {
                label: 'FUNDEBICMS',
                backgroundColor: 'rgba(40, 167, 69,1)',
                borderColor: 'rgba(40, 167, 69,0.7)',
                pointBorderColor: 'rgba(40, 167, 69,0.7)',
                pointBackgroundColor: 'rgba(40, 167, 69,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(138,43,226,1)',
                data: [tvalorFundeIcms]

            },
            {
                label: 'FUNDEBIPVA',
                backgroundColor: 'rgba(23, 162, 184,1)',
                borderColor: 'rgba(23, 162, 184,0.6)',
                pointBorderColor: 'rgba(23, 162, 184,0.6)',
                pointBackgroundColor: 'rgba(23, 162, 184,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(138,43,226,1)',
                data: [tvalorFundeIpva]
            }
            ]
        },
        options: {
            legend: {
                position: 'bottom',
                label: {
                    boxerwidth: 10,
                    fontSize: 11
                }
            },
            title: {
                display: true,
                fontSize: 16,
                text: tipo + totalPeriodo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
    })



}


function getApiArrecadaco(mes, ano) {
    var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;
    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => prepareImpostoDonut(data, mes, ano, 'impostoChart'))
            // prepareArrecada(0, ano, 'arrecadaChart')
            // prepareRepasseDonut(mes, ano)
            // prepareRepasseBarra(ano)
        })
        .catch(e => console.log('Erro :' + e.message));
}

function prepareRepasseDonut(mes, ano) {
    let lMes = mes + 1
    var url = BASE_URL + 'getportalrepasse/' + ano + '-' + lMes + '-01/' + ano + '-' + lMes + '-' + lastDay(ano, lMes);

    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => prepareDadosRepasse(data, lMes, ano))

        })
        .catch(e => console.log('Erro :' + e.message));

}
//
function prepareDadosRepasse(data, mes, ano) {

    if (data.length <= 0) {
        let mMes = mes - 1;
        prepareRepasseDonut(mMes, ano);
    }
    else {
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

}


function prepareImpostoDonut(data, mes, ano, canvas) {
    if (data.length <= 0) {
        let mMes = mes - 1;
        getApiArrecadaco(mMes, ano)

    }

    if (data.length > 0) {
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
        prepareRepasseDonut(mes, ano)
        prepareArrecada(0, ano, 'arrecadaChart')
        prepareRepasseBarra(ano)

    }
}


function gerarJsonRepasse() {
    var url = BASE_URL + 'getportalrepasse/' + dataInicial + '/' + dataFinal;
    var fileName = 'Repasse-entre' + formata_data(dataInicial) + '-' + formata_data(dataFinal)
    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => downloadJson(data, fileName))
        })
        .catch(e => console.log('Erro :' + e.message));
}


function gerarJsonArrecada() {
    var url = BASE_URL + 'getportalarrecadacao/' + mesArrecada + '/' + anoArrecada;
    let fileName = ''
    if (mes > 0) {
        fileName = 'Arrecadacao-mes-' + meses[mesArrecada] + '/' + anoArrecada
    }
    else
        fileName = `Arrecadacao-ano-${anoArrecada}`
    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => downloadJson(data, fileName))
        })
        .catch(e => console.log('Erro :' + e.message));
}

function downloadJson(data, fileName) {
    let dados = JSON.stringify(data)

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(dados);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.json';
    hiddenElement.click();
}

function gerarCvsRepasse() {
    var url = BASE_URL + 'getportalrepasse/' + dataInicial + '/' + dataFinal;
    var tipo = 'Repasse-entre' + dataInicial + '-' + dataFinal
    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => renderCvs(data, tipo))
        })
        .catch(e => console.log('Erro :' + e.message));
}



function gerarCvsArrecada() {
    var url = BASE_URL + 'getportalarrecadacao/' + mesArrecada + '/' + anoArrecada;
    let tipo = ''
    if (mes > 0) {
        tipo = 'Arrecadacao-mes ' + meses[mesArrecada] + '/' + ano
    }
    else
        tipo = `Arrecadacao-anual-de ${anoArrecada}`

    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => renderCvs(data, tipo))
        })
        .catch(e => console.log('Erro :' + e.message));
}

function renderCvs(data, fileName) {
    let dados = data.map(item => item)
    var json = data.item
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(data[0])
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'))
    csv.unshift(header.join(';'))
    csv = csv.join('\r\n')
    downloadCSV(csv, fileName)
}

function downloadCSV(csvStr, fileName) {

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
}

function gerarPdfArrecada() {
    gerarPdf('impostoChartConsulta', 'A')
}

function gerarPdfRepasse() {
    gerarPdf('charBartrepasse')

}

function gerarPdf(canvas) {
    var newCanvas = document.getElementById(canvas);
    let mes = 'Todos'
    if (mesArrecada != 0) {
        mes = meses[mesArrecada]
    }

    var newCanvasImg = newCanvas.toDataURL("image/png", 1.0);
    var doc = new jsPDF('landscape');
    doc.addImage(newCanvasImg, 'PNG', 10, 10, 280, 150);
    doc.save('arrecadacao-' + mes + '-' + anoArrecada + '.pdf');
}

function prepareRepasse() {
    dataInicial = document.getElementById("dtInicial").value;
    dataFinal = document.getElementById("dtFinal").value;
    let tipo = 'Repasses entre :' + formata_data(dataInicial) + ' a ' + formata_data(dataFinal) + ' : '

    if (dataInicial > dataFinal) {
        alert('Data Inical deve Ser Menor que Data Final!')
    }
    else {
        ObterDadosRepase(dataInicial, dataFinal, 'charBartrepasse', tipo);
        btnRepassePdf.disabled = false;
        btnRepasseCvs.disabled = false;
        btnRepasseJson.disabled = false;
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

function filterMunicipio(munid, municpios) {
          return municpios.filter(function(el) {
              return el.municipiocod.indexOf(munid) > -1;
          })
        }


function prepareGraficoRemessa(data, canvas, tipo) {
    let dados = null;


    if (selectedMunicipio != '0') {
        dados = filterMunicipio(selectedMunicipio, data)
      renderGhartBarRepasseMuncipio(dados,"charBartrepasse", tipo)

    } else { 
        dados = data 
        console.log(data)
    var vArrecadaIcms = mapIcms(dados)
    var vArrecadaIpva = mapIpva(dados)
    var vFundebIcms = mapFundebIcms(dados)
    var vFundebIpva = mapFundebIpva(dados)

    renderGraficoRemessa(vArrecadaIcms, vArrecadaIpva, vFundebIcms, vFundebIpva, canvas, tipo);
    }


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
    // for (var i in vFundebIpva) {
    //     valorFundeIpva.push(vFundebIpva[i].fundebipva)
    // }
 
    var ttotalIcms = valorIcms.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })

    var ttotalIpva = valorIpva.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })
    var tvalorFundeIcms = valorFundeIcms.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })

    var tvalorFundeIpva = valorFundeIpva.reduce(function (acumulador, valorAtual) { return acumulador + valorAtual })

    var TotalPeriodo = ttotalIcms + ttotalIpva + tvalorFundeIcms + tvalorFundeIpva
    console.log(canvas)
    document.getElementById("divremesa").innerHTML = '&nbsp;';
    // console.log(getElementById(canvas).value)
    document.getElementById("divremesa").innerHTML = '<canvas id=' + canvas + '></canvas>'

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
                    fontSize: 11
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
                labels: labelRepasses,
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
                        fontSize: 11
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

                        // var percent = ((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100).toFixed(2)

                        //     return '(' + percent + '%)';
                        // }
                    },
                    backgroundColor: '#FFF',
                    titleFontSize: 16,
                    titleFontColor: '#0066ff',
                    bodyFontColor: '#000',
                    bodyFontSize: 11,
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
            labels: labelImpostos,
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
                    fontSize: 11
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
                bodyFontSize: 11,
                displayColors: false
            }
        }
    });

}

function renderArrecadacaoGrafico() {
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    var canvas = 'impostoChartConsulta'

    // var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;


    if (mes >= 0 && mes <= 12) {
        mesArrecada = mes
        anoArrecada = parseInt(ano)
        prepareArrecada(parseInt(mes), parseInt(ano), canvas)
        document.getElementById('arrecada-pdf').disabled = false;
        document.getElementById('arrecada-cvs').disabled = false;
        document.getElementById('arrecada-json').disabled = false;
    }
    else {
        throw alert('Mes deve Estar entre "0" e "12" ')
    }

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
        // prepareRepasseDonut(mes, ano)
        // prepareRepasseBarra(ano)

    } else {
        throw alert('Nenhuma Informação Selecionada para os dados Informados')
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
    // ctx.heigh = 500;
    // ctx.width = 900;
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
            // maintainAspectRatio: false,
            legend: {
                position: 'bottom',
                label: {
                    boxerwidth: 10,
                    fontSize: 11,
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

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function DownloadJSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';

        for (var index in array[i]) {
            line += array[i][index] + ',';
        }


        line.slice(0, line.Length - 1);

        str += line + '\r\n';
    }
}
function lastDay(year, month) {
    var ultimoDia = (new Date(year, month, 0)).getDate();
    return ultimoDia;
}

function FormataStringData(data) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[4];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

function formata_data(data) { //yyyy-mm-dd dd/mm/yyyy -> 
    data_formatada = data.substr(8, 2) + '-' + data.substr(5, 2) + '-' + data.substr(0, 4);
    return data_formatada;
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

//  Retronando Valor de uma fecth

// function fetchDictionary() {
//     const URL_TO_FETCH = './lang-portuguese.txt';
//     return fetch(URL_TO_FETCH).then(res => res.text())
//     .then(data => obj = data).then((data) => {
//         console.log(data);
//         return data;
//     })
// }

// function buildWords() {   
//     fetchDictionary()then(console.log);
// }

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
