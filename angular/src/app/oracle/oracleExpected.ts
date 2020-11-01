export class oracleExpectedResults {
    assetGroup: string;
    scenario: string;
    //
    assetNames      : string[];
    returns3y       : number[][];
    returns3yFull   : number[][];
    returns5y       : number[][];
    returns5yFull   : number[][];
    returns10y      : number[][];
    returns10yFull  : number[][];
    //
    run_date: Date;
    last_update: Date;
    next_update: Date;
}