export class InputsEntries {
    variable: string;
    latest: number;
    change: number;
}

export class InputsEntriesGroups {
    variable: string;
    latest: number;
    change: number;
    impact: number;
}

export class InputsOutlook {
    variable: string;
    g_cons_latest: number;
    g_cons_change: number;
    g_mfg_latest: number;
    g_mfg_change: number;
    g_trade_latest: number;
    g_trade_change: number;
    //
    i_cons_latest: number;
    i_cons_change: number;
    i_mfg_latest: number;
    i_mfg_change: number;
    i_trade_latest: number;
    i_trade_change: number;
}

export class InputsKey {
    variable: string;
    rgdp_latest: number;
    rgdp_change: number;
    ip_latest: number;
    ip_change: number;
    consExp_latest: number;
    consExp_change: number;
    //
    deflator_latest: number;
    deflator_change: number;
    ppi_latest: number;
    ppi_change: number;
    cpi_latest: number;
    cpi_change: number;
}

export class InputFX {
    variable: string;
    base_latest: number;
    base_change: number;
    cons_latest: number;
    cons_change: number;
}