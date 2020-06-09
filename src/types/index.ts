export enum EXT_TYPE{
    DigitalUser = 'DigitalUser',
    VirtualUser = 'VirtualUser',
    FaxUser = 'VirtualUser',
    AO = 'AO',
    Dept='Dept'
  }

export interface Extension {
    firstName: string
    lastName?: string
    ext?: string
    extType: EXT_TYPE
    fullName?: string // "firstName" + "lastName" + "ext" 
    extTypeNum?:number // map from extType
    [prop:string]:any
}
  // extensions function type
export type ExtensionFun = (extensions: Extension[], sortKey?: keyof Extension, sortType?: 'ASC' | 'DESC') => Extension[];

export interface SaleItem{
    month: number
    date: number
    transationId: string
    salePrice: number
}
  
export interface QuarterItem{
    quarter: number
    transactionNums: number
}
  
export interface QuarterSumItem extends QuarterItem{
    totalPrices: number
}
  
export interface QuarterAverageItem extends QuarterItem{
    averagePrices: number
}