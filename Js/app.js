// "https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalrepasse/2018-01-19/2018-12-30";
// https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalarrecadacao/4/2017

const BASE_URL = 'https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/'
var LabelImpostos = ['ICMS', 'IPVA', 'OUTROS', 'ITCD', 'IRRF', 'TAXAS']

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

var meses = ['NUL','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

var btnRepasse = document.getElementById("repasse");
var btnArrecada = document.getElementById("arrecada");

btnRepasse.addEventListener("click", GerarRepasse, false);

btnArrecada.addEventListener('click', GerarArrecadacao, false);



document.addEventListener('DOMContentLoaded', function () {
    var now = new Date;
    var mes = now.getMonth();
    var ano = now.getFullYear();
    var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;

    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => GerarImpostometro(data))
        })
        .catch(e => console.log('Erro :' + e.message));
     getApiArrecada(0,ano,'arrecadaChart') 

})
// --------------------------------------

function GerarImpostometro(data) {

    arrays = arrays.map(function (campo) {
        var novoConteudo = data.map(function (objeto) {
            return objeto[campo];
        });
        return novoConteudo;
    });

    // console.log(arrays, data) 

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

    dados = arrays.map(a => parseFloat2Decimals(a, 2))

    // console.log(data)
    ImpostoGrafico(dados)


}

function ImpostoGrafico(dados) {

    var totalImpostos = dados.reduce(function(acumulador, valorAtual) {
        return acumulador + valorAtual})
         
    var ctx = document.getElementById('impostoChart').getContext('2d');
    

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
            }

            ]
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
                text: 'Arrecadçaõ Mês: ' + totalImpostos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 3
                    // with: 10,
                    // heigh: 10
                }
            }
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].labels || '';
                       if (label) {
                        label += ': ';
                    }
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return label;
                }
            }
        }

    });

}

function GerarArrecadacao() {
    var mes = document.getElementById('mes').value;
    var ano = document.getElementById('ano').value;
    var canvas = 'impostoChartConsulta'
    var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;

    if (mes > 12) {
        alert('Mes de Esta entre "0" e "12" ')
    }
    getApiArrecada(mes, ano, canvas)



}

function getApiArrecada(mes, ano, canvas) {
    var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;

    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => ArrecadaGrafico(data,canvas))
        })
        .catch(e => console.log('Erro :' + e.message));


}


function ArrecadaGrafico(data, canvas) {
    var ArrecadaIcms = mapArrecadaIcms(data)
    var ArrecadaIpva = mapArrecadaIpva(data)
    var ArrecadaOutros = mapArrecadaOutros(data)
    var ArrecadaItcd = mapArrecadaItcd(data)
    var ArrecadaIrrf = mapArrecadaIrrf(data)
    var ArrecadaTaxas = mapArrecadaTaxas(data)
    
   

   
    GraficoArrecada(ArrecadaIcms, ArrecadaIpva, ArrecadaOutros, ArrecadaItcd, ArrecadaIrrf, ArrecadaTaxas,canvas)



}


function GraficoArrecada(ArrecadaIcms, ArrecadaIpva, ArrecadaOutros, ArrecadaItcd, ArrecadaIrrf, ArrecadaTaxas, canvas) {

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
   
    var vtotalIcms = valorIcms.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})

    var vtotalIpva = valorIpva.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
    var vtotalOutros = valorOutros.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
                                               
    var vtotalItcd = valorItcd.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
                                               
    var vtotalIrrf = valorIrrf.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
    
    var vtotalTaxas = valorTaxas.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
                    
    var TotalAno = vtotalIcms+vtotalIpva+vtotalOutros+vtotalItcd+vtotalIrrf+vtotalTaxas
    
    // console.log(TotalAno)

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
                pointBorderWidth: 1,
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
                pointBorderWidth: 1,
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
                text: 'Arrecadaçaõ Anual : '+ TotalAno.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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






function GerarRepasse() {
    var dtInicial = document.getElementById("dtInicial").value;
    var dtFinal = document.getElementById("dtFinal").value;
    if (dtInicial > dtFinal) {
        alert('Data Inical deve Ser Menor que Data Final!')
    }
    else {
        ObterDadosRepase(dtInicial, dtFinal);
    }

}

function ObterDadosRepase(dInicial, dFinal) {
    var url = BASE_URL + 'getportalrepasse/' + dInicial + '/' + dFinal;


    fetch(url, options)
        .then(response => {
            response.json()
                .then(data => ShowGrafico(data))
        })
        .catch(e => console.log('Erro :' + e.message));


};

function ShowGrafico(data) {
    var vArrecadaIcms = mapIcms(data)
    var vArrecadaIpva = mapIpva(data)
    var vFundebIcms = mapFundebIcms(data)
    var vFundebIpva = mapFundebIpva(data)
    var vFundef = mapFundef(data)

    GraficoRemessa(vArrecadaIcms, vArrecadaIpva, vFundebIcms, vFundebIpva, vFundef);
    // console.log(vArrecadaIcms, vArrecadaIpva, vFundebIcms, vFundebIpva, vFundef);


}

function GraficoRemessa(vIcms, vIpva, vFundebIcms, vFundebIpva, vFundef) {

    var labelIcms = []
    var valorIcms = []
    var valorIpva = []
    var valorFundeIcms = []
    var labelFundeIpva = []
    var valorFundeIpva = []

    for (var i in vIcms) {
        labelIcms.push(vIcms[i].munId.substr(0,6))
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

    
    var ttotalIcms = valorIcms.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})

    var ttotalIpva = valorIpva.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
    var tvalorFundeIcms = valorFundeIcms.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
                                               
    var tvalorFundeIpva = valorFundeIpva.reduce(function(acumulador, valorAtual) {return acumulador + valorAtual})
          
    var TotalPeriodo = ttotalIcms+ttotalIpva+tvalorFundeIcms+tvalorFundeIpva

    var ctx = document.getElementById('myChart').getContext('2d');

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
                text: 'Repasses por Municipio : '+TotalPeriodo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            } ,
                     
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

function parseFloat2Decimals(value) {
    if (value != null) {
        return parseFloat(parseFloat(value).toFixed(2));
    }
    else { return 0 }
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
 //



                // afterLabel : function(tooltipItem,data) {
                //     var procento = 0;
                //     for(i =0; i < 4; i++){
                //         procento += data.datasets[tooltipItem.datasetIndex].data[i]
                //     }
                //     return 'Equivale a:' + 
                //      parseInt((data.datasets[tooltipItems.datasetIndex]
                //                 .data[tooltipItem.index] / procento) * 100 ) + '%'
                // },
                // label: function(tooltipItem, data) {
                //     return data.datasets[tooltipItem.datasetIndex].
                //             label +': R$ '+
                //             data.datasets[tooltipItem.datasetIndex]
                //             .data[tooltipItem.index]                
                // label: function(tooltipItems, data ){
                //     return data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index] + 
                //     ' : R$ ' + data.datasets[tooltipItem.datasetIndex]
                //     .data


                // function totalArrecadaIcms(data) {
//     var retorno = data.reduce(function (acumulador, valor) {
//         var indice = acumulador.map((o) => o.munId).indexOf(valor.mes);
//         if (indice == -1) {
//             acumulador.push(valor);
//         } else {
//             acumulador[indice].icms += valor.icms;
//         }
//         return acumulador;
//     }, []);
//     console.log(retorno)
//     return retorno
// }
