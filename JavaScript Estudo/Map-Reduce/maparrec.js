 
const BASE_URL = 'https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/';
var options = {
  method: 'GET',
  mode: 'cors',
  cache: 'default'
}
  
var objeto = {"atributo1": "valor 1", "atributo2": 23};
var now = new Date;
let mes = now.getMonth();
var ano = now.getFullYear();
mes -=1
var url = "https://homol.sefaz.rr.gov.br/apiarrecadacaorepasse/public/api/getportalrepasse/2020-01-01/2020-12-31";
let dados = null;


function filtrarMunicipio(data) {
  
  //  console.log(dados)
   console.log(filterMunicipio('201',data))
}

function filterMunicipio(munid,data) {
  return data.filter(function(el) {
      return el.municipiocod.indexOf(munid) > -1;
  })
}



// function filterItems(query) {
//   return fruits.filter(function(el) {
//       return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
//   })
// }
// var indice = acumulador.map((o) => o.munId).indexOf(valor.munId);
// if (indice == -1) {
//     acumulador.push(valor);
// } else {
//     acumulador[indice].fundef += valor.fundef;
// }


fetch(url, options)
.then(response => {
    response.json()
        .then(data => filtrarMunicipio(data))
})
.catch(e => console.log('Erro :' + e.message));





// console.log(url);
// let dados = fetchApiLer();

// // console.log(dados)

// async function fetchApi(url) {
//     // const URL_TO_FETCH = './lang-portuguese.txt';
//     // console.log(' aqui'+url);
//     const body = await fetch(url, options);
//     const data = await body.json();
    
//     // O valor retornado será algo como `Promise<object>`.
//     return data



  //   const res = await fetch(url);
  // const data = await res.text();
  // const data_1 = obj = data;
  // console.log(data_1)
  // return data_1;
// }

// function fetchApiLer() {   
//   fetchApi(url)
//   .then((resolvedJson) => {
//     console.log(resolvedJson.origin);
//   })
//   .catch((error) => {
//     console.error('Opa! Houve um erro:', error.message);
//   });


//     //  .then(console.log())
// }
 
// function obtenerJSON(url) {
//   return new Promise((resolve, reject) => {
//     fetch(url)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         reject(
//           "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
//             response.status
//         );
//       })
//       .then((json) => resolve(json))
//       .catch((err) => reject(err));
//   });
// }
// // Pero claro, como esta función te devuelve una promesa, realmente la necesitas procesar como tal, y hacer la estructura del then/catch, con un código que podría ser así:
// const dados =   obtenerJSON(url)
//   .then((json) => {
//      return json 
//   })
//   .catch((err) => {
//     console.log("Error encontrado:", err);
//   });

//   console.log(dados)






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


 