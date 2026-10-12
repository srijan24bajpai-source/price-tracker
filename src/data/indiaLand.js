// Property rates (₹ per sq ft, built-up/apartment asking rates) by Indian city and locality.
// Source: SquareYards city pages, fetched 2026-10-12. These are listing/asking averages, NOT land-only rates
// and NOT government circle rates. Verify locally before any deal.
const RAW = `
#Delhi|18200
West Delhi|18750
North Delhi|13800
East Delhi|12950
Dwarka|15600
Central Delhi|22950
South Delhi|25400
Chanakyapuri|76200
Malcha Marg|73650
Jor Bagh|60150
Rama Krishna Puram|50400
Golf Links|48350
Sadiq Nagar|43450
Neeti Bagh|39700
Madhu Vihar|34400
Nizamuddin|34200
Soami Nagar|32500
#Mumbai|37700
Marine Lines|99900
Gamdevi|84050
Charni Road|81650
Nariman Point|81550
Churchgate|77400
Worli Sea Face|64050
Peddar Road|63350
Senapati Bapat Marg|54950
Juhu Road|45400
Ambivali|40050
#Thane|16000
Thane City|19400
Dombivli|15050
Badlapur|6950
Kalyan|9750
Bhiwandi|16950
Patlipada|26250
Bhaskar Colony|24100
J K Gram|23900
Shree Nagar|23500
Khopat|23250
Louis Wadi|23000
Samata Nagar|21050
Kolbad|21050
Jambli Naka|20950
Vishnu Nagar|20450
#Bengaluru|12400
Central Bangalore|14200
West Bangalore|11050
North Bangalore|11400
South Bangalore|11700
East Bangalore|13550
Mavalli|32250
Cunningham Road|31700
Chickpet|26150
Somasundarapalya|23400
Bellary Road|22900
Defence Colony|21650
Huttanahalli|20800
Millers Road|20800
Ashok Nagar|20750
MG Road|20100
#Hyderabad|9400
Abids|13400
Domalguda|10300
Film Nagar|9950
Red Hills|9800
Borabanda|9400
Balapur|9350
Bhanur|9300
Alkapoor|9200
Padmarao Nagar|9150
KPHB|9050
#Chennai|9200
Poes Garden|33150
Mandavelipakkam|28950
Dummingkuppam|24200
Raja Annamalai Puram|21850
Adyar|19850
Besant Nagar|19000
Anna Nagar East|18750
Shastri Nagar|17350
Purasawakkam|16800
Nungambakkam|15750
Chennai North|11600
Chennai South|8150
Chennai Central|15600
Chennai West|7250
#Kolkata|6800
Elgin|19800
Shakespeare Sarani|19200
Kadapara|18500
Minto Park|17700
Barabazar Market|15850
Mohispota|15600
Bhawanipore|15200
Camac Street|14050
Machuabazar|14000
Sarat Bose Road|13850
North Kolkata|4850
South Kolkata|6850
Central Kolkata|10300
Howrah|2850
Hooghly|3400
#Pune|13550
Pimpri Chinchwad PCMC|12600
Pune South|12500
Pune Central|16650
Pune East|14100
Pune West|13900
Sahakar Nagar|22750
Ganesh Nagar|22250
Mukund Nagar|20500
Navi Peth|20300
Hingne Khurd|18750
Sector 27|18250
Dahanukar Colony|16100
Sector 25|15550
Bund Garden Road|15350
Sector 18|15250
#Ahmedabad|6450
SG Highway|7300
Ahmedabad North|5350
Ahmedabad East|3850
Ahmedabad South|4550
Ahmedabad Central|8300
Sanand|4850
Gandhinagar|6950
Ghatlodia|32050
Randesan|20000
Muthia|11400
Sindhubhavan|9450
Ramdevnagar|9300
Panjrapole|9100
Sindhu Bhavan Road|8900
Corporate Road|8400
Thaltej Shilaj Road|8350
Nehru Nagar|7850
#Jaipur|4950
Jaipur East|5350
Jaipur South|4600
Jaipur West|4850
Jaipur North|5100
Jaipur Central|8400
Jawahar Lal Nehru Marg|19400
Chitrakoot|15650
C Scheme|13300
Durgapura|13000
Siddharth Nagar|12150
Doctors Colony|11700
Kalwara|9750
Murlipura|8550
Shyam Nagar|8400
Bani Park|8250
#Noida|12650
Noida Central|12550
Noida Expressway|12800
Sector 15A|37300
Sector 20|37150
Sector 122|37000
Sector 47|36900
Sector 26|35650
Sector 48|35300
Sector 12|35250
Sector 11|34600
Sector 39|33150
Sector 33|32900
#Greater Noida|8500
Kudi Khera|32500
Sector 36 Greater Noida|15750
Delta I Greater Noida|15000
Chi IV Greater Noida|12750
Swarn Nagri|9600
Kulesara|9150
Sector 18 Yamuna Expressway|9000
Chhapraula|8350
Sector 16 Yamuna Expressway|8300
Vaidpura|7650
#Gurgaon|15100
Manesar|11150
Golf Course Road|23550
Sohna Road|17250
Golf Course Extension|19300
Southern Peripheral Road|14750
Central Gurgaon|17250
Sohna|11150
New Gurgaon|12200
Dwarka Expressway|13600
MG Road|28500
Sector 26A|20550
Sector 26|19800
Sector 20|18850
Udyog Vihar|16650
Sector 106|16450
Sector 37|13650
Sector 79A|13050
Gurgaon Faridabad Road|12800
Sector 38|12000
#Ghaziabad|8300
Niti Khand III|34050
Mahagunpuram|21200
Indirapuram Abhay Khand 4|18650
Vasundhara Sector 12|15150
Vaishali Sector 7|13800
Vasundhara Sector 2|12100
Niti Khand II|11650
Raj Nagar|10700
Gyan Khand II|10550
Abhay Khand|10500
#Chandigarh|8350
Chandigarh Sectors|40200
Derabassi|5250
Mohali|8450
Panchkula|4350
Sector 9|50400
Sector 11|47450
Sector 46|35400
Sector 44|32600
Sector 23|32450
Sector 43|31300
Sector 32|29350
Sector 40|26300
Sector 50|18300
Mohali Sector 66|16500
#Lucknow|6700
Lucknow North|6250
Lucknow East|10250
Lucknow West|6850
Lucknow Central|8400
Lucknow South|7200
Butler Colony|10750
The Mall Avenue|9900
Mahanagar|9850
Aliganj|9750
Kanpur Road|9300
Ashiyana|9150
South City|8550
Sultanpur|8450
Aishbagh|8050
Adil Nagar|7950
#Gorakhpur|7600
Taramandal|5000
#Kanpur|6250
Swaroop Nagar|7600
Kakadeo|5200
Kakadev|5050
Singhpur|4950
Kidwai Nagar|4900
Sharda Nagar|4800
Saket Nagar|4400
Jajmau|4350
Arya Nagar|4300
Shyam Nagar|4000
#Varanasi|7000
Varanasi West|7900
Varanasi North|5500
Varanasi South|6550
Maheshpur|9100
Sundarpur|6750
Harhua|5500
Shivpur|5150
Ashokpuram Colony|4500
#Prayagraj|4950
Civil Lines|10300
Lukarganj|8600
Tagore Town|6950
Sulem Sarai|6950
#Agra|3750
Sanjay Place|7700
Azad Nagar|6650
Taj Nagari|6450
Taj Nagri Phase 2|5100
Khandari|5000
Kamla Nagar|4300
Shastripuram|3650
Paschim Puri|3600
Fatehabad Road|3350
Agra North|3700
Agra West|3800
#Meerut|5000
Modipuram Bypass|5900
Partapur|5450
Jagriti Vihar|5000
Madhavpuram|4400
Shatabdi Nagar|4150
Saraswati Lok|3750
Daurli|3650
Bigli Bamba Bypass|3050
Modipuram|2750
Dwarika Puri Rd|2600
#Patna|6650
Patna West|6450
Patna East|8650
Patna North|7800
Patna South|6350
Exhibition Road|9000
Boring Road|8700
Gola Road|7000
Rajendra Nagar|6700
Rukanpura|6450
Jagdeo Path|6450
Anandpuri|6250
Rps More|6200
Khagaul Road|5750
Rupaspur|5650
#Ranchi|4650
Upper Bazar|5650
Doranda|5000
Argora|4950
Kanke|4850
Kokar|4700
Pundag|4600
Hatia|4450
Namkum|4400
Ratu Road|4400
Bariatu Road|4200
#Indore|5350
Gulmohar Colony|15100
Scheme No 54|10950
Hare Krishna Vihar|10200
Ujjain Road|8600
Pipliyahana|8400
South Tukoganj|6900
Tulsi Nagar|6850
Scheme No 140|6650
Shri Nagar|6550
Old Palasia|5700
Indore East|5850
Indore North|4750
Indore South|4100
#Bhopal|3300
Arera Colony|15850
Kohefiza|6800
Jatkhedi|6400
Bawaria Kalan|5100
Karond|4200
E8|4050
Ashoka Garden|3950
Indrapuri|3800
Govindpura|3650
Saket Nagar|3550
Bhopal South|3250
Bhopal West|4950
Bhopal East|2850
#Nagpur|6350
Wadi|12300
Somalwada|8450
Jaripatka|7850
Narendra Nagar|7300
Trimurti Nagar|7100
Friends Colony|6700
Jaitala|6500
MIHAN|6100
Khamla|6000
Nandanvan|5850
Nagpur South|4800
#Dehradun|8100
Dehradun Center|6200
Dehradun East|7450
Dehradun North|9050
Dehradun South|7950
Dehradun West|5000
Subhash Road|11700
Haridwar Bypass|8300
Dehradun Cantt|7900
Mohkampur|6800
Clement Town|6150
Sewla Kalan|6100
Govind Vihar|5950
Canal Road|5800
Laxman Chowk|5800
Dehrakhas|5800
#Surat|4550
Surat East|2750
Surat West|4200
Surat North|4850
Surat South|4900
Bharthana|6800
Parvat Patiya|6600
VIP Road Vesu|6100
Rundh Magdalla|5900
New City Light|5650
Kumbhariya|5650
City Light|5600
Piplod|5500
Ghod Dod Road|5400
#Coimbatore|6550
Race Course|12950
Krishna Colony Extension|10500
RS Puram|10250
Puliakulam|9550
Avinashi Road|9500
Chinmaya Nagar|9150
Uppilipalayam|8000
Ramanathapuram|7850
Singanallur|7850
Saibaba Colony|7600
Coimbatore East|6800
Coimbatore North|6550
#Kochi|8450
Thykoodam|12000
Vytilla|9500
Maradu|8850
Thevara|8400
Panampilly Nagar|8050
Kathrikadavu|7950
Elamakkara|7500
Thrippunithura|6250
Padamughal|6200
Vennala|5450
#Bhubaneswar|7000
Raghunathpur|9800
Chandrasekharpur|9000
Kalinga Vihar|8600
Sundarpur|8000
Jagamara|7500
Kanan Vihar|7450
BJB Nagar|7150
Pokhariput|7000
Khandagiri|6900
Nandan Vihar|6700
Bhubaneswar South|6450
Bhubaneswar West|7700
Bhubaneswar North|7350
Bhubaneswar East|7000
`
export const indiaCities = RAW.trim().split('\n').reduce((acc, line) => {
  if (line.startsWith('#')) {
    const [name, avg] = line.slice(1).split('|')
    acc.push({ city: name, avg: Number(avg), localities: [] })
  } else {
    const [name, rate] = line.split('|')
    acc[acc.length - 1].localities.push({ name, rate: Number(rate) })
  }
  return acc
}, [])
export const INDIA_LAND_SOURCE = 'SquareYards city pages, 2026-10-12'
