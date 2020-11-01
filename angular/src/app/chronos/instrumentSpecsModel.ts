export class InstrumentSpecs {
    id: string;
    userID: string;
    //Instrument
    pricing_instrument_name: string;
    pricing_instrument_type: string;
    pricing_instrument_issue_date: string;
    pricing_instrument_maturity_date: string;
    pricing_instrument_coupon_rate: number;
    pricing_instrument_coupon_type: string;
    pricing_instrument_calendar_type: string;
    pricing_instrument_business_day_count: string;
    pricing_instrument_business_day_conv: string;
    pricing_instrument_facevalue: number;
    pricing_instrument_sov_curve: string;
    pricing_instrument_flat_yield: number;
    pricing_instrument_scenario: string;
    pricing_instrument_future_point: string;
    pricing_instrument_credit_spread: number;
    //Status
    instrument_status: string;
    instrument_last_run: string;
    instrument_NPV: number;
};