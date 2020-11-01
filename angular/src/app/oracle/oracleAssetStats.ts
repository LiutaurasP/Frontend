export class oracleAssetStatsResults {
    assetClass: string;
    //
    Historic5y    : string[];
    Historic3y  : string[];
    Instantanous  : string[];
    NextMonth  : string[];
    Next3y  : string[];
    Next5y  : string[];
    Next10y  : string[];
    //
    run_date: Date;
    last_update: Date;
    next_update: Date;
}