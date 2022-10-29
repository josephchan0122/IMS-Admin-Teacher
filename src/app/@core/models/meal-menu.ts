export interface Food{
    id:number
    picture:string,
    name:string,
    description:string
}

export interface MenuItem{
    id:number,
    weekName:string,
    dayName:string,
    foods: Food[]
}