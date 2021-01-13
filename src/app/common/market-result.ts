export class MarketResult {
    dates: Date;
    be: number;
    ch: number;
    cz: number;
    de_at: number;
    dk1: number;
    dk2: number;
    es: number;
    fr: number;
    nl: number;

    constructor(dates: Date, be: number, ch: number, cz: number, de_at: number, dk1: number, dk2: number, es: number, fr: number, nl: number) {
        this.dates = dates;
        this.be = be;
        this.ch = ch;
        this.cz = cz;
        this.de_at = de_at;
        this.dk1 = dk1;
        this.dk2 = dk2;
        this.es = es;
        this.fr = fr;
        this.nl = nl;
    }
}
