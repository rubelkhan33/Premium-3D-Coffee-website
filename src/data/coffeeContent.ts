import { MenuItem, BeanToCupStage, StoryMilestone, Testimonial, CafeInfo } from '../types';

export const CAFE_INFO: CafeInfo = {
  name: 'EMBER & BEAN',
  tagline: 'Slow mornings. Deep conversations. Exceptional coffee.',
  address: '27 Willow Street',
  neighborhood: 'Old Mill Arts District',
  hoursWeekday: '7:00 AM — 9:00 PM',
  hoursWeekend: '8:00 AM — 9:00 PM',
  phone: '+88 01768-877746',
  email: 'hello@emberandbean.com',
  linkedin: 'https://www.linkedin.com/in/rubelkhan-ai'
};

export const NAVIGATION_LINKS = [
  { label: 'The Craft', href: '#the-craft' },
  { label: 'Interactive Beans', href: '#beans-experience' },
  { label: 'Menu', href: '#menu' },
  { label: 'Signature', href: '#signature' },
  { label: 'Bean to Cup', href: '#bean-to-cup' },
  { label: 'Atmosphere', href: '#atmosphere' },
  { label: 'Our Story', href: '#story' },
  { label: 'Visit', href: '#visit' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'ember-espresso',
    name: 'EMBER ESPRESSO',
    category: 'ESPRESSO',
    description: 'Our flagship double shot. Velvety body with layered dried fig, dark chocolate ganache, and toasted hazelnut finish.',
    price: '$4.50',
    origin: 'Antioquia, Colombia & Yirgacheffe, Ethiopia',
    notes: ['Dark Chocolate', 'Dried Fig', 'Orange Blossom'],
    temperature: 'Hot',
    roastLevel: 'Medium',
    accentColor: '#c68449'
  },
  {
    id: 'velvet-latte',
    name: 'VELVET LATTE',
    category: 'ESPRESSO',
    description: 'Micro-textured steamed jersey milk folded over a ristretto pull. Silky, balanced sweetness with no added sugars.',
    price: '$6.00',
    origin: 'Huila, Colombia',
    notes: ['Salted Caramel', 'Brown Butter', 'Pecan'],
    temperature: 'Choice',
    roastLevel: 'Medium',
    accentColor: '#dfa26b'
  },
  {
    id: 'honey-cortado',
    name: 'HONEY CORTADO',
    category: 'ESPRESSO',
    description: 'Equal parts dense espresso and velvety steamed milk infused with raw wildflower honey and grated Ceylon cinnamon.',
    price: '$5.50',
    origin: 'Tarrazú, Costa Rica',
    notes: ['Wild Honey', 'Cinnamon Bark', 'Almond Butter'],
    temperature: 'Hot',
    roastLevel: 'Light',
    accentColor: '#d4a373'
  },
  {
    id: 'dark-mocha',
    name: 'DARK MOCHA',
    category: 'ESPRESSO',
    description: 'Single-origin 72% Ecuadorian bean-to-bar melted chocolate, double espresso, and steamed milk dusted with raw cocoa nibs.',
    price: '$6.75',
    origin: 'Ecuador & Sidama, Ethiopia',
    notes: ['72% Cocoa', 'Black Cherry', 'Molasses'],
    temperature: 'Choice',
    roastLevel: 'Medium-Dark',
    accentColor: '#8e5424'
  },
  {
    id: 'citrus-filter',
    name: 'CITRUS FILTER',
    category: 'FILTER',
    description: 'Hand-poured single origin over Kalita Wave 185. Crystalline clarity with sparkling bergamot, peach nectar, and jasmine tea floral notes.',
    price: '$6.50',
    origin: 'Guji, Ethiopia (Natural Process)',
    notes: ['Bergamot', 'Peach Nectar', 'Jasmine'],
    temperature: 'Hot',
    roastLevel: 'Light',
    accentColor: '#e09f58'
  },
  {
    id: 'cold-brew',
    name: 'COLD BREW',
    category: 'COLD',
    description: 'Steeped for 20 hours in Kyoto-style slow drip towers. Exceptionally clean, low-acidity profile with intense bourbon vanilla aroma.',
    price: '$5.75',
    origin: 'Sumatra Mandheling & Chiapas, Mexico',
    notes: ['Bourbon Vanilla', 'Cedar', 'Dark Plum'],
    temperature: 'Iced',
    roastLevel: 'Medium-Dark',
    accentColor: '#6c472d'
  },
  {
    id: 'smoked-amber-tonic',
    name: 'SMOKED AMBER TONIC',
    category: 'SIGNATURE',
    description: 'Chilled espresso float over artisanal elderflower tonic, charred rosemary sprig, and clarified blood orange essence.',
    price: '$7.50',
    origin: 'Yirgacheffe, Ethiopia',
    notes: ['Elderflower', 'Blood Orange', 'Charred Rosemary'],
    temperature: 'Iced',
    roastLevel: 'Light',
    accentColor: '#c68449'
  },
  {
    id: 'sea-salt-maple-latte',
    name: 'SEA SALT MAPLE LATTE',
    category: 'SIGNATURE',
    description: 'Wood-fired Vermont Grade A amber maple syrup, smoked Maldon flake salt, and rich espresso over velvety microfoam.',
    price: '$7.00',
    origin: 'Santa Ana, El Salvador',
    notes: ['Smoked Salt', 'Amber Maple', 'Graham Cracker'],
    temperature: 'Choice',
    roastLevel: 'Medium',
    accentColor: '#dfa26b'
  }
];

