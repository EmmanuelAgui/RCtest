import { ExtensionFun, Extension, EXT_TYPE, SaleItem, QuarterSumItem, QuarterAverageItem } from "./types";
import { setFullNameOfExtensions, sortExtensionsByKey, getSortedExtensions, setExtTypeNumOfExtensions } from "./helpers/extensions";
import { sortSaleItems, sumSalesByQuarter, getQuarterAverageFrom } from "./helpers/sales";
import { myExtensions, mySaleItems } from "./mock/data";
  
/**
    extensions is an Array and each item has such format:
    {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
    lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
**/
  
/**
    Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
**/
export let sortExtensionsByName: ExtensionFun = (extensions: Extension[]): Extension[] => {
    // extend fullName ("firstName" + "lastName" + "ext") of extension item
    let extensionsWithFullName = setFullNameOfExtensions(extensions);
    // sort extensions by fullName
    let sortedExtensionsWithFullName = sortExtensionsByKey(extensionsWithFullName, 'fullName');
    // get result extensions
    extensions = getSortedExtensions(sortedExtensionsWithFullName);
    return extensions;
}

/**
    Question 2: sort extensions by extType follow these orders ASC
    DigitalUser < VirtualUser < FaxUser < AO < Dept.
**/
export let sortExtensionsByExtType: ExtensionFun = (extensions: Extension[]): Extension[] => {
    // extend extTypeNum of extension item
    let extensionsWithExtTypeNum = setExtTypeNumOfExtensions(extensions);
    // sort extensions by extTypeNum
    let sortedExtensionsWithExtTypeNum = sortExtensionsByKey(extensionsWithExtTypeNum, 'extTypeNum');
    // get result extensions
    extensions = getSortedExtensions(sortedExtensionsWithExtTypeNum);
    return extensions;
}
// // test
// let test = sortExtensionsByName(myExtensions);
// console.log(test);
// test = sortExtensionsByExtType(myExtensions);
// console.log(test);
/**
    saleItems is an Array has each item has such format:
    {
        month: n, //[1-12],
        date: n, //[1-31],
        transationId: "xxx",
        salePrice: number
    }
**/

/**
    Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
    [
        {quarter: 1, totalPrices: xxx, transactionNums: n},
        {....}
    ]
**/
export function sumByQuarter(saleItems: SaleItem[]): QuarterSumItem[]{
    let result: QuarterSumItem[]
    // sort saleItems by month
    saleItems = sortSaleItems(saleItems);
    // calcuate totalPrices and transactionNums of each quarter
    result = sumSalesByQuarter(saleItems);
    return result;
}
/**
    Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
    [
        {quarter: 1, averagePrices: xxx, transactionNums: n},
        {....}
    ]
**/

export function averageByQuarter(saleItems: SaleItem[]): QuarterAverageItem[]{
    let result: QuarterAverageItem[];
    // calcuate totalPrices and transactionNums of each quarter
    let sumResult: QuarterSumItem[] = sumByQuarter(saleItems);
    // calcuate averagePrices of each quarter
    result = getQuarterAverageFrom(sumResult);
    return result;
}
//test
let quarterSumItems = sumByQuarter(mySaleItems);
console.log(quarterSumItems);
let quarterAverageItems = averageByQuarter(mySaleItems);
console.log(quarterAverageItems);
  
/**
    Question 5: please create a tool to generate Sequence
    Expected to be used like:
    var sequence1 = new Sequence();
    sequence1.next() --> return 1;
    sequence1.next() --> return 2;
    
    in another module:
    var sequence2 = new Sequence();
    sequence2.next() --> 3;
    sequence2.next() --> 4;
**/
// js Singleton
export const Sequence = (function () {
    // store instance
    let _instance:any=null;

    const Sequence = function () {
    if (_instance) return _instance;// return the instance exist
    // @ts-ignore
    _instance = this;
    // @ts-ignore
    this.init();
    return _instance;
    }

    Sequence.prototype.init = function () {
    _instance.source = 0;
    }
    Sequence.prototype.next = function () {
    return ++_instance.source;
    }

    return Sequence
})()
// @ts-ignore
const s1 = new Sequence();
// @ts-ignore
const s2 = new Sequence();
console.log(s1.next());
console.log(s2.next());
console.log(s1.next());

/**
     Question 6:
    AllKeys: 0-9;
    usedKeys: an array to store all used keys like [2,3,4];
    We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
**/

export function getUnUsedKeys<T>(allKeys:T[], usedKeys:T[]):T[]{
    // @ts-ignore
    let unUsedKeys: T[] = allKeys.filter(key => !usedKeys.includes(key));
    return unUsedKeys;
}
// test
// let allKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// let usedKeys = [2, 3, 4];
// let unUsedKeys = getUnUsedKeys(allKeys, usedKeys);
// console.log(unUsedKeys);
  