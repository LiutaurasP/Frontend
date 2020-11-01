export class OracleFrontierResults {
    scenario: string;
    currency: string;

    historic_10_risk    : string[];
    historic_10_return  : string[];
    historic_10_skewness: string[];
    historic_5_risk     : string[];
    historic_5_return   : string[];
    historic_5_skewness : string[];
    forward_5_risk      : string[];
    forward_5_return    : string[];
    forward_5_skewness  : string[];
    forward_10_risk     : string[];
    forward_10_return   : string[];
    forward_10_skewness : string[];
    //
    run_date: Date;
    last_update: Date;
    next_update: Date;
}