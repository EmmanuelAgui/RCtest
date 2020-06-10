import {
    sortExtensionsByName,
    sortExtensionsByExtType,
    sumByQuarter,
    averageByQuarter,
    getUnUsedKeys
} from '../src/index'
import { sequence } from '../src/rctest'
import { myExtensions, mySaleItems } from '../src/mock/data'
import { QuarterSumItem, QuarterAverageItem } from '../src/types'

describe('defaults,main functions', () => {
    test('should sort extensions by "firstName" + "lastName" + "ext" ASC', () => {
        let sortedExtensionsByName = sortExtensionsByName(myExtensions)
        expect(sortedExtensionsByName).toMatchSnapshot()
    })

    test('should sort extensions by extType follow these orders ASC', () => {
        let sortedExtensionsByExtType = sortExtensionsByExtType(myExtensions)
        expect(sortedExtensionsByExtType).toMatchSnapshot()
    })

    test('should calculate and return a list of total sales (sum) for each quarter', () => {
        let quarterSumItems: QuarterSumItem[] = sumByQuarter(mySaleItems)
        expect(quarterSumItems).toMatchSnapshot()
    })

    test('should calculate and return a list of average sales for each quarter', () => {
        let quarterAverageItems: QuarterAverageItem[] = averageByQuarter(mySaleItems)
        expect(quarterAverageItems).toMatchSnapshot()
    })

    test('should be a singleton', () => {
        expect(sequence.next()).toBe(5)
    })

    test('get an array which contains all the unused keys', () => {
        let allKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        let usedKeys = [2, 3, 4]
        let unUsedKeys = getUnUsedKeys(allKeys, usedKeys)
        expect(unUsedKeys).toEqual([0, 1, 5, 6, 7, 8, 9])
    })
})
