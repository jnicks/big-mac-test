export interface IBigMacRow {
    country: string;
    localPrice: number;
    dollarEx: number;
    dollarPrice: number;
    dollarPpp: number;
    dollarVal: number;
}

export interface IBigMacData {
    local: IBigMacRow,
    random: IBigMacRow
}
