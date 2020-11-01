export class BenedettoStatsModel {
    //Instrument
    scenario: string;
    country: string;
    measure: string;
    sector: string;
    //Table data
    //M-2
    value_tm2: number;
    stamp_tm2: string;
    //M-1
    value_tm1: number;
    stamp_tm1: string;
    //M-0
    value_tm0: number;
    stamp_tm0: string;
    //M+1
    value_tp1: number;
    stamp_tp1: string;
    //M+2
    value_tp2: number;
    stamp_tp2: string;
    //M+3
    value_tp3: number;
    stamp_tp3: string;
    //
    last_update: Date;
};