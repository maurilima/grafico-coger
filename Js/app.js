
var btnRepasse = document.getElementById("repasse");



btnRepasse.addEventListener("click", GerarRepasse, false);





function GerarRepasse() {
    var dtInicial =  document.getElementById("dtInicial").value;
    var dtFinal  =  document.getElementById("dtFinal").value;
    if ( dtInicial > dtFinal ) {
        console.log("Maior")
    }
    console.log(dtInicial, dtFinal);

}

// document.addEventListener('DOMContentLoaded', function () {
//     // do something

//     var options = {
//         method: 'GET',
//         mode: 'cors',
//         cache: 'default'

//     };

    // const url = "https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalrepasse/2018-01-19/2018-12-30";


    // // Obter Dado Api
    // // alert('Entrando no Aplicativo')
   

    // fetch(url, options)
    //     .then(response => {
    //         response.json()
    //             .then(data => ShowGrafico(data))
    //     })
    //     .catch(e => console.log('Erro :' + e.message));


// });

function ShowGrafico(data) {
    var vArrecadaIcms = mapIcms(data)
    var vArrecadaIpva = mapIpva(data)
    var vFundebIcms = mapFundebIcms(data)
    var vFundebIpva = mapFundebIpva(data)
    var vFundef = mapFundef(data)

    // var dt = new Date;
    // var ag = dt.toLocaleDateString(dt);


    // console.log(FormataStringData(ag));
    // console.log(vArrecadaIcms, vArrecadaIpva, vFundebIcms, vFundebIpva, vFundef)

    grafico(vArrecadaIcms, vArrecadaIpva, vFundebIcms, vFundebIpva, vFundef  );


}




function grafico(vIcms, vIpva, vFundebIcms, vFundebIpva, vFundef) {

    var labelIcms      = []
    var valorIcms      = []
    var labelIpva      = []
    var valorIpva      = []
    var labelFundeIcms = [] 
    var valorFundeIcms = [] 
    var labelFundeIpva = [] 
    var valorFundeIpva = [] 
    var labelFundef    = [] 
    var valorFundef    = [] 

    for (var i in vIcms) {
        labelIcms.push(vIcms[i].munId)
        valorIcms.push(vIcms[i].icms)
        // .toLocaleString("pt-BR",
        // { style : "currency", currency : "BRL"}))
    }
    for (var i in vIpva) {
        labelIpva.push(vIpva[i].munId)
        valorIpva.push(vIpva[i].ipv)
        // .toLocaleString("pt-BR",
        // { style : "currency", currency : "BRL"}))
    }

    for (var i in vFundebIcms) {
        labelFundeIcms.push(vFundebIcms[i].munId)
        valorFundeIcms.push(vFundebIcms[i].fundebicms)
        // .toLocaleString("pt-BR",
        // { style : "currency", currency : "BRL"}))
    }

    for (var i in vFundebIpva) {
        labelFundeIpva.push(vFundebIpva[i].munId)
        valorFundeIpva.push(vFundebIpva[i].fundebipva)
        // .toLocaleString("pt-BR",
        // { style : "currency", currency : "BRL"}))
    }

    for (var i in vFundef) {
        labelFundef.push(vFundef[i].munId)
        valorFundef.push(vFundef[i].fundef)
        // .toLocaleString("pt-BR",
        // { style : "currency", currency : "BRL"}))
    }

    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: labelIcms,


            datasets: [{
                label: 'Icms',
                backgroundColor: 'rgba(38,185,154,0.31)',
                borderColor: 'rgba(38,185,154,0.7)',
                pointBorderColor: 'rgba(38,185,154,0.7)',
                pointBackgroundColor: 'rgba(38,185,154,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointBorderWidth: 1,
                data: valorIcms
            },
            {
                label: 'Ipva',
                backgroundColor: 'rgba(3,88,106,0.3)',
                borderColor: 'rgba(3,88,106,0.7)',
                pointBorderColor: 'rgba(3,88,106,0.7)',
                pointBackgroundColor: 'rgba(3,88,106,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(151,187,205,1)',
                pointBorderWidth: 1,
                data: valorFundef

            },
            {
                label: 'Fundef',
                backgroundColor: 'rgba(147,112,219,0.3)',
                borderColor: 'rgba(147,112,219,0.7)',
                pointBorderColor: 'rgba(147,112,219,0.7)',
                pointBackgroundColor: 'rgba(147,112,219,0.7)',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(138,43,226,1)',
                pointBorderWidth: 1,
                data: valorIpva

            }

            ]
        },

        options: {
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 10,
                    bottom: 10,
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
            }
        }
    });
}





function parseFloat2Decimals(value) {
    if(value != null) {
      return parseFloat(parseFloat(value).toFixed(2));
    }
    else 
    {return 0}
}

function mapIcms(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.portalrepassemunicipiocod,
            icms: parseFloat2Decimals(item.portalrepasseicms),
        }

    }
    )
    return totalIcms(retorno)
}

function mapIpva(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.portalrepassemunicipiocod,
            ipv: parseFloat2Decimals(item.portalrepasseipva)
        }
    })
    return totalIpva(retorno)
}


function mapFundebIcms(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.portalrepassemunicipiocod,
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

            munId: item.portalrepassemunicipiocod,
            fundebipva: parseFloat2Decimals(item.portalrepassefundebipva)
        }
    })
    return totalFundebIpva(retorno)
}

function mapFundef(data) {
    var retorno = data.map(function (item) {
        return {

            munId: item.portalrepassemunicipiocod,
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
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }
  
  function formata_data(data) { // dd/mm/yyyy -> yyyy-mm-dd
    data_formatada = data.substr(6,4) + '-' + data.substr(3,2) + '-' + data.substr(0,2) + ' 00:00:00';
    return new Date(data_formatada);
}
  
