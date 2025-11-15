import { Product, Category, User } from './definitions'

// Category schema per request
export const categories: Category[] = [
  { name: 'Furniture', subCategories: ['Bedroom', 'Living Room', 'Office'] },
  { name: 'Appliances', subCategories: ['Kitchen', 'Living Room'] },
  { name: 'Electronics', subCategories: [] },
]

// Curated realistic items per category/subCategory
type BaseItem = {
  name: string
  category: Product['category']
  subCategory: string
  basePrice: number
  imageSeed: string
  description: string
}

const furnitureBedroom: BaseItem[] = [
  { name: 'Wooden Bed Frame', category: 'Furniture', subCategory: 'Bedroom', basePrice: 9000, imageSeed: 'furn-bed-frame', description: 'Sturdy single bed frame with slats, easy assembly.' },
  { name: 'Memory Foam Mattress', category: 'Furniture', subCategory: 'Bedroom', basePrice: 8000, imageSeed: 'furn-mattress', description: 'Comfortable mattress ideal for semester stays.' },
  { name: 'Compact Wardrobe', category: 'Furniture', subCategory: 'Bedroom', basePrice: 7000, imageSeed: 'furn-wardrobe', description: 'Two-door wardrobe with hanging space and shelves.' },
  { name: 'Bedside Table', category: 'Furniture', subCategory: 'Bedroom', basePrice: 2500, imageSeed: 'furn-bedside-table', description: 'Small night stand with drawer for essentials.' },
  { name: 'Fabric Laundry Basket', category: 'Furniture', subCategory: 'Bedroom', basePrice: 1200, imageSeed: 'furn-laundry-basket', description: 'Collapsible basket for clothes storage.' },
  { name: 'Full-Length Mirror', category: 'Furniture', subCategory: 'Bedroom', basePrice: 3000, imageSeed: 'furn-mirror', description: 'Standing mirror with stable base.' },
  { name: 'Under-Bed Storage Box', category: 'Furniture', subCategory: 'Bedroom', basePrice: 1500, imageSeed: 'furn-underbed-box', description: 'Plastic box for seasonal items.' },
  { name: 'Soft Duvet', category: 'Furniture', subCategory: 'Bedroom', basePrice: 2800, imageSeed: 'furn-duvet', description: 'Warm duvet suitable for mild winters.' },
  { name: 'Desk Lamp (Warm Light)', category: 'Furniture', subCategory: 'Bedroom', basePrice: 1600, imageSeed: 'furn-bed-desk-lamp', description: 'Adjustable lamp for reading at night.' },
  { name: 'Wall Shelf (2-tier)', category: 'Furniture', subCategory: 'Bedroom', basePrice: 2000, imageSeed: 'furn-wall-shelf', description: 'Simple shelf for books and decor.' },
  { name: 'Blackout Curtain Set', category: 'Furniture', subCategory: 'Bedroom', basePrice: 3200, imageSeed: 'furn-blackout-curtain', description: 'Light-blocking curtains for better sleep and privacy.' },
  { name: 'Portable Clothes Rack', category: 'Furniture', subCategory: 'Bedroom', basePrice: 2600, imageSeed: 'furn-clothes-rack', description: 'Metal rack with wheels for extra hanging space.' },
  { name: 'Wall Hook Multi Pack', category: 'Furniture', subCategory: 'Bedroom', basePrice: 900, imageSeed: 'furn-wall-hooks', description: 'Adhesive hooks for bags, coats, and accessories.' },
  { name: 'Bedside USB Charger Hub', category: 'Furniture', subCategory: 'Bedroom', basePrice: 1700, imageSeed: 'furn-usb-hub', description: 'Compact 4-port USB hub for nightly charging.' },
  { name: 'Memory Foam Pillow', category: 'Furniture', subCategory: 'Bedroom', basePrice: 1800, imageSeed: 'furn-pillow', description: 'Ergonomic pillow offering neck support for long study nights.' },
]

