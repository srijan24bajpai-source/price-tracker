// Kidzee preschool centres in Lucknow, from the official Kidzee centre directory (kidzee.com/best-preschool-in-Lucknow), fetched 2026-10-12.
// The directory does NOT publish fees: every centre is a separate franchise and sets its own. Call the centre for the current fee.
// line: "Centre|Locality|Address"
const RAW = `
Kidzee Sharda Nagar (Rashmi Khand)|Sharda Nagar|H.No. 1/05 Rashmi Khand, Sharda Nagar
Kidzee Badhauli|Bakshi Ka Talab|Kamalabad, near Chatha Med, Bakshi Ka Talab, Badhauli
Kidzee Vrindavan Yojna II|Vrindavan Yojna|H-No-9B/77, Sector-9-B, Vrindavan Yojna II
Kidzee Chowk|Chowk|310/2, Azizunnisa Hall, Gole Darwaza Road, near Chowk Thana
Kidzee Aliganj|Aliganj|House no A-1/3, Sector-B, Aliganj
Kidzee Bakshi Ka Talab|Bakshi Ka Talab|Plot C2, Village Rudahi, Air Force Road, Bakshi Ka Talab
Kidzee Balaganj|Balaganj|14 Gopal Nagar Colony, Jal Nigam Road, Balaganj
Kidzee Bijnor|Bijnor|Plot 207 C-1, Dream Town, Royal City, Bijnor Road
Kidzee Buddheshwar|Buddheshwar|Beside Pink City Academy, Pink City, Mohan Road
Kidzee Chandan Vihar|Indira Nagar|61 Chandan Vihar, Picnic Spot Road, Indira Nagar
Kidzee Deva Road|Deva Road|Plot 207, Dayal Farms, Village Ganeshpur Rehmanpur, Deva Road
Kidzee Dubbaga|Dubbaga|171, Barawankala, IIM Road, Dubbaga
Kidzee Gomti Nagar (Vikalp Khand)|Gomti Nagar|2/374, Vikalp Khand, near Katutha Jheel
Kidzee Gomti Greens|Gomti Greens|B-06/03, Sector D, Ground Floor, Gomti Greens
Kidzee Gomti Nagar (Vishwas Khand)|Gomti Nagar|C 1/142 Vishwash Khand, Gomti Nagar
Kidzee Gomti Nagar Extension|Gomti Nagar Extension|Plot 4/C-1091, Sector-4, Gomti Nagar Extension
Kidzee Gomti Nagar Vistar|Gomti Nagar Vistar|19, Bhaisora, Ground Floor, Gomti Nagar Vistar
Kidzee Gomti Nagar Phase 2|Gomti Nagar|2/116, Vijayant Khand, Phase 2, near MJ Grand
Kidzee Gosaiganj|Gosaiganj|Bazar Madhya, Saraykarora, Gosaiganj
Kidzee Him Estate|Matiyari|House 267/A, Him Estate Part 1, Naubasta Road, Matiyari
Kidzee Indira Nagar|Indira Nagar|10/709, Ground Floor, Indira Nagar
Kidzee Jankipuram Extension|Jankipuram|Plot 177, Vashisthapuram, 60 Feet Road, Jankipuram Extension
Kidzee Jankipuram (Sector G)|Jankipuram|B-1/270, Sector G, near Vishal Hospital, Jankipuram
Kidzee Kalli Paschim|Kalli Paschim|Raebareli Road, SGPGI, Kalli Paschim
Kidzee Kalyanpur|Kalyanpur|17, Kalhansh Bhawan, Kanchana Beehari Marg, Kalyanpur
Kidzee Kanchanpur Matiyari|Matiyari|House 98, Himcity Part-2, Chinhut, Deva Road
Kidzee Kanpur Road|Krishna Nagar|59 A, Krishna Nagar, Kanpur Road
Kidzee Keshav Nagar|Keshav Nagar|Plot 17, near Central Bank, Sitapur Road, Keshav Nagar
Kidzee Khurram Nagar|Khurram Nagar|B6, Panchawati Colony, Picnic Spot Road, Khurram Nagar
Kidzee Khurshed Bagh|Khurshed Bagh|73 Vishnu Nagar, Khurshed Bagh Colony
Kidzee Kursi Road|Kursi Road|Bhukhand 16, Khasra 209, Minjumla, Gudamba, Kursi Road
Kidzee Lalabagh|Lalbagh|Lalabagh, Bamroli Road, Faridipur, Haidarganj
Kidzee Lolai Malhour|Gomti Nagar|Plot 09, Village Lolai, Naizampur Malhour
Kidzee Mohanlalganj|Mohanlalganj|Main Road, Mohanlalganj, Raebareli Road, near Antares Resort
Kidzee Raebareli Road (South City)|South City|Plot J-196, South City, Ratnakar Khand, Raebareli Road
Kidzee Ram Ashrey Purwa|Khargapur|House 26, Khasra 57, Khargapur, Ram Ashrey Purwa
Kidzee Ramkrishna Marg|Vivekanand Puri|4, Ram Krishna Marg, Vivekanand Puri, near IT Chauraha
Kidzee Ratan Khand|Sharda Nagar|1/661, Ground Floor, Sharda Nagar Yojna, Ratan Khand
Kidzee Roshnabad|Roshnabad|89, Roshnabad, near Shalimar Garden, IIM Road
Kidzee Sadrauna|Sarojini Nagar|Village Sadrauna, Block Sarojini Nagar
Kidzee Sai Vihar Colony|Jankipuram|Plot 61, Jankipuram Extension, near AKTU
Kidzee Sector H Jankipuram|Jankipuram|3, Kursi Road, near Gudamba Thana, Sector-H
Kidzee Sita Vihar|Sarojini Nagar|Plot 27, Murli Vihar, opposite Shanti Nagar, Kanpur Road
Kidzee Sushant Golf City|Sushant Golf City|D/2-216, Palm Groove Villa, Sector D/2
Kidzee Vikas Khand|Gomti Nagar|2/210, Vikas Khand, Gomti Nagar
Kidzee Vikas Nagar|Vikas Nagar|House 2/507, Sector 2, Vikas Nagar, near Lekhraj Panna
Kidzee Vinay Khand|Gomti Nagar|5/14 Vinay Khand, Gomti Nagar
Kidzee Viraj Khand|Gomti Nagar|2/153, Viraj Khand, near Springdale School
Kidzee Yojana (Jankipuram Vistar)|Jankipuram|4/349, near Atal Chauraha, Jankipuram Vistar Ext., Sector-4
Kidzee Bhaskar Education (Indira Nagar)|Indira Nagar|B Block-2002, Indira Nagar B-Block, near Eram College
Kidzee Hazratganj (Galaxy Education)|Hazratganj|21/11, GHA-1, Tilak Marg, Dalibagh, near VIP Guest House
Kidzee Rajajipuram|Rajajipuram|13/7065, C-Block, near Police Booth, Rajajipuram
Kidzee Royal Kids (Ashiyana)|Ashiyana|House 1564, Sector K-1, Ashiyana Colony, near Chancellors Club
`
export const kidzeeCentres = RAW.trim().split('\n').map((l) => {
  const [name, locality, address] = l.split('|')
  return { name, locality, address }
})
export const KIDZEE_SOURCE = { label: 'Kidzee official: preschools in Lucknow', url: 'https://www.kidzee.com/best-preschool-in-Lucknow', on: '2026-10-12' }
// The only Lucknow fee data point found, and it is old and unreliable.
export const KIDZEE_OLD_FEE = { annual: 15000, monthly: 1250, where: 'Gomti Nagar', url: 'https://www.edustoke.com/lucknow/kidzee-pre-school-gomti-nagar', note: 'Listing is about four years old: do not rely on it' }
