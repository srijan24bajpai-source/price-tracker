// Where each price comes from. Every link below was opened or returned by a search while compiling the data.
// Items with no entry here are plain sample estimates and the product page says so.
import { slug } from '../lib/util.js'

export const FEEDS = {
  metals: { label: 'Gold API: live spot gold, silver and platinum prices', url: 'https://gold-api.com' },
  fx: { label: 'ExchangeRate-API: live currency rates used for ₹ conversion', url: 'https://www.exchangerate-api.com' },
  mandi: { label: 'Agmarknet / data.gov.in: government mandi (wholesale) prices', url: 'https://agmarknet.gov.in' },
}

const BRAND_SLUG = {
  'Maruti Suzuki': 'maruti-suzuki', Hyundai: 'hyundai', Tata: 'tata', Mahindra: 'mahindra', Toyota: 'toyota', Honda: 'honda', Kia: 'kia',
  Volkswagen: 'volkswagen', Skoda: 'skoda', MG: 'mg', Renault: 'renault', Nissan: 'nissan', Citroen: 'citroen', Jeep: 'jeep', BYD: 'byd',
  Tesla: 'tesla', 'Mercedes-Benz': 'mercedes-benz', BMW: 'bmw', Audi: 'audi', Volvo: 'volvo', 'Land Rover': 'land-rover', Porsche: 'porsche',
  Ferrari: 'ferrari',
}
export function carwaleUrl(name) {
  const brand = Object.keys(BRAND_SLUG).find((b) => name.startsWith(b + ' '))
  if (!brand) return null
  return `https://www.carwale.com/${BRAND_SLUG[brand]}-cars/${slug(name.slice(brand.length + 1))}/`
}

// Label (as written in verified.js) -> page
const VERIFIED_URL = [
  ['Autocar India', 'https://www.autocarindia.com/cars'],
  ['91wheels', 'https://www.91wheels.com/cars'],
  ['CarOnPhone', 'https://www.caronphone.com/news/toyota-car-prices-increased-by-up-to-rs-33000-check-full-model-wise-list-july-2026/'],
  ['CarHP', 'https://carhp.in/compare-cars/land-rover-defender-vs-bmw-x5'],
  ['CarDekho', 'https://www.cardekho.com/cars/Tata'],
  ['BankBazaar', 'https://www.bankbazaar.com/car-loan/car-prices-in-india.html'],
  ['MyCarJunction', 'https://mycarjunction.com/porsche/macan/price-in-roorkee'],
  ['CarWale launch report', 'https://www.carwale.com/news/2026-mahindra-scorpio-n-launched-in-india-at-rs-1349-lakh/'],
  ['Mahindra Jul 2026', 'https://www.rushlane.com/mahindra-thar-and-xuv-3xo-price-hike-july-2026-details-12550924.html'],
  ['Maruti post-GST', 'https://www.autocarindia.com/car-news/maruti-suzuki-prices-after-gst-cuts-the-swift-gets-a-lakh-cheaper-437189'],
  ['Launch note (XUV 7XO)', 'https://www.autocarindia.com/cars/mahindra'],
  ['Listing', 'https://www.autocarindia.com/cars/mahindra'],
]

