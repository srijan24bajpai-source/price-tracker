// Lucknow locality land rates.
// circle: residential plot / flat circle rate in ₹ per sq metre (aggregator copy of the 2026-27 DM circle-rate list;
//         VERIFY with the Lucknow sub-registrar / DM office before any transaction).
// market: asking ₹ per sq ft from listing portals (99acres / SquareYards, 2026) where available. Asking != circle != sale price.
const SQM_TO_SQFT = 10.7639

// area | residential circle ₹/sqm | flat circle ₹/sqm
const CIRCLE = `
Aishbagh|34000|32000
Alambagh|38000|35000
Aliganj|42000|38000
Amausi (Airport Area)|22000|20000
Amausi Industrial Area|18000|16000
Aminabad (Old Lucknow)|38000|35000
Ansal API (Gomti Nagar)|46000|42000
Arjunganj|22000|20000
Ashiyana (Aashiana)|26000|24000
Ashiyana Extension|22000|20000
Bakshi Ka Talab (BKT)|15000|14000
Banthra|8000|7000
Bhagu Khera|12000|10000
Bijnaur|8000|7000
Charbagh (Railway Station Area)|40000|36000
Chinhat|20000|18000
Chinhat Industrial Area|18000|16000
Chinhat Tronica City|16000|14000
Chowk (Old Lucknow)|35000|32000
Daliganj|35000|32000
Dubagga|14000|12000
Eldeco Greens (Gomti Nagar)|48000|44000
Eldeco Udyan|34000|32000
Engineering College Area|28000|26000
Faizabad Road Corridor|22000|20000
Gol Darwaza|28000|26000
Gomti Nagar - Sector A|55000|50000
Gomti Nagar - Sector B|54000|48000
Gomti Nagar - Sector C|52000|46000
Gomti Nagar - Sector D|50000|45000
Gomti Nagar - Sector E|48000|44000
Gomti Nagar - Sector F|48000|43000
Gomti Nagar - Sector G|46000|42000
Gomti Nagar - Sector H|46000|42000
Gomti Nagar - Sector I|44000|40000
Gomti Nagar - Sector J|44000|40000
Gomti Nagar - Sector K|42000|38000
Gomti Nagar - Sector L|42000|38000
Gomti Nagar - Sector M|40000|36000
Gomti Nagar - Sector N|40000|36000
Gomti Nagar - Sector O|38000|35000
Gomti Nagar (Main)|58000|52000
Gomti Nagar Extension|48000|44000
Gosainganj|10000|9000
Gudamba|18000|16000
Hardoi Road Corridor|18000|16000
Hasanganj|20000|18000
Hazratganj (Prime Commercial Hub)|72000|62000
Hussainabad|32000|30000
Hussainganj|38000|35000
IIM Road|32000|30000
Indira Nagar - Sector A|48000|44000
Indira Nagar - Sector B|46000|42000
Indira Nagar - Sector C|44000|40000
Indira Nagar Extension|32000|30000
Itaunja|10000|9000
Jankipuram (Main)|28000|26000
Jankipuram Extension|24000|22000
Jankipuram Vistar|22000|20000
Kaiserbagh|40000|36000
Kakori|12000|10000
Kanpur Road Corridor|24000|22000
Kapoorthala|38000|35000
Khargapur (Gomti Nagar)|45000|42000
Khurram Nagar|36000|33000
Kumhrava|7000|6000
Kursi Road|16000|14000
Lalbagh|36000|33000
Latouche Road|42000|38000
LDA Colony - Kanpur Road|26000|24000
Madiyaon|18000|16000
Mahanagar|45000|40000
Malihabad|12000|10000
Mall Avenue|45000|42000
Matiyari|16000|14000
Maulviganj|28000|26000
Mohaan Road|10000|9000
Mohanlalganj|14000|12000
Nagram|8000|7000
Naka Hindola|30000|28000
Nakhas|28000|26000
Nirala Nagar|40000|36000
Nishatganj|36000|33000
Omaxe City (Gomti Nagar)|44000|40000
Para|16000|14000
Patrakarpuram (Gomti Nagar)|48000|44000
Picnic Spot Road|24000|22000
Piparsand|7000|6000
Rae Bareli Road Corridor|18000|16000
Rahimabad|10000|9000
Rajajipuram - Sector A|30000|28000
Rajajipuram - Sector B|28000|26000
Rajajipuram - Sector C|28000|26000
Rajajipuram - Sector D|26000|24000
Rajajipuram - Sector E|26000|24000
Rajajipuram - Sector F|24000|22000
Rani Laxmi Bai Chowk|34000|32000
Ring Road (North)|22000|20000
Ring Road (South)|20000|18000
Saadatganj|32000|30000
Saidpur|8000|7000
Sarojini Nagar|16000|15000
Shaheed Path - Sector 1|30000|28000
Shaheed Path - Sector 2|28000|26000
Shaheed Path - Sector 3|26000|24000
Shaheed Path (Main)|32000|30000
Sitapur Road Corridor|20000|18000
Sultanpur Road Corridor|18000|16000
Sushant Golf City|38000|36000
Talkatora|28000|26000
Talkatora Industrial Area|22000|20000
Telibagh|22000|20000
Thakurganj|26000|24000
Transport Nagar|32000|30000
Transport Nagar Industrial|24000|22000
Vibhuti Khand (Gomti Nagar)|56000|50000
Vijay Khand (Gomti Nagar)|54000|48000
Vikas Khand (Gomti Nagar)|52000|46000
Vikas Nagar - Sector 1|30000|28000
Vikas Nagar - Sector 2|28000|26000
Vikas Nagar - Sector 3|26000|24000
Vikas Nagar - Sector 4|24000|22000
Vinay Khand (Gomti Nagar)|50000|45000
Vipul Khand (Gomti Nagar)|52000|46000
Viram Khand (Gomti Nagar)|50000|44000
Vishwas Khand (Gomti Nagar)|54000|48000
Vivek Khand (Gomti Nagar)|50000|44000
Vrindavan Colony|28000|26000
Vrindavan Yojna (All Sectors)|28000|26000
Yahiyaganj|30000|28000
`

