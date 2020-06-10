import { SaleItem, QuarterSumItem, QuarterAverageItem } from "../types";

export function sortSaleItems(saleItems: SaleItem[]): SaleItem[] {
    saleItems.sort((a, b) => a.month - b.month)
    return saleItems
}

export function getQuarterFromMonth(month: number): number {
    if (month > 12 || month < 1) {
        throw Error('Please input a correct month');
    }
    if (month > 0 && month <= 3) {
        return 1;
    } else if (month > 3 && month <= 6) {
        return 2;
    } else if (month > 6 && month <= 9) {
        return 3;
    } else {
        return 4;
    }
}

export function initQuarterSumItem(quarter: number, quarterSumItems: QuarterSumItem[]): QuarterSumItem {
    let quarterSumItem = {
        quarter: quarter,
        totalPrices: 0,
        transactionNums: 0
    }
    quarterSumItems.push(quarterSumItem)
    return quarterSumItem;
}

export function getQuarterSumItem(quarter: number, quarterSumItems: QuarterSumItem[]): QuarterSumItem {
    // @ts-ignore
    let quarterSumItem = quarterSumItems.find(item => item.quarter === quarter);
    !quarterSumItem && (quarterSumItem = initQuarterSumItem(quarter, quarterSumItems));
    return quarterSumItem as QuarterSumItem;
}

export function sumSalesByQuarter(saleItems: SaleItem[]): QuarterSumItem[] {
    let result: QuarterSumItem[] = [];
    saleItems.reduce((quarterSumItems, currentValue) => {
        // get quarter n
        let quarter = getQuarterFromMonth(currentValue.month);
        // find or create quarterSumItem n
        let quarterSumItem = getQuarterSumItem(quarter, quarterSumItems);
        // accumulate the totalPrices and transactionNums of quarterSumItem n
        quarterSumItem.totalPrices += currentValue.salePrice;
        quarterSumItem.transactionNums++;
        // return quarter n
        return quarterSumItems
    }, result)
    return result;
}

export function getQuarterAverageFrom(sum: QuarterSumItem[]): QuarterAverageItem[] {
    let result: QuarterAverageItem[];
    result = sum.map(item => {
        let quarterAverageItem: QuarterAverageItem;
        let averagePrices = Number(item.totalPrices / item.transactionNums).toFixed(2);
        quarterAverageItem = {
            quarter: item.quarter,
            averagePrices: Number(averagePrices),
            transactionNums: item.transactionNums
        };
        return quarterAverageItem;
    })
    return result;
}
