// Sample per-sq-ft rates (INR). Illustrative only – verify with builders/registrar before any decision.
export const projects = [
  { id: 're1', name: 'Migsun Wyoming', builder: 'Migsun Group', city: 'Lucknow', area: 'Gomti Nagar Extension', type: 'Apartment', minPsf: 5200, maxPsf: 6400, status: 'Under construction', possession: 'Dec 2027' },
  { id: 're2', name: 'Migsun Ultimo', builder: 'Migsun Group', city: 'Lucknow', area: 'Vrindavan Yojna', type: 'Apartment', minPsf: 4600, maxPsf: 5600, status: 'Under construction', possession: 'Jun 2027' },
  { id: 're3', name: 'Jashn Reality Residency', builder: 'Jashn Reality', city: 'Lucknow', area: 'Sultanpur Road', type: 'Apartment', minPsf: 4200, maxPsf: 5300, status: 'Launch', possession: 'Mar 2028' },
  { id: 're4', name: 'Jashn Reality Plots', builder: 'Jashn Reality', city: 'Lucknow', area: 'Faizabad Road', type: 'Plot', minPsf: 2400, maxPsf: 3200, status: 'Ready', possession: 'Immediate' },
  { id: 're5', name: 'Eldeco Live By The Greens', builder: 'Eldeco', city: 'Lucknow', area: 'Sultanpur Road', type: 'Apartment', minPsf: 5000, maxPsf: 6000, status: 'Under construction', possession: 'Sep 2027' },
  { id: 're6', name: 'Omaxe Cassia', builder: 'Omaxe', city: 'Lucknow', area: 'Shaheed Path', type: 'Apartment', minPsf: 4400, maxPsf: 5200, status: 'Ready', possession: 'Immediate' },
  { id: 're7', name: 'Ansal API Sushant Golf City Plots', builder: 'Ansal API', city: 'Lucknow', area: 'Sushant Golf City', type: 'Plot', minPsf: 3000, maxPsf: 4200, status: 'Ready', possession: 'Immediate' },
  { id: 're8', name: 'LDA Residential Plot Scheme', builder: 'Lucknow Development Authority', city: 'Lucknow', area: 'Various sectors', type: 'Plot', minPsf: 3500, maxPsf: 6500, status: 'Auction', possession: 'On allotment' },
  { id: 're9', name: 'Lodha Park', builder: 'Lodha', city: 'Mumbai', area: 'Worli', type: 'Apartment', minPsf: 58000, maxPsf: 85000, status: 'Ready', possession: 'Immediate' },
  { id: 're10', name: 'DLF The Camellias', builder: 'DLF', city: 'Delhi', area: 'Gurugram', type: 'Apartment', minPsf: 60000, maxPsf: 90000, status: 'Ready', possession: 'Immediate' },
  { id: 're11', name: 'Prestige Lakeside Habitat', builder: 'Prestige', city: 'Bengaluru', area: 'Whitefield', type: 'Apartment', minPsf: 9500, maxPsf: 13500, status: 'Ready', possession: 'Immediate' },
  { id: 're12', name: 'Sobha Dream Acres', builder: 'Sobha', city: 'Bengaluru', area: 'Panathur', type: 'Apartment', minPsf: 7500, maxPsf: 10500, status: 'Ready', possession: 'Immediate' },
  { id: 're13', name: 'Godrej Properties Plot', builder: 'Godrej', city: 'Pune', area: 'Hinjewadi', type: 'Apartment', minPsf: 8500, maxPsf: 12500, status: 'Under construction', possession: 'Dec 2027' },
  { id: 're14', name: 'My Home Bhooja', builder: 'My Home', city: 'Hyderabad', area: 'Raidurg', type: 'Apartment', minPsf: 8500, maxPsf: 12000, status: 'Ready', possession: 'Immediate' },
  { id: 're15', name: 'Shapoorji Joyville', builder: 'Shapoorji', city: 'Kolkata', area: 'Howrah', type: 'Apartment', minPsf: 5000, maxPsf: 7500, status: 'Under construction', possession: 'Mar 2028' },
  { id: 're16', name: 'Mansarovar Residential Plots', builder: 'JDA', city: 'Jaipur', area: 'Mansarovar', type: 'Plot', minPsf: 4500, maxPsf: 8500, status: 'Ready', possession: 'Immediate' },
]

// World per-sq-ft comparison (INR-equivalent), prime residential avg.
export const worldPsf = [
  { country: 'India', city: 'Lucknow', psf: 5000, note: 'Tier-2 city avg' },
  { country: 'India', city: 'Mumbai', psf: 35000, note: 'Metro avg' },
  { country: 'India', city: 'Delhi NCR', psf: 12000, note: 'Metro avg' },
  { country: 'UAE (Dubai)', city: 'Dubai', psf: 27000, note: 'Downtown/Marina avg' },
  { country: 'USA', city: 'New York', psf: 90000, note: 'Manhattan avg' },
  { country: 'Singapore', city: 'Singapore', psf: 130000, note: 'Private condo avg' },
  { country: 'UK', city: 'London', psf: 100000, note: 'Central avg' },
  { country: 'Japan', city: 'Tokyo', psf: 70000, note: '23 wards avg' },
  { country: 'Hong Kong', city: 'Hong Kong', psf: 200000, note: 'Avg' },
]