// Market asking rates (₹/sq ft) – key must equal an area name above, or add as extra row.
const MARKET = {
  'Aliganj': 9750,
  'Ashiyana (Aashiana)': 9150,
  'Mahanagar': 9850,
  'Mall Avenue': 9900,
  'Aishbagh': 8050,
  'Gomti Nagar (Main)': 9750,
  'Gomti Nagar Extension': 8200,
  'Shaheed Path (Main)': 8200,
  'Sultanpur Road Corridor': 7300,
  'Faizabad Road Corridor': 6050,
  'Rae Bareli Road Corridor': 6500,
  'Kanpur Road Corridor': 5000,
}

// Areas that appear only in listing portals (no circle rate row above)
const EXTRA = [
  ['Butler Colony', null, null, 10750],
  ['South City', null, null, 8550],
  ['Adil Nagar', null, null, 7950],
  ['Sultanpur (town side)', null, null, 8450],
]

const zoneOf = (name) => name.replace(/\s*[-(].*$/, '').replace(/\s+(Corridor|Extension|Vistar|Main)$/i, '').trim()

export const lucknowLand = [
  ...CIRCLE.trim().split('\n').map((l) => {
    const [area, res, flat] = l.split('|')
    return {
      area,
      zone: area.includes('Gomti Nagar') || /Khand/.test(area) ? 'Gomti Nagar' : zoneOf(area),
      circleResPsf: Math.round(Number(res) / SQM_TO_SQFT),
      circleFlatPsf: Math.round(Number(flat) / SQM_TO_SQFT),
      circleResSqm: Number(res),
      market: MARKET[area] ?? null,
    }
  }),
  ...EXTRA.map(([area, , , market]) => ({ area, zone: area, circleResPsf: null, circleFlatPsf: null, circleResSqm: null, market })),
]
