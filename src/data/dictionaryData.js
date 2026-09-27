// Comprehensive Market Dictionary Data for FreshFind
// Categories: 'fruit', 'vegetable', 'fungi', 'herb', 'jargon', 'prep'

export const CATEGORIES = [
  { id: 'all', label: 'All Entries', icon: 'BookOpen' },
  { id: 'fruit', label: 'Heirloom & Specialty Fruits', icon: 'Apple' },
  { id: 'vegetable', label: 'Artisanal Vegetables', icon: 'Carrot' },
  { id: 'fungi', label: 'Wild & Cultivated Fungi', icon: 'TreePine' },
  { id: 'herb', label: 'Herbs & Foraged Botanicals', icon: 'Sparkles' },
  { id: 'jargon', label: 'Market Jargon & Labels', icon: 'Tag' },
  { id: 'prep', label: 'Chef Prep & Culinary Cuts', icon: 'Utensils' },
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DICTIONARY_ENTRIES = [
  // ================= FRUITS =================
  {
    id: 'meyer-lemon',
    name: 'Meyer Lemon',
    category: 'fruit',
    scientificName: 'Citrus x meyeri',
    altNames: ['Valley Lemon'],
    pronunciation: 'MY-er LEM-un',
    emoji: '🍋',
    badgeColor: 'amber',
    shortDefinition: 'A naturally sweet, thin-skinned hybrid of a standard citron lemon and a mandarin orange.',
    detailedDescription: 'Discovered in China in 1908 by agricultural explorer Frank Meyer, this prized citrus lacks the aggressive, sharp acidity of standard Lisbon or Eureka lemons. Its rind is thin, intensely aromatic with bergamot-like floral notes, and its juice offers a honeyed herbal sweetness.',
    origin: 'China / California Central Valley',
    peakSeason: 'November to May',
    peakMonths: [10, 11, 0, 1, 2, 3, 4],
    brixScore: '9 - 11° Bx (Standard lemon is ~5° Bx)',
    priceTier: '$$',
    shelfLife: '1 - 2 weeks refrigerated',
    ethyleneSensitivity: 'Medium',
    ripenessGuide: {
      look: 'Deep golden-egg yolk yellow with slight orange undertones; glossy, fine-pored skin without greenish tinge.',
      feel: 'Noticeably heavy for its size with slight give when gently squeezed; skin feels delicate, not leathery.',
      smell: 'Intensely fragrant with pronounced floral, honeyed blossom perfume at the stem.',
      avoid: 'Spongy spots, dull matte brown rind, or dark sunken stem cavities.'
    },
    storage: {
      location: 'Crisper drawer in a perforated bag',
      temp: '45°F - 50°F (7°C - 10°C)',
      proTip: 'Because Meyer lemons have paper-thin skin without a thick protective pith, they lose moisture quickly. Wrap individually in dry paper towel inside a sealed container if storing longer than a week.'
    },
    culinaryUses: [
      'Lemon curd with delicate herbal undertones',
      'Whole-fruit salads (rind is edible and sweet)',
      'Finishing crudos, ceviches, and grilled branzino',
      'Citrus vinaigrettes and craft cocktails (French 75)'
    ],
    pairings: ['Ricotta', 'Fresh Thyme', 'Crudo', 'Pistachio', 'Lavender', 'Honey'],
    substitutes: ['Eureka Lemon + Tangerine zest', 'Yuzu juice'],
    funFact: 'Martha Stewart popularized Meyer lemons in the 1990s, transforming what was once merely an ornamental backyard shrub into a global culinary superstar.'
  },
  {
    id: 'honeycrisp-apple',
    name: 'Honeycrisp Apple',
    category: 'fruit',
    scientificName: 'Malus domestica \'Honeycrisp\'',
    altNames: ['MN 1711'],
    pronunciation: 'HUN-ee-krisp',
    emoji: '🍎',
    badgeColor: 'rose',
    shortDefinition: 'An engineered cold-hardy cultivar renowned for its explosive cellular crispness and balanced sweet-tart profile.',
    detailedDescription: 'Developed by the University of Minnesota in the 1960s, Honeycrisp revolutionised the modern apple market. Its unique cellular structure features cells twice the size of standard apples, which burst with juice upon biting rather than shearing or feeling mealy.',
    origin: 'Minnesota, United States',
    peakSeason: 'September to February',
    peakMonths: [8, 9, 10, 11, 0, 1],
    brixScore: '13 - 15° Bx',
    priceTier: '$$$',
    shelfLife: '3 - 5 months under proper cold storage',
    ethyleneSensitivity: 'High producer (keep away from greens)',
    ripenessGuide: {
      look: 'Mottled red-blush striations over a pale chartreuse background; not solid crimson.',
      feel: 'Very firm, rock-hard feel with no spongy or hollow sensation when tapped.',
      smell: 'Crisp, light cider-like scent at the stem base.',
      avoid: 'Wrinkled skin around the stem, dark brown bitter pit spotting, or greasy oily coating.'
    },
    storage: {
      location: 'Refrigerator fruit crisper drawer',
      temp: '32°F - 35°F (0°C - 2°C)',
      proTip: 'Honeycrisp apples thrive in ultra-cold, high humidity conditions. Keep them as cold as possible without freezing to preserve cellular crispness.'
    },
    culinaryUses: [
      'Raw artisanal cheese boards and charcuterie',
      'Thinly shaved in endive and walnut salads',
      'Rustic open-faced apple galettes (holds shape well)',
      'Fresh spiced cider pressings'
    ],
    pairings: ['Sharp Aged Cheddar', 'Smoked Gouda', 'Tarragon', 'Walnuts', 'Prosciutto'],
    substitutes: ['Cosmic Crisp', 'Pink Lady', 'SweeTango'],
    funFact: 'Honeycrisp was almost discarded in 1977 due to winter kill at the breeding orchard before clone grafts saved the cultivar.'
  },
  {
    id: 'black-mission-fig',
    name: 'Black Mission Fig',
    category: 'fruit',
    scientificName: 'Ficus carica \'Mission\'',
    altNames: ['Franciscana', 'Mission Fig'],
    pronunciation: 'blak MISH-un fig',
    emoji: '🫐',
    badgeColor: 'purple',
    shortDefinition: 'A lush, deep purple-black fig with strawberry-pink flesh and rich caramel molasses undertones.',
    detailedDescription: 'Introduced to North America in 1769 by Franciscan missionaries at the Mission San Diego, this ancient fruit is technically an inverted cluster of tiny interior flowers called a syconium. It delivers a jammy, concentrated fig paste sweetness with a slight nutty crunch from tiny seeds.',
    origin: 'Balearic Islands / California',
    peakSeason: 'June (Breba crop) & August to November (Main crop)',
    peakMonths: [5, 7, 8, 9, 10],
    brixScore: '16 - 22° Bx (Among the sweetest market fruits)',
    priceTier: '$$$',
    shelfLife: '2 - 3 days (extremely perishable)',
    ethyleneSensitivity: 'Moderate',
    ripenessGuide: {
      look: 'Deep plum to midnight violet hue; skin may display fine micro-cracks called "sugar tears" or a drop of syrupy nectar at the bottom eye.',
      feel: 'Extremely tender with a gentle droop at the neck when held upside down; yielding softly like a water balloon.',
      smell: 'Warm, syrupy, fruity fragrance; avoid any sour, boozy, or fermented smell.',
      avoid: 'Firm, hard neck (will not ripen off tree) or white milky sap weeping from the stem.'
    },
    storage: {
      location: 'Single layer on paper towels in the refrigerator',
      temp: '35°F - 38°F',
      proTip: 'Figs DO NOT ripen or develop more sugar after being picked. Consume within 48 hours or freeze whole for winter tarts.'
    },
    culinaryUses: [
      'Broiled with Gorgonzola dolce and hot honey',
      'Wrapped in speck or serrano ham and grilled',
      'Slow-simmered balsamic fig compote for duck breast',
      'Rustic sourdough flatbreads with goat cheese and rosemary'
    ],
    pairings: ['Gorgonzola', 'Arugula', 'Prosciutto', 'Aged Balsamic', 'Mascarpone', 'Pistachios'],
    substitutes: ['Brown Turkey Fig', 'Kadota Fig', 'Medjool Dates'],
    funFact: 'The tiny crunch in a fig is not seeds, but individual botanical drupelets (fruits) inside the inverted flower head.'
  },
  {
    id: 'finger-lime',
    name: 'Finger Lime (Citrus Caviar)',
    category: 'fruit',
    scientificName: 'Citrus australasica',
    altNames: ['Citrus Caviar', 'Australian Finger Lime'],
    pronunciation: 'FING-ger lime',
    emoji: '🥑',
    badgeColor: 'emerald',
    shortDefinition: 'A rare rainforest micro-citrus whose pulp bursts into crunchy, tart, jewel-like vesicles resembling caviar.',
    detailedDescription: 'Indigenous to the subtropical rainforests of eastern Australia, finger limes look like miniature gherkins or fingers. When sliced and squeezed, thousands of bead-like juice capsules pop out. They do not dilute delicate dishes like liquid lime juice does, instead bursting cleanly on the palate.',
    origin: 'Australia / Specialty California Orchards',
    peakSeason: 'July to December',
    peakMonths: [6, 7, 8, 9, 10, 11],
    brixScore: '7 - 9° Bx with high citric acid punch',
    priceTier: '$$$$',
    shelfLife: '2 - 3 weeks chilled',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Skin varies from dark emerald to bronze, purple, or mottled burgundy; slightly rough surface.',
      feel: 'Firm but pliable, yielding just a millimeter under thumb pressure.',
      smell: 'Subtle pine-lime and kaffir lime zest scent.',
      avoid: 'Shriveled dry husks, pale spongy skin, or mouldy ends.'
    },
    storage: {
      location: 'Sealed container in refrigerator',
      temp: '40°F - 45°F',
      proTip: 'Roll the fruit lightly between your palms before cutting horizontally to loosen the internal caviar pearls, then gently squeeze from bottom up.'
    },
    culinaryUses: [
      'Garnish on raw oysters and scallop ceviche',
      'Modernist cocktails (sinks and pops in champagne)',
      'Avocado toast and sushi rolls for texture',
      'White chocolate mousse and key lime tart garnish'
    ],
    pairings: ['Pacific Oysters', 'Sashimi Scallops', 'Avocado', 'Gin', 'Coconut Milk'],
    substitutes: ['Finely minced kaffir lime leaves + lime pulp', 'Tobiko'],
    funFact: 'Australian Aboriginal peoples utilized wild finger limes for millennia as both a refreshing bushfood and an antiseptic bush medicine.'
  },
  {
    id: 'pawpaw',
    name: 'North American Pawpaw',
    category: 'fruit',
    scientificName: 'Asimina triloba',
    altNames: ['Prairie Banana', 'Indiana Banana', 'Custard Apple'],
    pronunciation: 'PAW-paw',
    emoji: '🥭',
    badgeColor: 'amber',
    shortDefinition: 'The largest edible fruit native to North America, boasting an exotic tropical custard flavor resembling mango, banana, and vanilla.',
    detailedDescription: 'A botanical anomaly, the pawpaw is a member of the tropical Annonaceae family thriving in the temperate riverbanks of eastern North America. Its flesh is golden, custardy, and spoon-tender, tasting astonishingly like a tropical blend of banana pudding, ripe mango, and caramel.',
    origin: 'Eastern North America (Appalachia & Midwest)',
    peakSeason: 'Late August to October (Brief 3-week window)',
    peakMonths: [7, 8, 9],
    brixScore: '18 - 24° Bx (Decadently rich)',
    priceTier: '$$$$ (Extremely rare)',
    shelfLife: '2 - 3 days (does not ship commercially)',
    ethyleneSensitivity: 'High producer',
    ripenessGuide: {
      look: 'Mottled chartreuse-yellow skin with brown and black blotches (like a speckled banana). Bruises do not mean spoil!',
      feel: 'Yields softly to pressure like a ripe peach or avocado.',
      smell: 'Heavy, heady tropical perfume reminiscent of mango and yeasty beer.',
      avoid: 'Hard green rock-like pawpaws (will never ripen properly once plucked).'
    },
    storage: {
      location: 'Refrigerator in paper bag',
      temp: '34°F - 38°F',
      proTip: 'Because pawpaws oxidize quickly, scoop out the custard flesh, remove large dark seeds, blend with a touch of lemon juice, and freeze in half-pint jars for ice cream.'
    },
    culinaryUses: [
      'Pawpaw homemade custard ice cream or gelato',
      'Pawpaw chiffon pies and quick breads',
      'Craft beers and sour wild ales',
      'Eaten straight with a spoon with sea salt'
    ],
    pairings: ['Vanilla Bean', 'Bourbon', 'Dark Chocolate', 'Nutmeg', 'Greek Yogurt'],
    substitutes: ['Cherimoya', 'Very ripe banana + mango puree'],
    funFact: 'George Washington cultivated pawpaw trees at Mount Vernon, and Thomas Jefferson sent pawpaw seeds to Europe in 1786.'
  },
  {
    id: 'buddhas-hand',
    name: "Buddha's Hand Citron",
    category: 'fruit',
    scientificName: 'Citrus medica var. sarcodactylis',
    altNames: ['Fingered Citron'],
    pronunciation: 'BOO-duhz hand',
    emoji: '🍋‍🟩',
    badgeColor: 'yellow',
    shortDefinition: 'An extraordinary ancient citrus segmented into fragrant golden finger-like tendrils, consisting entirely of sweet, aromatic zest without bitter pith or juice.',
    detailedDescription: 'Resembling a golden hand folded in prayer, this ancient fruit has no juice, pulp, or seeds. Instead, it is prized entirely for its rind and crisp, snow-white pith which—unlike standard citrus pith—is completely devoid of bitterness and has a sweet, lavender-lemon perfume.',
    origin: 'Lower Himalayas / Southern China',
    peakSeason: 'November to February',
    peakMonths: [10, 11, 0, 1],
    brixScore: 'Aromatic essential oils (No liquid juice)',
    priceTier: '$$$',
    shelfLife: '2 - 3 weeks at room temperature',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Bright lemon-yellow fingers spreading gracefully; shiny waxy sheen.',
      feel: 'Firm and stiff with smooth or lightly pebbled rind.',
      smell: 'Enchanting citrus blossom, violet, and bergamot aroma filling the entire kitchen.',
      avoid: 'Browning dried tips or mould on inner crevices.'
    },
    storage: {
      location: 'Countertop centerpiece or crisper drawer',
      temp: '50°F - 60°F',
      proTip: 'Use a microplane or mandoline to slice the entire fingers—rind and white inner pith together—into paper-thin ribbons to candying or infusing vodka.'
    },
    culinaryUses: [
      'Artisanal citrus-infused vodka, gin, or Limoncello',
      'Candied citrus fingers for holiday fruitcakes and biscotti',
      'Finely shaved over raw seafood carpaccio',
      'Zested into sugar for baking and shortbreads'
    ],
    pairings: ['Vodka', 'Fennel', 'Scallops', 'Vanilla', 'Dark Chocolate'],
    substitutes: ['Yuzu zest', 'Meyer lemon peel'],
    funFact: 'In Buddhist tradition, closed fingers are preferred as offerings in temples as they symbolize hands folded in devout meditation.'
  },
  {
    id: 'fuyu-persimmon',
    name: 'Fuyu Persimmon',
    category: 'fruit',
    scientificName: 'Diospyros kaki \'Fuyu\'',
    altNames: ['Japanese Persimmon', 'Non-Astringent Kaki'],
    pronunciation: 'FOO-yoo per-SIM-un',
    emoji: '🍑',
    badgeColor: 'orange',
    shortDefinition: 'A non-astringent, squat tomato-shaped persimmon that is sweet, crisp, and delicious eaten firm like an apple.',
    detailedDescription: 'Unlike the conical Hachiya persimmon (which causes extreme mouth-puckering astringency unless mushy soft), Fuyu persimmons lack soluble tannins when mature. They can be sliced while crisp and boast delicate flavors of cinnamon, brown sugar, and honeydew.',
    origin: 'Japan',
    peakSeason: 'October to January',
    peakMonths: [9, 10, 11, 0],
    brixScore: '16 - 18° Bx',
    priceTier: '$$',
    shelfLife: '2 - 3 weeks at cool room temp',
    ethyleneSensitivity: 'High (keep away from bananas if you want firm)',
    ripenessGuide: {
      look: 'Deep pumpkin orange skin across the entire body, with dark green calyx (stem leaves) intact.',
      feel: 'Crisp and firm like a Granny Smith apple, or with a very slight give like a ripe peach.',
      smell: 'Faint sweet autumn floral aroma.',
      avoid: 'Pale yellow skin (underripe), watery black bruised spots, or dry brittle calyx.'
    },
    storage: {
      location: 'Countertop at room temperature',
      temp: '60°F - 68°F',
      proTip: 'To keep them crunchy, store on the counter away from apples and bananas. If you prefer a softer, jelly-like texture, place them in a brown paper bag with an apple for 3 days.'
    },
    culinaryUses: [
      'Raw autumn salads with chicory, pomegranate, and goat cheese',
      'Dehydrated into chewy dried fruit chips (Hoshigaki style)',
      'Roasted with squash and duck breast',
      'Persimmon and ginger chutneys'
    ],
    pairings: ['Pomegranate Arils', 'Goat Cheese', 'Chicory', 'Pecans', 'Cinnamon', 'Prosciutto'],
    substitutes: ['Hachiya (soft only)', 'Sharon Fruit', 'Asian Pear'],
    funFact: 'The botanical genus name Diospyros translates from ancient Greek as "food of the gods" or "divine wheat".'
  },
  {
    id: 'blood-orange',
    name: 'Moro Blood Orange',
    category: 'fruit',
    scientificName: 'Citrus sinensis \'Moro\'',
    altNames: ['Red Orange', 'Sicilian Blood Orange'],
    pronunciation: 'MOR-oh blud OR-inj',
    emoji: '🍊',
    badgeColor: 'red',
    shortDefinition: 'A dramatic crimson-fleshed citrus with complex raspberry, pomegranate, and floral-berry notes.',
    detailedDescription: 'Moro is the most intensely pigmented blood orange cultivar. The dramatic ruby-to-violet flesh is produced by high concentrations of anthocyanins, a powerful antioxidant pigment that develops when the trees experience cool Mediterranean nights followed by warm sunny days.',
    origin: 'Sicily, Italy (Mount Etna region)',
    peakSeason: 'December to April',
    peakMonths: [11, 0, 1, 2, 3],
    brixScore: '11 - 13° Bx',
    priceTier: '$$',
    shelfLife: '10 - 14 days refrigerated',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Golden-orange rind with a characteristic deep burgundy or violet blush; heavy for its size.',
      feel: 'Firm and elastic; slightly yielding to gentle pressure without feeling squishy.',
      smell: 'Rich orange blossom perfume with distinct raspberry tartness.',
      avoid: 'Lightweight, spongy, or dry brittle skin.'
    },
    storage: {
      location: 'Refrigerated crisper or cool pantry',
      temp: '40°F - 48°F',
      proTip: 'Bring blood oranges to room temperature for 30 minutes before juicing or slicing to release maximum aromatic oils and anthocyanin richness.'
    },
    culinaryUses: [
      'Sicilian fennel, olive, and blood orange salad',
      'Blood orange curd, sorbets, and upside-down polenta cake',
      'Pan sauces for seared duck or scallops',
      'Bright scarlet cocktails (Campari spritz, Margaritas)'
    ],
    pairings: ['Shaved Fennel', 'Castelvetrano Olives', 'Dark Chocolate', 'Campari', 'Tarragon'],
    substitutes: ['Tarocco Orange', 'Cara Cara Navel', 'Ruby Red Grapefruit'],
    funFact: 'The vibrant red anthocyanin in blood oranges is the exact same plant pigment found in red wine, blueberries, and autumn maple leaves.'
  },

  // ================= VEGETABLES =================
  {
    id: 'romanesco',
    name: 'Romanesco Cauliflower',
    category: 'vegetable',
    scientificName: 'Brassica oleracea var. botrytis',
    altNames: ['Romanesco Broccoli', 'Fractal Brassica'],
    pronunciation: 'roh-muh-NES-koh',
    emoji: '🥦',
    badgeColor: 'emerald',
    shortDefinition: 'A striking lime-green edible flower head exhibiting a natural, breathtaking logarithmic Fibonacci fractal spiral.',
    detailedDescription: 'First documented in 16th century Rome, Romanesco is neither pure broccoli nor pure cauliflower, but an edible inflorescence cultivar. Its flavor is remarkably nutty, delicate, and sweet, lacking the sulfurous bitterness of standard green broccoli. Its conical florets remain crisp when roasted or blanched.',
    origin: 'Lazio, Italy',
    peakSeason: 'September to March',
    peakMonths: [8, 9, 10, 11, 0, 1, 2],
    brixScore: 'Nutty-Sweet Brassica',
    priceTier: '$$',
    shelfLife: '5 - 7 days refrigerated',
    ethyleneSensitivity: 'High (keep away from apples)',
    ripenessGuide: {
      look: 'Vibrant chartreuse or lime-green florets; pointed spiral cones tightly packed with crisp outer leaves attached.',
      feel: 'Very heavy and compact; cones should not yield or separate when pressed.',
      smell: 'Clean, sweet, mildly grassy scent.',
      avoid: 'Yellowing cone tips, limp outer leaves, or dark grey mildew between fractal crevices.'
    },
    storage: {
      location: 'Perforated bag in refrigerator vegetable drawer',
      temp: '34°F - 38°F',
      proTip: 'Do not wash until immediately before cooking. Leave outer wrapper leaves intact until preparation as they naturally shield the fractal tips from bruising.'
    },
    culinaryUses: [
      'High-heat roasted with olive oil, crushed garlic, and chili flakes',
      'Blanched and tossed into warm orecchiette with anchovies and pecorino',
      'Raw crudité dip with bagna cauda or whipped feta',
      'Pickled in cider vinegar with mustard seeds'
    ],
    pairings: ['Pecorino Romano', 'Anchovies', 'Toasted Pine Nuts', 'Lemon Zest', 'Garlic'],
    substitutes: ['Cauliflower + Broccolini', 'Green Cauliflower'],
    funFact: 'Each spiraling cone bud on a Romanesco is a self-similar miniature copy of the entire head, mathematically demonstrating a true fractal form in nature.'
  },
  {
    id: 'lacinato-kale',
    name: 'Lacinato Kale (Dinosaur Kale)',
    category: 'vegetable',
    scientificName: 'Brassica oleracea var. palmifolia',
    altNames: ['Tuscan Kale', 'Cavolo Nero', 'Dino Kale'],
    pronunciation: 'lah-chi-NAH-toh kayl',
    emoji: '🥬',
    badgeColor: 'green',
    shortDefinition: 'An Italian heritage brassica featuring long, blistered, dark blue-green strap-like leaves with an earthy, nutty sweetness.',
    detailedDescription: 'Grown in Tuscany since the 18th century, Cavolo Nero (black cabbage) is prized over curly kale for its tender texture and deep, complex flavor that turns sweeter after a winter frost. The distinctive bumpy, embossed leaves resemble reptilian skin, earning it the nickname "dinosaur kale".',
    origin: 'Tuscany, Italy',
    peakSeason: 'October to April (best post-frost)',
    peakMonths: [9, 10, 11, 0, 1, 2, 3],
    brixScore: 'Low (Enhanced sweetness after frost)',
    priceTier: '$',
    shelfLife: '5 - 8 days refrigerated',
    ethyleneSensitivity: 'High (turns yellow quickly)',
    ripenessGuide: {
      look: 'Deep slate blue-green to dark emerald leaves; taut, heavily embossed texture; crisp pale stems.',
      feel: 'Stiff, leathery leaves that snap cleanly when the central stem is bent.',
      smell: 'Earthy, peppery, clean vegetable aroma.',
      avoid: 'Yellowing edges, slimy damp patches, or limp, rubbery stems.'
    },
    storage: {
      location: 'Crisper drawer wrapped in slightly damp cloth',
      temp: '34°F - 36°F',
      proTip: 'For raw salads, remove the woody center rib, slice into ribbons (chiffonade), and massage with lemon juice, sea salt, and olive oil for 3 minutes to break down cellulose fibers.'
    },
    culinaryUses: [
      'Classic Tuscan ribollita soup and minestrone',
      'Massaged raw salad with toasted breadcrumbs and parmesan',
      'Quick sauté with garlic, cannellini beans, and olive oil',
      'Crispy baked kale chips with smoked paprika'
    ],
    pairings: ['Cannellini Beans', 'Parmigiano-Reggiano', 'Garlic', 'Chili Flakes', 'Lemon', 'Sausage'],
    substitutes: ['Curly Kale', 'Swiss Chard', 'Collard Greens'],
    funFact: 'Thomas Jefferson grew Lacinato kale in his Monticello gardens in 1777 after procuring seeds from Italian botanists.'
  },
  {
    id: 'fiddlehead-ferns',
    name: 'Fiddlehead Ferns',
    category: 'vegetable',
    scientificName: 'Matteuccia struthiopteris',
    altNames: ['Ostrich Fern Crosiers', 'Fiddleheads'],
    pronunciation: 'FID-ul-hed',
    emoji: '🌀',
    badgeColor: 'emerald',
    shortDefinition: 'The furled, tightly coiled young fronds of the wild ostrich fern, offering a tender crunch reminiscent of asparagus and green beans.',
    detailedDescription: 'A rite of spring in New England, Quebec, and the Maritimes, fiddleheads are harvested for only two weeks as the ostrich fern unfurls along swampy river floodplains. They resemble the ornamental scroll carved into the head of a violin. Their flavor is grassy, woodsy, and nutty.',
    origin: 'Northeastern North America',
    peakSeason: 'Late April to May (Fleeting spring window)',
    peakMonths: [3, 4],
    brixScore: 'Verdant Green',
    priceTier: '$$$',
    shelfLife: '3 - 5 days',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Tightly rolled spiral coils with a small stem tail; deep bright green; papery brown scales should rub off easily.',
      feel: 'Firm and crisp like a fresh green bean.',
      smell: 'Fresh riverbank soil and wild herbs.',
      avoid: 'Uncoiling open fronds (they become woody and bitter) or blackened soft tips.'
    },
    storage: {
      location: 'Submerged in ice-cold water in a sealed container in the fridge',
      temp: '33°F - 36°F',
      proTip: 'SAFETY MANDATE: Never eat fiddleheads raw or lightly steamed. The CDC recommends boiling for 10-15 minutes or steaming for 10 minutes to eliminate natural wild toxins before pan-sautéing in butter.'
    },
    culinaryUses: [
      'Boiled, shocked in ice water, then sautéed with butter, garlic, and sea salt',
      'Quick pickled in cider vinegar with mustard seed and dill',
      'Tossed in spring pasta with ramps and morels'
    ],
    pairings: ['Farm Butter', 'Morels', 'Hollandaise', 'Fresh Garlic', 'Lemon'],
    substitutes: ['Asparagus tips', 'Haricots Verts'],
    funFact: 'Maliseet and Mi\'kmaq indigenous peoples have harvested wild fiddleheads as a vital spring tonic and nutrient restorer for over a thousand years.'
  },
  {
    id: 'watermelon-radish',
    name: 'Watermelon Radish',
    category: 'vegetable',
    scientificName: 'Raphanus sativus var. longipinnatus',
    altNames: ['Rooseheart Radish', 'Shinrimei'],
    pronunciation: 'WAH-ter-mel-un RAD-ish',
    emoji: '🥣',
    badgeColor: 'rose',
    shortDefinition: 'An heirloom Chinese daikon whose dull greenish-white exterior conceals a stunning, electric-magenta starburst interior.',
    detailedDescription: 'A market showstopper, the watermelon radish (known in Beijing as Shinrimei, meaning "beauty in the heart") is round like a baseball. When sliced open, it reveals brilliant fuchsia flesh. The flavor is mildly peppery with a crisp, succulent, almost sweet profile compared to sharp red globe radishes.',
    origin: 'Northern China',
    peakSeason: 'September to April',
    peakMonths: [8, 9, 10, 11, 0, 1, 2, 3],
    brixScore: '6 - 7° Bx',
    priceTier: '$$',
    shelfLife: '2 - 3 weeks cold storage',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Globular root with greenish-tan crown tapering to white; firm, smooth uncracked skin.',
      feel: 'Very dense, rock-solid, and heavy for its size with no give when squeezed.',
      smell: 'Mild, fresh earthy root aroma.',
      avoid: 'Pithy soft hollow centers, spongy feel, or deep black fissures.'
    },
    storage: {
      location: 'Crisper drawer with greens removed',
      temp: '32°F - 36°F',
      proTip: 'Always slice off the green top leaves immediately upon returning from the market; leaves continually pull moisture out of the root, turning it spongy.'
    },
    culinaryUses: [
      'Mandoline-shaved translucent rounds on buttered sourdough',
      'Quick pickled in rice vinegar, sugar, and sea salt',
      'Bright crunchy garnish on grain bowls, poke, and tacos',
      'Lightly braised in butter and vegetable dashi'
    ],
    pairings: ['Cultured Butter', 'Maldon Flaky Salt', 'Avocado', 'Goat Cheese', 'Sesame Oil'],
    substitutes: ['Black Spanish Radish', 'French Breakfast Radish', 'Daikon'],
    funFact: 'The vibrant pink core is caused by high concentrations of water-soluble anthocyanins which intensify when dressed with acidic lemon juice or vinegar.'
  },
  {
    id: 'sunchoke',
    name: 'Sunchoke (Jerusalem Artichoke)',
    category: 'vegetable',
    scientificName: 'Helianthus tuberosus',
    altNames: ['Jerusalem Artichoke', 'Earth Apple'],
    pronunciation: 'SUN-choke',
    emoji: '🥔',
    badgeColor: 'amber',
    shortDefinition: 'A knobby tuber harvested from the root of a native North American sunflower, tasting of sweet artichoke hearts and roasted hazelnuts.',
    detailedDescription: 'Despite its common moniker "Jerusalem Artichoke," this tuber is neither from Jerusalem nor an artichoke; it is the rhizome of a wild sunflower native to central North America. Rich in prebiotic inulin rather than starch, it caramelizes deeply when roasted and produces a silky, velvety purée.',
    origin: 'North America',
    peakSeason: 'October to March (flavor deepens post-frost)',
    peakMonths: [9, 10, 11, 0, 1, 2],
    brixScore: 'High inulin polysaccharide',
    priceTier: '$$',
    shelfLife: '1 - 2 weeks refrigerated',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Knobby, ginger-like tubers with pale tan to reddish skin; smooth skin without green sunburn spots.',
      feel: 'Rock hard and firm throughout; no soft sunken spots around the knobs.',
      smell: 'Pleasantly earthy, nutty, and root-like.',
      avoid: 'Wrinkled shriveled skin, sprouting eyes, or mushy spongy knobs.'
    },
    storage: {
      location: 'Perforated plastic bag in crisper',
      temp: '32°F - 35°F',
      proTip: 'Sunchokes have very thin skin. Do not peel them with a peeler! Simply scrub thoroughly with a vegetable brush to retain maximum flavor and reduce waste.'
    },
    culinaryUses: [
      'Silky sunchoke purée or velouté with brown butter',
      'Thinly sliced and roasted until crisp like artisan chips',
      'Raw shaved into salads with truffle oil and hazelnuts',
      'Slow braised with leeks and thyme'
    ],
    pairings: ['Brown Butter', 'Hazelnuts', 'Black Truffle', 'Thyme', 'Scallops', 'Leeks'],
    substitutes: ['Parsnip + Artichoke hearts', 'Water Chestnuts'],
    funFact: 'The name "Jerusalem" is believed to be an English corruption of the Italian word for sunflower, "Girasole" (turning towards the sun).'
  },
  {
    id: 'ramp-wild-leek',
    name: 'Ramps (Wild Leeks)',
    category: 'vegetable',
    scientificName: 'Allium tricoccum',
    altNames: ['Wild Leek', 'Spring Onion'],
    pronunciation: 'ramps',
    emoji: '🌱',
    badgeColor: 'emerald',
    shortDefinition: 'A prized, ephemeral wild spring allium boasting a potent, electrifying blend of sweet leek and pungent wild garlic.',
    detailedDescription: 'Foraged in deciduous hardwood forests across eastern North America for a fleeting 4-6 week window in spring, ramps are legendary among chefs. Their wide, tender emerald leaves taper to a crimson-purple sheath and small white bulb. Every part—from bulb to leaf—is deeply aromatic.',
    origin: 'Appalachia / Eastern Woodlands',
    peakSeason: 'April to late May',
    peakMonths: [3, 4],
    brixScore: 'Allium rich',
    priceTier: '$$$$ (Foraged delicacy)',
    shelfLife: '3 - 5 days (highly perishable)',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Broad, silky green leaves with vibrant magenta-burgundy stems; clean white bulb with rootlets.',
      feel: 'Tender leaves, firm crisp bulbs; leaves should stand up without wilting.',
      smell: 'Pungent, sweet, intoxicating aroma of wild garlic and fresh spring earth.',
      avoid: 'Yellowed, slimy leaf tips, limp waterlogged stems, or pungent sour decay.'
    },
    storage: {
      location: 'Refrigerated wrapped in damp paper towels inside unsealed bag',
      temp: '34°F - 38°F',
      proTip: 'Ethical foraging tip: Support market vendors who practice sustainable harvesting (cutting the leaves above the bulb and root), allowing the wild colony to regenerate over its 7-year life cycle.'
    },
    culinaryUses: [
      'Charred whole on the grill and served with romesco sauce',
      'Vibrant ramp compound butter (freezable for year-round flavor)',
      'Pickled ramp bulbs for martinis and charcuterie',
      'Folded into fresh scrambled eggs or ricotta gnocchi'
    ],
    pairings: ['Farm Eggs', 'Morel Mushrooms', 'Pancetta', 'Cultured Butter', 'Sourdough'],
    substitutes: ['Scallions + Crushed Garlic', 'Garlic Scapes'],
    funFact: 'The city name "Chicago" derives from the Native Miami-Illinois word "Shikaakwa", which translates directly to "place of the wild leek / ramp".'
  },
  {
    id: 'shishito-pepper',
    name: 'Shishito Pepper',
    category: 'vegetable',
    scientificName: 'Capsicum annuum var. grossum',
    altNames: ['Lion Pepper', 'Kkwarigochu'],
    pronunciation: 'shee-SHEE-toh',
    emoji: '🫑',
    badgeColor: 'emerald',
    shortDefinition: 'A wrinkled, thin-walled Japanese snacking pepper with mild smoky sweetness, where roughly 1 in every 10 peppers packs surprise fiery heat.',
    detailedDescription: 'Named Shishito because its tips are said to resemble a lion\'s head ("shishi"), these small peppers blister quickly in high heat. The surprise spice roulette occurs due to environmental water and sun stress, creating intermittent spikes of capsaicin.',
    origin: 'Japan',
    peakSeason: 'June to October',
    peakMonths: [5, 6, 7, 8, 9],
    brixScore: 'Mild sweetness (50 - 200 Scoville)',
    priceTier: '$$',
    shelfLife: '1 - 2 weeks refrigerated',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Glossy light to medium green; heavily wrinkled, accordion-like skin with sturdy stem.',
      feel: 'Taut and springy with thin walls.',
      smell: 'Crisp green pepper scent without pungency.',
      avoid: 'Limp rubbery skin, red overripe softness, or dark decay around stem.'
    },
    storage: {
      location: 'Crisper drawer in paper bag',
      temp: '45°F - 50°F',
      proTip: 'Always poke a tiny pinhole or slit in each pepper before dropping into hot oil; otherwise, expanding trapped steam will cause the peppers to explode violently!'
    },
    culinaryUses: [
      'Blistered in smoking hot cast iron with sesame oil and flaky sea salt',
      'Dipped in bonito flakes and sweet soy sauce',
      'Lightly battered tempura style with tentsuyu dipping sauce'
    ],
    pairings: ['Bonito Flakes', 'Toasted Sesame Oil', 'Coarse Sea Salt', 'Yuzu Kosho'],
    substitutes: ['Padrón Peppers'],
    funFact: 'In Japan, shishito roulette is a fun drinking game: the person who bites into the solitary spicy 1-in-10 pepper pays for the round of draft beers!'
  },

  // ================= FUNGI =================
  {
    id: 'golden-chanterelle',
    name: 'Golden Chanterelle',
    category: 'fungi',
    scientificName: 'Cantharellus cibarius',
    altNames: ['Girolle', 'Pfifferling'],
    pronunciation: 'shan-ter-EL',
    emoji: '🍄',
    badgeColor: 'amber',
    shortDefinition: 'A vase-shaped wild woodland mushroom offering an unmistakable aroma of ripe apricots and a velvety, peppery bite.',
    detailedDescription: 'One of the most beloved wild foraged mushrooms in gastronomy, chanterelles form mycorrhizal partnerships with conifer and hardwood roots. Unlike common mushrooms, they feature false gills (forked ridges that run down the stem) and a golden apricot hue. They cook to a dense, chewy texture without disintegrating.',
    origin: 'Pacific Northwest / European Woodlands',
    peakSeason: 'July to November',
    peakMonths: [6, 7, 8, 9, 10],
    brixScore: 'Savory Umami / Peppery',
    priceTier: '$$$',
    shelfLife: '5 - 7 days dry cold storage',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Vibrant golden-apricot to sunny yellow; vase or trumpet shape with intact wavy margins.',
      feel: 'Plump and firm; dry to the touch with a suede-like velvet exterior; not spongy.',
      smell: 'Distinctive, intoxicating perfume of dried apricots, fresh forest moss, and white pepper.',
      avoid: 'Dark brown slimy edges, waterlogged weight, or worm holes near the base.'
    },
    storage: {
      location: 'Open brown paper bag in refrigerator (never in plastic!)',
      temp: '34°F - 38°F',
      proTip: 'Never soak chanterelles in water! They act like sponges. Use a soft horsehair pastry brush to dust away woodland debris right before cooking.'
    },
    culinaryUses: [
      'Dry-sautéed in an ungreased pan to release moisture, then finished with butter and shallots',
      'Folded into creamy risotto, polenta, or tagliatelle pasta',
      'Chanterelle toast on toasted brioche with crème fraîche',
      'Pickled in white wine vinegar with tarragon'
    ],
    pairings: ['French Shallots', 'Grass-fed Butter', 'Crème Fraîche', 'Thyme', 'Veal', 'Chardonnay'],
    substitutes: ['Hedgehog Mushroom', 'Yellow Foot Chanterelle', 'Oyster Mushroom'],
    funFact: 'Chanterelles have never been successfully cultivated in commercial farms because they require living symbiotic tree root systems to fruit.'
  },
  {
    id: 'morel-mushroom',
    name: 'Morel Mushroom',
    category: 'fungi',
    scientificName: 'Morchella esculenta / elata',
    altNames: ['Morchella', 'Sponge Mushroom', 'Dryland Fish'],
    pronunciation: 'mor-EL',
    emoji: '🍄‍🟫',
    badgeColor: 'stone',
    shortDefinition: 'An elusive honeycomb-capped wild spring fungus delivering a deep, nutty, woodsy umami savoriness.',
    detailedDescription: 'The arrival of morels in spring marks the kickoff of the wild foraging calendar. Featuring an unmistakable hollow interior and exterior ridges resembling a natural honeycomb or sponge, morels soak up rich pan sauces like miniature sponges, releasing deeply complex earthy and smoky notes.',
    origin: 'Temperate Forests & Post-Burn Areas (North America & Europe)',
    peakSeason: 'Late March to June',
    peakMonths: [2, 3, 4, 5],
    brixScore: 'Savory Earthy Umami',
    priceTier: '$$$$',
    shelfLife: '3 - 5 days refrigerated',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Pits and ridges are well defined, ranging from blonde to deep charcoal; hollow continuous stem from base to cap.',
      feel: 'Springy, light, and elastic; dry and airy.',
      smell: 'Rich, damp deciduous forest floor, toasted hazelnuts, and musk.',
      avoid: 'Soft, wet soggy caps, mold inside the hollow chamber, or brittle crumbly edges.'
    },
    storage: {
      location: 'Paper bag or ventilated wooden basket in refrigerator',
      temp: '34°F - 37°F',
      proTip: 'NEVER consume morels raw; they contain small amounts of hydrazine toxins that break down completely when cooked. Always slice in half lengthwise to check for forest hitchhikers.'
    },
    culinaryUses: [
      'Sautéed in unsalted butter with fresh ramps and heavy cream',
      'Morel cream sauce over roasted chicken or filet mignon',
      'Stuffed with duck confit or herbs and gently braised',
      'Dried and reconstituted for winter mushroom broths'
    ],
    pairings: ['Ramps', 'Heavy Cream', 'Cognac', 'Tarragon', 'Roast Chicken', 'Shallots'],
    substitutes: ['Dried Porcini', 'Shiitake', 'Black Trumpet'],
    funFact: 'Black morels fruit in massive numbers in the spring following forest wildfires, creating a famous seasonal gold rush among commercial foraged mushroom hunters.'
  },
  {
    id: 'lions-mane',
    name: "Lion's Mane Mushroom",
    category: 'fungi',
    scientificName: 'Hericium erinaceus',
    altNames: ['Bearded Tooth', 'Pom-Pom Mushroom', 'Yamabushitake'],
    pronunciation: 'LY-unz mayn',
    emoji: '🪸',
    badgeColor: 'slate',
    shortDefinition: 'A cascading white icicle-spined mushroom with a remarkable tender, sweet texture reminiscent of lobster or crab meat.',
    detailedDescription: 'Resembling a cluster of frozen white icicles or a pom-pom, Lion\'s Mane is an extraordinary edible and functional mushroom. When seared in hot butter, its delicate spines crisp up while the interior develops a succulent, sweet, seafood-like shredded flake that vegetarian and Michelin chefs adore.',
    origin: 'North America, Europe, and Asia',
    peakSeason: 'Late Summer to Autumn (Year-round from artisanal growers)',
    peakMonths: [7, 8, 9, 10],
    brixScore: 'Sweet-Savory Seafood Profile',
    priceTier: '$$$',
    shelfLife: '4 - 7 days',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Snow-white to ivory spines; dense, compact spherical body.',
      feel: 'Bouncy and spongy like fresh bread; dry to the touch.',
      smell: 'Sweet, subtle herbal forest aroma.',
      avoid: 'Yellowing or pinkish-brown spines (starting to oxidize and turn bitter), slimy base.'
    },
    storage: {
      location: 'Brown paper bag in crisper',
      temp: '35°F - 38°F',
      proTip: 'Slice into thick 1-inch steaks, press gently in a dry cast iron skillet to expel moisture, then baste lavishly with butter, garlic, and thyme until edges are golden brown.'
    },
    culinaryUses: [
      '"Crab-less" Lion\'s Mane crab cakes with remoulade',
      'Pan-seared "scallop" medallions with garlic herb butter',
      'Pulled "pork" BBQ sandwiches (naturally shreds along the grain)',
      'Nourishing medicinal mushroom broths and teas'
    ],
    pairings: ['Old Bay Seasoning', 'Garlic Herb Butter', 'Lemon', 'Scallions', 'Dijon Mustard'],
    substitutes: ['King Oyster Mushroom', 'Lobster Mushroom', 'Lump Crab'],
    funFact: 'In traditional Japanese medicine, Lion\'s Mane was consumed by Buddhist Yamabushi monks to promote concentration and mental clarity; modern neurobiology validates its nerve growth factor (NGF) stimulation.'
  },
  {
    id: 'maitake-mushroom',
    name: 'Maitake (Hen of the Woods)',
    category: 'fungi',
    scientificName: 'Grifola frondosa',
    altNames: ['Hen of the Woods', 'Dancing Mushroom', 'Ram\'s Head'],
    pronunciation: 'my-TAH-kay',
    emoji: '🪶',
    badgeColor: 'stone',
    shortDefinition: 'A dense, leafy rosette of ruffled grey-brown fronds with an intense woodsy, peppery umami depth that roasts to crispy perfection.',
    detailedDescription: 'Found clustering at the foot of ancient oak trees in late autumn, Maitake earned its Japanese name ("Dancing Mushroom") because foragers would literally dance with joy upon uncovering this prize. Its fronds crisp dramatically when roasted, while the succulent core stays meaty and savory.',
    origin: 'Japan / Northeastern North America',
    peakSeason: 'September to November',
    peakMonths: [8, 9, 10],
    brixScore: 'Ultra-Rich Glutamate Umami',
    priceTier: '$$$',
    shelfLife: '7 - 10 days refrigerated',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Fluffy cluster of overlapping fronds; rich charcoal to tawny brown edges with creamy white undersides.',
      feel: 'Firm and springy; dry with no wet sliminess in the center core.',
      smell: 'Intensely rich, savory, and clean woodland mushroom perfume.',
      avoid: 'Soft watery fronds, powdery grey mold, or dry brittle shattering edges.'
    },
    storage: {
      location: 'Unsealed paper bag in refrigerator',
      temp: '34°F - 38°F',
      proTip: 'Pull apart into large bite-sized clusters with your hands instead of using a knife. Tearing creates jagged edges that caramelize into crunchy flavor crisps in hot oil.'
    },
    culinaryUses: [
      'Cast-iron seared "steak" pressed with a heavy skillet',
      'Tempura fried with sea salt and matcha powder',
      'Slow simmered in soba noodle dashi broth',
      'Roasted with soy sauce, mirin, and sesame seeds'
    ],
    pairings: ['Soy Sauce', 'Mirin', 'Sesame Oil', 'Grass-fed Beef', 'Sake', 'Rosemary'],
    substitutes: ['Oyster Mushroom', 'Shiitake'],
    funFact: 'During Japan\'s feudal era, shoguns and nobles traded silver pound-for-pound for wild Maitake clusters brought from northern mountains.'
  },

  // ================= HERBS & BOTANICALS =================
  {
    id: 'nasturtium',
    name: 'Nasturtium (Leaves & Flowers)',
    category: 'herb',
    scientificName: 'Tropaeolum majus',
    altNames: ['Indian Cress', 'Edible Watercress'],
    pronunciation: 'nuh-STUR-shum',
    emoji: '🌸',
    badgeColor: 'red',
    shortDefinition: 'An edible botanical featuring round lily pad-shaped leaves and vibrant fiery blossoms with a bold, wasabi-peppery punch.',
    detailedDescription: 'Every single part of the nasturtium plant is edible. Its shield-shaped leaves and brilliantly hued petals (ranging from crimson to electric gold) contain glucosinolates, giving them a delightful peppery, horseradish kick. The green unripened seed pods are frequently pickled as "poor man\'s capers".',
    origin: 'Andes Mountains (South America)',
    peakSeason: 'May to October',
    peakMonths: [4, 5, 6, 7, 8, 9],
    brixScore: 'Peppery Mustard Oil notes',
    priceTier: '$$',
    shelfLife: '3 - 5 days',
    ethyleneSensitivity: 'Moderate',
    ripenessGuide: {
      look: 'Bright, unfaded petals; crisp emerald lilypad leaves without yellow halos.',
      feel: 'Crisp, velvety, and buoyant.',
      smell: 'Light floral scent followed by a fresh peppery mustard sting.',
      avoid: 'Wilting, translucent petal edges, or limp yellow stems.'
    },
    storage: {
      location: 'Lined airtight container with damp paper towel in fridge',
      temp: '40°F - 45°F',
      proTip: 'To revive slightly wilted nasturtium flowers, submerge them in an ice-water bath for 2 minutes, then gently drain on paper towels.'
    },
    culinaryUses: [
      'Stunning edible garnish on salads, crudos, and carpaccio',
      'Nasturtium leaf pesto (replaces basil for a peppery bite)',
      'Infused botanical vinegars with a blush pink tint',
      'Pickled green seed pods as homemade capers'
    ],
    pairings: ['Burrata', 'Goat Cheese', 'Smoked Salmon', 'Radishes', 'Lemon Vinaigrette'],
    substitutes: ['Watercress', 'Arugula flowers', 'Radish microgreens'],
    funFact: 'The name nasturtium literally translates from Latin as "nasus tortus", meaning "twisted nose" — referring to how one\'s face crinkles upon tasting the spicy mustard kick!'
  },
  {
    id: 'lemon-verbena',
    name: 'Lemon Verbena',
    category: 'herb',
    scientificName: 'Aloysia citrodora',
    altNames: ['Lemon Beebrush', 'Hierba Luisa'],
    pronunciation: 'LEM-un ver-BEE-nuh',
    emoji: '🌿',
    badgeColor: 'lime',
    shortDefinition: 'A perennial botanical shrub possessing the purest, most electrifying sweet lemon scent in the botanical world.',
    detailedDescription: 'While lemon balm and lemongrass are pleasant, lemon verbena is the indisputable crown jewel of lemon-scented herbs. Its slender, rough-textured lanceolate leaves contain high concentrations of citral and nerol oils, delivering a rich lemon drop fragrance without any harsh astringency or soapy aftertaste.',
    origin: 'South America (Chile & Argentina)',
    peakSeason: 'June to October',
    peakMonths: [5, 6, 7, 8, 9],
    brixScore: 'Pure Citral Essential Oil',
    priceTier: '$$',
    shelfLife: '4 - 6 days fresh / 1 year dried',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Vibrant lime-green pointed leaves along woody stems; free of black blemishes.',
      feel: 'Slightly rough, sandpapery texture on the leaf surface.',
      smell: 'Explosive, pure candy-sweet lemon aroma when rubbed between fingers.',
      avoid: 'Blackened leaves, dry brittle stems, or odorless foliage.'
    },
    storage: {
      location: 'Stored like flowers in a glass of water on counter, or wrapped loosely in fridge',
      temp: '45°F - 55°F',
      proTip: 'Lemon verbena dries exceptionally well. Hang bundled stems upside down in a dark, airy closet for 10 days to enjoy herbal tisanes throughout the entire winter.'
    },
    culinaryUses: [
      'Infused into cream for panna cotta, ice cream, and pastry creams',
      'Cold-steeped herbal iced teas and lemonade enhancers',
      'Syrups for craft cocktails and stone fruit poaches',
      'Finely minced in fruit salads (peaches, blackberries, melons)'
    ],
    pairings: ['White Peaches', 'Vanilla Bean', 'Blackberries', 'Mascarpone', 'Gin', 'Mint'],
    substitutes: ['Lemongrass', 'Lemon Thyme', 'Kaffir Lime Leaf'],
    funFact: 'Scarlett O\'Hara\'s mother in Gone with the Wind was famously described by the author as always smelling of lemon verbena sachet.'
  },
  {
    id: 'french-sorrel',
    name: 'French Sorrel',
    category: 'herb',
    scientificName: 'Rumex acetosa',
    altNames: ['Garden Sorrel', 'Oseille'],
    pronunciation: 'french SOR-ul',
    emoji: '🌱',
    badgeColor: 'emerald',
    shortDefinition: 'A leafy green perennial with tender arrow-shaped leaves packing an electrifying, bright sour-green apple and lemon zing.',
    detailedDescription: 'Prized in classical French bistro cooking, sorrel gets its tart punch from natural oxalic acid. When dropped into hot butter or cream, its green leaves instantly melt down into an emerald fondue sauce with natural mouthwatering acidity that cuts right through rich fatty fish like salmon.',
    origin: 'Eurasia',
    peakSeason: 'April to October',
    peakMonths: [3, 4, 5, 6, 7, 8, 9],
    brixScore: 'Tart Oxalic Acid Zing',
    priceTier: '$$',
    shelfLife: '3 - 5 days',
    ethyleneSensitivity: 'High',
    ripenessGuide: {
      look: 'Tender pale-green arrow-shaped leaves; smooth unblemished surface.',
      feel: 'Supple and delicate like baby spinach.',
      smell: 'Fresh tart green scent.',
      avoid: 'Tough, overgrown leaves with flowering seed heads (too bitter and fibrous).'
    },
    storage: {
      location: 'Plastic bag with dry paper towel in crisper',
      temp: '34°F - 38°F',
      proTip: 'Never cook sorrel in an unlined cast iron or aluminum pan! Oxalic acid reacts with reactive metals, turning the sauce a dismal metallic gray and creating an unpleasant tinny taste. Use stainless steel or enameled pans.'
    },
    culinaryUses: [
      'Iconic French salmon with sorrel sauce (Saumon à l\'oseille)',
      'Traditional Eastern European green borscht / shav soup',
      'Raw chiffonade in lentil and goat cheese salads',
      'Sorrel and buttermilk cold summer soup'
    ],
    pairings: ['Wild Salmon', 'Heavy Cream', 'Farm Eggs', 'Goat Cheese', 'Shallots', 'Dill'],
    substitutes: ['Baby spinach + fresh lemon juice', 'Watercress'],
    funFact: 'The legendary Troisgros brothers earned three Michelin stars in 1968 largely on the strength of their revolutionary flash-seared salmon with sorrel sauce.'
  },

  // ================= MARKET JARGON =================
  {
    id: 'brix-scale',
    name: 'Brix Scale (°Bx)',
    category: 'jargon',
    scientificName: 'Degrees Brix (°Bx)',
    altNames: ['Refractometer Index', 'Sugar Content Scale'],
    pronunciation: 'bree-ks skayl',
    emoji: '📐',
    badgeColor: 'blue',
    shortDefinition: 'A scientific optical measurement indicating the percentage of soluble sugar solids in fruit or vegetable juice.',
    detailedDescription: 'Named after German chemist Adolf Brix, one degree Brix represents 1 gram of sucrose in 100 grams of aqueous solution. Market farmers use hand-held optical or digital refractometers to test sap and juice drops in the field, ensuring produce is picked at peak physiological sweetness rather than simply when it looks ripe.',
    origin: 'Germany / International Agriculture',
    peakSeason: 'Year-round agricultural metric',
    peakMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    brixScore: 'Metric itself (0° to 30°+ Bx)',
    priceTier: 'N/A',
    shelfLife: 'N/A',
    ethyleneSensitivity: 'N/A',
    ripenessGuide: {
      look: 'Standard grocery watermelon: ~8-9° Bx. High-grade farmers market watermelon: 12-14° Bx.',
      feel: 'Higher Brix fruits feel denser due to dissolved sugar solids.',
      smell: 'Direct correlation with volatile aromatic compounds.',
      avoid: 'Low-Brix produce tastes watery and diluted, often caused by over-irrigation right before harvest.'
    },
    storage: {
      location: 'Market knowledge tool',
      temp: 'N/A',
      proTip: 'Ask your favorite orchardist at the market: "What is the Brix reading on this batch of peaches?" A knowledgeable grower will proudly share their exact refractometer number!'
    },
    culinaryUses: [
      'Determining fruit suitability for wine, cider, and fermentation',
      'Balancing sorbet bases (ideal sorbet syrup is 28-32° Bx)',
      'Assessing tomato concentration for gourmet sauce reduction'
    ],
    pairings: ['Watermelons', 'Heirloom Peaches', 'Wine Grapes', 'Sweet Corn', 'Strawberries'],
    substitutes: ['Baumé scale', 'Specific Gravity (SG)'],
    funFact: 'Modern smart refractometers can read the Brix level of an unblemished grape in 3 seconds using near-infrared light without piercing the skin.'
  },
  {
    id: 'dry-farmed',
    name: 'Dry-Farmed',
    category: 'jargon',
    scientificName: 'Arid / Non-Irrigated Viticulture & Horticulture',
    altNames: ['Secano', 'Rain-Fed Produce'],
    pronunciation: 'dry FAHRMD',
    emoji: '🏜️',
    badgeColor: 'amber',
    shortDefinition: 'Produce cultivated without any artificial irrigation after early seedling establishment, forcing roots deep into subsoil.',
    detailedDescription: 'Dry-farming relies entirely on residual moisture trapped in soil from winter rains. Because the plant experiences deliberate, managed water stress, it produces smaller yields of dramatically more concentrated, nutrient-dense, and intensely flavorful fruit (famously seen in Coastal California Early Girl tomatoes and Mediterranean olive groves).',
    origin: 'Mediterranean Basin / California Coast',
    peakSeason: 'Late Summer to Fall (July to October)',
    peakMonths: [6, 7, 8, 9],
    brixScore: '20-40% higher sugars and acids than irrigated peers',
    priceTier: '$$$',
    shelfLife: 'Superior shelf life due to lower water content',
    ethyleneSensitivity: 'Varies by crop',
    ripenessGuide: {
      look: 'Typically smaller in size; deeply saturated colors; thicker skins.',
      feel: 'Dense and meaty rather than watery and bloated.',
      smell: 'Intensely concentrated varietal scent.',
      avoid: 'Do not confuse with drought-damaged crop; dry-farmed leaves remain healthy and green.'
    },
    storage: {
      location: 'Countertop for dry-farmed tomatoes; never refrigerate',
      temp: '65°F - 70°F',
      proTip: 'Dry-farmed Early Girl tomatoes have such low internal water content that when you slice them, barely any juice runs out on the cutting board—pure tomato jam flavor.'
    },
    culinaryUses: [
      'Raw tasting plates with flaky salt and high-phenolic olive oil',
      'Sun-dried or slow-roasted confit tomatoes',
      'Artisanal pizza toppings (won\'t make the crust soggy!)'
    ],
    pairings: ['Buffalo Mozzarella', 'Fleur de Sel', 'Extra Virgin Olive Oil', 'Basil'],
    substitutes: ['Heirloom Field Tomatoes'],
    funFact: 'Dry-farmed tomato roots have been excavated reaching depths of over 10 feet down into subterranean clay layers in search of moisture.'
  },
  {
    id: 'heirloom-vs-hybrid',
    name: 'Heirloom Cultivar',
    category: 'jargon',
    scientificName: 'Open-Pollinated Heritage Germplasm',
    altNames: ['Heritage Variety', 'Open-Pollinated'],
    pronunciation: 'AIR-loom KUL-tih-var',
    emoji: '🌾',
    badgeColor: 'rose',
    shortDefinition: 'A historical open-pollinated plant variety preserved across generations (typically 50+ years) for exceptional flavor over shelf-life.',
    detailedDescription: 'While modern commercial hybrids (F1) are bred for uniform size, thick skin, and mechanical harvesting longevity, heirlooms are selected strictly for taste, aroma, historical character, and culinary beauty. Seeds saved from an heirloom fruit will produce identical offspring year after year.',
    origin: 'Traditional Agricultural Communities Globally',
    peakSeason: 'Seasonal according to variety',
    peakMonths: [5, 6, 7, 8, 9, 10],
    brixScore: 'Superior flavor complexity',
    priceTier: '$$ - $$$',
    shelfLife: 'Shorter shelf life (consume promptly)',
    ethyleneSensitivity: 'Crop specific',
    ripenessGuide: {
      look: 'Irregular shapes, ribbed shoulders, fascinating color variegations (green stripes, purple blushes, tie-dye patterns).',
      feel: 'Delicate, thin skin with juicy yield.',
      smell: 'Potent nostalgic aroma that fills the room.',
      avoid: 'Assuming blemishes mean poor quality; minor cosmetic catfacing on heirloom tomatoes is common and harmless.'
    },
    storage: {
      location: 'Gentle handling; store in single layer',
      temp: 'Ambient room temp for fruits; cool crisper for greens',
      proTip: 'Always save seeds from your tastiest market heirloom varieties! Dry them on a paper towel, store in an envelope, and plant them in your garden next spring.'
    },
    culinaryUses: [
      'Multi-colored heirloom carpaccio platters',
      'Celebrating singular ingredients in minimalist gastronomy',
      'Preserving biological diversity through eating'
    ],
    pairings: ['Artisanal Sea Salt', 'Fresh Cheeses', 'Cold-pressed Oils'],
    substitutes: ['Standard F1 Hybrid (compromises flavor)'],
    funFact: 'Over 90% of the vegetable varieties grown in the United States in the year 1900 are now commercially extinct, preserved only through heirloom seed banks.'
  },
  {
    id: 'csa-community-agriculture',
    name: 'CSA (Community Supported Agriculture)',
    category: 'jargon',
    scientificName: 'Civic Agriculture Partnership',
    altNames: ['Farm Share', 'Subscription Harvest Box'],
    pronunciation: 'see-es-AY',
    emoji: '📦',
    badgeColor: 'emerald',
    shortDefinition: 'A direct socioeconomic farm model where consumers purchase "shares" of a farm\'s harvest upfront before the growing season.',
    detailedDescription: 'Originating in Japan (teikei: "food with the farmer\'s face") and Germany/Switzerland in the 1960s, CSAs give small regenerative farmers vital working capital before planting while granting members weekly boxes of hyper-fresh, seasonal produce picked within 24 hours of delivery.',
    origin: 'Japan & Switzerland (1960s)',
    peakSeason: 'Spring through Winter subscription cycles',
    peakMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    brixScore: 'Maximum freshness',
    priceTier: '$$ (High value per pound)',
    shelfLife: 'Far exceeds supermarket produce due to zero transit time',
    ethyleneSensitivity: 'Varies',
    ripenessGuide: {
      look: 'Field-run freshness; soil may still be on root vegetables; greens crisp and hydrated.',
      feel: 'Turgid, crisp, and vibrant.',
      smell: 'Living earth and clean sunshine.',
      avoid: 'Middleman markups—100% of your dollar supports the family farm.'
    },
    storage: {
      location: 'Batch process upon weekly arrival',
      temp: 'Varies',
      proTip: 'When your CSA box arrives, dedicate 20 minutes to wash, spin dry greens, and prep vegetables into glass containers. You will eat 100% of your box with zero food waste.'
    },
    culinaryUses: [
      'Embracing "surprise" seasonal cooking and root-to-stem utilization',
      'Pickling and fermenting abundance gluts',
      'Discovering unexpected rare produce you\'ve never cooked before'
    ],
    pairings: ['Seasonal Cooking', 'Fermentation Crocks', 'Meal Prepping'],
    substitutes: ['Direct Farmers Market Stalls'],
    funFact: 'Studies show that food in standard supermarkets travels an average of 1,500 miles from farm to plate; CSA food travels an average of just 20 to 50 miles.'
  },
  {
    id: 'seconds-number-twos',
    name: 'Seconds / Number 2s',
    category: 'jargon',
    scientificName: 'Grade B / Processing Grade Produce',
    altNames: ['Canning Grade', 'Ugly Produce', 'Field Sort'],
    pronunciation: 'SEK-undz',
    emoji: '🛒',
    badgeColor: 'amber',
    shortDefinition: 'Top-quality, delicious farm produce with minor cosmetic defects, odd sizes, or sunscald sold at a 30% to 50% discount.',
    detailedDescription: 'Supermarkets reject produce that isn\'t uniform in shape and color. At the farmers market, smart shoppers ask growers for "a box of seconds" when planning batch cooking, homemade tomato marinara, peach jams, or applesauce. The nutritional value and peak flavor are identical to premium Grade 1 produce.',
    origin: 'Agricultural Wholesale Grading',
    peakSeason: 'Peak harvest abundance months',
    peakMonths: [6, 7, 8, 9],
    brixScore: 'Equal to Grade 1 produce',
    priceTier: '$ (Huge savings)',
    shelfLife: 'Trim bruised spots and process promptly',
    ethyleneSensitivity: 'Standard',
    ripenessGuide: {
      look: 'Healed scars, catfacing cracks, small size or oversized curls; not rotten.',
      feel: 'Firm and juicy under cosmetic marks.',
      smell: 'Same rich fragrance as Grade 1.',
      avoid: 'Rotten soft decay, leaking juice, or fuzzy mold.'
    },
    storage: {
      location: 'Process or preserve within 48 hours',
      temp: 'Room temp for tomatoes; cool for stone fruit',
      proTip: 'Want to make 20 quarts of artisanal tomato sauce for winter? Arrive at the farmers market near closing time and ask the farmer: "Do you have any crates of canning seconds?" They\'ll often give you a steep bulk deal rather than lugging them back to the farm.'
    },
    culinaryUses: [
      'Massive batches of pasta sauce, salsa, and ratatouille',
      'Fruit preserves, chutneys, and berry crumbles',
      'Fresh vegetable stocks and gazpachos'
    ],
    pairings: ['Canning Jars', 'Stockpots', 'Immersion Blenders'],
    substitutes: ['Grade 1 Retail Produce'],
    funFact: 'Approximately 30% of edible food in North America is discarded before leaving the farm purely because of cosmetic aesthetic standards.'
  },
  {
    id: 'climacteric-vs-non-climacteric',
    name: 'Climacteric vs Non-Climacteric',
    category: 'jargon',
    scientificName: 'Post-Harvest Respiration Physiology',
    altNames: ['Ripening Physiology', 'Ethylene Response Type'],
    pronunciation: 'kly-mak-TER-ik',
    emoji: '🔬',
    badgeColor: 'indigo',
    shortDefinition: 'The biological distinction between fruits that continue to ripen and convert starch to sugar after harvest vs those that only ripen on the parent plant.',
    detailedDescription: 'Climacteric fruits (apples, pears, peaches, avocados, tomatoes, bananas) experience an explosive burst of ethylene gas and cellular respiration after being plucked, allowing them to soften, color, and sweeten. Non-climacteric fruits (strawberries, grapes, citrus, figs, cherries, pineapples, watermelons) have no such burst—once picked, their sugar content is locked forever.',
    origin: 'Plant Physiology',
    peakSeason: 'Fundamental post-harvest rule',
    peakMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    brixScore: 'Drives all sugar development',
    priceTier: 'N/A',
    shelfLife: 'Key to knowing when to eat',
    ethyleneSensitivity: 'High vs Non-responsive',
    ripenessGuide: {
      look: 'Climacteric changes color rapidly on the counter; non-climacteric merely dehydrates or molds.',
      feel: 'Climacteric softens over days; non-climacteric turns spongy or leathery.',
      smell: 'Aroma intensifies on counter for climacteric only.',
      avoid: 'Buying hard non-climacteric fruit (e.g. green strawberries or rock-hard figs) expecting them to get sweet at home—they never will!'
    },
    storage: {
      location: 'Store climacteric on counter to ripen; non-climacteric in cold fridge immediately',
      temp: 'Ambient vs Chilled',
      proTip: 'To quickly ripen an underripe avocado or peach, seal it in a paper bag with an apple. The trapped ethylene gas from the apple accelerates the ripening enzymes in the peach by 3x.'
    },
    culinaryUses: [
      'Market shopping strategy for weekend vs weekday consumption',
      'Ethylene gas management in home pantry',
      'Preventing premature spoiling of leafy greens'
    ],
    pairings: ['Pantry Organization', 'Fruit Bowls', 'Brown Paper Bags'],
    substitutes: ['N/A'],
    funFact: 'Ancient Egyptian farmers would deliberately puncture figs with curved knives to induce ethylene release, artificially accelerating fruit swelling and ripening.'
  },

  // ================= CULINARY PREP =================
  {
    id: 'chiffonade',
    name: 'Chiffonade',
    category: 'prep',
    scientificName: 'Culinary Knife Technique',
    altNames: ['Ribbon Cut', 'Shred Cut'],
    pronunciation: 'shif-uh-NAHD',
    emoji: '🔪',
    badgeColor: 'cyan',
    shortDefinition: 'A French cutting technique where leafy greens or broad herbs are stacked, rolled tightly into a cigar, and sliced into delicate ribbons.',
    detailedDescription: 'Derived from the French word "chiffon" (rag), this essential culinary technique transforms tough leaves like Lacinato kale, collards, and broad herbs like basil and sage into fine, silky strands. Slicing uniformly exposes maximum surface area for dressings, heat penetration, and aroma release without bruising plant cells.',
    origin: 'Classical French Cuisine',
    peakSeason: 'Year-round technique',
    peakMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    brixScore: 'N/A',
    priceTier: 'N/A',
    shelfLife: 'Best used within 30 minutes of cutting',
    ethyleneSensitivity: 'Cutting releases ethylene and enzymes',
    ripenessGuide: {
      look: 'Clean, feather-light ribbons without blackened or bruised leaf margins.',
      feel: 'Light, fluffy pile; not mashed or wet.',
      smell: 'Burst of fresh aromatic volatile oils.',
      avoid: 'Dull knives! A dull blade crushes cells and causes basil to oxidize and turn black within 5 minutes.'
    },
    storage: {
      location: 'Prep immediately before plating',
      temp: 'Room temp for basil; chilled for kale',
      proTip: 'Always slice with a single forward sliding stroke of a razor-sharp chef\'s knife. Never saw back and forth, which ruptures cell walls and releases polyphenol oxidase.'
    },
    culinaryUses: [
      'Garnish on fresh pomodoro pasta or margherita pizza',
      'Base for tender massaged kale salads',
      'Swirled into broths at the very last second before serving'
    ],
    pairings: ['Genovese Basil', 'Dino Kale', 'Sage', 'Sorrel', 'Mint'],
    substitutes: ['Julienne', 'Rough chop'],
    funFact: 'Classical French apprentice chefs had to demonstrate a chiffonade of sorrel so fine it could melt invisibly into a cream sauce within 15 seconds.'
  },
  {
    id: 'maceration',
    name: 'Maceration',
    category: 'prep',
    scientificName: 'Osmotic Softening & Extraction',
    altNames: ['Cold Sugar Extraction', 'Fruit Steeping'],
    pronunciation: 'mass-uh-RAY-shun',
    emoji: '🍓',
    badgeColor: 'pink',
    shortDefinition: 'Soaking fresh fruit in sugar, citrus juice, liquor, or vinegar to draw out natural juices via osmosis, creating a glossy, self-made syrup.',
    detailedDescription: 'Maceration is the sweet counterpart to savory marinating. When granulated sugar or acidic liquid is sprinkled over fresh berries or stone fruits, osmotic pressure pulls water through cell membranes. The fruit softens luxuriously while its natural juices dissolve the sugar, creating an intensely concentrated, unheated raw fruit syrup.',
    origin: 'Global Culinary Practice',
    peakSeason: 'Spring & Summer Fruit Peak',
    peakMonths: [4, 5, 6, 7, 8],
    brixScore: 'Creates high-Brix natural syrup',
    priceTier: 'N/A',
    shelfLife: '3 - 5 days refrigerated syrup',
    ethyleneSensitivity: 'N/A',
    ripenessGuide: {
      look: 'Glossy, jewel-toned fruit glistening in vibrant translucent syrup.',
      feel: 'Tender and supple, holding its structural shape.',
      smell: 'Deepened, concentrated varietal fruit bouquet.',
      avoid: 'Over-macerating delicate raspberries past 2 hours (they disintegrate into mush).'
    },
    storage: {
      location: 'Glass jar in refrigerator',
      temp: '36°F - 40°F',
      proTip: 'Try macerating slightly underripe market strawberries with a dash of balsamic vinegar, black pepper, and brown sugar—it rescues lackluster fruit into five-star dessert status.'
    },
    culinaryUses: [
      'Strawberry shortcake and buttermilk biscuits',
      'Topping for Greek yogurt, panna cotta, and pavlova',
      'Cocktail shrub and cordial bases',
      'Filling for summer tarts and galettes'
    ],
    pairings: ['Balsamic Vinegar', 'Aged Rum', 'Mint', 'Fresh Berries', 'Stone Fruit'],
    substitutes: ['Poaching (hot method)', 'Stewing'],
    funFact: 'The word originates from the Latin "macerare", meaning to soften, steep, or soak.'
  },
  {
    id: 'blanch-and-shock',
    name: 'Blanch & Shock',
    category: 'prep',
    scientificName: 'Thermal Enzyme Inactivation',
    altNames: ['Parboil & Ice Bath', 'Shocking'],
    pronunciation: 'blanch and shok',
    emoji: '🧊',
    badgeColor: 'cyan',
    shortDefinition: 'Plunging vegetables briefly into boiling salted water, then immediately submerging them in an ice-water bath to lock in neon color and crisp crunch.',
    detailedDescription: 'Blanching rapidly denatures the natural enzymes responsible for decaying chlorophyll, softening cell walls slightly. Plunging into an ice bath ("shocking") halts residual cooking instantly within seconds. This preserves vibrant emerald colors and locks in crisp-tender texture for farmers market crudités and salads.',
    origin: 'Classical Professional Kitchens',
    peakSeason: 'Year-round technique',
    peakMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    brixScore: 'Preserves natural sugars',
    priceTier: 'N/A',
    shelfLife: 'Extends vegetable prep life by 3 days',
    ethyleneSensitivity: 'Halts ethylene decay',
    ripenessGuide: {
      look: 'Shockingly bright, glowing neon-green or vibrant orange; crisp edges.',
      feel: 'Crisp-tender bite with pleasant audible snap.',
      smell: 'Clean, sweet, fresh vegetable scent without sulfurous odors.',
      avoid: 'Letting vegetables sit in warm water after boiling (leads to drab olive-green oxidation).'
    },
    storage: {
      location: 'Drained thoroughly and stored in airtight container with paper towel',
      temp: '34°F - 38°F',
      proTip: 'Use plenty of water (at least 4 quarts per pound of vegetables) and salt it until it tastes like seawater. A large volume of boiling water ensures the temperature does not drop when cold produce is added.'
    },
    culinaryUses: [
      'Snap peas, haricots verts, and asparagus for chilled salads',
      'Loosening skins on heirloom peaches and tomatoes for effortless peeling',
      'Pre-treating vegetables before home freezing'
    ],
    pairings: ['Haricots Verts', 'Asparagus', 'Sugar Snap Peas', 'Fava Beans', 'Broccolini'],
    substitutes: ['Steaming + Ice Bath'],
    funFact: 'The color green in plants is magnesium-based chlorophyll; prolonged heating drives out the magnesium atom, turning chlorophyll into dull brownish pheophytin.'
  },
  {
    id: 'supreme-citrus',
    name: 'Suprême (Citrus Cut)',
    category: 'prep',
    scientificName: 'Membrane-Free Citrus Segmenting',
    altNames: ['Citrus Segments', 'Pithless Wedges'],
    pronunciation: 'soo-PREM',
    emoji: '🍊',
    badgeColor: 'amber',
    shortDefinition: 'A precision French knife cut where citrus fruit is trimmed of peel and pith, then cleanly sliced along internal membranes to release pure, tender gem segments.',
    detailedDescription: 'Nothing elevates a salad or dessert faster than citrus suprêmes. By cutting along the translucent dividing radial membranes, you extract pristine juice sacs with zero bitter white pith, tough connective membranes, or seeds.',
    origin: 'Classical French Haute Cuisine',
    peakSeason: 'Citrus Season (Winter & Spring)',
    peakMonths: [11, 0, 1, 2, 3, 4],
    brixScore: 'Pure juicy fruit vesicles',
    priceTier: 'N/A',
    shelfLife: '2 - 3 days chilled in own juice',
    ethyleneSensitivity: 'Low',
    ripenessGuide: {
      look: 'Glistening, teardrop-shaped wedges without ragged tears or white pith strings.',
      feel: 'Bursting with liquid tension.',
      smell: 'Bright citrus spray.',
      avoid: 'Dull paring knives (they tear the delicate membranes instead of gliding cleanly).'
    },
    storage: {
      location: 'Submerged in the squeezed juice of the remaining citrus core in a glass container',
      temp: '34°F - 38°F',
      proTip: 'Hold the trimmed fruit over a bowl while cutting so all precious nectar drips into the bowl. After cutting all segments, squeeze the remaining skeletal core with your hand to extract every drop of fresh juice for vinaigrette!'
    },
    culinaryUses: [
      'Salad of endive, avocado, and blood orange suprêmes',
      'Garnish on seared duck breast, salmon, or crudo',
      'Tarts, pavlovas, and panna cotta toppings'
    ],
    pairings: ['Blood Oranges', 'Grapefruit', 'Avocado', 'Fennel', 'Olive Oil'],
    substitutes: ['Hand-peeled mandarin segments'],
    funFact: 'In classical French kitchens, a suprême also referred to the choice white breast meat of a chicken with wing bone attached.'
  }
];

