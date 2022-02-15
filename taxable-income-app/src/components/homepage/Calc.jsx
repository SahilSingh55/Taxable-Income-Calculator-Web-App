function calcAppHRA1(Bas, Rent, HRA){
    let val1 = (50*Bas)/100;  
    let val2 = Rent - (10*Bas)/100;
    let minVal = Math.min(val1, val2, HRA);
    return minVal;
}

function calcAppHRA2(Bas, Rent, HRA){
    let val1 = (40*Bas)/100;  
    let val2 = Rent - (10*Bas)/100;
    let minVal = Math.min(val1, val2, HRA);
    return minVal;
}

function calcTaxInc(Bas, LTA, HRA, FA, AppHRA, Inv, Med){
    let val1 = (parseFloat(Bas) + parseFloat(LTA) + parseFloat(HRA) + parseFloat(FA))
    let val2 = (parseFloat(AppHRA) + parseFloat(Inv) + parseFloat(Med))
    let TaxInc = val1 - val2
    return TaxInc;
}

export { calcAppHRA1, calcAppHRA2, calcTaxInc };