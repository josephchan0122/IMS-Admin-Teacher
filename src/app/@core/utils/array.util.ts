export function exists(key, ary): boolean {
    const found = ary.find(p => p === key);
    return Boolean(found);
}
  
export function sortByProperty<T>(data: T[], field: string): T[] {
    return data.sort((a, b) => {
        const aDate = new Date(a[field]);
        const bDate = new Date(b[field]);
        return aDate > bDate ? 1 : -1;
    });
}

export function groupByArray(xs: Array<any>, key: string) {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
  
export function FindAndRemoveByPropery<T>(data:T[], purpose_item:T,propertyName:string ="id"): T[] {
    let index = data.findIndex((item)=>{
        return item[propertyName] == purpose_item[propertyName]
    })
    if(index != -1){
        data.splice(index,1)
    }
    return data;
}