export type pageResult<T>={
   pageSize:number,
   currentPage:number,
   totalItems:number,
   pageResult:T[]
}