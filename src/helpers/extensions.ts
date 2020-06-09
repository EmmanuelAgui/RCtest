import { ExtensionFun, Extension } from "../types";
import { isEmpty, isNumber } from "./utils";

export function setFullNameOfExtensions(extensions: Extension[]): Extension[]{
    let extensionsWithFullName = extensions.map(item => {
      item.fullName = getFullName(item);
      return item;
    })
    return extensionsWithFullName;
    // get fullName of an extension
    function getFullName(item:Extension):string{
      let fullName =  item.firstName
      !isEmpty(item.lastName)&&(fullName+=item.lastName)
      !isEmpty(item.ext)&&(fullName+=item.ext)
      return fullName
    }
  }
  
export function setExtTypeNumOfExtensions (extensions: Extension[]): Extension[]{
    let extensionsWithExtTypeNum = extensions.map(item => {
      item.extTypeNum = getExtTypeNum(item);
      return item;
    })
    return extensionsWithExtTypeNum;
  
    function getExtTypeNum(item: Extension):number{
      let mapArray: string[] = ["DigitalUser", "VirtualUser", "FaxUser", "AO","Dept"];
      return mapArray.indexOf(item.extType);
    }
  }
  
export function sortExtensionsByKey(extensions: Extension[], sortKey: keyof Extension, sortType:string = 'ASC'): Extension[]{ 
    extensions.sort(function (a, b) {
        if (isNumber(a[sortKey]) && isNumber(b[sortKey])) {
        return sortType === 'DESC' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey];
        } else {
        return sortType === 'DESC' ? b[sortKey].localeCompare(a[sortKey]) : a[sortKey].localeCompare(b[sortKey]);
        } 
    });
    return extensions;
}
  
export function getSortedExtensions(extensions: Extension[]): Extension[]{ 
    let result = extensions.map(item => {
        const {firstName,lastName,ext,extType }: Extension = item;
        let extensionItem:Extension = { firstName, lastName, ext, extType };
        return extensionItem;
    })
    return result
}

