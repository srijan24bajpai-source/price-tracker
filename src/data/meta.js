export const categories = [
  { id: 'electronics', name: 'Electronics & Mobiles', icon: '📱', sellers: ['Amazon', 'Flipkart', 'Croma', 'Reliance Digital', 'Vijay Sales', 'Local Market'] },
  { id: 'vehicles', name: 'Vehicles', icon: '🚗', sellers: ['Authorised Dealer', 'CarDekho Deals', 'Spinny', 'Local Dealer', 'Showroom Exchange'] },
  { id: 'jewelry', name: 'Jewelry & Watches', icon: '💍', sellers: ['Tanishq', 'Malabar', 'Local Sarafa', 'Kalyan', 'Ethos', 'Brand Boutique'] },
  { id: 'cosmetics', name: 'Cosmetics', icon: '💄', sellers: ['Nykaa', 'Amazon', 'Purplle', 'Tira', 'Local Chemist'] },
  { id: 'food', name: 'Food & Sweets', icon: '🍬', sellers: ['BigBasket', 'Blinkit', 'Zepto', 'DMart', 'Local Halwai', 'Kirana Store'] },
  { id: 'vegetables', name: 'Vegetables & Fruits', icon: '🥬', sellers: ['Local Mandi', 'BigBasket', 'Blinkit', 'Zepto', 'Sabzi Thela'] },
  { id: 'clothing', name: 'Clothing & Footwear', icon: '👗', sellers: ['Myntra', 'Ajio', 'Amazon', 'Westside', 'Local Market', 'Brand Store'] },
  { id: 'home', name: 'Home & Appliances', icon: '🛋️', sellers: ['Amazon', 'Flipkart', 'Croma', 'Pepperfry', 'IKEA', 'Local Dealer'] },
  { id: 'health', name: 'Health & Medicine', icon: '💊', sellers: ['1mg', 'PharmEasy', 'Apollo Pharmacy', 'Local Chemist', 'Jan Aushadhi'] },
  { id: 'sports', name: 'Sports & Fitness', icon: '🏏', sellers: ['Decathlon', 'Amazon', 'Flipkart', 'Sports Store', 'Brand Store'] },
  { id: 'education', name: 'School & College Fees', icon: '🎓', sellers: ['School Office', 'Published Fee Structure', 'Admissions Desk'] },
  { id: 'fuel', name: 'Fuel & Utilities', icon: '⛽', sellers: ['Govt. Notified', 'Indian Oil', 'HPCL', 'BPCL'] },
]

export const cities = [
  { id: 'Lucknow', factor: 1 },
  { id: 'Delhi', factor: 1.03 },
  { id: 'Mumbai', factor: 1.08 },
  { id: 'Bengaluru', factor: 1.05 },
  { id: 'Chennai', factor: 1.02 },
  { id: 'Kolkata', factor: 0.99 },
  { id: 'Hyderabad', factor: 1.01 },
  { id: 'Pune', factor: 1.04 },
  { id: 'Jaipur', factor: 0.97 },
  { id: 'Patna', factor: 0.96 },
]

