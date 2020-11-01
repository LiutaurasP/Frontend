export class SpectrumResultsFundamentals {
    //Instrument
    assetType: string;
    country: string;
    sector: string;
    scenario: string;
    currency: string;
    //Fundamentals      
    fundamentals_index: string[];
    fundamentals_values_PFE: string[];
    fundamentals_values_PE: string[];
    fundamentals_values_PB: string[];
    fundamentals_values_PCE: string[];
    fundamentals_values_ROE: string[];
    fundamentals_values_Yield: string[];
    fundamentals_values_FEPS: string[];
    fundamentals_values_TEPS: string[];
    fundamentals_values_LREPSgrowth: string[];
    fundamentals_values_LREPStrend: string[];
    fundamentals_values_SREPSgrowth: string[];
    //Fundamentals contributions
    fundamentals_cont_index: string[];
    fundamentals_cont_PFE: string[];
    fundamentals_cont_PE: string[];
    fundamentals_cont_PB: string[];
    fundamentals_cont_PCE: string[];
    fundamentals_cont_ROE: string[];
    fundamentals_cont_Yield: string[];
    fundamentals_cont_FEPS: string[];
    fundamentals_cont_TEPS: string[];
    fundamentals_cont_LREPSgrowth: string[];
    fundamentals_cont_LREPStrend: string[];
    fundamentals_cont_SREPSgrowth: string[];
    //Fundamentals cdf      
    fundamentals_cdf_index: string[];
    fundamentals_cdf_PFE: string[];
    fundamentals_cdf_PE: string[];
    fundamentals_cdf_PB: string[];
    fundamentals_cdf_PCE: string[];
    fundamentals_cdf_ROE: string[];
    fundamentals_cdf_Yield: string[];
    fundamentals_cdf_FEPS: string[];
    fundamentals_cdf_TEPS: string[];
    fundamentals_cdf_LREPSgrowth: string[];
    fundamentals_cdf_LREPStrend: string[];
    fundamentals_cdf_SREPSgrowth: string[];
    //
    run_date: Date;
};