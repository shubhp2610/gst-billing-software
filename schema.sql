CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    symbol VARCHAR(255) NOT NULL
);

INSERT INTO Users (username, symbol) VALUES ('himansu@validuser.com', 'HAMU');

CREATE TABLE HAMU_Company(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    designation TEXT,
    address1 TEXT,
    address2 TEXT,
    city TEXT,
    pincode TEXT,
    state TEXT,
    phone_office TEXT,
    fax TEXT,
    mobile TEXT,
    email TEXT,
    pan TEXT,
    gstin TEXT,
    favour TEXT,
    bank_name TEXT,
    bank_branch TEXT,
    account_no TEXT,
    ifs_code TEXT,
    comments TEXT,
    signatory TEXT,
    signatory_designation TEXT,
    password TEXT
);

CREATE TABLE HAMU_Client(
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    name TEXT,
    address TEXT,
    pan TEXT,
    gstin TEXT,
    FOREIGN KEY (company_id) REFERENCES HAMU_Company(id)
);

CREATE TABLE HAMU_Particulars(
    id INT PRIMARY KEY AUTO_INCREMENT,
    particulars TEXT,
    year TEXT,
    type TEXT,
    amount TEXT,
    date TEXT,
    company_id INT,
    client_id INT,
    FOREIGN KEY (company_id) REFERENCES HAMU_Company(id),
    FOREIGN KEY (client_id) REFERENCES HAMU_Client(id)
);

CREATE TABLE HAMU_Invoices(
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT, 
    client_id INT,
    invoice_no TEXT,
    date TEXT,
    gst BOOLEAN,
    FOREIGN KEY (company_id) REFERENCES HAMU_Company(id),
    FOREIGN KEY (client_id) REFERENCES HAMU_Client(id)
);

CREATE TABLE HAMU_Invoice_Particulars(
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT,
    particulars_id INT,
    FOREIGN KEY (invoice_id) REFERENCES HAMU_Invoices(id),
    FOREIGN KEY (particulars_id) REFERENCES HAMU_Particulars(id)
);

-- ACCOUNTING FEES
-- TAX AUDIT FEES
-- INCOME TAX RETURN FILING FEES
-- CERTIFICATION FEES
-- CMA REPORT FEES
-- PROJECT REPORT FEES
-- DSC FEES
-- GST RETURN FILING FFES
-- GST REGISTRATION FEES
-- GSTR 9 FEES
-- GSTR 9 & 9C FEES
-- IMPORT EXPORT CODE FEES
-- PAN CARD APPLICATION FEES
-- TAN CARD APPLICATION FEES
-- UDHYAM REGISTRATION FEES