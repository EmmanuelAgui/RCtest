import { sortSaleItems, getQuarterFromMonth, getQuarterSumItem, sumSalesByQuarter, getQuarterAverageFrom, initQuarterSumItem } from '../../src/helpers/sales';
import { mySaleItems } from '../../src/mock/data';
import { QuarterSumItem, QuarterAverageItem } from '../../src/types';

describe('helpers:sales', () => {
    let quarterSumItems: QuarterSumItem[];
    describe('get sales sorted by month', () => {
        test('should get sales sorted by a specified key ascend', () => {
            let sortedSales = sortSaleItems(mySaleItems);
            expect(sortedSales).toMatchSnapshot();
        })
    })

    test('should get quarter map from month', () => {
        expect(() => getQuarterFromMonth(-1)).toThrow(TypeError);
        expect(() => getQuarterFromMonth(0)).toThrow(TypeError);
        expect(() => getQuarterFromMonth(14)).toThrow(TypeError);

        let quarter = getQuarterFromMonth(2);
        expect(quarter).toBe(1);

        quarter = getQuarterFromMonth(5);
        expect(quarter).toBe(2);

        quarter = getQuarterFromMonth(7);
        expect(quarter).toBe(3);

        quarter = getQuarterFromMonth(12);
        expect(quarter).toBe(4);
    })

    test('should calculate and return a list of total sales (sum) for each quarter', () => {
        quarterSumItems = sumSalesByQuarter(mySaleItems);
        expect(quarterSumItems).toMatchSnapshot();
    })

    test('should initial a quarterSumItem', () => {
        let newQuarterSumItems: QuarterSumItem[] = [];
        let quarterSumItemNew: QuarterSumItem = initQuarterSumItem(1, newQuarterSumItems);
        expect(quarterSumItemNew).toEqual({
            quarter: 1,
            totalPrices: 0,
            transactionNums: 0
        })
    })

    test('should get a quarterSumItem', () => {
        let quarterSumItemOld = getQuarterSumItem(1, quarterSumItems);
        expect(quarterSumItemOld).toMatchSnapshot();
    })

    test('should calculate and return a list of average sales for each quarter', () => {
        let quarterAverageItems: QuarterAverageItem[] = getQuarterAverageFrom(quarterSumItems);
        expect(quarterAverageItems).toMatchSnapshot();
    })
})