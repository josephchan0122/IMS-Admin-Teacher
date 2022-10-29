export enum DocumentFor {
    Classroom='Classroom',
    All = 'All'

}
export interface Document{
    id:number,
    name:string,
    url:string,
    documentfor:DocumentFor
}