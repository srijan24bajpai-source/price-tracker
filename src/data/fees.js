// School, preschool (Kidzee) and university fees. Compiled 2026-10-12 from public aggregator pages and guides.
// These are NOT official fee notices: schools and universities revise fees every year and add admission,
// transport, uniform and boarding charges. Always get the current fee notice from the institution.
// row: [group, name, place, level, amount, amountMax|null, currency, period, note, url, confidence]
export const FEE_GROUPS = [
  { id: 'lko-school', label: '🏫 Lucknow top schools' },
  { id: 'lko-all', label: '📚 All Lucknow schools' },
  { id: 'kidzee-lko', label: '🧒 Kidzee Lucknow centres' },
  { id: 'preschool', label: '🧒 Kidzee & preschools' },
  { id: 'lko-uni', label: '🎓 Lucknow universities' },
  { id: 'world-uni', label: '🌍 Universities worldwide' },
  { id: 'world-school', label: '🌍 Schools worldwide' },
]

const SH = 'https://www.scholars-home.com/school-fees-in-lucknow'
const EZ = 'https://ezyschooling.com/school/'
const TUT = 'https://www.tutopiya.com/tools/tuition-cost-of-living-calculator/'

const R = [
  // ---- Lucknow schools (INR per year, 2026-27 unless noted) ----
  ['lko-school', "Scholars' Home, Gomti Nagar", 'Lucknow', 'ICSE/ISC, Class XI–XII', 121900, null, 'INR', 'per year', 'One-time admission fee ₹9,400, no deposit. The source site is run by this school', SH, 'med'],
  ["lko-school", "St. Francis' College, Hazratganj", 'Lucknow', 'ICSE/ISC boys, Class XI–XII', 82290, 97774, 'INR', 'per year', 'Admission fee not published', SH, 'med'],
  ['lko-school', 'La Martiniere College (day)', 'Lucknow', 'ICSE/ISC boys, Class XI–XII', 115280, null, 'INR', 'per year', 'Approximate. Boarding is extra: about ₹2,20,050 a year, so a resident pays about ₹3.27 lakh. Other sites quote ₹1.2–2.03 lakh for the whole school', 'https://www.uniapply.com/school/la-martiniere-college-lucknow/fee-structure/', 'med'],
  ['lko-school', "La Martiniere Girls' College", 'Lucknow', 'ICSE/ISC girls, Class XI–XII', 123400, 125600, 'INR', 'per year', 'Approximate; admission fee not published', SH, 'med'],
  ['lko-school', 'DPS Gomti Nagar Extension', 'Lucknow', 'CBSE, Class XI–XII', 127540, null, 'INR', 'per year', 'Admission fee ₹35,000. 2027-28 sheet: pre-primary ₹1,05,400, Classes I–V ₹1,14,040, VI–X ₹1,22,000, XII Science ₹1,39,300', SH, 'med'],
  ['lko-school', 'City Montessori School (CMS)', 'Lucknow', 'ICSE/ISC, Class XI–XII', 151820, null, 'INR', 'per year', 'Plus admission ₹17,000 and refundable deposit ₹5,000. An older blog says ₹80,000–1,20,000', SH, 'med'],
  ['lko-school', 'Seth M.R. Jaipuria School, Gomti Nagar', 'Lucknow', 'ICSE/ISC, Class XI–XII', 190400, null, 'INR', 'per year', 'Admission fee not published', SH, 'med'],
  ['lko-school', 'GD Goenka Public School', 'Lucknow', 'CBSE, Class XI–XII', 198000, null, 'INR', 'per year', 'Includes meals; non-refundable deposit ₹40,000', SH, 'med'],
  ['lko-school', 'Study Hall, Gomti Nagar', 'Lucknow', 'CBSE, Class XI–XII Science', 200400, null, 'INR', 'per year', 'Admission ₹50,000 plus refundable security ₹7,500', SH, 'med'],
  ['lko-school', 'Colvin Taluqdars’ College', 'Lucknow', 'ICSE/ISC', null, null, 'INR', 'per year', 'Fee not published, contact the school', SH, 'low'],
  ['lko-school', 'Vibgyor High', 'Lucknow', 'CBSE', 90000, 130000, 'INR', 'per year', 'From an older 2025-26 blog', 'https://www.tutorwala.in/tutorwala-blog-details/top-schools-in-lucknow-2025-2026-admission-fees-structure/', 'low'],
  ['lko-school', 'Army Public School', 'Lucknow', 'CBSE', 60000, 100000, 'INR', 'per year', 'From an older 2025-26 blog', 'https://www.tutorwala.in/tutorwala-blog-details/top-schools-in-lucknow-2025-2026-admission-fees-structure/', 'low'],
  ['lko-school', 'Delhi Public School (DPS) Lucknow', 'Lucknow', 'CBSE', 70000, 110000, 'INR', 'per year', 'From an older 2025-26 blog; compare with the DPS Gomti Nagar Extension row above', 'https://www.tutorwala.in/tutorwala-blog-details/top-schools-in-lucknow-2025-2026-admission-fees-structure/', 'low'],

  // ---- Kidzee and preschools ----
  ['preschool', 'Kidzee, Lucknow branches', 'Lucknow', 'Playgroup to UKG', null, null, 'INR', 'per year', 'No Lucknow Kidzee fee data found. Fees differ branch by branch: call your nearest branch. The Noida rows below are only a reference', 'https://www.kidzee.com', 'low'],
  ['preschool', 'Kidzee, Sector 62 Noida', 'Noida (reference, not Lucknow)', 'Toddler', 60000, null, 'INR', 'per year', 'Total fee. Session shown on the page: 2027-28', EZ + 'kidzee-sector-62-noida/fees-structure', 'low'],
  ['preschool', 'Kidzee, Sector 62 Noida', 'Noida (reference, not Lucknow)', 'Pre Nursery', 62000, null, 'INR', 'per year', 'Total fee', EZ + 'kidzee-sector-62-noida/fees-structure', 'low'],
  ['preschool', 'Kidzee, Sector 62 Noida', 'Noida (reference, not Lucknow)', 'Nursery', 64000, null, 'INR', 'per year', 'Total fee', EZ + 'kidzee-sector-62-noida/fees-structure', 'low'],
  ['preschool', 'Kidzee, Sector 62 Noida', 'Noida (reference, not Lucknow)', 'LKG and UKG', 68000, null, 'INR', 'per year', 'Total fee', EZ + 'kidzee-sector-62-noida/fees-structure', 'low'],
  ['preschool', 'Kidzee, Gaur City 1', 'Greater Noida (reference)', 'Toddler to UKG', 89004, 95004, 'INR', 'per year', 'Session 2026-27, includes several fee types', EZ + 'kidzee-gaur-city-1-greater-noida/fees-structure', 'low'],
  ['preschool', 'Kidzee, Sector 27 Noida', 'Noida (reference)', 'Toddler to UKG', 57996, 63996, 'INR', 'per year', 'Session shown: 2027-28', EZ + 'kidzee-sector-27-noida/fees-structure', 'low'],

  // ---- Lucknow universities ----
  ['lko-uni', 'IIM Lucknow', 'Lucknow', 'PGP (MBA), total programme', 2075000, null, 'INR', 'total', 'Total academic fee for 2026; another aggregator lists ₹9.05–20.75 lakh across specialisations', 'https://collegehai.com/colleges/iim-lucknow/fees', 'med'],
  ['lko-uni', 'IIM Lucknow', 'Lucknow', 'PGPWE (working executives)', 1115000, null, 'INR', 'total', 'Excluding GST', 'https://collegedunia.com/university/25946-iiml-indian-institute-of-management-lucknow/courses-fees', 'med'],
  ['lko-uni', 'KGMU (King George’s Medical University)', 'Lucknow', 'MBBS (government quota)', 54900, null, 'INR', 'per year', 'One source says ₹54,900 a year; others quote ₹1.46–2.53 lakh for the whole course. Check the KGMU fee notice', 'https://www.selectyouruniversity.com/blog/how-to-get-admission-in-kgmu-lucknow-for-mbbs', 'low'],
  ['lko-uni', 'Lucknow University, Amity Lucknow, Integral, BBD, Babasaheb Bhimrao Ambedkar University', 'Lucknow', 'BA / BCom / BTech', null, null, 'INR', 'per year', 'Not found in this research. Add them with the Add a Price form or send me the fee notices', 'https://www.lkouniv.ac.in', 'low'],

  // ---- Universities worldwide (international students, tuition only, per year) ----
  ['world-uni', 'Harvard University', 'USA', 'Undergraduate', 59320, null, 'USD', 'per year', 'Tuition is waived for families earning under $200,000. Graduate $57,328–$84,760', 'https://www.vedantu.com/study-abroad/harvard-university-fees', 'med'],
  ['world-uni', 'MIT', 'USA', 'Undergraduate', 61990, 64310, 'USD', 'per year', 'Third-party guide', 'https://gradright.com/top-universities-in-the-world-rankings-tuition-fees-eligibility-more/', 'low'],
  ['world-uni', 'Stanford University', 'USA', 'Undergraduate', 62500, 67000, 'USD', 'per year', 'MBA about $64,100', 'https://gradright.com/top-universities-in-the-world-rankings-tuition-fees-eligibility-more/', 'low'],
  ['world-uni', 'University of Oxford', 'UK', 'Postgraduate (international)', 24000, 55000, 'GBP', 'per year', 'Varies by course; undergraduate not found', 'https://gradright.com/top-universities-in-the-world-rankings-tuition-fees-eligibility-more/', 'low'],
  ['world-uni', 'University of Cambridge', 'UK', 'Undergraduate STEM', 44214, null, 'GBP', 'per year', 'Humanities and social sciences about £29,052. Graduate £24,500–£64,000', 'https://gradright.com/top-universities-in-the-world-rankings-tuition-fees-eligibility-more/', 'low'],
  ['world-uni', 'Canadian universities (average)', 'Canada', 'International undergraduate', 41746, null, 'CAD', 'per year', 'Statistics Canada 2025/26; Ontario about CAD 49,802, Newfoundland about CAD 18,867', 'https://www.gofarglobal.com/study-canada/tuition-fees-canadian-universities-international-2026', 'med'],
  ['world-uni', 'Australian universities', 'Australia', 'International bachelor’s', 25000, 45000, 'AUD', 'per year', 'Another guide gives an average of AUD 37,500', 'https://gostudyin.com/india/study-in-australia/study-guides/cost-of-studying-abroad/', 'low'],
  ['world-uni', 'German public universities', 'Germany', 'Bachelor’s', 0, null, 'EUR', 'per year', 'No tuition, but many courses are in German, and you must show about €11,208 a year for living costs', TUT, 'med'],
  ['world-uni', 'Singapore universities', 'Singapore', 'International undergraduate', 17247, null, 'USD', 'per year', 'Rough estimate, from "US$17,247 and up"', TUT, 'low'],
  ['world-uni', 'UAE universities', 'UAE', 'Undergraduate', null, null, 'AED', 'per year', 'No reliable current figure found', TUT, 'low'],

  // ---- Schools worldwide (tuition per year, local currency) ----
  ['world-school', 'International schools (typical)', 'Dubai', 'All years', 30000, null, 'AED', 'per year', 'Median across 475 schools; range AED 3,628–106,475. Real cost is often about 35% above published tuition', 'https://www.ischooladvisor.com/articles/schooling-and-school-choice/costs-and-fees-understanding-funding/international-school-fees-in-dubai-2026-cost-guide', 'low'],
  ['world-school', 'Safa British School', 'Dubai', 'Primary to top years', 45000, 75000, 'AED', 'per year', '', 'https://www.tutopiya.com/blog/international-school-fees/cost-of-international-school-dubai/', 'low'],
  ['world-school', 'Chatsworth International School', 'Singapore', 'K1 to Year 13', 30554, 41512, 'SGD', 'per year', 'Includes 9% GST', 'https://www.tutopiya.com/blog/parents-blog/international-school-fees-structure-singapore/', 'med'],
  ['world-school', 'GESS International School', 'Singapore', 'Pre-K to IB', 29375, 43990, 'SGD', 'per year', 'Includes 9% GST', 'https://www.tutopiya.com/blog/parents-blog/international-school-fees-structure-singapore/', 'med'],
  ['world-school', 'American International School', 'Hong Kong', 'All years', 152800, 180400, 'HKD', 'per year', '2026-27, excluding capital levy and application fees', 'https://www.sassymamahk.com/hong-kong-international-school-fees-learn/', 'med'],
  ['world-school', 'American School Hong Kong', 'Hong Kong', 'All years', 170600, 242700, 'HKD', 'per year', '2026-27, plus a capital levy and debenture', 'https://www.sassymamahk.com/hong-kong-international-school-fees-learn/', 'med'],
  ['world-school', 'London and New York schools', 'UK / USA', 'All years', null, null, 'GBP', 'per year', 'Not found in this research', 'https://www.tutopiya.com/tools/tuition-cost-of-living-calculator/', 'low'],
]

export const fees = R.map(([group, name, place, level, amount, amountMax, currency, period, note, url, conf]) => ({ group, name, place, level, amount, amountMax, currency, period, note, url, conf }))
export const FEES_COMPILED = '2026-10-12'
// fallback ₹ per 1 unit of currency if the live rate is unavailable
export const FALLBACK_RATES = { INR: 1, USD: 88, GBP: 112, AED: 24, SGD: 66, HKD: 11.3, CAD: 64, AUD: 58, EUR: 96, JPY: 0.58 }
