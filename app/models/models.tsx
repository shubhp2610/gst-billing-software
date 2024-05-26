export type CompanyBasic = {
    id: number;
    name: string;
}
export type ClientBasic = {
    id: number;
    name: string;
}

export type ClientParticulars = {
    id:number,
    name:string,
    year:string,
    type:string,
    amount:number,
    date:string,
}

export type DB_Client = {
    id:number | null,
    username:string | null,
    symbol:string | null
}