const furnitureLiving: BaseItem[] = [
  { name: 'Two-Seater Sofa', category: 'Furniture', subCategory: 'Living Room', basePrice: 10000, imageSeed: 'furn-sofa', description: 'Comfortable fabric sofa, seats two adults.' },
  { name: 'Coffee Table', category: 'Furniture', subCategory: 'Living Room', basePrice: 3500, imageSeed: 'furn-coffee-table', description: 'Low wooden table for drinks and magazines.' },
  { name: 'TV Stand (Medium)', category: 'Furniture', subCategory: 'Living Room', basePrice: 4000, imageSeed: 'furn-tv-stand', description: 'Stand with cable management and storage.' },
  { name: 'Area Rug (Medium)', category: 'Furniture', subCategory: 'Living Room', basePrice: 3000, imageSeed: 'furn-rug', description: 'Soft rug adding warmth to the space.' },
  { name: 'Bookshelf (Tall)', category: 'Furniture', subCategory: 'Living Room', basePrice: 5000, imageSeed: 'furn-bookshelf', description: 'Five-tier shelf for books and plants.' },
  { name: 'Accent Chair', category: 'Furniture', subCategory: 'Living Room', basePrice: 4500, imageSeed: 'furn-accent-chair', description: 'Upholstered chair for additional seating.' },
  { name: 'Floor Lamp', category: 'Furniture', subCategory: 'Living Room', basePrice: 2500, imageSeed: 'furn-floor-lamp', description: 'Lamp with soft ambient lighting.' },
  { name: 'Side Table', category: 'Furniture', subCategory: 'Living Room', basePrice: 2000, imageSeed: 'furn-side-table', description: 'Compact table for remote and mugs.' },
  { name: 'Wall Art Set (3)', category: 'Furniture', subCategory: 'Living Room', basePrice: 1800, imageSeed: 'furn-wall-art', description: 'Minimal prints framed, ready to hang.' },
  { name: 'Smart LED Bulb Set', category: 'Furniture', subCategory: 'Living Room', basePrice: 2200, imageSeed: 'furn-led-bulb', description: 'Color-changing bulbs controlled by app.' },
  { name: 'Throw Blanket (Soft Knit)', category: 'Furniture', subCategory: 'Living Room', basePrice: 1600, imageSeed: 'furn-throw-blanket', description: 'Cozy knit blanket for reading or guests.' },
  { name: 'Indoor Plant (Potted)', category: 'Furniture', subCategory: 'Living Room', basePrice: 1400, imageSeed: 'furn-indoor-plant', description: 'Low-maintenance plant adding fresh ambiance.' },
  { name: 'Magazine Rack', category: 'Furniture', subCategory: 'Living Room', basePrice: 1100, imageSeed: 'furn-mag-rack', description: 'Wire rack keeping papers organized.' },
  { name: 'Decorative Cushion Set (2)', category: 'Furniture', subCategory: 'Living Room', basePrice: 1900, imageSeed: 'furn-cushion-set', description: 'Soft cushions enhancing sofa comfort.' },
  { name: 'Multi-Outlet Power Strip', category: 'Furniture', subCategory: 'Living Room', basePrice: 1300, imageSeed: 'furn-power-strip', description: 'Surge-protected strip for entertainment devices.' },
]