// Apple items: matched by name pattern
const ETV_IPHONE = { label: 'ETV Bharat: iPhone price hike in India, Sept 2026', url: 'https://www.etvbharat.com/en/technology/iphone-17-iphone-17-price-hike-india-iphone-air-new-price-iphone-17e-price-hike-enn26091004687' }
const BT_IPHONE = { label: 'Business Today: iPhone 17, Air and 17e get costlier', url: 'https://www.businesstoday.in/technology/news/story/iphone-17-iphone-air-17e-get-costlier-in-india-after-apple-event-check-new-prices-554418-2026-09-10' }
const APPLE_RULES = [
  [/^iPhone 18 Pro( Max)? \(256GB\)/, [
    { label: 'Esquire India: iPhone 18 Pro prices (India, US, UK, UAE)', url: 'https://www.esquireindia.co.in/tech-and-auto/gadgets/iphone-18-pro-price-in-india-us-uk-uae-australia-canada-164900' },
    { label: 'Analytics Insight: iPhone 18 prices compared', url: 'https://www.analyticsinsight.net/news/iphone-18-prices-compared-india-uae-us-which-is-the-most-expensive' },
    { label: 'Gulf News: price gap, Dubai vs India', url: 'https://gulfnews.com/technology/indian-buyers-fly-to-dubai-for-iphone-18-pro-as-price-gap-makes-uae-cheaper-shoppers-say-1.500679122' },
  ]],
  [/^iPhone 18 Pro( Max)? \((512GB|1TB|2TB)\)/, [
    { label: 'The Mac Observer: every storage tier, US, UK, India', url: 'https://www.macobserver.com/tips/round-ups/iphone-18-pro-max-price-every-storage-tier-vs-iphone-18-pro-us-uk-india/' },
    { label: 'Cashify: iPhone 18 Pro Max price in India', url: 'https://www.cashify.in/apple-iphone-18-pro-max-price-in-india' },
    { label: 'Nerdschalk: prices by storage tier', url: 'https://nerdschalk.com/iphone-18-pro-prices-storage-tiers' },
  ]],
  [/^iPhone Duo/, [{ label: 'Analytics Insight: iPhone 18 prices compared', url: 'https://www.analyticsinsight.net/news/iphone-18-prices-compared-india-uae-us-which-is-the-most-expensive' }]],
  [/^iPhone (17 \(|Air|17e|16 \()/, [ETV_IPHONE, BT_IPHONE]],
  [/^iPhone 17 Pro/, [BT_IPHONE]],
  [/^iPad Air/, [{ label: 'ETV Bharat: iPad Air (2026) launched in India', url: 'https://www.etvbharat.com/en/technology/ipad-air-2026-launched-in-india-price-specifications-availability-enn26030301687' }]],
  [/^iPad (mini|Pro)/, [{ label: 'Deccan Chronicle: iPad lineup and prices in India (older)', url: 'https://deccanchronicle.com/technology/ipad-air-ipad-pro-specifications-prices-893489' }]],
  [/^MacBook Air/, [{ label: 'ETV Bharat: MacBook Air (2026) launched in India', url: 'https://www.etvbharat.com/en/technology/apple-macbook-air-2026-launched-in-india-price-specifications-enn26030401257' }]],
  [/^MacBook Pro/, [{ label: 'TechEnclave forum: M5 MacBook lineup (unofficial)', url: 'https://techenclave.com/t/apple-refreshes-the-entire-macbook-lineup-with-m5-air-pro-and-new-silicon/418435' }]],
  [/^(Apple Watch|AirPods)/, [
    { label: 'Business Standard: Apple Watch Series 11, Ultra 3, SE 3 India pricing', url: 'https://www.business-standard.com/technology/tech-news/apple-watch-series-11-ultra-3-se-3-india-pricing-availability-and-more-125091000371_1.html' },
    { label: 'WION: Apple Watch prices in India revealed', url: 'https://www.wionews.com/business-economy/apple-watch-se-3-apple-watch-11-apple-watch-ultra-3-prices-in-india-revealed-1757502729584/amp' },
  ]],
]

const FUEL = {
  Petrol: [{ label: 'Newstrack: petrol and diesel price today, city-wise', url: 'https://newstrack.com/business/petrol-diesel-price-today-12-october-2026-delhi-mumbai-lucknow-noida-patna-jaipur-city-wise-rates-639342' }],
  Diesel: [
    { label: 'Newstrack: petrol and diesel price today, city-wise', url: 'https://newstrack.com/business/petrol-diesel-price-today-12-october-2026-delhi-mumbai-lucknow-noida-patna-jaipur-city-wise-rates-639342' },
    { label: 'Goodreturns: diesel price in Lucknow', url: 'https://www.goodreturns.in/diesel-price-in-lucknow.html' },
  ],
}

// Returns [{ label, url }] for the product page. Empty array = sample estimate with no source yet.
export function linksFor({ name, cat, live, hasVariants, verifiedLabel }) {
  const out = []
  const add = (l) => l && !out.some((x) => x.url === l.url) && out.push(l)
  if (live) {
    if (cat === 'jewelry') { add(FEEDS.metals); add(FEEDS.fx) }
    else if (cat === 'vegetables') add(FEEDS.mandi)
  }
  if (hasVariants) {
    const u = carwaleUrl(name)
    if (u) add({ label: 'CarWale: variant-wise prices for ' + name, url: u })
  }
  if (verifiedLabel) {
    const hit = VERIFIED_URL.find(([k]) => verifiedLabel.includes(k))
    if (hit) add({ label: hit[0] + ' (source for this price)', url: hit[1] })
  }
  for (const [re, links] of APPLE_RULES) if (re.test(name)) { links.forEach(add); break }
  ;(FUEL[name] || []).forEach(add)
  return out
}
