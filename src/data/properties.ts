import { Property } from '../types/property';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: 'the-glasshouse-residence',
    title: 'The Glasshouse Residence',
    subtitle: 'A cantilevered modernist pavilion framed by ancient olive trees and sky',
    location: 'Bel Air Foothills, California',
    city: 'Los Angeles',
    country: 'United States',
    neighborhood: 'Bel Air',
    price: 18500000,
    priceDisplay: '$18,500,000',
    status: 'for-sale',
    type: 'Modernist Villa',
    lifestyle: 'contemporary',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8400,
    areaSqM: 780,
    yearBuilt: 2023,
    architect: 'Kappe & Associates Studio',
    featured: true,
    spotlight: true,
    has3DModel: true,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
    ],
    overview: 'Perched along a private ridge, The Glasshouse Residence reinterprets Californian modernism through seamless indoor-outdoor transitions, honed travertine planes, and twenty-foot frameless glass apertures.',
    narrative: 'Morning sunlight filters through silvered olive leaves, washing across unfilled travertine slabs and brushed bronze detailing. Designed to celebrate stillness, the home is arranged around a continuous 25-meter black granite reflection pool that mirrors the changing horizon from dawn to dusk. Every living space opens entirely to gentle breezes, dissolving the boundary between architecture and nature.',
    architectureDetails: [
      'Post-tensioned cantilevered concrete floor plates providing unobstructed span',
      'Twenty-foot structural glass pocketing doors with flush threshold drains',
      'Custom brushed champagne bronze hardware and custom cedar millwork throughout',
      'Passive geothermal heating and integrated concealed architectural air diffusers'
    ],
    amenities: [
      '25m Infinity Edge Reflection Pool',
      'Subterranean 600-Bottle Temperature Controlled Wine Vault',
      'Private Wellness Suite with Cedar Sauna & Cold Plunge',
      'Automated Hidden Architectural Solar Louvers',
      'Integrated Bulthaup Kitchen with Calacatta Paonazzo Marble',
      'Four-Vehicle Subterranean Gallery Garage'
    ],
    specifications: [
      { label: 'Primary Structure', value: 'Architectural Cast Concrete & Structural Steel' },
      { label: 'Interior Finishes', value: 'Unfilled Roman Travertine & Quarter-Sawn White Oak' },
      { label: 'Ceiling Height', value: '3.8m to 4.4m Continuous' },
      { label: 'Site Area', value: '1.42 Acres Private Gated Lot' },
      { label: 'Energy Certification', value: 'LEED Platinum Certified Net-Zero Architecture' },
      { label: 'Property Tax Classification', value: 'Single Family Residential Sanctuary' }
    ],
    floorPlanInfo: {
      levels: 2,
      description: 'Ground pavilion dedicated to open living, culinary arts, and landscape connectivity; upper cantilevered level reserved for master wing and private guest suites.'
    }
  },
  {
    id: 'prop-2',
    slug: 'a-quiet-corner-in-the-city',
    title: 'A Quiet Corner in the City',
    subtitle: 'A discreet Mayfair residence marrying Victorian proportions with Japanese minimalism',
    location: 'Mayfair, Central London',
    city: 'London',
    country: 'United Kingdom',
    neighborhood: 'Mayfair',
    price: 12950000,
    priceDisplay: '£12,950,000',
    status: 'for-sale',
    type: 'City Townhouse',
    lifestyle: 'family',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 5200,
    areaSqM: 483,
    yearBuilt: 2022,
    architect: 'Studio Nicholson & Tadao Partners',
    featured: true,
    spotlight: false,
    has3DModel: false,
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80'
    ],
    overview: 'Tucked into a quiet pedestrian mews behind Mayfair’s grand squares, this restored townhouse conceals a double-height central lightwell and a private enclosed courtyard garden designed for profound tranquility.',
    narrative: 'Beyond an understated Portland stone facade lies an unexpected sanctuary of calm. Hand-troweled lime plaster walls catch the daylight from a structural glass ceiling five floors above. Acoustic seclusion was engineered through triple-laminated acoustic glazing, while aged French oak parquet brings warmth to contemporary geometric millwork.',
    architectureDetails: [
      'Original restored Portland limestone facade with bronze sash windows',
      'Double-height library gallery with bespoke floor-to-ceiling blackened steel ladders',
      'Central Japanese courtyard garden with solitary acer tree and raked stone',
      'Private pneumatic vacuum passenger elevator servicing all five levels'
    ],
    amenities: [
      'Private Internal Mews Courtyard',
      'Library with Curated Double-Height Shelving',
      'Private Spa with Moroccan Tadelakt Steam Chamber',
      'Crestron Whole-Home Acoustic & Environmental Automation',
      'Mews Gated Direct Parking with EV Fast Charging'
    ],
    specifications: [
      { label: 'Historical Heritage', value: 'Grade II Listed Facade with Full Interior Modernist Rebuild' },
      { label: 'Flooring', value: 'Reclaimed 19th Century French Chevron Oak' },
      { label: 'Wall Treatment', value: 'Continuous Hand-Troweled Lime Plaster' },
      { label: 'Tenure', value: 'Freehold Estate' }
    ]
  },
  {
    id: 'prop-3',
    slug: 'the-garden-house',
    title: 'The Garden House',
    subtitle: 'A biophilic sanctuary nestled within Kyoto cedar and stone water channels',
    location: 'Higashiyama Foothills, Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    neighborhood: 'Higashiyama',
    price: 9400000,
    priceDisplay: '¥1,420,000,000 ($9,400,000)',
    status: 'for-sale',
    type: 'Architectural Residence',
    lifestyle: 'retreat',
    bedrooms: 3,
    bathrooms: 4,
    areaSqFt: 4600,
    areaSqM: 427,
    yearBuilt: 2024,
    architect: 'Kengo Associates & Oribe Landscape',
    featured: true,
    spotlight: false,
    has3DModel: false,
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    overview: 'Constructed using traditional timber joinery and volcanic thermal stone, The Garden House frames protected bamboo forests with sliding washi-lined cedar screens.',
    narrative: 'A sensory haven where the sound of running natural spring water accompanies every hour. Hinoki cedar aromas permeate the living rooms, while an open engawa porch invites unhurried afternoons contemplating moss-covered stone lanterns and seasonal maples.',
    architectureDetails: [
      'Mortise and tenon joinery handcrafted without metallic nails',
      'Naturally sourced volcanic stone bath pavilion with natural spring onsen feed',
      'Bioclimatic shoji and cedar louvers engineered for year-round cross-ventilation',
      'Curated private tea pavilion overlooking a 150-year-old preserved moss garden'
    ],
    amenities: [
      'Private Geothermal Natural Onsen Bath',
      'Traditional Engawa Veranda & Tea Pavilion',
      'Heritage Moss & Maple Garden designed by master gardeners',
      'Radiant Underfloor Heating through Japanese Rush Tatami'
    ],
    specifications: [
      { label: 'Timber Source', value: 'Select 80-Year Aged Yoshino Cedar & Hinoki' },
      { label: 'Garden Preservation', value: 'Protected Cultural Biotope' },
      { label: 'Site Footprint', value: '2,800 m² Mountain Border Parcel' }
    ]
  },
  {
    id: 'prop-4',
    slug: 'villa-maritima',
    title: 'Villa Marítima',
    subtitle: 'A sculptured whitewashed promontory suspended over the Mediterranean horizon',
    location: 'Cap d’Antibes, Côte d’Azur',
    city: 'Antibes',
    country: 'France',
    neighborhood: 'Cap d’Antibes',
    price: 45000,
    priceDisplay: '€45,000 / month',
    status: 'for-rent',
    type: 'Coastal Sanctuary',
    lifestyle: 'retreat',
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 7100,
    areaSqM: 660,
    yearBuilt: 2021,
    architect: 'Jean-Luc Vandevelde Architecture',
    featured: false,
    spotlight: false,
    has3DModel: false,
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    overview: 'Available for seasonal and annual lease, Villa Marítima commands panoramic Mediterranean vistas from a secluded maritime pine grove with private sea bathing platform.',
    narrative: 'Cascading down stone sea terraces, this coastal masterpiece pairs lime-washed surfaces with polished marine teak. Generous shaded pergolas provide cool respite during midsummer afternoons, while evening dining overlooks the glittering lights of Cannes across the bay.',
    architectureDetails: [
      'Tiered stone terraces carved into natural limestone sea cliffs',
      'Seafront heated saltwater pool with submerged limestone bar stools',
      'Private direct sea stairs leading to private yacht tender mooring',
      'Full perimeter privacy security system with discreet guard lodge'
    ],
    amenities: [
      'Private Direct Sea Access & Tender Mooring',
      'Saltwater Infinity Pool with Panoramic Horizon',
      'Outdoor Summer Kitchen with Wood-Fired Pizza Oven & Rotisserie',
      'Full Concierge & Estate Management Staff Quarters'
    ],
    specifications: [
      { label: 'Lease Terms', value: 'Minimum 3-Month Summer or Annual Leasehold' },
      { label: 'Staff Accommodations', value: 'Independent 2-Bedroom Caretaker Pavilion' },
      { label: 'Mooring Rights', value: 'Certified Sea Anchorage up to 35m Yacht' }
    ]
  },
  {
    id: 'prop-5',
    slug: 'the-penthouse-at-solarium',
    title: 'The Penthouse at Solarium',
    subtitle: 'A triplex sky residence crowned by a 14-meter private rooftop pool',
    location: 'Tribeca, New York City',
    city: 'New York',
    country: 'United States',
    neighborhood: 'Tribeca',
    price: 24750000,
    priceDisplay: '$24,750,000',
    status: 'for-sale',
    type: 'Sky Penthouse',
    lifestyle: 'contemporary',
    bedrooms: 4,
    bathrooms: 6,
    areaSqFt: 6900,
    areaSqM: 641,
    yearBuilt: 2023,
    architect: 'Thomas Phifer & Partners',
    featured: false,
    spotlight: false,
    has3DModel: false,
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80'
    ],
    overview: 'Rising above historic Tribeca cobblestones, this architectural crown jewel spans three expansive floors connected by an elliptical sculpted bronze staircase.',
    narrative: 'Soaring 14-foot ceiling volumes bathed in 360-degree daylight frame iconic views of the Hudson River and Manhattan skyline. The top level culminates in a private open-air glass solarium and heated pool cantilevered over the city.',
    architectureDetails: [
      'Sculptural cast bronze helical staircase engineered by maritime metalworkers',
      'Curved acoustic insulated glass curtain wall with zero thermal bridging',
      'Custom Boffi kitchen with slab quartzite and integrated Gaggenau 400 series',
      'Private key-locked high-speed elevator opening directly into all three floors'
    ],
    amenities: [
      'Private 14m Rooftop Heated Lap Pool',
      'Wrap-Around Landscaped Ipe Decking Terraces',
      'Private Wine Cellar & Tasting Room',
      'Doorman & 24/7 White-Glove Concierge Services'
    ],
    specifications: [
      { label: 'Outdoor Living Area', value: '2,400 sq ft Private Rooftop Terraces' },
      { label: 'Exposure', value: 'Unobstructed North, South, East, West Panoramic' },
      { label: 'Ceiling Height', value: '4.2m Throughout Living Galleries' }
    ]
  },
  {
    id: 'prop-6',
    slug: 'the-olive-grove-estate',
    title: 'The Olive Grove Estate',
    subtitle: 'An 18th-century Puglia masseria unified with a luminous glass wing',
    location: 'Valle d’Itria, Puglia',
    city: 'Ostuni',
    country: 'Italy',
    neighborhood: 'Valle d’Itria',
    price: 28000,
    priceDisplay: '€28,000 / month',
    status: 'for-rent',
    type: 'Country Masseria',
    lifestyle: 'family',
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 6200,
    areaSqM: 576,
    yearBuilt: 2022,
    architect: 'Studio Andrew Trotter Collaboration',
    featured: false,
    spotlight: false,
    has3DModel: false,
    heroImage: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    overview: 'Available for exclusive monthly and seasonal stays, this historic stone masseria is set within 14 hectares of centuries-old olive groves with private organic olive oil production.',
    narrative: 'Thick white lime walls keep the interiors cool under the southern Italian sun. Modern minimalist interventions—such as bronze framed pivot doors and a sunken courtyard—create effortless harmony between rustic Puglia soul and contemporary calm.',
    architectureDetails: [
      'Historic star-vaulted ceilings crafted from local Tufo calcarenite stone',
      'Contemporary minimal glass pavilion housing culinary dining room',
      'Organic cold-press olive orchard producing registered single-estate oil',
      'Zero-chlorine magnesium swimming pool surrounded by wild lavender'
    ],
    amenities: [
      'Magnesium Natural Swimming Pool',
      'Centuries-Old Certified Organic Olive Grove',
      'Stone Wood-Fired Outdoor Bread & Pizza Oven',
      'Dedicated Estate Manager & Optional Private Chef'
    ],
    specifications: [
      { label: 'Estate Land', value: '14 Hectares (34.5 Acres) Private Boundary' },
      { label: 'Historical Core', value: 'Circa 1780 Restored Masseria Fortification' },
      { label: 'Produce', value: 'Registered PDO Extra Virgin Olive Oil Production' }
    ]
  },
  {
    id: 'prop-7',
    slug: 'pavilion-ten',
    title: 'Pavilion Ten',
    subtitle: 'An organic alpine sanctuary sculpted in board-formed concrete and Douglas fir',
    location: 'Aspen Valley, Colorado',
    city: 'Aspen',
    country: 'United States',
    neighborhood: 'Red Mountain',
    price: 21900000,
    priceDisplay: '$21,900,000',
    status: 'for-sale',
    type: 'Architectural Residence',
    lifestyle: 'retreat',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7800,
    areaSqM: 724,
    yearBuilt: 2024,
    architect: 'Olson Kundig Architects',
    featured: false,
    spotlight: false,
    has3DModel: false,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    overview: 'Positioned against the backdrop of the Elk Mountain range, Pavilion Ten integrates kinetic mechanical walls and geothermal heating into a monumental alpine structure.',
    narrative: 'Monumental board-formed concrete walls anchor the home into the hillside, while motorized hand-cranked guillotine windows open the entire great room to crisp mountain air and aspen forests.',
    architectureDetails: [
      'Hand-crafted kinetic steel counterweight window mechanisms',
      'Exposed board-formed concrete walls retaining mountain thermal mass',
      'Charred shou sugi ban cedar exterior siding engineered for alpine longevity',
      'Heated driveway, motor court, and exterior terraces for winter ease'
    ],
    amenities: [
      'Direct Ski-In / Ski-Out Trail Access',
      'Heated Outdoor Sunken Mountain Hot Springs Spa',
      'Alpine Equipment Room with Boot Warmers & Tune Bench',
      'Full Geothermal Radiant Snow Melt System'
    ],
    specifications: [
      { label: 'Site Elevation', value: '8,400 ft Above Sea Level' },
      { label: 'Lot Size', value: '2.8 Acres Mountain Ridge' },
      { label: 'Structural Engineer', value: 'Magnusson Klemencic Associates' }
    ]
  }
];

export const LIFESTYLES = [
  {
    id: 'contemporary',
    title: 'Contemporary Living',
    tagline: 'Clean architecture, considered interiors, and modern comfort.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 3
  },
  {
    id: 'family',
    title: 'Family Homes',
    tagline: 'Room to grow, gather, and make lasting memories.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 2
  },
  {
    id: 'retreat',
    title: 'Private Retreats',
    tagline: 'Space, privacy, and a little distance from the everyday.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 2
  }
];