const furnitureOffice: BaseItem[] = [
  { name: 'Study Desk (120cm)', category: 'Furniture', subCategory: 'Office', basePrice: 6000, imageSeed: 'furn-study-desk', description: 'Spacious desk ideal for laptop + notes.' },
  { name: 'Ergonomic Chair', category: 'Furniture', subCategory: 'Office', basePrice: 7000, imageSeed: 'furn-ergonomic-chair', description: 'Adjustable chair with lumbar support.' },
  { name: 'Desk Organizer Set', category: 'Furniture', subCategory: 'Office', basePrice: 1500, imageSeed: 'furn-desk-organizer', description: 'Tray, pen holder, and file rack.' },
  { name: 'Cork Board', category: 'Furniture', subCategory: 'Office', basePrice: 1200, imageSeed: 'furn-cork-board', description: 'Pin board for schedules and notes.' },
  { name: 'Monitor Riser', category: 'Furniture', subCategory: 'Office', basePrice: 1800, imageSeed: 'furn-monitor-riser', description: 'Raises monitor for better posture.' },
  { name: 'Task Lamp (LED)', category: 'Furniture', subCategory: 'Office', basePrice: 2000, imageSeed: 'furn-task-lamp', description: 'Focused lighting for late study.' },
  { name: 'Filing Drawer (2-tier)', category: 'Furniture', subCategory: 'Office', basePrice: 3000, imageSeed: 'furn-filing-drawer', description: 'Compact drawer for documents.' },
  { name: 'Whiteboard (Magnetic)', category: 'Furniture', subCategory: 'Office', basePrice: 2500, imageSeed: 'furn-whiteboard', description: 'Planning board with markers & eraser.' },
  { name: 'Noise Dampening Desk Mat', category: 'Furniture', subCategory: 'Office', basePrice: 1700, imageSeed: 'furn-desk-mat', description: 'Soft mat reducing typing noise and desk wear.' },
  { name: 'Cable Management Tray', category: 'Furniture', subCategory: 'Office', basePrice: 1500, imageSeed: 'furn-cable-tray', description: 'Under-desk tray keeping cords tidy.' },
  { name: 'Laptop Dock Stand', category: 'Furniture', subCategory: 'Office', basePrice: 2600, imageSeed: 'furn-laptop-dock', description: 'Vertical stand saving desk space.' },
  { name: 'Sticky Note Cube (Multi Color)', category: 'Furniture', subCategory: 'Office', basePrice: 900, imageSeed: 'furn-sticky-note', description: 'Color-coded notes for quick reminders.' },
]

