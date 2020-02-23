(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"L+U1":function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),u=e("bH05"),s=e("rjUY"),r=e("V7cH"),o=e("7Eps");function a(){return[s,r,u,o]}var i=function(){return function(){}}(),c=e("pMnS"),d=e("tBg5"),p=e("Ip0R"),h=e("4GxJ"),m=e("jGGy"),b=function(){function l(l,n,e){this.modalService=l,this.http=n,this.authenticationService=e,this.returnsTableFlag=null,this.lineChartPriceFutureFlag=null,this.lineChartPriceFutureOptions={title:{text:null},rangeSelector:{enabled:!1},yAxis:{title:{text:"Predicted price"}},tooltip:{crosshairs:!0,shared:!0,pointFormat:"{series.name}: {point.y:.2f}"},legend:{enabled:!1},series:[{name:"Mean",color:"#000000",data:[]},{name:"Upper",color:"#009DA0",data:[]},{name:"Lower",color:"#009DA0",data:[]}]},this.lineChartPriceDecomposeMacroFlag=null,this.lineChartPriceDecomposeMacroOptions={title:{text:null},rangeSelector:{enabled:!1},yAxis:{title:{text:"Drivers"}},tooltip:{crosshairs:!0,shared:!0,pointFormat:"{series.name}: {point.y:.2f}"},legend:{enabled:!1},chart:{type:"area"},plotOptions:{series:{stacking:"normal"}},series:[{name:"Growth DM",data:[]},{name:"Growth EM",data:[]},{name:"Growth local",data:[]},{name:"Rates short",data:[]},{name:"Inflation local",data:[]},{name:"Unemployment local",data:[]}]},this.lineChartPriceDecomposeFlag=null,this.lineChartPriceDecomposeOptions={title:{text:null},rangeSelector:{enabled:!1},yAxis:{title:{text:"Drivers"}},tooltip:{crosshairs:!0,shared:!0,pointFormat:"{series.name}: {point.y:.2f}"},legend:{enabled:!1},chart:{type:"area"},plotOptions:{series:{stacking:"normal"}},series:[{name:"PB",data:[]},{name:"PE",data:[]},{name:"ERP",data:[]},{name:"Yield",data:[]},{name:"ROE",data:[]},{name:"FE",data:[]}]},this.lineChartPriceFlag=null,this.lineChartPriceOptions={title:{text:null},rangeSelector:{enabled:!1},yAxis:{title:{text:"Price vs implied"}},tooltip:{crosshairs:!0,shared:!0,pointFormat:"{series.name}: {point.y:.2f}"},legend:{enabled:!1},series:[{name:"Realized",color:"#000000",data:[]},{name:"Implied",color:"#009DA0",data:[]},{name:"Pricing gap",color:"#009DA0",data:[]}]},this.lineChartFundamentalsFlag=null,this.lineChartFundamentalsOptions={title:{text:null},rangeSelector:{enabled:!1},yAxis:{title:{text:"Predicted measure & Uncertainty"}},tooltip:{crosshairs:!0,shared:!0,pointFormat:"{series.name}: {point.y:.2f}"},legend:{enabled:!1},series:[{name:"Mean",color:"#000000",data:[]},{name:"Upper",color:"#009DA0",data:[]},{name:"Lower",color:"#009DA0",data:[]}]},this.refreshDate=new Date("2001-01-01"),this.refreshDate_next=new Date("2001-01-01"),this.assetClassSelected="World",this.countrySelected="World",this.selectedSector="Aggregate",this.authenticationService.doPing(),this.authenticationService.currentUserValue&&(this.currentUser=this.authenticationService.currentUserValue),this.lineChartPriceFlag=!1,this.lineChartFundamentalsFlag=!1,this.lineChartPriceDecomposeFlag=!1,this.lineChartPriceDecomposeMacroFlag=!1,this.lineChartPriceFutureFlag=!1,this.returnsTableFlag=!1}return l.prototype.assetClassSelectorDrop=function(l){this.assetClassSelected=l,this.pullCountries()},l.prototype.countrySelectorDrop=function(l){this.countrySelected=l,this.pullSectors()},l.prototype.sectorSelectorDrop=function(l){this.selectedSector=l,this.pullScenarios()},l.prototype.scenarioSelectorDrop=function(l){this.selectedScenario=l,this.pullPricingData()},l.prototype.fundamentalSelectorDrop=function(l){this.selectedFundamental=l,this.setFundamentalsData()},l.prototype.setReturnsFutureData=function(){this.returnsTableData=new Array;var l={time_point:"2Y",value_mean:Math.round(1e3*this.spectrumResultsLatest.returns_expected[0][0])/1e3,value_lower:Math.round(1e3*this.spectrumResultsLatest.returns_expected[0][2])/1e3,value_upper:Math.round(1e3*this.spectrumResultsLatest.returns_expected[0][1])/1e3};this.returnsTableData.push(l),l={time_point:"5Y",value_mean:Math.round(1e3*this.spectrumResultsLatest.returns_expected[1][0])/1e3,value_lower:Math.round(1e3*this.spectrumResultsLatest.returns_expected[1][2])/1e3,value_upper:Math.round(1e3*this.spectrumResultsLatest.returns_expected[1][1])/1e3},this.returnsTableData.push(l),l={time_point:"10Y",value_mean:Math.round(1e3*this.spectrumResultsLatest.returns_expected[2][0])/1e3,value_lower:Math.round(1e3*this.spectrumResultsLatest.returns_expected[2][2])/1e3,value_upper:Math.round(1e3*this.spectrumResultsLatest.returns_expected[2][1])/1e3},this.returnsTableData.push(l),l={time_point:"20Y",value_mean:Math.round(1e3*this.spectrumResultsLatest.returns_expected[3][0])/1e3,value_lower:Math.round(1e3*this.spectrumResultsLatest.returns_expected[3][2])/1e3,value_upper:Math.round(1e3*this.spectrumResultsLatest.returns_expected[3][1])/1e3},this.returnsTableData.push(l),this.returnsTableFlag=!0},l.prototype.setPriceFutureData=function(){for(var l=[],n=[],e=[],t=0;t<this.spectrumResultsLatest.price_future_time.length;t++){var u=new Date(this.spectrumResultsLatest.price_future_time[t]).getTime(),s=Number(this.spectrumResultsLatest.price_future_mean[t]),r=Number(this.spectrumResultsLatest.price_future_lower[t]),o=Number(this.spectrumResultsLatest.price_future_upper[t]);l.push([u,Math.round(1e3*s)/1e3]),n.push([u,Math.round(1e3*r)/1e3]),e.push([u,Math.round(1e3*o)/1e3])}this.lineChartPriceFuture=new d.e(this.lineChartPriceFutureOptions),this.lineChartPriceFutureOptions.series[0].data=l,this.lineChartPriceFutureOptions.series[1].data=n,this.lineChartPriceFutureOptions.series[2].data=e,this.lineChartPriceFutureOptions.title.text="Predicted prices",this.lineChartPriceFutureFlag=!0},l.prototype.setPriceDecompositionData=function(){for(var l=[],n=[],e=[],t=[],u=[],s=[],r=[],o=[],a=[],i=[],c=[],p=[],h=0;h<this.spectrumResultsLatest.price_details_time.length;h++){var m=new Date(this.spectrumResultsLatest.price_details_time[h]).getTime();if(this.spectrumResultsLatest.price_details_PB.length>0){var b=Number(this.spectrumResultsLatest.price_details_PB[h]);l.push([m,Math.round(1e3*b)/1e3])}if(this.spectrumResultsLatest.price_details_PE.length>0){var w=Number(this.spectrumResultsLatest.price_details_PE[h]);n.push([m,Math.round(1e3*w)/1e3])}if(this.spectrumResultsLatest.price_details_ERP.length>0){var y=Number(this.spectrumResultsLatest.price_details_ERP[h]);e.push([m,Math.round(1e3*y)/1e3])}if(this.spectrumResultsLatest.price_details_Yield.length>0){var _=Number(this.spectrumResultsLatest.price_details_Yield[h]);t.push([m,Math.round(1e3*_)/1e3])}if(this.spectrumResultsLatest.price_details_ROE.length>0){var f=Number(this.spectrumResultsLatest.price_details_ROE[h]);u.push([m,Math.round(1e3*f)/1e3])}if(this.spectrumResultsLatest.price_details_FE.length>0){var g=Number(this.spectrumResultsLatest.price_details_FE[h]);s.push([m,Math.round(1e3*g)/1e3])}if(this.spectrumResultsLatest.price_details_growth_DM.length>0){var D=Number(this.spectrumResultsLatest.price_details_growth_DM[h]);r.push([m,Math.round(1e3*D)/1e3])}if(this.spectrumResultsLatest.price_details_growth_EM.length>0){var A=Number(this.spectrumResultsLatest.price_details_growth_EM[h]);o.push([m,Math.round(1e3*A)/1e3])}if(this.spectrumResultsLatest.price_details_growth_local.length>0){var k=Number(this.spectrumResultsLatest.price_details_growth_local[h]);a.push([m,Math.round(1e3*k)/1e3])}if(this.spectrumResultsLatest.price_details_rates_short.length>0){var v=Number(this.spectrumResultsLatest.price_details_rates_short[h]);i.push([m,Math.round(1e3*v)/1e3])}if(this.spectrumResultsLatest.price_details_inflation_local.length>0){var K=Number(this.spectrumResultsLatest.price_details_inflation_local[h]);c.push([m,Math.round(1e3*K)/1e3])}if(this.spectrumResultsLatest.price_details_unemployment_local.length>0){var P=Number(this.spectrumResultsLatest.price_details_unemployment_local[h]);p.push([m,Math.round(1e3*P)/1e3])}}this.lineChartPriceDecompose=new d.e(this.lineChartPriceDecomposeOptions),l.length>0&&(this.lineChartPriceDecomposeOptions.series[0].data=l),n.length>0&&(this.lineChartPriceDecomposeOptions.series[1].data=n),e.length>0&&(this.lineChartPriceDecomposeOptions.series[2].data=e),t.length>0&&(this.lineChartPriceDecomposeOptions.series[3].data=t),u.length>0&&(this.lineChartPriceDecomposeOptions.series[4].data=u),s.length>0&&(this.lineChartPriceDecomposeOptions.series[5].data=s),this.lineChartPriceDecomposeOptions.title.text="Fundamentals implied price decomposition",this.lineChartPriceDecomposeFlag=!0,this.lineChartPriceDecomposeMacro=new d.e(this.lineChartPriceDecomposeMacroOptions),r.length>0&&(this.lineChartPriceDecomposeMacroOptions.series[0].data=r),o.length>0&&(this.lineChartPriceDecomposeMacroOptions.series[1].data=o),a.length>0&&(this.lineChartPriceDecomposeMacroOptions.series[2].data=a),i.length>0&&(this.lineChartPriceDecomposeMacroOptions.series[3].data=i),c.length>0&&(this.lineChartPriceDecomposeMacroOptions.series[4].data=c),p.length>0&&(this.lineChartPriceDecomposeMacroOptions.series[5].data=p),this.lineChartPriceDecomposeMacroOptions.title.text="Macro implied price decomposition",this.lineChartPriceDecomposeMacroFlag=!0},l.prototype.setPriceData=function(){for(var l=[],n=[],e=[],t=0;t<this.spectrumResultsLatest.price_time.length;t++){var u=new Date(this.spectrumResultsLatest.price_time[t]).getTime(),s=Number(this.spectrumResultsLatest.price_values[t]),r=Number(this.spectrumResultsLatest.price_implied_values[t]),o=Number(this.spectrumResultsLatest.price_gap_values[t]);l.push([u,Math.round(1e3*s)/1e3]),n.push([u,Math.round(1e3*r)/1e3]),e.push([u,Math.round(1e3*o)/1e3])}this.lineChartPrice=new d.e(this.lineChartPriceOptions),this.lineChartPriceOptions.series[0].data=l,this.lineChartPriceOptions.series[1].data=n,this.lineChartPriceOptions.series[2].data=e,this.lineChartPriceOptions.title.text="Price vs fundamentals implied price",this.lineChartPriceFlag=!0},l.prototype.setFundamentalsData=function(){for(var l=[],n=[],e=[],t=0;t<this.spectrumResultsLatest.fundamentals_time.length;t++){var u=new Date(this.spectrumResultsLatest.fundamentals_time[t]).getTime(),s=0,r=0,o=0;"PB"==this.selectedFundamental?(s=Number(this.spectrumResultsLatest.fundamentals_mean_PB[t]),r=Number(this.spectrumResultsLatest.fundamentals_lower_PB[t]),o=Number(this.spectrumResultsLatest.fundamentals_upper_PB[t])):"PE"==this.selectedFundamental?(s=Number(this.spectrumResultsLatest.fundamentals_mean_PE[t]),r=Number(this.spectrumResultsLatest.fundamentals_lower_PE[t]),o=Number(this.spectrumResultsLatest.fundamentals_upper_PE[t])):"ROE"==this.selectedFundamental?(s=Number(this.spectrumResultsLatest.fundamentals_mean_ROE[t]),r=Number(this.spectrumResultsLatest.fundamentals_lower_ROE[t]),o=Number(this.spectrumResultsLatest.fundamentals_upper_ROE[t])):"ERP"==this.selectedFundamental?(s=Number(this.spectrumResultsLatest.fundamentals_mean_ERP[t]),r=Number(this.spectrumResultsLatest.fundamentals_lower_ERP[t]),o=Number(this.spectrumResultsLatest.fundamentals_upper_ERP[t])):"Yield"==this.selectedFundamental?(s=Number(this.spectrumResultsLatest.fundamentals_mean_Yield[t]),r=Number(this.spectrumResultsLatest.fundamentals_lower_Yield[t]),o=Number(this.spectrumResultsLatest.fundamentals_upper_Yield[t])):"FE"==this.selectedFundamental&&(s=Number(this.spectrumResultsLatest.fundamentals_mean_FE[t]),r=Number(this.spectrumResultsLatest.fundamentals_lower_FE[t]),o=Number(this.spectrumResultsLatest.fundamentals_upper_FE[t])),l.push([u,Math.round(1e3*s)/1e3]),n.push([u,Math.round(1e3*r)/1e3]),e.push([u,Math.round(1e3*o)/1e3])}this.lineChartFundamentals=new d.e(this.lineChartFundamentalsOptions),this.lineChartFundamentalsOptions.series[0].data=l,this.lineChartFundamentalsOptions.series[1].data=n,this.lineChartFundamentalsOptions.series[2].data=e,this.lineChartFundamentalsOptions.title.text="PB"==this.selectedFundamental?"Price-Book ratio":"PE"==this.selectedFundamental?"Price-Earnings ratio":"ROE"==this.selectedFundamental?"Return on equity":"ERP"==this.selectedFundamental?"Equity Risk Premia":"Yield"==this.selectedFundamental?"Yield":"FE"==this.selectedFundamental?"Forward Earnings":"Error",this.lineChartFundamentalsFlag=!0},l.prototype.pullPricingData=function(){var l=this;this.http.get("https://api.alphahuntsman.com/spectrum/results?country="+this.countrySelected.replace(" ","_")+"&sector="+this.selectedSector+"&assets="+this.assetClassSelected+"&scenario="+this.selectedScenario+"&ID="+this.currentUser.tempAPI).subscribe((function(n){l.refreshDate=n.last_update,l.refreshDate_next=n.next_update,l.spectrumResultsLatest=n,l.fundamentalList=new Array,null!=n.fundamentals_mean_PB&&n.fundamentals_mean_PB.length==n.fundamentals_time.length&&l.fundamentalList.push("PB"),null!=n.fundamentals_mean_PE&&n.fundamentals_mean_PE.length==n.fundamentals_time.length&&l.fundamentalList.push("PE"),null!=n.fundamentals_mean_ROE&&n.fundamentals_mean_ROE.length==n.fundamentals_time.length&&l.fundamentalList.push("ROE"),null!=n.fundamentals_mean_ERP&&n.fundamentals_mean_ERP.length==n.fundamentals_time.length&&l.fundamentalList.push("ERP"),null!=n.fundamentals_mean_Yield&&n.fundamentals_mean_Yield.length==n.fundamentals_time.length&&l.fundamentalList.push("Yield"),null!=n.fundamentals_mean_FE&&n.fundamentals_mean_FE.length==n.fundamentals_time.length&&l.fundamentalList.push("FE"),l.selectedFundamental=l.fundamentalList[0],l.setPriceData(),l.setPriceDecompositionData(),l.setFundamentalsData(),l.setPriceFutureData(),l.setReturnsFutureData()}))},l.prototype.pullScenarios=function(){var l=this;this.http.get("https://api.alphahuntsman.com/spectrum/scenarios?country="+this.countrySelected.replace(" ","_")+"&sector="+this.selectedSector+"&assets="+this.assetClassSelected).subscribe((function(n){l.scenarionList=new Array;for(var e=0,t=n;e<t.length;e++)l.scenarionList.push(t[e]);l.scenarionList=l.scenarionList.sort(),l.selectedScenario=l.scenarionList[0],l.pullPricingData()}))},l.prototype.pullCountries=function(){var l=this;this.http.get("https://api.alphahuntsman.com/spectrum/countries?assets="+this.assetClassSelected).subscribe((function(n){l.countryList=new Array;for(var e=0,t=n;e<t.length;e++)l.countryList.push(t[e].replace("_"," "));l.countryList=l.countryList.sort(),l.countrySelected=l.countryList[0],l.pullSectors()}))},l.prototype.pullSectors=function(){var l=this;this.http.get("https://api.alphahuntsman.com/spectrum/sectors?country="+this.countrySelected.replace(" ","_")+"&assets="+this.assetClassSelected).subscribe((function(n){l.sectorList=new Array;for(var e=0,t=n;e<t.length;e++)l.sectorList.push(t[e]);l.sectorList=l.sectorList.sort(),l.selectedSector=l.sectorList[0],l.pullScenarios()}))},l.prototype.ngOnInit=function(){var l=this;this.http.get("https://api.alphahuntsman.com/spectrum/assets").subscribe((function(n){l.assetClassList=new Array;for(var e=0,t=n;e<t.length;e++)l.assetClassList.push(t[e].replace("_"," "));l.assetClassList=l.assetClassList.sort(),l.assetClassSelected=l.assetClassList[0],l.pullCountries()}))},l}(),w=e("t/Na"),y=t.yb({encapsulation:0,styles:[["#EquityIndexMapPlot[_ngcontent-%COMP%]   .highcharts-container[_ngcontent-%COMP%]{width:100%!important;height:100%!important}"]],data:{}});function _(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"button",[["class","dropdown-item"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.assetClassSelectorDrop(l.context.$implicit)&&t),t}),null,null)),(l()(),t.Sb(1,null,["",""]))],null,(function(l,n){l(n,1,0,n.context.$implicit)}))}function f(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"button",[["class","dropdown-item"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.countrySelectorDrop(l.context.$implicit)&&t),t}),null,null)),(l()(),t.Sb(1,null,["",""]))],null,(function(l,n){l(n,1,0,n.context.$implicit)}))}function g(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"button",[["class","dropdown-item"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.sectorSelectorDrop(l.context.$implicit)&&t),t}),null,null)),(l()(),t.Sb(1,null,["",""]))],null,(function(l,n){l(n,1,0,n.context.$implicit)}))}function D(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"button",[["class","dropdown-item"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.scenarioSelectorDrop(l.context.$implicit)&&t),t}),null,null)),(l()(),t.Sb(1,null,["",""]))],null,(function(l,n){l(n,1,0,n.context.$implicit)}))}function A(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"button",[["class","dropdown-item"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.fundamentalSelectorDrop(l.context.$implicit)&&t),t}),null,null)),(l()(),t.Sb(1,null,["",""]))],null,(function(l,n){l(n,1,0,n.context.$implicit)}))}function k(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"div",[],null,null,null,null,null)),t.zb(1,737280,null,0,d.g,[t.n],{chart:[0,"chart"]},null)],(function(l,n){l(n,1,0,n.component.lineChartPrice)}),null)}function v(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"div",[],null,null,null,null,null)),t.zb(1,737280,null,0,d.g,[t.n],{chart:[0,"chart"]},null)],(function(l,n){l(n,1,0,n.component.lineChartFundamentals)}),null)}function K(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"div",[],null,null,null,null,null)),t.zb(1,737280,null,0,d.g,[t.n],{chart:[0,"chart"]},null)],(function(l,n){l(n,1,0,n.component.lineChartPriceDecompose)}),null)}function P(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"div",[],null,null,null,null,null)),t.zb(1,737280,null,0,d.g,[t.n],{chart:[0,"chart"]},null)],(function(l,n){l(n,1,0,n.component.lineChartPriceDecomposeMacro)}),null)}function L(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"div",[],null,null,null,null,null)),t.zb(1,737280,null,0,d.g,[t.n],{chart:[0,"chart"]},null)],(function(l,n){l(n,1,0,n.component.lineChartPriceFuture)}),null)}function F(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,9,"tr",[],null,null,null,null,null)),(l()(),t.Ab(1,0,null,null,2,"th",[["scope","row"]],null,null,null,null,null)),(l()(),t.Ab(2,0,null,null,1,"a",[["class","card-link primary"]],null,null,null,null,null)),(l()(),t.Sb(3,null,["",""])),(l()(),t.Ab(4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Sb(5,null,["",""])),(l()(),t.Ab(6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Sb(7,null,["",""])),(l()(),t.Ab(8,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Sb(9,null,["",""]))],null,(function(l,n){l(n,3,0,n.context.$implicit.time_point),l(n,5,0,n.context.$implicit.value_mean),l(n,7,0,n.context.$implicit.value_lower),l(n,9,0,n.context.$implicit.value_upper)}))}function S(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,13,"table",[["class","table table-sm"]],null,null,null,null,null)),(l()(),t.Ab(1,0,null,null,9,"thead",[],null,null,null,null,null)),(l()(),t.Ab(2,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),t.Ab(3,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Horizon"])),(l()(),t.Ab(5,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Mean"])),(l()(),t.Ab(7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Lower"])),(l()(),t.Ab(9,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Upper"])),(l()(),t.Ab(11,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.pb(16777216,null,null,1,null,F)),t.zb(13,278528,null,0,p.k,[t.X,t.U,t.w],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,13,0,n.component.returnsTableData)}),null)}function C(l){return t.Ub(0,[t.Mb(0,p.d,[t.y]),(l()(),t.Ab(1,0,null,null,4,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.Ab(2,0,null,null,3,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),t.Ab(3,0,null,null,1,"div",[["class","content-header"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Index Decomposer Into Drivers"])),(l()(),t.Ab(5,0,null,null,0,"p",[["class","content-sub-header"]],null,null,null,null,null)),(l()(),t.Ab(6,0,null,null,131,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.Ab(7,0,null,null,130,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),t.Ab(8,0,null,null,129,"section",[["id","hoverable-rows"]],null,null,null,null,null)),(l()(),t.Ab(9,0,null,null,128,"div",[["class","row text-left"]],null,null,null,null,null)),(l()(),t.Ab(10,0,null,null,127,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),t.Ab(11,0,null,null,126,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.Ab(12,0,null,null,86,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t.Ab(13,0,null,null,85,"div",[["class","row justify-content-between"]],null,null,null,null,null)),(l()(),t.Ab(14,0,null,null,16,"div",[["class","col-2"]],null,null,null,null,null)),(l()(),t.Ab(15,0,null,null,15,"div",[["ngbDropdown",""]],[[2,"show",null]],null,null,null,null)),t.zb(16,737280,null,3,h.t,[t.h,h.v,p.c,t.E,t.n,t.L],null,null),t.Qb(335544320,1,{_menu:0}),t.Qb(335544320,2,{_menuElement:0}),t.Qb(335544320,3,{_anchor:0}),(l()(),t.Ab(20,0,null,null,1,"h4",[["class","primary type-info"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Assets "])),(l()(),t.Ab(22,0,null,null,3,"button",[["aria-haspopup","true"],["class","btn btn-outline-primary mr-1 dropdown-toggle"],["id","dropdownAsset"],["ngbDropdownToggle",""]],[[1,"aria-expanded",0]],[[null,"click"],[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t.Kb(l,23).dropdown.toggle()&&u),"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,23).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,23).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,23).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,23).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(23,16384,null,0,h.y,[h.t,t.n],null,null),t.Pb(2048,[[3,4]],h.u,null,[h.y]),(l()(),t.Sb(25,null,["",""])),(l()(),t.Ab(26,0,[[2,0]],null,4,"div",[["aria-labelledby","dropdownCountry"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],[[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"],[null,"keydown.Enter"],[null,"keydown.Space"]],(function(l,n,e){var u=!0;return"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,27).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,27).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,27).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,27).dropdown.onKeyDown(e)&&u),"keydown.Enter"===n&&(u=!1!==t.Kb(l,27).dropdown.onKeyDown(e)&&u),"keydown.Space"===n&&(u=!1!==t.Kb(l,27).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(27,16384,[[1,4]],1,h.w,[h.t],null,null),t.Qb(603979776,4,{menuItems:1}),(l()(),t.pb(16777216,null,null,1,null,_)),t.zb(30,278528,null,0,p.k,[t.X,t.U,t.w],{ngForOf:[0,"ngForOf"]},null),(l()(),t.Ab(31,0,null,null,16,"div",[["class","col-3"]],null,null,null,null,null)),(l()(),t.Ab(32,0,null,null,15,"div",[["ngbDropdown",""]],[[2,"show",null]],null,null,null,null)),t.zb(33,737280,null,3,h.t,[t.h,h.v,p.c,t.E,t.n,t.L],null,null),t.Qb(335544320,5,{_menu:0}),t.Qb(335544320,6,{_menuElement:0}),t.Qb(335544320,7,{_anchor:0}),(l()(),t.Ab(37,0,null,null,1,"h4",[["class","primary type-info"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Country "])),(l()(),t.Ab(39,0,null,null,3,"button",[["aria-haspopup","true"],["class","btn btn-outline-primary mr-1 dropdown-toggle"],["id","dropdownCountry"],["ngbDropdownToggle",""]],[[1,"aria-expanded",0]],[[null,"click"],[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t.Kb(l,40).dropdown.toggle()&&u),"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,40).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,40).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,40).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,40).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(40,16384,null,0,h.y,[h.t,t.n],null,null),t.Pb(2048,[[7,4]],h.u,null,[h.y]),(l()(),t.Sb(42,null,["",""])),(l()(),t.Ab(43,0,[[6,0]],null,4,"div",[["aria-labelledby","dropdownCountry"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],[[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"],[null,"keydown.Enter"],[null,"keydown.Space"]],(function(l,n,e){var u=!0;return"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,44).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,44).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,44).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,44).dropdown.onKeyDown(e)&&u),"keydown.Enter"===n&&(u=!1!==t.Kb(l,44).dropdown.onKeyDown(e)&&u),"keydown.Space"===n&&(u=!1!==t.Kb(l,44).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(44,16384,[[5,4]],1,h.w,[h.t],null,null),t.Qb(603979776,8,{menuItems:1}),(l()(),t.pb(16777216,null,null,1,null,f)),t.zb(47,278528,null,0,p.k,[t.X,t.U,t.w],{ngForOf:[0,"ngForOf"]},null),(l()(),t.Ab(48,0,null,null,16,"div",[["class","col-3"]],null,null,null,null,null)),(l()(),t.Ab(49,0,null,null,15,"div",[["ngbDropdown",""]],[[2,"show",null]],null,null,null,null)),t.zb(50,737280,null,3,h.t,[t.h,h.v,p.c,t.E,t.n,t.L],null,null),t.Qb(335544320,9,{_menu:0}),t.Qb(335544320,10,{_menuElement:0}),t.Qb(335544320,11,{_anchor:0}),(l()(),t.Ab(54,0,null,null,1,"h4",[["class","success type-info"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Coverage"])),(l()(),t.Ab(56,0,null,null,3,"button",[["aria-haspopup","true"],["class","btn btn-outline-success mr-1 dropdown-toggle"],["id","dropdownCoverage"],["ngbDropdownToggle",""]],[[1,"aria-expanded",0]],[[null,"click"],[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t.Kb(l,57).dropdown.toggle()&&u),"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,57).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,57).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,57).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,57).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(57,16384,null,0,h.y,[h.t,t.n],null,null),t.Pb(2048,[[11,4]],h.u,null,[h.y]),(l()(),t.Sb(59,null,["",""])),(l()(),t.Ab(60,0,[[10,0]],null,4,"div",[["aria-labelledby","dropdownScenario"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],[[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"],[null,"keydown.Enter"],[null,"keydown.Space"]],(function(l,n,e){var u=!0;return"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,61).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,61).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,61).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,61).dropdown.onKeyDown(e)&&u),"keydown.Enter"===n&&(u=!1!==t.Kb(l,61).dropdown.onKeyDown(e)&&u),"keydown.Space"===n&&(u=!1!==t.Kb(l,61).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(61,16384,[[9,4]],1,h.w,[h.t],null,null),t.Qb(603979776,12,{menuItems:1}),(l()(),t.pb(16777216,null,null,1,null,g)),t.zb(64,278528,null,0,p.k,[t.X,t.U,t.w],{ngForOf:[0,"ngForOf"]},null),(l()(),t.Ab(65,0,null,null,16,"div",[["class","col-2"]],null,null,null,null,null)),(l()(),t.Ab(66,0,null,null,15,"div",[["ngbDropdown",""]],[[2,"show",null]],null,null,null,null)),t.zb(67,737280,null,3,h.t,[t.h,h.v,p.c,t.E,t.n,t.L],null,null),t.Qb(335544320,13,{_menu:0}),t.Qb(335544320,14,{_menuElement:0}),t.Qb(335544320,15,{_anchor:0}),(l()(),t.Ab(71,0,null,null,1,"h4",[["class","danger type-info"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Scenario "])),(l()(),t.Ab(73,0,null,null,3,"button",[["aria-haspopup","true"],["class","btn btn-outline-danger mr-1 dropdown-toggle"],["id","dropdownSector"],["ngbDropdownToggle",""]],[[1,"aria-expanded",0]],[[null,"click"],[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t.Kb(l,74).dropdown.toggle()&&u),"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,74).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,74).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,74).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,74).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(74,16384,null,0,h.y,[h.t,t.n],null,null),t.Pb(2048,[[15,4]],h.u,null,[h.y]),(l()(),t.Sb(76,null,["",""])),(l()(),t.Ab(77,0,[[14,0]],null,4,"div",[["aria-labelledby","dropdownScenario"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],[[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"],[null,"keydown.Enter"],[null,"keydown.Space"]],(function(l,n,e){var u=!0;return"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,78).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,78).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,78).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,78).dropdown.onKeyDown(e)&&u),"keydown.Enter"===n&&(u=!1!==t.Kb(l,78).dropdown.onKeyDown(e)&&u),"keydown.Space"===n&&(u=!1!==t.Kb(l,78).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(78,16384,[[13,4]],1,h.w,[h.t],null,null),t.Qb(603979776,16,{menuItems:1}),(l()(),t.pb(16777216,null,null,1,null,D)),t.zb(81,278528,null,0,p.k,[t.X,t.U,t.w],{ngForOf:[0,"ngForOf"]},null),(l()(),t.Ab(82,0,null,null,16,"div",[["class","col-2"]],null,null,null,null,null)),(l()(),t.Ab(83,0,null,null,15,"div",[["ngbDropdown",""]],[[2,"show",null]],null,null,null,null)),t.zb(84,737280,null,3,h.t,[t.h,h.v,p.c,t.E,t.n,t.L],null,null),t.Qb(335544320,17,{_menu:0}),t.Qb(335544320,18,{_menuElement:0}),t.Qb(335544320,19,{_anchor:0}),(l()(),t.Ab(88,0,null,null,1,"h4",[["class","danger type-info"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,["Fundamental "])),(l()(),t.Ab(90,0,null,null,3,"button",[["aria-haspopup","true"],["class","btn btn-outline-danger mr-1 dropdown-toggle"],["id","dropdownSector"],["ngbDropdownToggle",""]],[[1,"aria-expanded",0]],[[null,"click"],[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t.Kb(l,91).dropdown.toggle()&&u),"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,91).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,91).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,91).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,91).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(91,16384,null,0,h.y,[h.t,t.n],null,null),t.Pb(2048,[[19,4]],h.u,null,[h.y]),(l()(),t.Sb(93,null,["",""])),(l()(),t.Ab(94,0,[[18,0]],null,4,"div",[["aria-labelledby","dropdownFundamental"],["ngbDropdownMenu",""]],[[2,"dropdown-menu",null],[2,"show",null],[1,"x-placement",0]],[[null,"keydown.ArrowUp"],[null,"keydown.ArrowDown"],[null,"keydown.Home"],[null,"keydown.End"],[null,"keydown.Enter"],[null,"keydown.Space"]],(function(l,n,e){var u=!0;return"keydown.ArrowUp"===n&&(u=!1!==t.Kb(l,95).dropdown.onKeyDown(e)&&u),"keydown.ArrowDown"===n&&(u=!1!==t.Kb(l,95).dropdown.onKeyDown(e)&&u),"keydown.Home"===n&&(u=!1!==t.Kb(l,95).dropdown.onKeyDown(e)&&u),"keydown.End"===n&&(u=!1!==t.Kb(l,95).dropdown.onKeyDown(e)&&u),"keydown.Enter"===n&&(u=!1!==t.Kb(l,95).dropdown.onKeyDown(e)&&u),"keydown.Space"===n&&(u=!1!==t.Kb(l,95).dropdown.onKeyDown(e)&&u),u}),null,null)),t.zb(95,16384,[[17,4]],1,h.w,[h.t],null,null),t.Qb(603979776,20,{menuItems:1}),(l()(),t.pb(16777216,null,null,1,null,A)),t.zb(98,278528,null,0,p.k,[t.X,t.U,t.w],{ngForOf:[0,"ngForOf"]},null),(l()(),t.Ab(99,0,null,null,38,"div",[["class","card-content"]],null,null,null,null,null)),(l()(),t.Ab(100,0,null,null,12,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,[" Data refreshed at "])),(l()(),t.Ab(102,0,null,null,2,"span",[["class","primary text-bold-500"]],null,null,null,null,null)),(l()(),t.Sb(103,null,["",""])),t.Ob(104,2),(l()(),t.Sb(-1,null,[" model version "])),(l()(),t.Ab(106,0,null,null,1,"span",[["class","primary text-bold-500"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,["0.00"])),(l()(),t.Sb(-1,null,[" next refresh due at "])),(l()(),t.Ab(109,0,null,null,2,"span",[["class","primary text-bold-500"]],null,null,null,null,null)),(l()(),t.Sb(110,null,["",""])),t.Ob(111,2),(l()(),t.Sb(-1,null,[". "])),(l()(),t.Ab(113,0,null,null,24,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.Ab(114,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.Ab(115,0,null,null,2,"div",[["class","col-6"]],null,null,null,null,null)),(l()(),t.pb(16777216,null,null,1,null,k)),t.zb(117,16384,null,0,p.l,[t.X,t.U],{ngIf:[0,"ngIf"]},null),(l()(),t.Ab(118,0,null,null,2,"div",[["class","col-6"]],null,null,null,null,null)),(l()(),t.pb(16777216,null,null,1,null,v)),t.zb(120,16384,null,0,p.l,[t.X,t.U],{ngIf:[0,"ngIf"]},null),(l()(),t.Ab(121,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.Ab(122,0,null,null,2,"div",[["class","col-6"]],null,null,null,null,null)),(l()(),t.pb(16777216,null,null,1,null,K)),t.zb(124,16384,null,0,p.l,[t.X,t.U],{ngIf:[0,"ngIf"]},null),(l()(),t.Ab(125,0,null,null,2,"div",[["class","col-6"]],null,null,null,null,null)),(l()(),t.pb(16777216,null,null,1,null,P)),t.zb(127,16384,null,0,p.l,[t.X,t.U],{ngIf:[0,"ngIf"]},null),(l()(),t.Ab(128,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.Ab(129,0,null,null,2,"div",[["class","col-6"]],null,null,null,null,null)),(l()(),t.pb(16777216,null,null,1,null,L)),t.zb(131,16384,null,0,p.l,[t.X,t.U],{ngIf:[0,"ngIf"]},null),(l()(),t.Ab(132,0,null,null,5,"div",[["class","col-6"]],null,null,null,null,null)),(l()(),t.Ab(133,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t.Sb(-1,null,[" Returns expectations "])),(l()(),t.Ab(135,0,null,null,2,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.pb(16777216,null,null,1,null,S)),t.zb(137,16384,null,0,p.l,[t.X,t.U],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,16,0),l(n,30,0,e.assetClassList),l(n,33,0),l(n,47,0,e.countryList),l(n,50,0),l(n,64,0,e.sectorList),l(n,67,0),l(n,81,0,e.scenarionList),l(n,84,0),l(n,98,0,e.fundamentalList),l(n,117,0,e.lineChartPriceFlag),l(n,120,0,e.lineChartFundamentalsFlag),l(n,124,0,e.lineChartPriceDecomposeFlag),l(n,127,0,e.lineChartPriceDecomposeMacroFlag),l(n,131,0,e.lineChartPriceFutureFlag),l(n,137,0,e.returnsTableFlag)}),(function(l,n){var e=n.component;l(n,15,0,t.Kb(n,16).isOpen()),l(n,22,0,t.Kb(n,23).dropdown.isOpen()),l(n,25,0,e.assetClassSelected),l(n,26,0,!0,t.Kb(n,27).dropdown.isOpen(),t.Kb(n,27).placement),l(n,32,0,t.Kb(n,33).isOpen()),l(n,39,0,t.Kb(n,40).dropdown.isOpen()),l(n,42,0,e.countrySelected),l(n,43,0,!0,t.Kb(n,44).dropdown.isOpen(),t.Kb(n,44).placement),l(n,49,0,t.Kb(n,50).isOpen()),l(n,56,0,t.Kb(n,57).dropdown.isOpen()),l(n,59,0,e.selectedSector),l(n,60,0,!0,t.Kb(n,61).dropdown.isOpen(),t.Kb(n,61).placement),l(n,66,0,t.Kb(n,67).isOpen()),l(n,73,0,t.Kb(n,74).dropdown.isOpen()),l(n,76,0,e.selectedScenario),l(n,77,0,!0,t.Kb(n,78).dropdown.isOpen(),t.Kb(n,78).placement),l(n,83,0,t.Kb(n,84).isOpen()),l(n,90,0,t.Kb(n,91).dropdown.isOpen()),l(n,93,0,e.selectedFundamental),l(n,94,0,!0,t.Kb(n,95).dropdown.isOpen(),t.Kb(n,95).placement);var u=t.Tb(n,103,0,l(n,104,0,t.Kb(n,0),e.refreshDate,"yyyy-MM-dd HH:mm"));l(n,103,0,u);var s=t.Tb(n,110,0,l(n,111,0,t.Kb(n,0),e.refreshDate_next,"yyyy-MM-dd HH:mm"));l(n,110,0,s)}))}function R(l){return t.Ub(0,[(l()(),t.Ab(0,0,null,null,1,"app-spectrum",[],null,null,null,C,y)),t.zb(1,114688,null,0,b,[h.B,w.c,m.a],null,null)],(function(l,n){l(n,1,0)}),null)}var E=t.wb("app-spectrum",b,R,{},{},[]),O=e("9AJC"),x=e("gIcY"),M=e("ZYCi"),I={title:"Spectrum Page"},U=function(){return function(){}}(),N=e("j8Ch"),z=e("/fSM");e.d(n,"SpectrumModuleNgFactory",(function(){return H}));var H=t.xb(i,[],(function(l){return t.Hb([t.Ib(512,t.k,t.kb,[[8,[c.a,E,O.a,O.b,O.f,O.g,O.c,O.d,O.e]],[3,t.k],t.C]),t.Ib(4608,p.n,p.m,[t.y,[2,p.H]]),t.Ib(4608,x.y,x.y,[]),t.Ib(4608,h.B,h.B,[t.k,t.u,h.lb,h.C]),t.Ib(1073742336,p.b,p.b,[]),t.Ib(1073742336,M.p,M.p,[[2,M.u],[2,M.l]]),t.Ib(1073742336,U,U,[]),t.Ib(1073742336,x.x,x.x,[]),t.Ib(1073742336,x.j,x.j,[]),t.Ib(1073742336,N.a,N.a,[]),t.Ib(1073742336,z.a,z.a,[]),t.Ib(1073742336,h.c,h.c,[]),t.Ib(1073742336,h.f,h.f,[]),t.Ib(1073742336,h.g,h.g,[]),t.Ib(1073742336,h.k,h.k,[]),t.Ib(1073742336,h.m,h.m,[]),t.Ib(1073742336,h.s,h.s,[]),t.Ib(1073742336,h.x,h.x,[]),t.Ib(1073742336,h.D,h.D,[]),t.Ib(1073742336,h.H,h.H,[]),t.Ib(1073742336,h.K,h.K,[]),t.Ib(1073742336,h.N,h.N,[]),t.Ib(1073742336,h.Q,h.Q,[]),t.Ib(1073742336,h.T,h.T,[]),t.Ib(1073742336,h.X,h.X,[]),t.Ib(1073742336,h.Y,h.Y,[]),t.Ib(1073742336,h.Z,h.Z,[]),t.Ib(1073742336,h.E,h.E,[]),t.Ib(1024,d.c,a,[]),t.Ib(512,d.f,d.f,[d.c]),t.Ib(1073742336,d.b,d.b,[d.f]),t.Ib(1073742336,i,i,[]),t.Ib(1024,M.j,(function(){return[[{path:"",component:b,data:I}]]}),[])])}))}}]);