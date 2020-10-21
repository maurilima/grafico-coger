var produtos = [
    {
        nome : "Smartphone 5' Android",
        preco : 1200
    },
    {
        nome : "Notebook 4GB Windows 10",
        preco : 2100
    },
    {
        nome : "SmartTV 50' LED",
        preco : 8700
    }
 ];
 
 var produtosComReajuste = produtos.map(function(item){
    return {
                nome : item.nome,
                preco : item.preco * 1.15
            }
 });
 
 produtosComReajuste.forEach(function(item){
    console.log(`${item.nome.padEnd(30)} - ${item.preco.toLocaleString("pt-BR",
     { style : "currency", currency : "BRL"})}`);
 });

 