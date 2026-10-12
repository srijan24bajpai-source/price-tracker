// Lucknow school directory: the schools listed on Careers360 (351 reported) (school.careers360.com/schools/schools-in-lucknow), fetched 2026-10-12.
// Line format: "School name, Locality|Board|annual fee in INR (blank = not shown)|class the fee is for".
// Careers360 shows ONE annual fee for a single class (10 or 12) only for some schools. It is not a full fee schedule and
// may exclude admission, transport and other charges. Confirm with the school.
const RAW = `
Seth M R Jaipuria School, Sitapur Road|CBSE||
Delhi Public School, Gomti Nagar|CBSE||
Kunwars Global School (KGS), Deva Road|CBSE||
Lucknow Public School (LPS), Sector I|CBSE|104979|12
Study Hall School, Gomtinagar|CBSE|501400|12
St Dominic Savio School, Indira Nagar|CISCE||
Christ Church College, Hazratganj|CISCE||
Loreto Convent Intermediate College, M G Marg|CISCE||
Brightland School, Sitapur Road|UPMSP||
Allenhouse Public School, Vrindavan|CBSE|110500|12
Alpha Public College, Kabirpur|CBSE||
Awan Educational Academy, Juggaur|CBSE||
Capital Public School, Jankipuram|CBSE|47000|12
Kendriya Vidyalaya, Alambagh|CBSE|12025|12
St Xaviers Inter College, Bakshi Ka Talab|CBSE|33190|12
St. Mary'S Inter College, Jankipuram|CBSE||
St. Marys Inter College, Gomti Nagar|CBSE|73700|12
The Lucknow Public Collegiate Day Boarding Public School, Jopling Road|CISCE||
St John Bosco College, Lucknow|CISCE|101100|12
Raj Kumar Academy, Mehndi Ganj|CISCE|83320|12
Unity College, Tehseenganj|CISCE||
Spring Dale College, LDA Colony|CISCE|73480|10
Al Huda Model School, Triveni Nagar-III|CISCE|140700|12
Riverside Academy Inter College, Gomti Nagar|CISCE||
St James Mission School, Rajajipuram|CISCE||
St MaryS Inter College, Indira Nagar|CISCE||
City Montessori School, Anand Nagar|CISCE|167590|12
La Martiniere Girls College, Rana Pratap Marg|CISCE|125600|12
St Pauls College, Subhash Marg|CISCE||
Spring Dale College, Indira Nagar|CISCE|73480|10
City Montessori Inter College, Mahanagar|CISCE|167590|12
Emma Thompson School, Lalbagh|CISCE|69700|12
City Montessori Inter College, Manak Nagar|CISCE|167590|12
The Modern School, Aliganj|CISCE/IB||
Hoerner College, Mahanagar Extension|CISCE|114850|10
Dr Virendra Swarup Public School, Mahanagar|CISCE|104800|12
St Anns Convent School, Sharda Nagar|CISCE||
Play Way Academy, Gomti Nagar|CISCE|72200|12
St Joseph Montessori School, Rajajipuram|CISCE||
Modern Indian School, Rajajipuram|CISCE||
St Joseph International School, Sector C|CISCE|98700|10
City Montessori School, Gomti Nagar|CISCE/CAIE||
Rani Laxmi Bai Memorial School, Vikas Nagar|CISCE|74400|12
Maulana Azad Girls School, Mahipatmau|CISCE||
Mount Carmel College, Mahanagar|CISCE||
Exon Montessori School, Old Haiderganj|CISCE||
St XavierS Convent School, Gomti Nagar|CISCE||
Raj Kumar Inter College, Alam Nagar|BHSIEUP|38660|12
SKD Academy, Rajajipuram|BHSIEUP||
Brightland School, Sitapur Road (BHSIEUP)|BHSIEUP||
Bright Career S.S. Inter College, Thakurganj|BHSIEUP||
St. Christ Public Inter College, Alambagh|BHSIEUP||
St. Mary Public Inter College, Amberganj|BHSIEUP|31500|10
Trinity International Public School, Amrapali Yojana|CBSE||
Kamal Delhi Public School, Banthra|CBSE||
Greenberry World School, Daroga Khera|CBSE|135000|10
Tathagat Public School, Indira Nagar|CBSE||
Shri Vinayak Convent School, Sarojini Nagar|CBSE|22700|10
S.C.S.A.S.N. School, Chinhat|CBSE||
Saraswati Balika Vidya Mandir, Jankipuram|CBSE||
St. Joseph College, Ruchi Khand-1|CISCE||
Lucknow Public College, Rajajipuram B-Block|BHSIEUP||
Krishna Public School, Royal City|CISCE||
St. Mary's Day Inter College, Vrindavan Yojna|CISCE||
City International School, Balaganj|CAIE|159700|12
St. Thomas College, Shanti Nagar|CISCE|66660|12
S. B. M. Public School, Amrai|CISCE||
A. L. S. Academy, Telibagh|CISCE||
St Fidelis College, Vikasnagar|CISCE|55680|10
St Francis School, Kakori|CBSE||
Awasiya Public School, Sharda Nagar|CBSE||
Cathedral School, Hazratganj|CBSE||
The Millennium School, Raebareli Road|CBSE|358968|12
The Millennium School, Sitapur Road|CBSE|135800|12
Central Academy, Indira Nagar|CBSE||
Chiranjiv Bharati School, Aashiana|CBSE||
MPB Public School, Malihabad|CBSE||
Maharaja Agrasen Public School, Gomti Nagar|CBSE||
Navayuga Radiance School, Jankipuram|CBSE|28400|12
Sri Chaitanya Techno School, Lucknow|CBSE||
The Lucknow Public Collegiate, Sharda Nagar|CBSE||
The City School, Raibareli Road|CBSE|49500|12
Ankerite Pushpa Sri Ram Academy, Bijnor|CBSE|39100|12
Central Academy, Vikas Nagar|CBSE||
Diamond Public Higher Secondary School, Chinhat|CBSE|29700|10
Eram Public College, Indira Nagar|CBSE|97900|12
Kendriya Vidyalaya, Gomti Nagar|CBSE|24050|12
Loyola International School, Gomti Nagar|CBSE|95600|12
Lucknow Public School, Vrindavan Yojna|CBSE||
Red Rose School, Gomti Nagar|CBSE|74000|12
S. D. S. N. Public School, Gomti Nagar|CBSE|53100|10
Seth M.R. Jaipuria School, Gomti Nagar Extension|CBSE|133800|12
Seth M R Jaipuria School, Sitapur Road (campus 2)|CBSE|111000|12
Army Public School, Lucknow Cantonment|CBSE||
Bright Way College, Jankipuram|CBSE|59100|12
Kendriya Vidyalaya, Raebareli Road|CBSE|19350|10
Maharaja Agrasen Public School, Jankipuram Extension|CBSE||
Lucknow Public School, Vrindavan|CBSE|92400|12
Pioneer Montessori Inter College, Eldeco Colony|CBSE|73300|10
Raj Montessori School, Rakabganj|CBSE||
Rameshwaram International Academy, Sitapur Road|CBSE|165020|12
Ram Prasad Bismil Memorial Public School, Kakori|CBSE||
M.S Vindhyavasini World School, Lucknow|CBSE||
Army Public School, Sardar Patel Marg|CBSE|39389|12
Surya Public School, Madhar Mau|CBSE|84300|12
Delhi Public School, Gomti Nagar Extension|CBSE|134000|10
Lucknow Public College, Gomti Nagar|CBSE|99000|12
Creative Convent College, Shanti Nagar|CBSE/BHSIEUP|70400|12
Delhi Public School, Indira Nagar|CBSE|167700|12
Atal Awasiya Vidyalaya, Mohanlalganj|CBSE||
Aliganj Montessori School, Aliganj|CBSE||
Arvind Academy, Gomti Nagar|CBSE|117400|12
Avadh Collegiate, Daroga Khera|CBSE|215840|12
Sacred Heart School, Rajiv Nagar|CBSE|107874|12
Wisdom Valley Convent School, Sharda Nagar|CBSE|48000|10
Study Home School, Indira Nagar|CBSE|51000|10
Shri Ram Global School, Gomti Nagar|CBSE|210800|10
Mount Litera Zee School, Eldeco Udyan II|CBSE|31825|12
Indus International Academy, Mohanlalganj|CBSE|60500|12
S S International School, Bakshi Ka Talab|CBSE|31000|12
Childrens Academy, Lucknow|CBSE|155800|10
St Anthony Public School, Lucknow|CBSE|75700|12
Indus Valley Public School, Mubarakpur|CBSE||
St Francis School For The Hearing Impaired, Thakurganj|CBSE|12000|10
G.N. International Academy, Kamta|CBSE||
Jagran Public School, Gomti Nagar|CBSE|452600|10
Royal Mount Academy, Gomti Nagar|CBSE|64100|10
SKD Academy, Vikrant Khand-3|CBSE|16300|10
Dabble Public School, Banthara|CBSE||
Colonel S N Mishra OBE Memorial School, South City|CBSE|35500|12
Lucknow Public School, LDA Colony|CBSE||
New Era Academy, Chandiamau|CBSE|34510|12
Jay Prakash Narayan Sarvodaya Vidyalaya, Mohan Road|CBSE||
Shivalik International School, Kanpur Road|CBSE||
Tender Hearts School, Adharkhera|CBSE|83400|12
St. Marys Inter College, Alambagh|CBSE||
City Montessori School, Rajajipuram|CISCE/CAIE||
Sherwood Academy, Indira Nagar|CISCE||
City Montessori School Aliganj, Aliganj|CISCE/CAIE|152080|12
Seth M R Jaipuria School, Gomti Nagar (ICSE)|CISCE|190100|12
City Montessori School, Indira Nagar|CISCE|167590|12
St Antonys Inter College, Jankipuram|CISCE||
Colvin Taluqdars College, University Road|CISCE|74200|12
City Montessori Inter College, Station Road|CISCE|167590|12
City Montessori Inter College, Hardoi Road|CISCE|167590|12
Vaibhav Academy, Patel Nagar|CISCE||
Siddhartha Public School, Adarsh Vihar|CISCE|59300|12
St Joseph College, Priyadarshini Nagar|CISCE||
Spring Dale School, Gomti Nagar|CISCE|73480|10
City Montessori School, Asharfabad|CISCE|170290|12
Pioneer Montessori School, Jankipuram|CISCE|70000|10
Lucknow Public College, Rajajipuram A-Block|CISCE|92700|12
Scholars Home, Gomti Nagar|CISCE||
Stella Maris Inter College, Kanpur Road|CISCE||
Jeevan Dhara Convent School, Kursi Road|CISCE|54320|12
Lucknow Public College, Jankipuram|CISCE|96900|12
Lucknow Public School, Anand Nagar|BHSIEUP||
Mount Berry Inter College, Khurram Nagar|BHSIEUP||
Dr SRK Public Girls High School, Telibagh|BHSIEUP||
Lucknow Public School, Rajajipuram B-Block|BHSIEUP||
St. Ann's Day Inter College, LDA Colony|BHSIEUP||
Dr. Murari Lal Memorial Inter College, Saraura|BHSIEUP||
St Joseph College, Malihabad|CISCE||
DBS Montessori School, Jarahra|CISCE||
Mary Gardiner's Convent School, Mansarovar Yojna|CISCE||
The Hamilton Academy, Gokul Gram|CISCE||
MDM Academy, Jankipuram|CISCE||
Nalanda International Academy, Mohanlalganj|CBSE||
L N Global School, Lucknow|CBSE||
Seth M. R. Jaipuria School, Shaheed Path|CISCE||
Lucknow Public World School, DLF Garden City|CAIE||
Modern Academy, Gomti Nagar|CISCE||
S R International School & Sports Academy, Bakshi Ka Talab|CISCE||
CMS Cambridge International, Gomti Nagar|CAIE|167590|12
St. Monica's School, Dashauli|CISCE||
Lotus World Public School, Sushant Golf City|CISCE||
City Montessori School, Golf City|CAIE/CISCE||
Shyam Tara Public College, Abbas Nagar|CBSE||
St Marys School, Malihabad|CBSE||
Lucknow Public School, Ansal|CBSE||
Amity International School, Gomti Nagar|CBSE|137784|12
Delhi Public School, Eldeco Colony|CBSE|248600|10
Captain Manoj Kumar Pandey UP Sainik School, Sarojini Nagar|CBSE|75660|10
S R Global School, Bakshi Ka Talab|CBSE||
Brightland School, Navikot Nandana|CBSE|58800|12
Baby Martin International School, Krishna Tower|CBSE||
Green Land Public School, Gomti Nagar|CBSE|15725|12
Lucknow Public College, Hardoi Road|CBSE|103500|12
Kendriya Vidyalaya, Bijnaur|CBSE|24050|12
Kendriya Vidyalaya, AMC|CBSE|24050|12
Kendriya Vidyalaya, Prabandh Nagar|CBSE|19250|10
Kendriya Vidyalaya, Memaura|CBSE|24050|12
Jawahar Navodaya Vidyalaya, Pipersand|CBSE|14400|12
Navayuga Radiance Bilingual Senior Secondary School, Rajendra Nagar|CBSE|31050|12
Seth M R Jaipuria School, Lucknow|CBSE|129580|12
Police Modern School, Gomti Nagar|CBSE|52750|10
Rani Laxmi Bai Memorial School, Chinhat|CBSE|151800|12
Rani Laxmi Bai Memorial School, Vikas Nagar Sector-3|CBSE|151800|12
Rani Laxmibai Memorial School, Sarvodaya Nagar|CBSE|151800|12
Red Rose Public School, Vishnu Lok Colony|CBSE|155750|10
Safa Public School, Malihabad|CBSE|82150|10
Seth Anandram Jaipuria School, Shaheed Path|CBSE|217900|10
Seth M R Jaipuria School, Goel Campus|CBSE|51000|12
Shivani Public School, Kanpur Road|CBSE|161300|12
St Clares Convent School, Kakori|CBSE|322640|12
Central Public School, Rajni Khand|CBSE|68850|10
Delhi Public School, Shaheed Path|CBSE||
Kunwars Global School, Deva Road|CBSE|146020|10
St. Jude's School, Mohanlalganj|CBSE|158140|12
Lucknow Public School, Eldeco (Raebareli Road)|CBSE|195634|12
Canossa School, Faridi Nagar|CBSE|73600|10
Gargi Raj Royal Academy, Raibareilly Road|CBSE|50400|12
H.A.L. School, Faizabad Road|CBSE||
PM Shri Kendriya Vidyalaya, Sitapur Road|CBSE|7825|12
New Public College, South City|CBSE||
The Avadh School, Gomti Nagar|CBSE||
Vardaan International Academy, Khargapur|CBSE||
Vishwanath Academy, Aashiana|CBSE|168890|10
A P S Academy, Telibagh|CBSE|56368|10
Abhinav Vidyalaya Karora, Karora|CBSE|240|12
Heeralal Yadav Public School, Sarojini Nagar|CBSE|2000|10
Manipal Public School, Raebareilly Road|CBSE|97000|12
Heera Lal Yadav Public School, Sarojini Nagar|CBSE|38022|12
Lucknow Public School, South City|CBSE|107379|12
GD Goenka Public School, Sushant Golf City|CBSE|235500|12
Lawrence Homan Public School, Laxmi Nagar|CBSE||
The Bhonwal School, Natkur|CBSE|142280|12
Rainbow Public School, Arjunganj|CBSE|56950|10
Techno Academic Higher Secondary School, Kursi Road|CBSE|51000|12
Lucknow Public School, Gomti Nagar|CBSE|77700|12
Amrita Vidyalayam, Vrindavan Yojana|CBSE|72980|10
The Sanskriti School, Chak Ganjaria|CBSE|296000|12
Lucknow Model Public Inter College, Dubagga|CBSE|52500|12
Lucknow Model Public School, Sadrauna|CBSE|50500|12
Scholars Nest School, LDA Colony|CBSE|29500|12
St Francis Mission School, Lucknow|CBSE|64550|12
Shri Ram Swaroop Memorial Public School, Faizabad Road|CBSE|8000|12
Sky Public School, Sarojini Nagar|CBSE|121800|10
Siddhant World School, Lucknow|CBSE|309900|12
Jai Prakash Narayan Sarvodaya Vidyalaya, Shrawasti|CBSE||
Nishkalanka Mata School, Jait|CBSE||
Rajkiya Ashram Paddhati Vidyalaya, Dhanwar Shahabad|CBSE||
St Stephens School, Gomti Nagar|CBSE||
Cambridge School, Krishna Nagar|CBSE||
Excellia School, Raebareli Road|CBSE|101640|12
Police Modern School, Nishat Ganj|CBSE||
Pintoo Memorial Surya Academy, Jankipuram Extension|CBSE|2000|12
Tiny Tots Convent, Rasoolpur|CBSE||
Vibgyor High School, Gomti Nagar|CBSE|190800|12
Vivekanand Modern Academy, Lucknow|CBSE|63600|12
City Montessori School, Kanpur Road|CISCE|164890|12
St TeresaS College, Aashiana|CISCE||
Nirmala Convent Inter College, Bahadurpur|CISCE|47840|12
Trinity International Public School, Eldeco Udyan-1|CISCE||
Lucknow Model Public Inter College, Indira Nagar|CISCE||
Gurukul Academy, Indira Nagar|CISCE|112800|12
Sri Krishna Dutt Academy, Rajajipuram|CISCE||
City Convent School, Rajajipuram|CISCE/BHSIEUP||
Green Fields School, Rajaji Puram|CISCE|111400|12
City Montessori Inter College, Gomti Nagar|CISCE|162590|12
Career Convent College, Vikas Nagar|CISCE||
Dabble College, Indira Nagar|CISCE||
St Agnes Loreto Day School, Station Road|CISCE|60720|12
La Martiniere College, Lucknow|CISCE|107450|10
St Marys Convent Inter College, Manak Nagar|CISCE||
St Francis College, Hazratganj|CISCE|98524|12
City Montessori High School, Rajendra Nagar|CISCE|167590|12
St Teresas Day School, Model House|CISCE||
St AntonyS Inter College, Jankipuram (2)|CISCE||
St Joseph Inter College, Thakurganj|CISCE||
New Public School, Rajajipuram|CISCE||
Dr I D Rastogi Academy, Jankipuram|CISCE/NIOS/BHSIEUP||
St Thomas Mission High School, Jankipuram|CISCE|44000|10
Lucknow Model Public Inter College, I I M Road|BHSIEUP||
KJ Modern Inter College, Deva Road|BHSIEUP||
Exon Montessori Inter College, Campbell Road|BHSIEUP||
Isabella Thoburn Intermediate College, Faizabad Road|BHSIEUP||
Florence Nightingale Academy, Nishatganj|BHSIEUP||
St Francis School, Gomti Nagar Extension|CISCE|104956|10
Skylark World School, Vrindavan Yojna|CBSE|111800|12
Siddhartha Global School, Alam Nagar Road|CBSE||
Bright Star Convent School, Lucknow|CBSE||
Saint Martins Academy, Kalli Paschim|CISCE||
Pioneer Montessori School, Vikas Nagar|CISCE|70000|10
GCRG International School, Bakshi Ka Talab|CBSE||
R.R. International School, Lucknow|CBSE||
St. Mary's School, Para Road|CISCE||
New Public College, Neelmatha|CISCE||
Immaculate Conception Convent School, Gomti Nagar|CISCE||
Evergreen Public School, Chinhat|CISCE||
Summerville School, Rajaji Puram|CISCE||
City Montessori School, Tiwari Ganj|CISCE||
Birla Open Minds International School, Lucknow|CBSE||
Holy Public School, Sector 12|CBSE||
St John Vianney School, Vrindavan Yojana|CBSE||
Sharp Global School, Itaunja|CBSE||
Sri Chaitanya Techno School, Mutkkipur|CBSE||
Utkarsh International School, Chinhat|CBSE|72200|12
Awadh Public School, Sharda Nagar|CBSE|70600|12
Delhi Public School, Jankipuram|CBSE|195910|10
Army Public School, Lal Bahadur Shastri Marg|CBSE||
Bal Vidya Mandir Senior Secondary School, Charbagh|CBSE||
Rani Laxmi Bai Memorial Senior Secondary School, Indira Nagar (1)|CBSE||
Scholar Academy, Mohanlalganj|CBSE||
Loyola International School, Mahanagar|CBSE|204000|12
Lucknow International Public School, Itaunja|CBSE|217940|12
Maharaja Agrasen Public School, Moti Nagar|CBSE|39200|10
Montfort Inter College, Mahanagar|CBSE|152880|12
Seth MR Jaipuria School, Kursi Road|CBSE|120100|12
R K Senior Secondary School, Aliganj|CBSE||
Kunskapsskolan Lucknow, Lucknow|CBSE|822100|12
RBN Global School, Faizabad Road|CBSE||
Rasphil Academy, Kalyanpur|CBSE|34400|12
Red Rose School, Rajajipuram|CBSE|128950|10
Sankat Mochan Public School, Sardarpur Karora|CBSE|153660|12
St AnjaniS Public School, Rajaji Puram|CBSE||
St Mary's Day Inter College, Lucknow|CBSE||
Siddhartha Global School, Malihabad Road|CBSE||
Birla Open Minds International School, Shaheed Path|CBSE|138760|10
Swarnim Public School, Rajajipuram|CBSE||
Akshar Jyoti Public School, Sithauli Khurd|CBSE||
Green Way Public School, Dubagga|CBSE||
Kendriya Vidyalaya, Lucknow Cantonment|CBSE|19225|10
Maharishi Vidya Mandir, Diguria|CBSE|164000|10
New Way School, Nirala Nagar|CBSE||
Preston International Academy, Hardoi Road|CBSE|39800|10
Rani Laxmi Bai Memorial School, Indira Nagar|CBSE|151800|12
Emmanuel Mission School, Malihabad|CBSE|30000|10
IRIS Crown School, Dubagga|CBSE||
R D Memorial Public School, Ganga Vihar|CBSE|45700|12
DAV Public School, Indira Nagar|CBSE||
Lucknow Public School, Jankipuram|CBSE|107700|12
M G Convent School, LDA Colony|CBSE||
Kendriya Vidyalaya, Aliganj|CBSE|24050|12
Seth Anandram Jaipuria School, Alambagh|CISCE/CBSE||
Allahabad Public School Lucknow, Ganeshpur|CBSE||
Amity International School, Vrindavan Yojna|CBSE|236600|10
Vrindavan Public School, Birura|CBSE|22500|10
Avadh Collegiate, Vikram Nagar|CBSE|65435|12
Vishwanath Academy, Dhawapur|CBSE|58800|10
Bhartiya Vidya Bhavan Vidyalaya, Gomti Nagar|CBSE|61900|10
Tirupati Montessori School, Sarsawan|CBSE|38470|12
Central Academy, Aashiana|CBSE||
Central Academy, Jankipuram Extension|CBSE|8100|12
City International School, Indira Nagar|CBSE|98700|12
Sardar Patel Gurukul Academy, Bakshi Ka Talab|CBSE|19200|10
St. Gabriel's Convent School, Keshav Nagar|CBSE|66700|12
Rediyent Public School, Ekta Nagar|CBSE|67060|12
Saraswati Vidya Mandir Higher Secondary School, Aliganj|CBSE|80400|12
Gurukul Academy, Lucknow|CBSE|73900|12
HS Memorial Public School, Indira Nagar|CBSE|106400|12
SKD Academy, Vrindavan Yojna|CBSE|8650|10
A S Public College, Uttaretia|CBSE||
Rajkiya Ashram Paddhati Vidyalaya, Arya Nagar|CBSE||
`

export const BOARD_LABEL = { CBSE: 'CBSE', CISCE: 'ICSE/ISC', CAIE: 'Cambridge', BHSIEUP: 'UP Board', UPMSP: 'UP Board' }
const parsed = RAW.trim().split('\n').map((line) => {
  const [full, board, fee, cls] = line.split('|')
  const i = full.lastIndexOf(',')
  const name = i > 0 ? full.slice(0, i).trim() : full.trim()
  const locality = i > 0 ? full.slice(i + 1).replace(/\(.*?\)/g, '').trim() : 'Lucknow'
  return { name, locality, board, fee: fee ? Number(fee) : null, cls: cls || null }
})
// the source lists a few schools twice (top-10 table and the cards): keep one row each, preferring the one with a fee
const seen = new Map()
for (const r of parsed) {
  const k = (r.name + '|' + r.locality).toLowerCase()
  if (!seen.has(k) || (!seen.get(k).fee && r.fee)) seen.set(k, r)
}
export const lucknowSchools = [...seen.values()]
export const SCHOOLS_SOURCE = { label: 'Careers360: schools in Lucknow', url: 'https://school.careers360.com/schools/schools-in-lucknow', on: '2026-10-12' }