const appliancesKitchen: BaseItem[] = [
  { name: 'Microwave Oven', category: 'Appliances', subCategory: 'Kitchen', basePrice: 8000, imageSeed: 'appl-microwave', description: 'Standard microwave with timer + defrost.' },
  { name: 'Electric Kettle', category: 'Appliances', subCategory: 'Kitchen', basePrice: 2500, imageSeed: 'appl-kettle', description: '1.5L kettle auto shut-off.' },
  { name: 'Rice Cooker (Small)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 4000, imageSeed: 'appl-rice-cooker', description: 'Perfect size for single student meals.' },
  { name: 'Toaster (2-slot)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 2200, imageSeed: 'appl-toaster', description: 'Even browning, easy to clean tray.' },
  { name: 'Blender', category: 'Appliances', subCategory: 'Kitchen', basePrice: 3500, imageSeed: 'appl-blender', description: 'Ideal for smoothies and sauces.' },
  { name: 'Air Fryer (Compact)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 5000, imageSeed: 'appl-air-fryer', description: 'Low-oil frying for quick meals.' },
  { name: 'Cutlery Set (24 pcs)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1800, imageSeed: 'appl-cutlery', description: 'Forks, spoons, knives in organizer.' },
  { name: 'Non-stick Pan', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1600, imageSeed: 'appl-pan', description: 'Easy-clean pan for daily cooking.' },
  { name: 'Cooking Pot (Medium)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 2200, imageSeed: 'appl-pot', description: 'Multi-purpose pot with lid.' },
  { name: 'Kitchen Utensil Set', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1400, imageSeed: 'appl-utensils', description: 'Spatula, ladle, whisk, tongs set.' },
  { name: 'Food Storage Container Set', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1300, imageSeed: 'appl-food-storage', description: 'Airtight containers (5 pack).' },
  { name: 'Dish Drying Rack', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1700, imageSeed: 'appl-dish-rack', description: 'Two-tier stainless rack.' },
  { name: 'Electric Grill Plate', category: 'Appliances', subCategory: 'Kitchen', basePrice: 4200, imageSeed: 'appl-grill', description: 'Indoor grilling for shared meals.' },
  { name: 'Measuring Cup & Spoon Set', category: 'Appliances', subCategory: 'Kitchen', basePrice: 900, imageSeed: 'appl-measure', description: 'Essential for accurate cooking.' },
  { name: 'Dish Towels (Set of 5)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1000, imageSeed: 'appl-dish-towels', description: 'Absorbent cotton towels for daily cleanup.' },
  { name: 'Kitchen Scale (Digital)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1800, imageSeed: 'appl-kitchen-scale', description: 'Accurate scale for portion control.' },
  { name: 'Silicone Spatula Set (3)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1100, imageSeed: 'appl-silicone-spatula', description: 'Heat-resistant spatulas for non-stick cookware.' },
  { name: 'Knife Set (Chef + Paring)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 3000, imageSeed: 'appl-knife-set', description: 'Essential stainless knives with protective guards.' },
  { name: 'Reusable Water Bottle (Steel)', category: 'Appliances', subCategory: 'Kitchen', basePrice: 1400, imageSeed: 'appl-water-bottle', description: 'Keeps drinks cold or warm for hours.' },
  { name: 'Plastic Cutting Board', category: 'Appliances', subCategory: 'Kitchen', basePrice: 900, imageSeed: 'appl-cutting-board', description: 'Non-slip board for safe slicing.' },
]

const appliancesLiving: BaseItem[] = [
  { name: 'Vacuum Cleaner', category: 'Appliances', subCategory: 'Living Room', basePrice: 6000, imageSeed: 'appl-vacuum', description: 'Bagless vacuum for quick cleaning.' },
  { name: 'Humidifier', category: 'Appliances', subCategory: 'Living Room', basePrice: 3200, imageSeed: 'appl-humidifier', description: 'Improves air moisture in dry seasons.' },
  { name: 'Space Heater (Safe)', category: 'Appliances', subCategory: 'Living Room', basePrice: 5500, imageSeed: 'appl-heater', description: 'Auto shut-off ceramic heater.' },
  { name: 'Fan (Standing)', category: 'Appliances', subCategory: 'Living Room', basePrice: 2800, imageSeed: 'appl-fan', description: 'Adjustable height oscillating fan.' },
  { name: 'Dehumidifier (Small)', category: 'Appliances', subCategory: 'Living Room', basePrice: 5000, imageSeed: 'appl-dehumidifier', description: 'Removes excess moisture to prevent mold.' },
  { name: 'Smart Plug Set (2)', category: 'Appliances', subCategory: 'Living Room', basePrice: 2400, imageSeed: 'appl-smart-plug', description: 'Remote control of power via app.' },
  { name: 'Air Purifier (Compact)', category: 'Appliances', subCategory: 'Living Room', basePrice: 6500, imageSeed: 'appl-air-purifier', description: 'Filters dust and allergens quietly.' },
  { name: 'LED Strip Lighting', category: 'Appliances', subCategory: 'Living Room', basePrice: 2100, imageSeed: 'appl-led-strip', description: 'Adds ambient lighting behind furniture.' },
  { name: 'Smart Thermometer', category: 'Appliances', subCategory: 'Living Room', basePrice: 1300, imageSeed: 'appl-thermometer', description: 'Digital indoor temperature display.' },
  { name: 'Remote Control Organizer', category: 'Appliances', subCategory: 'Living Room', basePrice: 800, imageSeed: 'appl-remote-organizer', description: 'Keeps remotes and small gadgets together.' },
  { name: 'Cordless Handheld Vacuum', category: 'Appliances', subCategory: 'Living Room', basePrice: 4200, imageSeed: 'appl-hand-vacuum', description: 'Quick spot cleaning for crumbs and dust.' },
  { name: 'Portable Fan Heater Combo', category: 'Appliances', subCategory: 'Living Room', basePrice: 6000, imageSeed: 'appl-fan-heater', description: 'Dual-mode unit for seasonal comfort.' },
]

const electronicsGeneral: BaseItem[] = [
  { name: '24" LED Monitor', category: 'Electronics', subCategory: 'General', basePrice: 8500, imageSeed: 'elec-monitor', description: 'Full HD monitor, perfect for study.' },
  { name: 'Wireless Keyboard', category: 'Electronics', subCategory: 'General', basePrice: 2500, imageSeed: 'elec-keyboard', description: 'Compact keyboard with silent keys.' },
  { name: 'Wireless Mouse', category: 'Electronics', subCategory: 'General', basePrice: 1800, imageSeed: 'elec-mouse', description: 'Optical mouse, long battery life.' },
  { name: 'USB-C Hub (Multiport)', category: 'Electronics', subCategory: 'General', basePrice: 2200, imageSeed: 'elec-hub', description: 'Adds HDMI + USB + card reader.' },
  { name: 'Bluetooth Speaker', category: 'Electronics', subCategory: 'General', basePrice: 3000, imageSeed: 'elec-speaker', description: 'Portable speaker with rich sound.' },
  { name: 'Noise Cancelling Headphones', category: 'Electronics', subCategory: 'General', basePrice: 9000, imageSeed: 'elec-headphones', description: 'Great for focused study sessions.' },
  { name: 'Webcam (HD)', category: 'Electronics', subCategory: 'General', basePrice: 2500, imageSeed: 'elec-webcam', description: 'Clear video for calls and classes.' },
  { name: 'Portable SSD (500GB)', category: 'Electronics', subCategory: 'General', basePrice: 7000, imageSeed: 'elec-ssd', description: 'Fast external storage backup.' },
  { name: 'Laptop Stand', category: 'Electronics', subCategory: 'General', basePrice: 2000, imageSeed: 'elec-laptop-stand', description: 'Raises laptop to eye level.' },
  { name: 'HDMI Cable (2m)', category: 'Electronics', subCategory: 'General', basePrice: 800, imageSeed: 'elec-hdmi', description: 'Reliable cable for external display.' },
  { name: 'USB-C Charger (65W)', category: 'Electronics', subCategory: 'General', basePrice: 3500, imageSeed: 'elec-charger', description: 'Fast charger for modern laptops.' },
  { name: 'Action Camera', category: 'Electronics', subCategory: 'General', basePrice: 10000, imageSeed: 'elec-action-cam', description: 'Water-resistant camera for trips.' },
  { name: 'Power Bank (10000mAh)', category: 'Electronics', subCategory: 'General', basePrice: 2600, imageSeed: 'elec-power-bank', description: 'Charges devices on the go.' },
  { name: 'Smartwatch', category: 'Electronics', subCategory: 'General', basePrice: 8500, imageSeed: 'elec-smartwatch', description: 'Tracks activity and notifications.' },
  { name: 'Desk USB Fan', category: 'Electronics', subCategory: 'General', basePrice: 1200, imageSeed: 'elec-usb-fan', description: 'Compact fan powered by USB.' },
  { name: 'Wireless Earbuds', category: 'Electronics', subCategory: 'General', basePrice: 6000, imageSeed: 'elec-earbuds', description: 'True wireless earbuds with case.' },
  { name: 'Wi-Fi Router', category: 'Electronics', subCategory: 'General', basePrice: 5000, imageSeed: 'elec-router', description: 'Dual-band router for stable internet.' },
  { name: 'External DVD Drive', category: 'Electronics', subCategory: 'General', basePrice: 3000, imageSeed: 'elec-dvd', description: 'USB drive for legacy media.' },
  { name: 'Cable Organizer Kit', category: 'Electronics', subCategory: 'General', basePrice: 1000, imageSeed: 'elec-cable-org', description: 'Clips and sleeves to tidy cables.' },
  { name: 'Surge Protector', category: 'Electronics', subCategory: 'General', basePrice: 1800, imageSeed: 'elec-surge', description: 'Multi-outlet with surge protection.' },
  { name: 'Portable Projector', category: 'Electronics', subCategory: 'General', basePrice: 12000, imageSeed: 'elec-projector', description: 'Mini projector for movie nights.' },
  { name: 'USB Desk Charging Station', category: 'Electronics', subCategory: 'General', basePrice: 2800, imageSeed: 'elec-charging-station', description: 'Multiple USB ports for devices.' },
  { name: 'Ethernet Cable (5m)', category: 'Electronics', subCategory: 'General', basePrice: 900, imageSeed: 'elec-ethernet', description: 'Stable wired connection for dorm networking.' },
  { name: 'Portable Power Strip (Travel)', category: 'Electronics', subCategory: 'General', basePrice: 1600, imageSeed: 'elec-travel-strip', description: 'Compact strip with universal outlets.' },
  { name: 'USB Desk Lamp', category: 'Electronics', subCategory: 'General', basePrice: 1700, imageSeed: 'elec-usb-lamp', description: 'Energy-saving LED lamp powered by USB.' },
  { name: 'Webcam Privacy Cover Set', category: 'Electronics', subCategory: 'General', basePrice: 600, imageSeed: 'elec-privacy-cover', description: 'Slide covers protecting camera privacy.' },
  { name: 'Laptop Cooling Pad', category: 'Electronics', subCategory: 'General', basePrice: 2400, imageSeed: 'elec-cooling-pad', description: 'Dual-fan pad improving airflow for laptops.' },
  { name: 'Portable Bluetooth Printer', category: 'Electronics', subCategory: 'General', basePrice: 9000, imageSeed: 'elec-printer', description: 'Small printer for reports and tickets.' },
  { name: 'USB Flash Drive (64GB)', category: 'Electronics', subCategory: 'General', basePrice: 1400, imageSeed: 'elec-usb-drive', description: 'Reliable storage for assignments.' },
  { name: 'Rechargeable Battery Set (AA)', category: 'Electronics', subCategory: 'General', basePrice: 1900, imageSeed: 'elec-battery-set', description: 'Includes charger + 4 AA cells.' },
  { name: 'Desk Cable Clips (Pack)', category: 'Electronics', subCategory: 'General', basePrice: 700, imageSeed: 'elec-cable-clips', description: 'Keeps charging cables from tangling.' },
  { name: 'Mini Tripod (Flexible)', category: 'Electronics', subCategory: 'General', basePrice: 1800, imageSeed: 'elec-mini-tripod', description: 'Flexible legs for phone or camera stability.' },
]

const allBase: BaseItem[] = [
  ...furnitureBedroom,
  ...furnitureLiving,
  ...furnitureOffice,
  ...appliancesKitchen,
  ...appliancesLiving,
  ...electronicsGeneral,
]

const conditions: Product['condition'][] = ['New', 'Good', 'Old']

function chooseLocalImage(seed: string) {
  const s = seed.toLowerCase()
  if (s.includes('bed') || s.includes('mattress')) return '/mattress.png'
  if (s.includes('sofa') || s.includes('cushion') || s.includes('throw') || s.includes('accent') || s.includes('chair')) return '/chair.png'
  if (s.includes('desk') || s.includes('study') || s.includes('monitor') || s.includes('laptop') || s.includes('riser') || s.includes('desk-')) return '/desk.png'
  if (s.includes('table') || s.includes('coffee') || s.includes('side') || s.includes('dining') || s.includes('bedside') || s.includes('table-')) return '/table.png'
  if (s.includes('tv') || s.includes('stand') || s.includes('projector')) return '/tv.png'
  if (s.includes('fan') || s.includes('fan-')) return '/fan.png'
  if (s.includes('vacuum') || s.includes('vac') || s.includes('hand-vac') || s.includes('dehumidifier') || s.includes('cleaner')) return '/vacuum.png'
  if (s.includes('speaker') || s.includes('bluetooth') || s.includes('audio')) return '/speaker.png'
  if (s.includes('camera') || s.includes('webcam') || s.includes('action')) return '/camera.png'
  if (s.includes('cable') || s.includes('usb') || s.includes('charger') || s.includes('hdmi')) return '/cable.png'
  if (s.includes('mattress')) return '/mattress.png'
  return '/chair.png'
}

export const products: Product[] = allBase.map((item, i) => {
  const condition = conditions[i % conditions.length]
  const rating = 3 + (i % 3) // 3–5
  const isAvailable = i % 6 !== 0 // every 6th item marked rented
  const pricePerSemester = item.basePrice
  const img = chooseLocalImage(item.imageSeed)
  return {
    id: (i + 1).toString(),
    name: item.name,
    description: `${item.description} Ideal for exchange students seeking temporary use.`,
    images: [img, '/logo.png'],
    condition,
    rating,
    isAvailable,
    pricePerSemester,
    category: item.category,
    subCategory: item.subCategory,
  }
})

// Demo user for mock login
export const demoUser: User & { password: string } = {
  id: 'u-1',
  username: 'user',
  name: 'Demo Student',
  password: '1234',
}
