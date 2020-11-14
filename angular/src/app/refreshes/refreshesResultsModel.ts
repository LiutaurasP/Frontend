export class RefreshesResults {

    //Instrument
    country: string;
    //
    inputs_variables: string[];
    inputs_now: number[];
    inputs_change: number[];
    //
    act_g_cons_variables: string[];
    act_g_cons_now: number[];
    act_g_cons_change: number[];
    act_g_cons_impact: number[];
    act_g_cons_agg_now: number;
    act_g_cons_agg_change: number;
    //
    act_g_mfg_variables: string[];
    act_g_mfg_now: number[];
    act_g_mfg_change: number[];
    act_g_mfg_impact: number[];
    act_g_mfg_agg_now: number;
    act_g_mfg_agg_change: number;
    //
    act_g_trade_variables: string[];
    act_g_trade_now: number[];
    act_g_trade_change: number[];
    act_g_trade_impact: number[];
    act_g_trade_agg_now: number;
    act_g_trade_agg_change: number;
    //      
    act_i_cons_variables: string[];
    act_i_cons_now: number[];
    act_i_cons_change: number[];
    act_i_cons_impact: number[];
    act_i_cons_agg_now: number;
    act_i_cons_agg_change: number;
    //
    act_i_mfg_variables: string[];
    act_i_mfg_now: number[];
    act_i_mfg_change: number[];
    act_i_mfg_impact: number[];
    act_i_mfg_agg_now: number;
    act_i_mfg_agg_change: number;
    //
    act_i_trade_variables: string[];
    act_i_trade_now: number[];
    act_i_trade_change: number[];
    act_i_trade_impact: number[];
    act_i_trade_agg_now: number;
    act_i_trade_agg_change: number;
    //
    //
    out_base_labels: string[];
    out_base_g_cons: number[];
    out_base_g_mfg: number[];
    out_base_g_trade: number[];
    out_base_i_cons: number[];
    out_base_i_mfg: number[];
    out_base_i_trade: number[];
    //
    out_cons_labels: string[];
    out_cons_g_cons: number[];
    out_cons_g_mfg: number[];
    out_cons_g_trade: number[];
    out_cons_i_cons: number[];
    out_cons_i_mfg: number[];
    out_cons_i_trade: number[];
    //
    keyVar_base_labels: string[];
    keyVar_base_rgdp: number[];
    keyVar_base_ip: number[];
    keyVar_base_cons_exp: number[];
    keyVar_base_deflator: number[];
    keyVar_base_ppi: number[];
    keyVar_base_cpi: number[];
    //
    keyVar_cons_labels: string[];
    keyVar_cons_rgdp: number[];
    keyVar_cons_ip: number[];
    keyVar_cons_cons_exp: number[];
    keyVar_cons_deflator: number[];
    keyVar_cons_ppi: number[];
    keyVar_cons_cpi: number[];  
    //
    FX_base_labels: string[];
    FX_base_values: number[]; 
    FX_cons_labels: string[];
    FX_cons_values: number[]; 
    //
    Term_base_tenors: string[];
    Term_base_latest: number[]; 
    Term_base_change: number[]; 
    //
    Term_cons_tenors: string[];
    Term_cons_latest: number[]; 
    Term_cons_change: number[]; 
    //
    Tail_Growth_vars: string[];
    Tail_Growth_latest: number[]; 
    Tail_Growth_change: number[]; 
    //
    Tail_CPI_vars: string[];
    Tail_CPI_latest: number[];
    Tail_CPI_change: number[];
    //
    Tail_Equities_vars: string[];
    Tail_Equities_latest: number[];
    Tail_Equities_change: number[];
    //
    //
    Income_groups: string[];
    //
    Income_group_0_labels: string[];
    Income_group_0_base_latest: number[];
    Income_group_0_base_change: number[];
    Income_group_0_cons_latest: number[];
    Income_group_0_cons_change:  number[];
    //
    Income_group_1_labels: string[];
    Income_group_1_base_latest: number[];
    Income_group_1_base_change: number[];
    Income_group_1_cons_latest: number[];
    Income_group_1_cons_change: number[];
    //
    Income_group_2_labels: string[];
    Income_group_2_base_latest: number[];
    Income_group_2_base_change: number[];
    Income_group_2_cons_latest: number[];
    Income_group_2_cons_change: number[];
    //
    Income_group_3_labels: string[];
    Income_group_3_base_latest: number[];
    Income_group_3_base_change: number[];
    Income_group_3_cons_latest: number[];
    Income_group_3_cons_change: number[];
    //
    Income_group_4_labels: string[];
    Income_group_4_base_latest: number[];
    Income_group_4_base_change: number[];
    Income_group_4_cons_latest: number[];
    Income_group_4_cons_change: number[];
    //
    Income_group_5_labels: string[];
    Income_group_5_base_latest: number[];
    Income_group_5_base_change: number[];
    Income_group_5_cons_latest: number[];
    Income_group_5_cons_change: number[];
    //
    Income_group_6_labels: string[];
    Income_group_6_base_latest: number[];
    Income_group_6_base_change: number[];
    Income_group_6_cons_latest: number[];
    Income_group_6_cons_change: number[];
    //
    Income_group_7_labels: string[];
    Income_group_7_base_latest: number[];
    Income_group_7_base_change: number[];
    Income_group_7_cons_latest: number[];
    Income_group_7_cons_change: number[];
    //
    last_update: Date;
};