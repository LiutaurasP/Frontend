export class BenedettoSeriesModel {
    //Instrument
    scenario: string;
    country: string;
    category: string;
    measure: string;
    sector: string;
    //Series
    series_index: string[];
    series_values: number[];
    //
    last_update: Date;
};