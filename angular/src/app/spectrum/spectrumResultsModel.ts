export class SpectrumResults {
    
    //Instrument
    assetType: string;
    country: string;
    sector: string;
    scenario: string;
    currency: string;
    //Valuation gap
    valuation_gap_m_index: string[];
    valuation_gap_m_values: string[];
    valuation_gap_3m_index: string[];
    valuation_gap_3m_values: string[];
    valuation_gap_12m_index: string[];
    valuation_gap_12m_values: string[];
    //Valuation future
    valuation_future_mean_index: string[];
    valuation_future_mean_values: string[];
    valuation_future_mean_ub_index: string[];
    valuation_future_mean_ub_values: string[];
    valuation_future_mean_lb_index: string[];
    valuation_future_mean_lb_values: string[];
    //
    valuation_future_fc_ub_index: string[];
    valuation_future_fc_ub_values: string[];
    valuation_future_fc_lb_index: string[];
    valuation_future_fc_lb_values: string[];
    //Reversion
    reversion_period: string;
    //Growth gap
    growth_weekly_index: string[];
    growth_weekly_values: string[];
    growth_monthly_index: string[];
    growth_monthly_values: string[];
    growth_3months_index: string[];
    growth_3months_values: string[];
    //
    //Weekly
    macro_wedge_Growth_Manufacturing_weekly_index: string[];
    macro_wedge_Growth_Manufacturing_weekly_values: string[];
    macro_wedge_Growth_Consumer_weekly_index: string[];
    macro_wedge_Growth_Consumer_weekly_values: string[];
    macro_wedge_Growth_Trade_weekly_index: string[];
    macro_wedge_Growth_Trade_weekly_values: string[];
    macro_wedge_Inflation_Consumer_weekly_index: string[];
    macro_wedge_Inflation_Consumer_weekly_values: string[];
    macro_wedge_Inflation_Producer_weekly_index: string[];
    macro_wedge_Inflation_Producer_weekly_values: string[];
    macro_wedge_Inflation_Trade_weekly_index: string[];
    macro_wedge_Inflation_Trade_weekly_values: string[];
    macro_wedge_Short_weekly_index: string[];
    macro_wedge_Short_weekly_values: string[];
    macro_wedge_Long_weekly_index: string[];
    macro_wedge_Long_weekly_values: string[];
    macro_wedge_Equities_weekly_index: string[];
    macro_wedge_Equities_weekly_values: string[];
    macro_wedge_agg_weekly_index: string[];
    macro_wedge_agg_weekly_values: string[];
    //Monthly
    macro_wedge_Growth_Manufacturing_monthly_index: string[];
    macro_wedge_Growth_Manufacturing_monthly_values: string[];
    macro_wedge_Growth_Consumer_monthly_index: string[];
    macro_wedge_Growth_Consumer_monthly_values: string[];
    macro_wedge_Growth_Trade_monthly_index: string[];
    macro_wedge_Growth_Trade_monthly_values: string[];
    macro_wedge_Inflation_Consumer_monthly_index: string[];
    macro_wedge_Inflation_Consumer_monthly_values: string[];
    macro_wedge_Inflation_Producer_monthly_index: string[];
    macro_wedge_Inflation_Producer_monthly_values: string[];
    macro_wedge_Inflation_Trade_monthly_index: string[];
    macro_wedge_Inflation_Trade_monthly_values: string[];
    macro_wedge_Short_monthly_index: string[];
    macro_wedge_Short_monthly_values: string[];
    macro_wedge_Long_monthly_index: string[];
    macro_wedge_Long_monthly_values: string[];
    macro_wedge_Equities_monthly_index: string[];
    macro_wedge_Equities_monthly_values: string[];
    macro_wedge_agg_monthly_index: string[];
    macro_wedge_agg_monthly_values: string[];
    //Quarterly
    macro_wedge_Growth_Manufacturing_quarterly_index: string[];
    macro_wedge_Growth_Manufacturing_quarterly_values: string[];
    macro_wedge_Growth_Consumer_quarterly_index: string[];
    macro_wedge_Growth_Consumer_quarterly_values: string[];
    macro_wedge_Growth_Trade_quarterly_index: string[];
    macro_wedge_Growth_Trade_quarterly_values: string[];
    macro_wedge_Inflation_Consumer_quarterly_index: string[];
    macro_wedge_Inflation_Consumer_quarterly_values: string[];
    macro_wedge_Inflation_Producer_quarterly_index: string[];
    macro_wedge_Inflation_Producer_quarterly_values: string[];
    macro_wedge_Inflation_Trade_quarterly_index: string[];
    macro_wedge_Inflation_Trade_quarterly_values: string[];
    macro_wedge_Short_quarterly_index: string[];
    macro_wedge_Short_quarterly_values: string[];
    macro_wedge_Long_quarterly_index: string[];
    macro_wedge_Long_quarterly_values: string[];
    macro_wedge_Equities_quarterly_index: string[];
    macro_wedge_Equities_quarterly_values: string[];
    macro_wedge_agg_quarterly_index: string[];
    macro_wedge_agg_quarterly_values: string[];
    //
    //Growth gap
    //
    Resid_growth_Growth_Manufacturing_w_index: string[];
    Resid_growth_Growth_Manufacturing_w_values: string[];
    Resid_growth_Growth_Consumer_w_index: string[];
    Resid_growth_Growth_Consumer_w_values: string[];
    Resid_growth_Growth_Trade_w_index: string[];
    Resid_growth_Growth_Trade_w_values: string[];
    //
    Resid_growth_Growth_Manufacturing_m_index: string[];
    Resid_growth_Growth_Manufacturing_m_values: string[];
    Resid_growth_Growth_Consumer_m_index: string[];
    Resid_growth_Growth_Consumer_m_values: string[];
    Resid_growth_Growth_Trade_m_index: string[];
    Resid_growth_Growth_Trade_m_values: string[];
    //
    Resid_growth_Growth_Manufacturing_3m_index: string[];
    Resid_growth_Growth_Manufacturing_3m_values: string[];
    Resid_growth_Growth_Consumer_3m_index: string[];
    Resid_growth_Growth_Consumer_3m_values: string[];
    Resid_growth_Growth_Trade_3m_index: string[];
    Resid_growth_Growth_Trade_3m_values: string[];
    //
    run_date: Date;
    last_update: Date;
    next_update: Date;
};