export const SIGNATURE_DRINK = {
  name: 'THE EMBER SMOKED CORTADO',
  subtitle: 'Our House Signature Spec',
  description: 'A sensory ritual combining oak-smoked extraction, single-origin espresso, small-farm whole milk, and a pinch of hand-harvested Atlantic sea salt. Served in hand-blown annealed glass.',
  price: '$7.25',
  ingredients: [
    { name: 'ESPRESSO', detail: '22g in / 44g out • 27s pull • Guji Anaerobic' },
    { name: 'VANILLA', detail: 'Single-estate Madagascar planifolia pods cured in-house' },
    { name: 'SEA SALT', detail: 'Maldon smoked crystal flakes harvested on tides' },
    { name: 'MILK', detail: 'Jersey cow 4.8% fat microfoam steamed to 58°C' }
  ],
  tastingNotes: ['Smoked Vanilla', 'Toffee Crisp', 'Bergamot Zest', 'Velvet Finish']
};

export const BEAN_TO_CUP_STAGES: BeanToCupStage[] = [
  {
    step: '01',
    title: 'SOURCE',
    subtitle: 'Direct Trade Micro-lots',
    description: 'We partner directly with high-elevation smallholders in Colombia, Ethiopia, and Guatemala. Every cherry is hand-picked at peak Brix sugar density above 1,900 meters.',
    metric: '1,950m',
    metricLabel: 'Average Elevation',
    details: [
      '100% Arabica varietals (Geisha, Bourbon, SL28)',
      'Direct living-wage premiums paid to farmers',
      'Zero synthetic pesticides or stripped harvests'
    ]
  },
  {
    step: '02',
    title: 'ROAST',
    subtitle: 'Custom Convection Drum',
    description: 'Small 6kg batches roasted in cast iron. We profile each bean to respect its terroir, stopping heat right before the second crack to preserve floral volatiles.',
    metric: '11.4 min',
    metricLabel: 'Roast Profile Time',
    details: [
      'Gentle rate-of-rise curve monitoring',
      'Preservation of delicate citric & malic acidity',
      'Rested precisely 7 days before service'
    ]
  },
  {
    step: '03',
    title: 'GRIND',
    subtitle: 'Flat Titanium Burrs',
    description: 'Bimodal particle distributions destroy flavor clarity. We grind using 98mm SSP flat burrs with active ionizers to eliminate static and micro-fines.',
    metric: '98mm',
    metricLabel: 'Titanium Burr Diameter',
    details: [
      'Zero-retention single dose workflow',
      'Laser-aligned burr tolerances (<3 microns)',
      'Real-time temperature controlled grinding chamber'
    ]
  },
  {
    step: '04',
    title: 'BREW',
    subtitle: 'Remineralized Pure Water',
    description: 'Coffee is 98% water. We reconstitute reverse-osmosis water with exact magnesium and calcium ratios at 93.5°C with pressure-profiling gear pumps.',
    metric: '93.5°C',
    metricLabel: 'Precise Extraction Temp',
    details: [
      'Target 130ppm total dissolved solids',
      'Pre-infusion blooming under 2 bars',
      'Refractometer-verified 20.5% extraction yield'
    ]
  },
  {
    step: '05',
    title: 'SERVE',
    subtitle: 'Tactile Ceramic Sanctuary',
    description: 'Poured into heavy, unglazed stoneware ceramics crafted locally. Designed to cup comfortably in both hands, retaining thermal warmth as you slow down.',
    metric: '62°C',
    metricLabel: 'Drinking Sweet Spot',
    details: [
      'Custom wheel-thrown stoneware ceramics',
      'Designed to amplify aroma aromatics',
      'Served with deliberate warmth and quiet hospitality'
    ]
  }
];

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: '2018',
    title: 'The First Cast Iron Roast',
    description: 'Started in a drafty garage workshop with a modified 1kg sample drum roaster and green beans sourced from an intimate trip to Antioquia.'
  },
  {
    year: '2020',
    title: 'The First Willow St. Café',
    description: 'Opened our doors on Willow Street. No gimmicks, no syrups in pump bottles. Just honest espresso, walnut benches, and morning light.'
  },
  {
    year: '2023',
    title: 'The Roastery & Lab Expansion',
    description: 'Built our open roastery space, welcoming guests to witness green coffee arriving in jute sacks and cupping alongside our roasters.'
  },
  {
    year: 'Today',
    title: 'Obsessed With Better Mornings',
    description: 'Still roasting small batches by hand every Tuesday and Friday. Never cutting corners, always making room for people.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'maya',
    name: 'Maya Lin',
    role: 'Architect & Regular',
    quote: 'The acoustics, the smell of roasted cedar and bergamot, the weight of the ceramic mug. Ember & Bean is the only place in the city where time actually feels slowed down.',
    favoriteOrder: 'Honey Cortado & Single-Origin Drip'
  },
  {
    id: 'daniel',
    name: 'Daniel Vance',
    role: 'Author & Coffee Enthusiast',
    quote: 'Most modern coffee shops feel like sterile tech offices. Ember & Bean feels like an intimate artist studio where every single pour is treated with quiet reverence.',
    favoriteOrder: 'Double Ember Espresso'
  },
  {
    id: 'sofia',
    name: 'Sofia Rodriguez',
    role: 'Ceramicist & Local Resident',
    quote: 'Their attention to tactile details is extraordinary. You can taste the intention in every sip, and the baristas remember how you take your morning cup without asking.',
    favoriteOrder: 'Velvet Latte with Oat Milk'
  }
];

export const CRAFT_PHILOSOPHY = {
  quote: '“Good coffee takes time.”',
  lead: 'We do not rush extraction, nor do we rush human connection. In a world calibrated for instantaneous haste, our café exists as an intentional sanctuary.',
  paragraphs: [
    'Every cup is an intersection of agricultural patience and thermal physics. From the 1,900-meter Andean slopes where our cherries ripen slowly under mountain mist, to the 27-second hydraulic pull of our custom lever machines, every second is counted.',
    'We believe the most luxurious thing you can experience in the morning is not complexity—it is clarity, warmth, and the permission to pause.'
  ],
  stats: [
    { value: '100%', label: 'Single-Origin Direct Sourced' },
    { value: '6 kg', label: 'Maximum Roast Batch Size' },
    { value: '93.5°', label: 'Thermal Stability Within 0.1°C' },
    { value: '20 hrs', label: 'Kyoto Cold Extraction' }
  ]
};
