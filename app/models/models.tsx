export type CompanyBasic = {
    id: number;
    name: string;
}
export type ClientBasic = {
    id: number;
    name: string;
}

export type ClientParticulars = {
    id: number,
    name: string,
    year: string,
    type: string,
    amount: number,
    date: string,
}

export type DB_User = {
    id: number | null,
    username: string | null,
    symbol: string | null
}

export type DB_Company = {
    id: number;
    name: string;
    designation: string;
    address1: string;
    address2: string;
    city: string;
    pincode: string;
    state: string;
    phone_office: string;
    fax: string;
    mobile: string;
    email: string;
    pan: string;
    gstin: string;
    favour: string;
    bank_name: string;
    bank_branch: string;
    account_no: string;
    ifs_code: string;
    comments: string;
    signatory: string;
    signatory_designation: string;
    password: string;
};


export type DB_Client = {
    id: number;
    name: string;
    company_id: number;
    address: string;
    pan: string;
    gstin: string;
};

export type DB_Particulars = {
    id: number;
    particulars: string;
    year: string;
    type: string;
    amount: string;
    date: string;
    company_id: number;
    client_id: number;
};

export type DB_Invoice = {
    id: number,
    company_id: number,
    client_id: number,
    invoice_no: number,
    date: string,
    gst: boolean,
}

export type DB_Invoice_Data = {
    id: number,
    company_id: number,
    client_id: number,
    invoice_no: number,
    date: string,
    gst: boolean,
    particulars: DB_Particulars[]
}
export type DB_Invoice_Data_Complete = {
    client: DB_Client,
    company: DB_Company,
    invoice: DB_Invoice_Data
}