// Brix Sweetness Reference Table for the interactive Refractometer tool
export const BRIX_REFERENCE_DATA = [
  { level: 'Poor / Watery', brixMin: 0, brixMax: 7, description: 'Underripe, forced commercial growth, or washed out by heavy rain before harvest.', emoji: '💧' },
  { level: 'Average Grocery', brixMin: 8, brixMax: 11, description: 'Standard supermarket benchmark picked early for transit durability.', emoji: '🛒' },
  { level: 'Good Market Quality', brixMin: 12, brixMax: 15, description: 'True farmers market standard with well-developed varietal character and balance.', emoji: '🌿' },
  { level: 'Exceptional / Artisanal', brixMin: 16, brixMax: 20, description: 'Sun-ripened on the vine/tree, dry-farmed, or harvested at peak physiological maturity.', emoji: '⭐' },
  { level: 'Nectar / Confection', brixMin: 21, brixMax: 32, description: 'Late harvest figs, concentrated wine grapes, and gourmet honeyed berries.', emoji: '🍯' }
];

// Interactive Ripeness Testing Items for the Freshness Inspector tool
export const RIPENESS_INSPECTOR_ITEMS = [
  {
    id: 'avocado',
    name: 'Hass Avocado',
    emoji: '🥑',
    category: 'Fruit',
    indicators: {
      firmness: { label: 'Firmness / Give', options: ['Rock hard (no yield)', 'Gentle yield under palm', 'Spongy / Dent leaves finger mark'] },
      stemCap: { label: 'Stem Button Check', options: ['Firm green stem button', 'Flicks off easily showing bright jade green', 'Flicks off showing dark brown or black cavity'] },
      skinColor: { label: 'Skin Color', options: ['Bright grass green', 'Dark forest green with purple speckles', 'Charcoal black and dull wrinkled'] }
    },
    calculateResult: (f, s, c) => {
      if (f === 0 && s === 0 && c === 0) {
        return {
          status: 'Underripe (Firm)',
          score: 25,
          color: 'emerald',
          verdict: 'Wait 3-4 days. Store on the counter. To accelerate ripening, place in a paper bag with a banana.',
          culinaryUse: 'Slice thin for tempura or pickle in brine. Do not mash yet.'
        };
      }
      if (f === 1 && s === 1 && (c === 1 || c === 0)) {
        return {
          status: 'PEAK PERFECTION (Ready Now)',
          score: 95,
          color: 'green',
          verdict: 'Eat today or refrigerate immediately to halt ripening for 48 hours. Buttery, nutty, and velvety.',
          culinaryUse: 'Guacamole, crudo garnish, artisanal sourdough toast, sliced over salads.'
        };
      }
      if (f === 2 || s === 2 || c === 2) {
        return {
          status: 'Overripe / Salvage Stage',
          score: 40,
          color: 'amber',
          verdict: 'Stringy black oxidation channels likely developing inside.',
          culinaryUse: 'Scoop out green portions for chocolate avocado mousse or green smoothies. Discard dark brown rancid patches.'
        };
      }
      return {
        status: 'Nearly Ripe (1-2 days away)',
        score: 65,
        color: 'lime',
        verdict: 'Slight yield at the neck. Perfect for slicing tomorrow morning.',
        culinaryUse: 'Firm cubes in ceviche or breakfast bowls.'
      };
    }
  },
  {
    id: 'melon',
    name: 'Heirloom Cantaloupe',
    emoji: '🍈',
    category: 'Fruit',
    indicators: {
      firmness: { label: 'Blossom End Give', options: ['Rock hard without give', 'Springy spring-back yield', 'Soft mushy indent'] },
      stemCap: { label: 'Stem Scar (Full Slip)', options: ['Torn jagged stem piece attached', 'Smooth concave round crater (Full Slip)', 'Wet brown seepage around stem'] },
      skinColor: { label: 'Rind & Webbing', options: ['Green skin under netting', 'Warm creamy-gold skin under raised webbing', 'Yellow-brown sunken soft spots'] }
    },
    calculateResult: (f, s, c) => {
      if (s === 1 && c === 1 && f === 1) {
        return {
          status: 'PEAK FULL-SLIP SWEETNESS',
          score: 98,
          color: 'green',
          verdict: 'Full slip harvest: The vine naturally detached from the melon when fully loaded with sugars. Intense musky perfume!',
          culinaryUse: 'Draped with prosciutto di Parma, minted melon skewers, or chilled gazpacho.'
        };
      }
      if (s === 0 || c === 0) {
        return {
          status: 'Picked Pre-Maturely',
          score: 35,
          color: 'amber',
          verdict: 'Jagged stem indicates "forced harvest." Melons can soften off the vine, but cannot synthesize additional sugar.',
          culinaryUse: 'Shave very thin and pickle in lime and chili salt.'
        };
      }
      return {
        status: 'Overripe / Fermenting',
        score: 45,
        color: 'rose',
        verdict: 'Alcoholic or acetone smell likely. Sugars have begun fermenting.',
        culinaryUse: 'Puree for cocktail syrup or melon granita if not sour.'
      };
    }
  },
  {
    id: 'peach',
    name: 'Freestone Heirloom Peach',
    emoji: '🍑',
    category: 'Fruit',
    indicators: {
      firmness: { label: 'Shoulder Firmness', options: ['Hard like a cricket ball', 'Tender give around the stem shoulders', 'Collapsing under light thumb touch'] },
      stemCap: { label: 'Stem Cavity Color', options: ['Greenish-white background', 'Deep golden-yellow background', 'Brown discoloration with fruit flies'] },
      skinColor: { label: 'Skin Velvet & Scent', options: ['No smell, heavy fuzz', 'Explosive floral peach perfume', 'Alcoholic / boozy smell'] }
    },
    calculateResult: (f, s, c) => {
      if (f === 1 && s === 1 && c === 1) {
        return {
          status: 'JUICY NIRVANA (Peak Ripeness)',
          score: 96,
          color: 'green',
          verdict: 'Heavy in the hand with rich perfumed shoulders. Juices will run down your arm upon first bite.',
          culinaryUse: 'Raw eating over the sink, sliced into burrata salads, or grilled over embers.'
        };
      }
      if (f === 0 || s === 0) {
        return {
          status: 'Underripe / Ripening Window',
          score: 40,
          color: 'lime',
          verdict: 'Store stem-side down on a clean linen towel on the counter for 48 hours.',
          culinaryUse: 'Poach in white wine with vanilla or bake into a rustic cobbler.'
        };
      }
      return {
        status: 'Overripe / Bruised',
        score: 50,
        color: 'amber',
        verdict: 'Mealy flesh or bruised shoulders.',
        culinaryUse: 'Simmer into bourbon peach jam or blend for bellini puree.'
      };
    }
  },
  {
    id: 'chanterelle',
    name: 'Golden Chanterelle Fungi',
    emoji: '🍄',
    category: 'Fungi',
    indicators: {
      firmness: { label: 'Flesh Moisture', options: ['Crisp dry suede surface', 'Turgid and velvety', 'Soggy, waterlogged, sponge-like'] },
      stemCap: { label: 'Cap Margins & Gills', options: ['Tightly curled wavy false gills', 'Broad open ruffled edges', 'Browning, slimy torn ridges'] },
      skinColor: { label: 'Aroma Test', options: ['Faint earthy forest scent', 'Intense dried apricot and white pepper bouquet', 'Sour ammonia or rotten leaf scent'] }
    },
    calculateResult: (f, s, c) => {
      if ((f === 0 || f === 1) && s === 1 && c === 1) {
        return {
          status: 'PRIME FORAGED SPECIMEN',
          score: 97,
          color: 'green',
          verdict: 'Freshly harvested dry woods specimen. High density and fragrant aroma.',
          culinaryUse: 'Dry-sauté in cast iron, finish with butter, shallots, and fresh thyme on toast.'
        };
      }
      if (f === 2 || s === 2 || c === 2) {
        return {
          status: 'Waterlogged / Deteriorating',
          score: 30,
          color: 'rose',
          verdict: 'Excess moisture trapped. High risk of microbial slime or mold.',
          culinaryUse: 'Discard slimy sections. Dry out remaining firm portions in a food dehydrator.'
        };
      }
      return {
        status: 'Good Market Grade',
        score: 75,
        color: 'lime',
        verdict: 'Solid cooking quality. Trim bottom soil rootlets.',
        culinaryUse: 'Sauté and toss with fresh tagliatelle and parmigiano.'
      };
    }
  }
];
