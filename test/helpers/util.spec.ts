import{isEmpty, isNumber} from '../../src/helpers/utils';

describe('helpers:util',()=>{
    describe('isXX',()=>{
        test('should validate Empty',()=>{
            expect(isEmpty('')).toBeTruthy()
            expect(isEmpty(undefined)).toBeTruthy()
            expect(isEmpty('testStr')).toBeFalsy()
        })

        test('should validate Number',()=>{
            expect(isNumber(1)).toBeTruthy()
            expect(isNumber('dfsd')).toBeFalsy()
        })
    })
})