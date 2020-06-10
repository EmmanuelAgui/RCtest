import {
    setFullNameOfExtensions, setExtTypeNumOfExtensions, sortExtensionsByKey, getSortedExtensions,
} from '../../src/helpers/extensions';
import { EXT_TYPE, Extension } from '../../src/types';
import { myExtensions } from '../../src/mock/data';

const extensions: Extension[] = [
    { firstName: 'adfsdf', lastName: 'xxddx', ext: 'adfx', extType: EXT_TYPE.Dept },
    { firstName: 'rtfgh', lastName: 'sfdf', ext: '', extType: EXT_TYPE.VirtualUser }
];

describe('helpers:extensions', () => {
    describe('add property to each item of extensions', () => {
        test('should add property "fullName" to each item of extensions', () => {
            expect(setFullNameOfExtensions(extensions)).toEqual([
                { firstName: 'adfsdf', lastName: 'xxddx', ext: 'adfx', extType: EXT_TYPE.Dept, fullName: 'adfsdfxxddxadfx' },
                { firstName: 'rtfgh', lastName: 'sfdf', ext: '', extType: EXT_TYPE.VirtualUser, fullName: 'rtfghsfdf' }
            ]
            )
            const extensionsWithFullName = setFullNameOfExtensions(myExtensions);
            expect(extensionsWithFullName).toMatchSnapshot();
        })
        test('should add property "extTypeNum" to each item of extensions', () => {
            expect(setExtTypeNumOfExtensions(extensions)).toEqual([
                { firstName: 'adfsdf', lastName: 'xxddx', ext: 'adfx', extType: EXT_TYPE.Dept, fullName: 'adfsdfxxddxadfx', extTypeNum: 4 },
                { firstName: 'rtfgh', lastName: 'sfdf', ext: '', extType: EXT_TYPE.VirtualUser, fullName: 'rtfghsfdf', extTypeNum: 1 }
            ])

            const extensionsWithExtTypeNum = setExtTypeNumOfExtensions(myExtensions);
            expect(extensionsWithExtTypeNum).toMatchSnapshot();
        })
    })

    describe('get sorted extensions', () => {
        it('should get extension sorted by a specified key ascend', () => {
            let result1 = sortExtensionsByKey(myExtensions, 'fullName');
            expect(result1).toMatchSnapshot();

            let result2 = sortExtensionsByKey(myExtensions, 'extTypeNum');
            expect(result2).toMatchSnapshot();
        })

        it('should get extension sorted by a specified key descend', () => {
            let result1 = sortExtensionsByKey(myExtensions, 'fullName', 'DESC');
            expect(result1).toMatchSnapshot();

            let result2 = sortExtensionsByKey(myExtensions, 'extTypeNum', 'DESC');
            expect(result2).toMatchSnapshot();
        })

        it('should get sorted extensions', () => {
            let result = getSortedExtensions(myExtensions);
            expect(result).toMatchSnapshot();
        })
    })
})