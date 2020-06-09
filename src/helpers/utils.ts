export function isEmpty(str: string | undefined):boolean{
    return !str;
}

export function isNumber(n:any):boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
}