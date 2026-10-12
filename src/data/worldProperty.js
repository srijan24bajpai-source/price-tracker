// Price to buy an APARTMENT in the CITY CENTRE, USD per square metre.
// Source: Numbeo "Price per Square Meter to Buy Apartment in City Centre", fetched 2026-10-12 (crowd-sourced, first 200 cities on the page).
// This is a built-up apartment price, not land-only, and Numbeo data is user-contributed: treat it as indicative.
const RAW = `
Leuven|Belgium|5469
Saint Petersburg|Russia|4364
Algiers|Algeria|2504
Eugene, OR|United States|3280
Banja Luka|Bosnia and Herzegovina|2875
Guadalajara|Mexico|3057
Mexico City|Mexico|3587
Monterrey|Mexico|4095
Sarajevo|Bosnia and Herzegovina|3301
Salem, OR|United States|3030
Tuzla|Bosnia and Herzegovina|2453
Dushanbe|Tajikistan|1286
Puebla|Mexico|1619
Puerto Vallarta|Mexico|5159
Burgas|Bulgaria|2518
Belgrade|Serbia|5378
Plovdiv|Bulgaria|2261
Osaka|Japan|6103
Sofia|Bulgaria|4411
Stara Zagora|Bulgaria|1458
Varna|Bulgaria|3030
Novi Sad|Serbia|3514
Podgorica|Montenegro|3042
Tokyo|Japan|9262
Qingdao|China|3577
Rijeka|Croatia|4133
New Taipei City|Taiwan|12462
Almaty|Kazakhstan|2491
Astana|Kazakhstan|1536
Bratislava|Slovakia|6323
Zagreb|Croatia|5085
Larnaca|Cyprus|3725
Limassol|Cyprus|5542
Abu Dhabi|United Arab Emirates|4965
Nicosia|Cyprus|3093
Dubai|United Arab Emirates|7183
Ras al-Khaimah|United Arab Emirates|4909
Brno|Czech Republic|6388
Panama City|Panama|3085
Ostrava|Czech Republic|3190
Plzen|Czech Republic|5054
Prague|Czech Republic|9252
Gaborone|Botswana|2019
Kuala Lumpur|Malaysia|4060
Aalborg|Denmark|5308
Aarhus|Denmark|7614
Copenhagen|Denmark|11935
Ljubljana|Slovenia|6486
Maribor|Slovenia|3176
Odense|Denmark|4413
Pisa|Italy|3461
Alicante|Spain|4200
Barcelona|Spain|7339
Bilbao|Spain|5766
Lima|Peru|2418
Tashkent|Uzbekistan|1616
Las Palmas de Gran Canaria|Spain|3161
Ulaanbaatar|Mongolia|1931
Madrid|Spain|9073
Tallinn|Estonia|4701
Tartu|Estonia|3496
Oviedo|Spain|2920
Palma de Mallorca|Spain|6871
La Paz|Bolivia|1216
Seville|Spain|4488
Tarragona|Spain|2702
Santa Cruz|Bolivia|1324
Valencia|Spain|5527
Navi Mumbai|India|1579
Valladolid|Spain|3449
Vigo|Spain|3020
San Juan|Puerto Rico|7408
Lund|Sweden|6164
Belo Horizonte|Brazil|2338
Campinas|Brazil|2137
Basel|Switzerland|18063
Bern|Switzerland|18632
Geneva|Switzerland|21976
Budva|Montenegro|4096
Agadir|Morocco|1531
Stockholm|Sweden|11282
Buenos Aires|Argentina|2665
San Jose|Costa Rica|2281
Lausanne|Switzerland|18227
Casablanca|Morocco|2210
Lucerne|Switzerland|21315
Curitiba|Brazil|2499
Lugano|Switzerland|15549
Chania|Greece|3611
Lodz|Poland|3140
Montreal|Canada|5057
Hefei|China|3586
Sao Paulo|Brazil|2750
Fortaleza|Brazil|2699
Gothenburg|Sweden|6191
Marrakech|Morocco|1881
Dnipro|Ukraine|1195
Nice|France|7307
Rabat|Morocco|1963
Zug|Switzerland|30879
Zurich|Switzerland|27461
Tangier|Morocco|1731
Stavanger|Norway|6070
Ankara|Turkey|1692
Antalya|Turkey|2010
Pristina|Kosovo|2576
Medellin|Colombia|3977
Constanta|Romania|2485
Bursa|Turkey|1201
Pattaya|Thailand|2523
Jerusalem|Israel|19977
Knoxville, TN|United States|4744
Malaga|Spain|4980
Istanbul|Turkey|3120
Porto Alegre|Brazil|1702
Izmir|Turkey|1474
Espoo|Finland|6926
Helsinki|Finland|9619
Asuncion|Paraguay|1747
Recife|Brazil|1996
Mersin|Turkey|1232
Rio de Janeiro|Brazil|4016
Hangzhou|China|7937
Kochi|India|957
Sharjah|United Arab Emirates|8169
Santos|Brazil|2453
Oulu|Finland|3961
Treviso|Italy|4359
Kathmandu|Nepal|2276
Tampere|Finland|4772
Turku|Finland|4219
Bordeaux|France|6965
Kharkiv|Ukraine|1062
Heraklion|Greece|4001
Burlington|Canada|5112
Burnaby|Canada|6665
Kyiv|Ukraine|2681
Calgary|Canada|3483
Grenoble|France|3865
Brasilia|Brazil|2530
Edmonton|Canada|2187
Lille|France|4413
Lyon|France|6365
Hamilton|Canada|2700
Sousse|Tunisia|993
Marseille|France|5028
Kelowna|Canada|3868
Halifax|Canada|3191
Montpellier|France|4975
Kitchener|Canada|3864
Odesa|Ukraine|1597
London, ON|Canada|3432
Paris|France|14380
Mississauga|Canada|7229
Moncton|Canada|2180
Thessaloniki|Greece|3722
Strasbourg|France|5344
Ottawa|Canada|4308
Denton, TX|United States|2691
Regina|Canada|2103
Kosice|Slovakia|3958
Toulouse|France|6396
Albuquerque, NM|United States|2495
Split|Croatia|7202
Aachen|Germany|4483
Saskatoon|Canada|2810
Anchorage, AK|United States|4021
Arlington, VA|United States|6257
Berlin|Germany|8649
Atlanta, GA|United States|3894
Aberdeen|United Kingdom|2275
Austin, TX|United States|7488
Toronto|Canada|7980
Bonn|Germany|6265
Auckland|New Zealand|7351
Vancouver|Canada|8183
Baltimore, MD|United States|2499
Victoria|Canada|5257
Christchurch|New Zealand|5064
Bremen|Germany|5081
Windsor|Canada|2972
Birmingham, AL|United States|2976
Belfast|United Kingdom|4131
Winnipeg|Canada|2324
Boise, ID|United States|7300
Boston, MA|United States|13385
Birmingham|United Kingdom|5384
Cologne|Germany|7676
Buffalo, NY|United States|3065
Darmstadt|Germany|6091
Charlotte, NC|United States|4270
Dortmund|Germany|3022
Dresden|Germany|4908
Chicago, IL|United States|4094
Bristol|United Kingdom|6820
Cincinnati, OH|United States|3448
Erlangen|Germany|6174
Cleveland, OH|United States|1664
Essen|Germany|4724
Colorado Springs, CO|United States|2557
`
export const worldProperty = RAW.trim().split('\n').map((l) => {
  const [city, country, usd] = l.split('|')
  return { city, country, usdPerSqm: Number(usd) }
})
export const WORLD_SOURCE = 'Numbeo, 2026-10-12'