// rate = INR per 1 unit of local currency (indicative)
export const countries = [
  { id: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', rate: 1 },
  { id: 'UAE (Dubai)', flag: '🇦🇪', currency: 'AED', symbol: 'AED ', rate: 24 },
  { id: 'USA', flag: '🇺🇸', currency: 'USD', symbol: '$', rate: 88 },
  { id: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'S$', rate: 66 },
  { id: 'UK', flag: '🇬🇧', currency: 'GBP', symbol: '£', rate: 112 },
  { id: 'Japan', flag: '🇯🇵', currency: 'JPY', symbol: '¥', rate: 0.58 },
  { id: 'Hong Kong', flag: '🇭🇰', currency: 'HKD', symbol: 'HK$', rate: 11.3 },
]

// Default country price multiplier vs India (India = 1), per category.
export const countryFactors = {
  electronics: { 'UAE (Dubai)': 0.9, USA: 0.96, Singapore: 1.0, UK: 1.12, Japan: 0.93, 'Hong Kong': 0.92 },
  vehicles: { 'UAE (Dubai)': 0.72, USA: 0.8, Singapore: 2.6, UK: 1.1, Japan: 0.85, 'Hong Kong': 1.9 },
  jewelry: { 'UAE (Dubai)': 0.94, USA: 1.04, Singapore: 1.03, UK: 1.06, Japan: 1.02, 'Hong Kong': 0.98 },
  cosmetics: { 'UAE (Dubai)': 1.1, USA: 1.2, Singapore: 1.25, UK: 1.3, Japan: 1.1, 'Hong Kong': 1.05 },
  food: { 'UAE (Dubai)': 2.2, USA: 4.5, Singapore: 4, UK: 4.8, Japan: 4.2, 'Hong Kong': 4 },
  vegetables: { 'UAE (Dubai)': 2.4, USA: 5, Singapore: 4.5, UK: 5.2, Japan: 6, 'Hong Kong': 4.5 },
  clothing: { 'UAE (Dubai)': 1.5, USA: 2.2, Singapore: 2.1, UK: 2.4, Japan: 1.9, 'Hong Kong': 1.8 },
  home: { 'UAE (Dubai)': 1.1, USA: 1.2, Singapore: 1.3, UK: 1.4, Japan: 1.2, 'Hong Kong': 1.3 },
  health: { 'UAE (Dubai)': 3, USA: 8, Singapore: 4, UK: 5, Japan: 3.5, 'Hong Kong': 3.5 },
  sports: { 'UAE (Dubai)': 1.1, USA: 1.15, Singapore: 1.25, UK: 1.3, Japan: 1.2, 'Hong Kong': 1.2 },
  education: { 'UAE (Dubai)': 6, USA: 12, Singapore: 10, UK: 11, Japan: 7, 'Hong Kong': 9 },
  fuel: { 'UAE (Dubai)': 0.75, USA: 0.62, Singapore: 2.3, UK: 1.8, Japan: 1.5, 'Hong Kong': 2.8 },
}

// Month-of-year price deviation (Jan..Dec) used for trend + best-time-to-buy.
export const seasonality = {
  electronics: [0, 0, 0.01, 0.01, 0, 0, 0.01, 0.0, 0.01, -0.07, -0.05, 0.0],
  vehicles: [0.01, -0.02, -0.03, 0.01, 0.0, 0.0, 0.0, 0.01, 0.02, 0.03, 0.02, -0.06],
  jewelry: [0.01, 0.0, 0.0, 0.02, 0.03, -0.01, -0.03, -0.03, 0.0, 0.04, 0.04, 0.02],
  cosmetics: [0, 0, 0, 0, 0, -0.03, 0, 0, 0.0, -0.05, -0.04, 0.0],
  food: [0, 0, 0, 0, 0, 0, 0.01, 0.01, 0.02, 0.05, 0.04, 0.0],
  vegetables: [-0.05, -0.08, -0.04, 0.02, 0.08, 0.12, 0.25, 0.2, 0.1, 0.03, -0.04, -0.07],
  clothing: [-0.1, -0.06, 0.0, 0.0, 0.0, -0.08, -0.1, 0.0, 0.03, 0.06, 0.02, -0.04],
  home: [-0.02, 0, 0, 0, 0, -0.03, -0.03, 0, 0.02, -0.06, -0.05, 0],
  health: [0, 0, 0, 0.01, 0, 0, 0, 0, 0, 0, 0, 0],
  sports: [0.0, 0.01, 0.02, 0.03, 0.0, 0.0, -0.02, -0.02, 0.0, 0.0, -0.03, -0.03],
  education: [0, 0, 0.02, 0.05, 0.03, 0, 0, 0, 0, 0, 0, 0],
  fuel: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
