
function parseFloat2Decimals(value) {
    if(value != null) {
      return parseFloat(parseFloat(value).toFixed(2));
    }
    else 
    {return 0}
}