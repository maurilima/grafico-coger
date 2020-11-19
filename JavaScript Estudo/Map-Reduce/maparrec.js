 
const BASE_URL = 'https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/';
var options = {
  method: 'GET',
  mode: 'cors',
  cache: 'default'
}
  
  var arrecJson = [
    {
      "portalrepassedata": "2018-06-19 00:00:00",
      "portalrepassemunicipiocod": "141",
      "portalrepasseicms": "8502.21",
      "portalrepasseipva": "812.45",
      "portalrepassefundebicms": null,
      "portalrepassefundebipva": null,
      "municipiocod": "141",
      "municipionome": "BONFIM"
   
    },
    {
      "portalrepassedata": "2018-06-19 00:00:00",
      "portalrepassemunicipiocod": "301",
      "portalrepasseicms": "6968.52",
      "portalrepasseipva": "662.55",
      "portalrepassefundebicms": null,
      "portalrepassefundebipva": null,
      "municipiocod": "301",
      "municipionome": "SÃO LUIZ DO ANAUÁ"
    },
    {
      "portalrepassedata": "2018-06-19 00:00:00",
      "portalrepassemunicipiocod": "321",
      "portalrepasseicms": "6480.38",
      "portalrepasseipva": "0",
      "portalrepassefundebicms": null,
      "portalrepassefundebipva": null,
      "municipiocod": "321",
      "municipionome": "UIRAMUTÃ"
    },
    {
      "portalrepassedata": "2018-06-26 00:00:00",
      "portalrepassemunicipiocod": "101",
      "portalrepasseicms": "135816.79",
      "portalrepasseipva": "6549.21",
      "portalrepassefundebicms": null,
      "portalrepassefundebipva": null,
      "municipiocod": "101",
      "municipionome": "ALTO ALEGRE"
    },
    {
      "portalrepassedata": "2018-06-26 00:00:00",
      "portalrepassemunicipiocod": "121",
      "portalrepasseicms": "95474.8",
      "portalrepasseipva": "870.93",
      "portalrepassefundebicms": null,
      "portalrepassefundebipva": null,
      "municipiocod": "121",
      "municipionome": "AMAJARI"
    },
    {
      "portalrepassedata": "2018-06-26 00:00:00",
      "portalrepassemunicipiocod": "81",
      "portalrepasseicms": "3907219.54",
      "portalrepasseipva": "616591.92",
      "portalrepassefundebicms": null,
      "portalrepassefundebipva": null,
      "municipiocod": "81",
      "municipionome": "BOA VISTA"
    }
  ]
  
var arraysImpostos = ['portalarrecadacaoicms',
    'portalarrecadacaoipva',
    'portalportalarrecadacaooutros',
    'portalarrecadacaoitcd',
    'portalarrecadacaoirrf',
    'portalarrecadacaotaxas'
]
var arJs = { "portalrepassedata": "2018-06-26 00:00:00", 
  "portalrepassemunicipiocod": "121",
  "portalrepasseicms": "95474.8",
  "portalrepasseipva": "870.93",
  "portalrepassefundebicms": null,
  "portalrepassefundebipva": null,
  "municipiocod": "121",
  "municipionome": "AMAJARI"
}
var objeto = {"atributo1": "valor 1", "atributo2": 23};
var now = new Date;
let mes = now.getMonth();
var ano = now.getFullYear();
mes -=1
var url = BASE_URL + 'getportalarrecadacao/' + mes + '/' + ano;

// console.log(url);
let dados = fetchApiLer();

// console.log(dados)

async function fetchApi(url) {
    // const URL_TO_FETCH = './lang-portuguese.txt';
    // console.log(' aqui'+url);
    const body = await fetch(url, options);
    const data = await body.json();
    
    // O valor retornado será algo como `Promise<object>`.
    return data



  //   const res = await fetch(url);
  // const data = await res.text();
  // const data_1 = obj = data;
  // console.log(data_1)
  // return data_1;
}

function fetchApiLer() {   
  fetchApi(url)
  .then((resolvedJson) => {
    console.log(resolvedJson.origin);
  })
  .catch((error) => {
    console.error('Opa! Houve um erro:', error.message);
  });


    //  .then(console.log())
}

// function buildWords() {   
//     fetchDictionary()then(console.log);
// }



// fetch(url, options)
// .then(response => {
//     response.json()
//         .then(data => prepareImpostoDonut(data, mes, ano, 'impostoChart'))
//     prepareArrecada(0, ano, 'arrecadaChart')
//     prepareRepasseDonut(mes, ano, 'donnut-repasse')
//     prepareRepasseBarra(ano)
// })
// .catch(e => console.log('Erro :' + e.message));




// // console.log(objeto.atributo1);

// var car = arrecJson.map( item => item )

// var fim = car.map(item => { return item['portalrepasseicms']})

// console.log(car,fim)


// const grouped = groupBy(arrecJson, arrecJson => arrecJson.municipionome);
    
// console.log(grouped.get("BONFIM")); // -> [{type:"Dog", name:"Spot"}, {type:"Dog", name:"Rover"}]
    

// console.log(arJs['portalrepasseicms']);


// function groupBy(list, keyGetter) {
//   const map = new Map();
//   list.forEach((item) => {
//        const key = keyGetter(item);
//        const collection = map.get(key);
//        if (!collection) {
//            map.set(key, [item]);
//        } else {
//            collection.push(item);
//        }
//   });
//   return map;
// } 

// function GerarImpostometro(data) {
//   arrays = arrays.map(function (campo) {
//       var novoConteudo = data.map(function (objeto) {
//           return objeto[campo];
//       });
//       return novoConteudo;
//   })
// }
// function parseFloat2Decimals(value) {
//     return parseFloat(parseFloat(value).toFixed(2));
//   }
  // var arrecComValoresIcms = arrec.map(function(item){
  //     return {

  //              munId :  item.portalrepassemunicipiocod,
  //              icms  :  parseFloat2Decimals(item.portalrepasseicms),
  //     }
  // })

  // var arrecComValoresIpva = arrec.map(function(item){
  //   return {

  //            munId :  item.portalrepassemunicipiocod,
  //            ipv   :  parseFloat2Decimals(item.portalrepasseipva)
  //   }
  //   })

  // var totalIcms = arrecComValoresIcms.reduce(function (acumulador, valor) {
  //   var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
  //   if (indice == -1) {
  //     acumulador.push(valor);
  //   } else {
  //     acumulador[indice].icms += valor.icms;
  //   }
  //   return acumulador;
  // }, []);

  // var totalIpv = arrecComValoresIpva.reduce(function (acumulador, valor) {
  //   var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
  //   if (indice == -1) {
  //     acumulador.push(valor);
  //   } else {
  //     acumulador[indice].ipv += valor.ipv;
  //   }
  //   return acumulador;
  // }, []);


 