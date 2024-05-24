type CompanyBasic = {
    id: number;
    name: string;
}
type ClientBasic = {
    id: number;
    name: string;
}

type ClientParticulars = {
    id:number,
    name:string,
    year:string,
    type:string,
    amount:number,
    date:string,
}
export type { CompanyBasic, ClientBasic,ClientParticulars}