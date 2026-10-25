// Topic packs: ready-made clue → answer lists that work with every game. Original writing for
// this project (CC0); facts are common knowledge checked for accuracy. Answers are unique within
// a pack (bingo and matching need that). Packs with a future `publish` date go live on that date
// with the weekly rebuild.
export const SUBJECTS = ["Math", "Science", "English", "Languages", "Geography", "Holidays", "Parties"];

export const PACKS = [
  {
    id: "planets-solar-system", title: "Planets and the solar system", subject: "Science", level: "Grades 2–5", publish: "2026-10-25",
    intro: "Twenty-four clues covering the eight planets, the Sun and Moon, and the words that come up in every space unit: orbit, gravity, comet, meteor, asteroid and eclipse. The clues describe rather than define, so students have to think about each object, which makes them good for bingo, a review race or a quiz.",
    items: [
      ["The planet closest to the Sun", "Mercury"], ["The hottest planet, wrapped in thick clouds", "Venus"], ["The planet we live on", "Earth"], ["The red planet", "Mars"],
      ["The largest planet in our solar system", "Jupiter"], ["The planet famous for its bright rings", "Saturn"], ["The planet that spins on its side", "Uranus"], ["The farthest planet from the Sun", "Neptune"],
      ["The star at the center of our solar system", "The Sun"], ["Earth's natural satellite", "The Moon"], ["A dwarf planet that was once called the ninth planet", "Pluto"], ["The path a planet follows around the Sun", "Orbit"],
      ["A ball of ice and dust with a glowing tail", "Comet"], ["A streak of light when a space rock burns up in the air", "Meteor"], ["A rocky object that orbits the Sun, often between Mars and Jupiter", "Asteroid"], ["The force that keeps the planets in orbit", "Gravity"],
      ["When the Moon blocks the Sun's light", "Solar eclipse"], ["A huge group of stars, like the Milky Way", "Galaxy"], ["A bowl-shaped hole made when something hits a planet or moon", "Crater"], ["A person trained to travel into space", "Astronaut"],
      ["A tool that makes faraway things look closer", "Telescope"], ["The time it takes Earth to orbit the Sun", "One year"], ["The time it takes Earth to spin once", "One day"], ["A group of stars that forms a picture in the sky", "Constellation"],
    ],
  },
  {
    id: "multiplication-2-5", title: "Multiplication facts: 2s to 5s", subject: "Math", level: "Grades 2–4", publish: "2026-10-25",
    intro: "Twenty-four facts from the 2, 3, 4 and 5 times tables, chosen so that every answer is different. That matters for bingo and matching: no card can have two right answers. Read the fact and players find the product, or flip the cards to read the product and ask for a fact that makes it.",
    items: [
      ["2 × 2", "4"], ["5 × 1", "5"], ["2 × 3", "6"], ["2 × 4", "8"], ["3 × 3", "9"], ["5 × 2", "10"], ["3 × 4", "12"], ["2 × 7", "14"],
      ["5 × 3", "15"], ["4 × 4", "16"], ["3 × 6", "18"], ["4 × 5", "20"], ["3 × 7", "21"], ["4 × 6", "24"], ["5 × 5", "25"], ["3 × 9", "27"],
      ["4 × 7", "28"], ["5 × 6", "30"], ["4 × 8", "32"], ["5 × 7", "35"], ["4 × 9", "36"], ["5 × 8", "40"], ["5 × 9", "45"], ["5 × 10", "50"],
    ],
  },
  {
    id: "multiplication-6-9", title: "Multiplication facts: 6s to 9s", subject: "Math", level: "Grades 3–5", publish: "2026-10-25",
    intro: "The harder half of the times tables: twenty-four facts from the 6, 7, 8 and 9 tables, each with a different product, including the ones students miss most (7 × 8, 6 × 7, 8 × 9). Use Claim the Grid for head-to-head practice or Summit Scramble as a fact-fluency race.",
    items: [
      ["6 × 3", "18"], ["7 × 3", "21"], ["6 × 4", "24"], ["9 × 3", "27"], ["7 × 4", "28"], ["6 × 5", "30"], ["8 × 4", "32"], ["7 × 5", "35"],
      ["6 × 6", "36"], ["8 × 5", "40"], ["6 × 7", "42"], ["9 × 5", "45"], ["6 × 8", "48"], ["7 × 7", "49"], ["6 × 9", "54"], ["7 × 8", "56"],
      ["6 × 10", "60"], ["7 × 9", "63"], ["8 × 8", "64"], ["7 × 10", "70"], ["8 × 9", "72"], ["8 × 10", "80"], ["9 × 9", "81"], ["9 × 10", "90"],
    ],
  },
  {
    id: "fractions-decimals", title: "Fractions and decimals", subject: "Math", level: "Grades 4–6", publish: "2026-10-25",
    intro: "Twenty common fractions and their decimal equivalents, from halves and quarters to eighths, twentieths and hundredths. Every decimal is exact, so there is one right answer per card. Matching cards work well as a station activity, and I Have, Who Has? turns the list into a whole-class review in ten minutes.",
    items: [
      ["1/2", "0.5"], ["1/4", "0.25"], ["3/4", "0.75"], ["1/5", "0.2"], ["2/5", "0.4"], ["3/5", "0.6"], ["4/5", "0.8"], ["1/8", "0.125"], ["3/8", "0.375"], ["5/8", "0.625"],
      ["7/8", "0.875"], ["1/10", "0.1"], ["3/10", "0.3"], ["7/10", "0.7"], ["9/10", "0.9"], ["1/20", "0.05"], ["3/20", "0.15"], ["1/25", "0.04"], ["1/50", "0.02"], ["1/100", "0.01"],
    ],
  },
  {
    id: "roman-numerals", title: "Roman numerals", subject: "Math", level: "Grades 3–6", publish: "2026-10-25",
    intro: "Twenty-four Roman numerals, from I and IV up to MCMXC and this year, MMXXVI. The list mixes simple values with the subtraction cases (IV, IX, XL, XC, CD, CM) that trip students up. Read the numeral and players find its value, or swap the columns in the editor to practice writing numerals instead.",
    items: [
      ["I", "1"], ["IV", "4"], ["V", "5"], ["IX", "9"], ["X", "10"], ["XII", "12"], ["XIV", "14"], ["XIX", "19"], ["XX", "20"], ["XXV", "25"], ["XXX", "30"], ["XL", "40"],
      ["XLIV", "44"], ["L", "50"], ["LX", "60"], ["XC", "90"], ["XCIX", "99"], ["C", "100"], ["CD", "400"], ["D", "500"], ["CM", "900"], ["M", "1000"], ["MCMXC", "1990"], ["MMXXVI", "2026"],
    ],
  },
  {
    id: "shapes-geometry", title: "2D and 3D shapes", subject: "Math", level: "Grades 1–4", publish: "2026-10-25",
    intro: "Flat shapes, solid shapes and the words for their parts: twenty-four clues from triangle and hexagon to cylinder, edge, vertex and line of symmetry. The clues use everyday comparisons (a stop sign, a can, an ice-cream cone) so younger students can picture each shape before they name it.",
    items: [
      ["A flat shape with 3 sides", "Triangle"], ["4 equal sides and 4 square corners", "Square"], ["4 square corners, two long sides and two short sides", "Rectangle"], ["A round flat shape with no corners", "Circle"],
      ["A flat shape like a stretched circle or an egg", "Oval"], ["A flat shape with 5 sides", "Pentagon"], ["A flat shape with 6 sides, like a honeycomb cell", "Hexagon"], ["A flat shape with 8 sides, like a stop sign", "Octagon"],
      ["A flat shape with 7 sides", "Heptagon"], ["A flat shape with 10 sides", "Decagon"], ["4 sides with just one pair of parallel sides", "Trapezoid"], ["4 equal sides but no square corners", "Rhombus"],
      ["4 sides in two parallel pairs that lean over", "Parallelogram"], ["A solid shape like a ball", "Sphere"], ["A solid shape with 6 square faces, like a die", "Cube"], ["A solid shape like a can of soup", "Cylinder"],
      ["A solid shape like an ice-cream cone", "Cone"], ["A solid with a square base and triangle sides that meet at a point", "Pyramid"], ["A solid like a shoebox, with rectangle faces", "Rectangular prism"], ["A flat surface of a solid shape", "Face"],
      ["Where two faces of a solid shape meet", "Edge"], ["A corner where edges meet", "Vertex"], ["A line that splits a shape into two mirror halves", "Line of symmetry"], ["A square corner of exactly 90 degrees", "Right angle"],
    ],
  },
  {
    id: "math-vocabulary", title: "Math vocabulary", subject: "Math", level: "Grades 3–5", publish: "2026-10-25",
    intro: "The words students need to read word problems: sum, difference, product and quotient; factor, multiple and prime; perimeter, area and volume; mean, median and mode. Twenty-four clues written in plain language, so the games practice understanding the term, not memorizing a dictionary line.",
    items: [
      ["The answer to an addition problem", "Sum"], ["The answer to a subtraction problem", "Difference"], ["The answer to a multiplication problem", "Product"], ["The answer to a division problem", "Quotient"],
      ["A number you multiply by another to get a product", "Factor"], ["What you get when you multiply a number by a whole number, like 3, 6, 9", "Multiple"], ["A number with exactly two factors: 1 and itself", "Prime number"], ["A whole number you can split into two equal groups", "Even number"],
      ["A whole number that leaves one left over when split into two equal groups", "Odd number"], ["The distance all the way around a shape", "Perimeter"], ["The space inside a flat shape, in square units", "Area"], ["How much space a solid takes up", "Volume"],
      ["The top number in a fraction", "Numerator"], ["The bottom number in a fraction", "Denominator"], ["Lines that never meet, like train tracks", "Parallel lines"], ["Lines that cross to make square corners", "Perpendicular lines"],
      ["An angle smaller than a right angle", "Acute angle"], ["An angle bigger than a right angle but less than a straight line", "Obtuse angle"], ["A careful guess close to the real answer", "Estimate"], ["What is left over after dividing", "Remainder"],
      ["The middle number when a list is in order", "Median"], ["The number that appears most often in a list", "Mode"], ["Add them all up, then divide by how many there are", "Mean"], ["A math sentence with an equals sign", "Equation"],
    ],
  },
  {
    id: "human-body", title: "The human body", subject: "Science", level: "Grades 3–6", publish: "2026-10-25",
    intro: "Organs, bones, blood vessels and the jobs they do: twenty-four clues that describe what each part does, from the heart and lungs to the kidneys, capillaries and joints. Good for a body-systems review; Talk Around It works especially well, because describing an organ's job is exactly the skill students need.",
    items: [
      ["Pumps blood around the body", "Heart"], ["Fill with air when you breathe in", "Lungs"], ["The control center that thinks and remembers", "Brain"], ["Mixes food with juices to break it down", "Stomach"],
      ["The long, coiled tube where most food is absorbed", "Small intestine"], ["Takes water back from leftover food", "Large intestine"], ["Filter waste out of the blood to make urine", "Kidneys"], ["The largest organ, covering the outside of the body", "Skin"],
      ["The body's frame of bones", "Skeleton"], ["Pull on bones to make the body move", "Muscles"], ["Carries oxygen and nutrients around the body", "Blood"], ["The tube that carries food from the mouth to the stomach", "Esophagus"],
      ["Stores urine until you use the bathroom", "Bladder"], ["The largest organ inside the body; it cleans the blood", "Liver"], ["Curved bones that protect the heart and lungs", "Ribs"], ["The bone that protects the brain", "Skull"],
      ["The column of bones down your back", "Spine"], ["Tubes that carry blood away from the heart", "Arteries"], ["Tubes that carry blood back to the heart", "Veins"], ["The tiniest blood vessels", "Capillaries"],
      ["The muscle you use to taste", "Tongue"], ["Where two bones meet, like a knee or an elbow", "Joint"], ["Carry messages between the brain and the body", "Nerves"], ["The gas your body needs from the air", "Oxygen"],
    ],
  },
  {
    id: "animal-classification", title: "Animal groups and habitats", subject: "Science", level: "Grades 2–5", publish: "2026-10-25",
    intro: "Mammals, birds, reptiles, amphibians and fish, plus the words that come with them: vertebrate, predator, habitat, camouflage, migrate, hibernate, endangered and more. Twenty-four clues for a life-science unit, written so each one names a feature students can look for in a real animal.",
    items: [
      ["Has hair or fur and feeds milk to its young", "Mammal"], ["Has feathers and lays eggs", "Bird"], ["Has dry, scaly skin, like a lizard or snake", "Reptile"], ["Lives in water when young and on land as an adult, like a frog", "Amphibian"],
      ["Lives in water and breathes with gills", "Fish"], ["Has six legs and three body parts", "Insect"], ["Has eight legs, like a spider", "Arachnid"], ["An animal with a backbone", "Vertebrate"],
      ["An animal without a backbone", "Invertebrate"], ["An animal that eats only plants", "Herbivore"], ["An animal that eats mostly other animals", "Carnivore"], ["An animal that eats both plants and animals", "Omnivore"],
      ["An animal that hunts other animals for food", "Predator"], ["An animal that is hunted for food", "Prey"], ["The natural home of an animal", "Habitat"], ["To spend the winter in a deep sleep", "Hibernate"],
      ["To travel far away when the seasons change", "Migrate"], ["Colors or patterns that help an animal hide", "Camouflage"], ["A body part or behavior that helps an animal survive", "Adaptation"], ["So few are left that they could die out", "Endangered"],
      ["No longer living anywhere on Earth", "Extinct"], ["Awake at night and asleep during the day", "Nocturnal"], ["A big change in body form, like caterpillar to butterfly", "Metamorphosis"], ["Shows who eats whom, from plants to top predators", "Food chain"],
    ],
  },
  {
    id: "states-of-matter", title: "States of matter", subject: "Science", level: "Grades 2–5", publish: "2026-10-25",
    intro: "Solids, liquids and gases, and the changes between them: melting, freezing, evaporation, condensation, even sublimation. Twenty clues tie each word to something students have seen, like drops on a cold glass or steam from a kettle, which makes the matching and bingo games a quick check of real understanding.",
    items: [
      ["Keeps its own shape, like an ice cube", "Solid"], ["Takes the shape of its container and can be poured", "Liquid"], ["Spreads out to fill any space", "Gas"], ["When a solid turns into a liquid", "Melting"],
      ["When a liquid turns into a solid", "Freezing"], ["When a liquid turns into a gas", "Evaporation"], ["When a gas turns into a liquid, like drops on a cold glass", "Condensation"], ["The temperature at which a liquid boils", "Boiling point"],
      ["The amount of matter in an object", "Mass"], ["The amount of space something takes up", "Volume"], ["Anything that has mass and takes up space", "Matter"], ["Tiny building blocks that everything is made of", "Atoms"],
      ["Water in the form of a gas", "Water vapor"], ["When a solid turns straight into a gas, like dry ice", "Sublimation"], ["How hot or cold something is", "Temperature"], ["A mix where one thing disappears into another, like sugar in water", "Solution"],
      ["What sugar does when you stir it into warm water", "Dissolve"], ["A tool that measures temperature", "Thermometer"], ["Most things get bigger when heated; this is called", "Expansion"], ["Water at 0 °C becomes this", "Ice"],
    ],
  },
  {
    id: "periodic-table-first-20", title: "The first 20 elements", subject: "Science", level: "Grades 6–9", publish: "2026-10-25",
    intro: "Symbols and names for elements 1 to 20, hydrogen to calcium, the set most chemistry classes expect students to know by heart. Each clue gives the symbol and atomic number. Bingo is a fast warm-up; Quiz Night and Claim the Grid make good end-of-unit reviews. US spellings (aluminum, sulfur) are used.",
    items: [
      ["H, element 1", "Hydrogen"], ["He, element 2", "Helium"], ["Li, element 3", "Lithium"], ["Be, element 4", "Beryllium"], ["B, element 5", "Boron"], ["C, element 6", "Carbon"], ["N, element 7", "Nitrogen"], ["O, element 8", "Oxygen"], ["F, element 9", "Fluorine"], ["Ne, element 10", "Neon"],
      ["Na, element 11", "Sodium"], ["Mg, element 12", "Magnesium"], ["Al, element 13", "Aluminum"], ["Si, element 14", "Silicon"], ["P, element 15", "Phosphorus"], ["S, element 16", "Sulfur"], ["Cl, element 17", "Chlorine"], ["Ar, element 18", "Argon"], ["K, element 19", "Potassium"], ["Ca, element 20", "Calcium"],
    ],
  },
  {
    id: "plants", title: "Plants and how they grow", subject: "Science", level: "Grades 1–4", publish: "2026-10-25",
    intro: "Roots, stems, leaves and flowers, and the processes that keep a plant alive: photosynthesis, pollination and germination. Twenty clues in simple words for a plant unit or a spring garden project. Act, Draw or Say is a good fit for younger classes, since most of the answers are easy to draw.",
    items: [
      ["Holds the plant in the ground and soaks up water", "Roots"], ["Carries water from the roots up to the leaves", "Stem"], ["Uses sunlight to make food for the plant", "Leaf"], ["The colorful parts of a flower", "Petals"],
      ["The part of a plant that makes seeds", "Flower"], ["A baby plant inside a protective coat", "Seed"], ["Yellow dust that flowers share to make seeds", "Pollen"], ["How plants make food from sunlight, water and air", "Photosynthesis"],
      ["The green coloring in leaves that captures sunlight", "Chlorophyll"], ["When a seed starts to grow", "Germination"], ["Moving pollen from one flower to another", "Pollination"], ["The part that holds the seeds, like an apple", "Fruit"],
      ["The gas plants take in from the air", "Carbon dioxide"], ["The gas plants give off into the air", "Oxygen"], ["Sweet liquid in flowers that bees collect", "Nectar"], ["A young plant that has just sprouted", "Seedling"],
      ["A plant that lives for many years", "Perennial"], ["A tree that loses its leaves every fall", "Deciduous"], ["A tree that keeps its leaves all year", "Evergreen"], ["An insect or bird that carries pollen", "Pollinator"],
    ],
  },
  {
    id: "weather-water-cycle", title: "Weather and the water cycle", subject: "Science", level: "Grades 2–5", publish: "2026-10-25",
    intro: "Clouds, storms, weather tools and the four stages of the water cycle: twenty-four clues from cumulus and cirrus to barometer, anemometer and drought. Use Summit Scramble for a weather-unit review, or Clue Bingo with the clues read aloud while students look out the window at the real thing.",
    items: [
      ["Water falling from clouds as rain, snow, sleet or hail", "Precipitation"], ["The sun heats water and turns it into vapor", "Evaporation"], ["Water vapor cools into tiny drops that form clouds", "Condensation"], ["Water gathers in oceans, lakes and rivers", "Collection"],
      ["The journey water takes between land, sea and sky", "Water cycle"], ["Puffy white clouds that look like cotton balls", "Cumulus"], ["Flat gray clouds that cover the sky like a blanket", "Stratus"], ["Thin, wispy clouds high in the sky", "Cirrus"],
      ["Tall towering clouds that bring thunderstorms", "Cumulonimbus"], ["Measures temperature", "Thermometer"], ["Measures how much rain falls", "Rain gauge"], ["Measures wind speed", "Anemometer"],
      ["Measures air pressure", "Barometer"], ["The amount of water vapor in the air", "Humidity"], ["A prediction of the weather", "Forecast"], ["A spinning column of air that touches the ground", "Tornado"],
      ["A huge tropical storm with very strong winds", "Hurricane"], ["A giant spark of electricity in a storm", "Lightning"], ["The sound made by lightning", "Thunder"], ["Balls of ice that fall during some thunderstorms", "Hail"],
      ["A cloud that forms near the ground", "Fog"], ["A long time with little or no rain", "Drought"], ["The usual weather of a place over many years", "Climate"], ["A scientist who studies and predicts weather", "Meteorologist"],
    ],
  },
  {
    id: "rocks-earth", title: "Rocks and the Earth", subject: "Science", level: "Grades 3–6", publish: "2026-10-25",
    intro: "The three rock types, Earth's layers, and the forces that shape the land: twenty-four clues covering igneous, sedimentary and metamorphic rock, magma and lava, erosion, fossils, tectonic plates and a few famous rocks like obsidian and pumice. A natural fit for a rock-cycle unit or a geology club.",
    items: [
      ["Rock formed when melted rock cools and hardens", "Igneous rock"], ["Rock formed from layers of sand and mud pressed together", "Sedimentary rock"], ["Rock changed by heat and pressure deep underground", "Metamorphic rock"], ["Melted rock under Earth's surface", "Magma"],
      ["Melted rock that comes out of a volcano", "Lava"], ["Wind, water or ice carrying rock and soil away", "Erosion"], ["Rock slowly breaking into smaller pieces", "Weathering"], ["Remains or traces of ancient life preserved in rock", "Fossil"],
      ["A natural solid with crystals, like quartz", "Mineral"], ["Earth's thin outer layer", "Crust"], ["Earth's thick layer of hot rock beneath the crust", "Mantle"], ["Earth's hot center, mostly iron and nickel", "Core"],
      ["Sudden shaking of the ground", "Earthquake"], ["An opening in the crust where magma erupts", "Volcano"], ["Giant moving pieces of Earth's crust", "Tectonic plates"], ["A speckled igneous rock often used for countertops", "Granite"],
      ["A sedimentary rock made of sand grains", "Sandstone"], ["A metamorphic rock made from limestone", "Marble"], ["Shiny black volcanic glass", "Obsidian"], ["A light volcanic rock full of holes that can float", "Pumice"],
      ["How rocks change from one type to another over time", "Rock cycle"], ["A mix of tiny rock bits, water, air and rotting plants", "Soil"], ["A scientist who studies rocks and the Earth", "Geologist"], ["A solid with flat faces in a repeating pattern", "Crystal"],
    ],
  },
  {
    id: "grammar-words", title: "Grammar and parts of speech", subject: "English", level: "Grades 2–5", publish: "2026-10-25",
    intro: "The eight parts of speech plus the grammar words that show up in every writing lesson: subject, predicate, synonym, homophone, contraction, prefix, suffix and more. Twenty-four clues, each with an example, so students practice spotting the idea rather than reciting a definition.",
    items: [
      ["A person, place, thing or idea", "Noun"], ["An action word, like run or think", "Verb"], ["Describes a noun, like big or blue", "Adjective"], ["Describes a verb, like quickly or softly", "Adverb"],
      ["Takes the place of a noun, like she or it", "Pronoun"], ["Shows where or when, like under or after", "Preposition"], ["Joins words or ideas, like and, but or or", "Conjunction"], ["A word that shows strong feeling, like Wow!", "Interjection"],
      ["The words a, an and the", "Article"], ["Who or what a sentence is about", "Subject"], ["The part of a sentence that tells what the subject does", "Predicate"], ["A complete thought with a subject and a verb", "Sentence"],
      ["A group of sentences about one main idea", "Paragraph"], ["A word that means the same, like happy and glad", "Synonym"], ["A word with the opposite meaning, like hot and cold", "Antonym"], ["Sounds the same but is spelled differently, like their and there", "Homophone"],
      ["Two words joined together, like sunflower", "Compound word"], ["Two words shortened with an apostrophe, like can't", "Contraction"], ["Added to the start of a word, like un- or re-", "Prefix"], ["Added to the end of a word, like -ful or -less", "Suffix"],
      ["More than one, like cats or children", "Plural"], ["The name of a specific person or place; it starts with a capital letter", "Proper noun"], ["Ends a sentence that asks something", "Question mark"], ["Shows missing letters or that something belongs to someone", "Apostrophe"],
    ],
  },
  {
    id: "synonyms", title: "Synonyms", subject: "English", level: "Grades 2–5", publish: "2026-10-25",
    intro: "Twenty-four everyday words and a synonym for each: big and large, begin and start, shout and yell. Swapping a plain word for a stronger one is a core writing skill, and these games make it a habit. Players hear the clue word and look for its partner, so every round is vocabulary practice in both directions.",
    items: [
      ["Means the same as big", "Large"], ["Means the same as small", "Tiny"], ["Means the same as happy", "Glad"], ["Means the same as sad", "Unhappy"], ["Means the same as fast", "Quick"], ["Means the same as begin", "Start"],
      ["Means the same as finish", "End"], ["Means the same as smart", "Clever"], ["Means the same as angry", "Mad"], ["Means the same as scared", "Afraid"], ["Means the same as shut", "Close"], ["Means the same as easy", "Simple"],
      ["Means the same as hard", "Difficult"], ["Means the same as funny", "Amusing"], ["Means the same as pretty", "Beautiful"], ["Means the same as quiet", "Silent"], ["Means the same as loud", "Noisy"], ["Means the same as rich", "Wealthy"],
      ["Means the same as tired", "Sleepy"], ["Means the same as jump", "Leap"], ["Means the same as talk", "Speak"], ["Means the same as gift", "Present"], ["Means the same as choose", "Pick"], ["Means the same as shout", "Yell"],
    ],
  },
  {
    id: "antonyms", title: "Opposites (antonyms)", subject: "English", level: "Grades K–3", publish: "2026-10-25",
    intro: "Twenty-four pairs of opposites for early readers: hot and cold, push and pull, borrow and lend. The answers are short, familiar words, which makes this pack a good first bingo for kindergarten and first grade, and Act, Draw or Say is a riot with opposites like laugh and cry.",
    items: [
      ["The opposite of hot", "Cold"], ["The opposite of up", "Down"], ["The opposite of day", "Night"], ["The opposite of happy", "Sad"], ["The opposite of open", "Closed"], ["The opposite of fast", "Slow"],
      ["The opposite of full", "Empty"], ["The opposite of early", "Late"], ["The opposite of light", "Dark"], ["The opposite of wet", "Dry"], ["The opposite of push", "Pull"], ["The opposite of loud", "Quiet"],
      ["The opposite of first", "Last"], ["The opposite of give", "Take"], ["The opposite of high", "Low"], ["The opposite of laugh", "Cry"], ["The opposite of win", "Lose"], ["The opposite of young", "Old"],
      ["The opposite of hard", "Soft"], ["The opposite of heavy", "Light"], ["The opposite of above", "Below"], ["The opposite of in", "Out"], ["The opposite of buy", "Sell"], ["The opposite of borrow", "Lend"],
    ],
  },
  {
    id: "literary-terms", title: "Literary terms", subject: "English", level: "Grades 5–8", publish: "2026-10-25",
    intro: "Story elements and figurative language in one set: plot, setting, conflict and climax alongside simile, metaphor, personification, hyperbole and onomatopoeia. Twenty-four clues, most with a short example, for a reading unit or test review. Quiz Night makes a good end-of-term review for older students.",
    items: [
      ["The events that happen in a story", "Plot"], ["Where and when a story takes place", "Setting"], ["A person or animal in a story", "Character"], ["The big message or lesson of a story", "Theme"],
      ["The problem the characters must face", "Conflict"], ["The most exciting turning point of a story", "Climax"], ["How the problem is solved at the end", "Resolution"], ["The voice telling the story", "Narrator"],
      ["Who is telling the story: first person or third person", "Point of view"], ["Compares using like or as: “fast as a cheetah”", "Simile"], ["Says one thing is another: “the classroom was a zoo”", "Metaphor"], ["Gives human traits to things: “the wind whispered”", "Personification"],
      ["Repeats the first sound: “silly snakes slither”", "Alliteration"], ["A word that sounds like what it means, like buzz", "Onomatopoeia"], ["A huge exaggeration: “I've told you a million times”", "Hyperbole"], ["Words that end with the same sound", "Rhyme"],
      ["A group of lines in a poem", "Stanza"], ["A category of writing, like mystery or fantasy", "Genre"], ["Made-up stories", "Fiction"], ["Writing about real facts and events", "Nonfiction"],
      ["The true story of someone's life, written by someone else", "Biography"], ["The story of a person's life, written by that person", "Autobiography"], ["The words characters say to each other", "Dialogue"], ["Hints about what will happen later", "Foreshadowing"],
    ],
  },
  {
    id: "spanish-greetings", title: "Spanish greetings and phrases", subject: "Languages", level: "Beginner Spanish", publish: "2026-10-25",
    intro: "Twenty-four phrases for a first week of Spanish: hello and goodbye, please and thank you, how are you, what's your name, nice to meet you, see you tomorrow. The clue is the Spanish and the answer is the English, so bingo becomes a listening exercise when the caller reads the Spanish aloud.",
    items: [
      ["Hola", "Hello"], ["Adiós", "Goodbye"], ["Gracias", "Thank you"], ["Por favor", "Please"], ["Buenos días", "Good morning"], ["Buenas tardes", "Good afternoon"],
      ["Buenas noches", "Good night"], ["¿Cómo estás?", "How are you?"], ["Muy bien", "Very well"], ["Sí", "Yes"], ["No", "No"], ["Perdón", "Excuse me"],
      ["Lo siento", "I'm sorry"], ["De nada", "You're welcome"], ["Hasta luego", "See you later"], ["Hasta mañana", "See you tomorrow"], ["Me llamo…", "My name is…"], ["¿Cómo te llamas?", "What's your name?"],
      ["Mucho gusto", "Nice to meet you"], ["¿Qué tal?", "How's it going?"], ["Bienvenidos", "Welcome"], ["¿Dónde está…?", "Where is…?"], ["No entiendo", "I don't understand"], ["¿Cuántos años tienes?", "How old are you?"],
    ],
  },
  {
    id: "spanish-numbers", title: "Spanish numbers 1 to 20", subject: "Languages", level: "Beginner Spanish", publish: "2026-10-25",
    intro: "Uno to veinte, with the spellings that catch learners out (quince, dieciséis, diecinueve). The clue is the Spanish word and the answer is the numeral, so a caller can read the words while players find the numbers, and the cards double as a counting game for younger learners.",
    items: [
      ["uno", "1"], ["dos", "2"], ["tres", "3"], ["cuatro", "4"], ["cinco", "5"], ["seis", "6"], ["siete", "7"], ["ocho", "8"], ["nueve", "9"], ["diez", "10"],
      ["once", "11"], ["doce", "12"], ["trece", "13"], ["catorce", "14"], ["quince", "15"], ["dieciséis", "16"], ["diecisiete", "17"], ["dieciocho", "18"], ["diecinueve", "19"], ["veinte", "20"],
    ],
  },
  {
    id: "spanish-colors-animals", title: "Spanish colors and animals", subject: "Languages", level: "Beginner Spanish", publish: "2026-10-25",
    intro: "Thirteen colors and eleven animals in Spanish, from rojo and amarillo to perro, caballo and león. Act, Draw or Say is the obvious game here: drawing a gato or acting out a caballo is the fastest way to make the words stick. The clue is the Spanish and the answer is the English.",
    items: [
      ["rojo", "Red"], ["azul", "Blue"], ["verde", "Green"], ["amarillo", "Yellow"], ["naranja", "Orange"], ["morado", "Purple"], ["rosa", "Pink"], ["negro", "Black"], ["blanco", "White"], ["gris", "Gray"],
      ["marrón", "Brown"], ["dorado", "Gold"], ["plateado", "Silver"], ["perro", "Dog"], ["gato", "Cat"], ["pájaro", "Bird"], ["pez", "Fish"], ["caballo", "Horse"], ["vaca", "Cow"], ["cerdo", "Pig"],
      ["oveja", "Sheep"], ["conejo", "Rabbit"], ["ratón", "Mouse"], ["león", "Lion"],
    ],
  },
  {
    id: "french-greetings", title: "French greetings and phrases", subject: "Languages", level: "Beginner French", publish: "2026-10-25",
    intro: "Twenty-four essential French phrases: bonjour and au revoir, merci and s'il vous plaît, comment ça va, je m'appelle, enchanté. The clue is the French and the answer is the English. Play I Have, Who Has? with a class: everyone hears every phrase read aloud at least twice in ten minutes.",
    items: [
      ["Bonjour", "Hello"], ["Au revoir", "Goodbye"], ["Merci", "Thank you"], ["S'il vous plaît", "Please"], ["Bonsoir", "Good evening"], ["Bonne nuit", "Good night"],
      ["Comment ça va?", "How are you?"], ["Ça va bien", "I'm doing well"], ["Oui", "Yes"], ["Non", "No"], ["Pardon", "Excuse me"], ["Désolé", "I'm sorry"],
      ["De rien", "You're welcome"], ["À bientôt", "See you soon"], ["À demain", "See you tomorrow"], ["Je m'appelle…", "My name is…"], ["Comment tu t'appelles?", "What's your name?"], ["Enchanté", "Nice to meet you"],
      ["Bienvenue", "Welcome"], ["Où est…?", "Where is…?"], ["Je ne comprends pas", "I don't understand"], ["Quel âge as-tu?", "How old are you?"], ["Salut", "Hi"], ["À plus tard", "See you later"],
    ],
  },
  {
    id: "french-numbers", title: "French numbers 1 to 20", subject: "Languages", level: "Beginner French", publish: "2026-10-25",
    intro: "Un to vingt, including the irregular teens (onze to seize) and the hyphenated dix-sept, dix-huit and dix-neuf. The clue is the French word and the answer is the numeral. Bingo with the words read aloud is a classic listening drill; Claim the Grid makes it a two-player duel.",
    items: [
      ["un", "1"], ["deux", "2"], ["trois", "3"], ["quatre", "4"], ["cinq", "5"], ["six", "6"], ["sept", "7"], ["huit", "8"], ["neuf", "9"], ["dix", "10"],
      ["onze", "11"], ["douze", "12"], ["treize", "13"], ["quatorze", "14"], ["quinze", "15"], ["seize", "16"], ["dix-sept", "17"], ["dix-huit", "18"], ["dix-neuf", "19"], ["vingt", "20"],
    ],
  },
  {
    id: "europe-capitals", title: "Capitals of Europe", subject: "Geography", level: "Grades 4–8", publish: "2026-10-25",
    intro: "Twenty-four European countries and their capitals, from Lisbon to Kyiv and Reykjavík to Athens. A good set for a geography club or a map unit; pair it with a wall map and let players point to each capital before they cover it. The clue names the country; the answer is the capital city.",
    items: [
      ["Capital of France", "Paris"], ["Capital of Germany", "Berlin"], ["Capital of Italy", "Rome"], ["Capital of Spain", "Madrid"], ["Capital of Portugal", "Lisbon"], ["Capital of the United Kingdom", "London"],
      ["Capital of Ireland", "Dublin"], ["Capital of the Netherlands", "Amsterdam"], ["Capital of Belgium", "Brussels"], ["Capital of Switzerland", "Bern"], ["Capital of Austria", "Vienna"], ["Capital of Poland", "Warsaw"],
      ["Capital of Czechia", "Prague"], ["Capital of Hungary", "Budapest"], ["Capital of Greece", "Athens"], ["Capital of Sweden", "Stockholm"], ["Capital of Norway", "Oslo"], ["Capital of Denmark", "Copenhagen"],
      ["Capital of Finland", "Helsinki"], ["Capital of Iceland", "Reykjavík"], ["Capital of Ukraine", "Kyiv"], ["Capital of Romania", "Bucharest"], ["Capital of Croatia", "Zagreb"], ["Capital of Estonia", "Tallinn"],
    ],
  },
  {
    id: "us-state-capitals-a-m", title: "US state capitals: Alabama to Montana", subject: "Geography", level: "Grades 4–8", publish: "2026-10-25",
    intro: "The first twenty-six states in alphabetical order, Alabama to Montana, with their capitals. Several are classic stumpers, like Frankfort, Jefferson City and Tallahassee, so this half of the list makes a good challenge round. The second half, Nebraska to Wyoming, is a separate pack.",
    items: [
      ["Capital of Alabama", "Montgomery"], ["Capital of Alaska", "Juneau"], ["Capital of Arizona", "Phoenix"], ["Capital of Arkansas", "Little Rock"], ["Capital of California", "Sacramento"], ["Capital of Colorado", "Denver"],
      ["Capital of Connecticut", "Hartford"], ["Capital of Delaware", "Dover"], ["Capital of Florida", "Tallahassee"], ["Capital of Georgia", "Atlanta"], ["Capital of Hawaii", "Honolulu"], ["Capital of Idaho", "Boise"],
      ["Capital of Illinois", "Springfield"], ["Capital of Indiana", "Indianapolis"], ["Capital of Iowa", "Des Moines"], ["Capital of Kansas", "Topeka"], ["Capital of Kentucky", "Frankfort"], ["Capital of Louisiana", "Baton Rouge"],
      ["Capital of Maine", "Augusta"], ["Capital of Maryland", "Annapolis"], ["Capital of Massachusetts", "Boston"], ["Capital of Michigan", "Lansing"], ["Capital of Minnesota", "Saint Paul"], ["Capital of Mississippi", "Jackson"],
      ["Capital of Missouri", "Jefferson City"], ["Capital of Montana", "Helena"],
    ],
  },
  {
    id: "us-state-capitals-n-w", title: "US state capitals: Nebraska to Wyoming", subject: "Geography", level: "Grades 4–8", publish: "2026-10-25",
    intro: "The other twenty-four states, Nebraska to Wyoming, and their capitals, including Pierre, Montpelier, Olympia and Carson City. Play both halves on different days, or combine them in the editor for one big fifty-state review. The clue names the state; the answer is the capital.",
    items: [
      ["Capital of Nebraska", "Lincoln"], ["Capital of Nevada", "Carson City"], ["Capital of New Hampshire", "Concord"], ["Capital of New Jersey", "Trenton"], ["Capital of New Mexico", "Santa Fe"], ["Capital of New York", "Albany"],
      ["Capital of North Carolina", "Raleigh"], ["Capital of North Dakota", "Bismarck"], ["Capital of Ohio", "Columbus"], ["Capital of Oklahoma", "Oklahoma City"], ["Capital of Oregon", "Salem"], ["Capital of Pennsylvania", "Harrisburg"],
      ["Capital of Rhode Island", "Providence"], ["Capital of South Carolina", "Columbia"], ["Capital of South Dakota", "Pierre"], ["Capital of Tennessee", "Nashville"], ["Capital of Texas", "Austin"], ["Capital of Utah", "Salt Lake City"],
      ["Capital of Vermont", "Montpelier"], ["Capital of Virginia", "Richmond"], ["Capital of Washington", "Olympia"], ["Capital of West Virginia", "Charleston"], ["Capital of Wisconsin", "Madison"], ["Capital of Wyoming", "Cheyenne"],
    ],
  },
  {
    id: "continents-oceans", title: "Continents and oceans", subject: "Geography", level: "Grades 1–4", publish: "2026-10-25",
    intro: "The seven continents, five oceans and the map words that go with them: equator, hemisphere, compass rose, globe. Twenty clues for early geography, each with one memorable fact (the Sahara, the Amazon, kangaroos), so the games build a mental map rather than a list of names.",
    items: [
      ["The largest continent", "Asia"], ["The continent with the Sahara Desert", "Africa"], ["The continent with Canada, the United States and Mexico", "North America"], ["The continent with the Amazon rainforest", "South America"],
      ["The coldest continent, covered in ice", "Antarctica"], ["The continent with France, Italy and Poland", "Europe"], ["The smallest continent, home to kangaroos", "Australia"], ["The largest and deepest ocean", "Pacific Ocean"],
      ["The ocean between the Americas and Europe and Africa", "Atlantic Ocean"], ["The ocean south of India", "Indian Ocean"], ["The smallest ocean, around the North Pole", "Arctic Ocean"], ["The ocean that circles Antarctica", "Southern Ocean"],
      ["An imaginary line around the middle of the Earth", "Equator"], ["The northernmost point on Earth", "North Pole"], ["The southernmost point on Earth", "South Pole"], ["A round model of the Earth", "Globe"],
      ["A flat drawing of a place from above", "Map"], ["Shows north, south, east and west on a map", "Compass rose"], ["Half of the Earth", "Hemisphere"], ["Land with water all around it", "Island"],
    ],
  },
  {
    id: "christmas", title: "Christmas party words", subject: "Holidays", level: "All ages", publish: "2026-10-25",
    intro: "Twenty-four Christmas words with playful clues, from candy canes and gingerbread to the nutcracker and the star on top of the tree. Made for a classroom holiday party or a family evening: Clue Bingo works for every age, and Talk Around It gets the grown-ups laughing after dinner.",
    items: [
      ["An evergreen decorated with lights and ornaments", "Christmas tree"], ["Animals said to pull Santa's sleigh", "Reindeer"], ["A big sock hung up to be filled with treats", "Stocking"], ["A decoration that hangs on the tree", "Ornament"],
      ["A striped candy shaped like a hook", "Candy cane"], ["A spiced cookie used to build little houses", "Gingerbread"], ["A plant you might stand under for a kiss", "Mistletoe"], ["Built from rolled-up balls of snow", "Snowman"],
      ["Santa's sled", "Sleigh"], ["A ring of evergreen branches for the front door", "Wreath"], ["Santa's little helper", "Elf"], ["Songs sung at Christmastime", "Carols"],
      ["A wrapped gift", "Present"], ["Often placed at the very top of the tree", "Star"], ["Shiny silver strands for decorating", "Tinsel"], ["A wooden soldier that cracks nuts", "Nutcracker"],
      ["A creamy holiday drink", "Eggnog"], ["Santa is said to come down it", "Chimney"], ["No two are said to be alike", "Snowflake"], ["A plant with bright red leaves", "Poinsettia"],
      ["Prickly green leaves with red berries", "Holly"], ["They jingle", "Bells"], ["Warm gloves without fingers", "Mittens"], ["A warm chocolate drink", "Hot cocoa"],
    ],
  },
  {
    id: "thanksgiving", title: "Thanksgiving words", subject: "Holidays", level: "All ages", publish: "2026-10-25",
    intro: "Twenty-four Thanksgiving words for the table and the classroom: turkey and stuffing, cranberry sauce and pecan pie, the parade, the wishbone and the harvest. A Clue Bingo round keeps kids busy while dinner finishes, and Quiz Night works for the whole family afterwards.",
    items: [
      ["The big bird at the center of the table", "Turkey"], ["An orange pie with a spiced filling", "Pumpkin pie"], ["A tart red side dish", "Cranberry sauce"], ["A bread mix sometimes cooked inside the bird", "Stuffing"],
      ["Fluffy potatoes served with gravy", "Mashed potatoes"], ["A sauce made from meat juices", "Gravy"], ["A horn of plenty filled with fruit and vegetables", "Cornucopia"], ["Gathering crops in the fall", "Harvest"],
      ["Giant balloons float down the street", "Parade"], ["A game many families watch that day", "Football"], ["They change color and fall from trees", "Leaves"], ["The feeling of being thankful", "Gratitude"],
      ["A big meal with lots of food", "Feast"], ["Two people pull it to make a wish", "Wishbone"], ["The nut of an oak tree", "Acorn"], ["A crop with kernels on a cob", "Corn"],
      ["A hard-skinned vegetable, like butternut", "Squash"], ["A warm drink made from apples", "Apple cider"], ["A sweet pie made with nuts", "Pecan pie"], ["Orange root vegetables, sometimes topped with marshmallows", "Sweet potatoes"],
      ["Small round breads", "Rolls"], ["Stands in a field to keep birds away", "Scarecrow"], ["Settlers who sailed on the Mayflower in 1620", "Pilgrims"], ["The month of American Thanksgiving", "November"],
    ],
  },
  {
    id: "halloween", title: "Halloween words", subject: "Holidays", level: "All ages", publish: "2026-10-25",
    intro: "Twenty-four not-too-scary Halloween words, from jack-o'-lanterns and costumes to mummies, cauldrons and candy corn. The clues are playful enough for young kids and the answers easy to act or draw, so this pack suits a class party, a scout meeting or a costume party at home.",
    items: [
      ["A big orange squash", "Pumpkin"], ["A carved pumpkin with a light inside", "Jack-o'-lantern"], ["What you dress up in", "Costume"], ["Sweets collected in a bag", "Candy"],
      ["A spooky spirit that says boo", "Ghost"], ["Rides a broomstick in stories", "Witch"], ["A flying mammal that comes out at night", "Bat"], ["A sticky trap spun from silk", "Spider web"],
      ["A dark cat said to bring bad luck", "Black cat"], ["A home said to have ghosts", "Haunted house"], ["A costume made of bones", "Skeleton"], ["Wrapped from head to toe in bandages", "Mummy"],
      ["A witch's ride", "Broomstick"], ["A big pot for a witch's brew", "Cauldron"], ["A big round moon on a spooky night", "Full moon"], ["A night bird that hoots", "Owl"],
      ["What you say at the door", "Trick-or-treat"], ["Covers your face", "Mask"], ["Striped candy shaped like a corn kernel", "Candy corn"], ["A caped creature with fangs", "Vampire"],
      ["A scary creature from a story", "Monster"], ["Helps you see in the dark", "Flashlight"], ["A field where you pick pumpkins", "Pumpkin patch"], ["The month Halloween falls in", "October"],
    ],
  },
  {
    id: "dinosaurs", title: "Dinosaurs", subject: "Science", level: "Grades 1–4", publish: "2026-10-25",
    intro: "Eighteen famous dinosaurs and prehistoric reptiles, plus the words paleontologists use: fossil, herbivore, Jurassic, Cretaceous and extinct. Each clue names the feature that makes the animal recognizable (three horns, a tail club, a sail), and the set notes that a Pteranodon was a flying reptile, not a dinosaur.",
    items: [
      ["A huge meat-eater with tiny arms", "T. rex"], ["A plant-eater with three horns and a frill", "Triceratops"], ["Had big plates along its back and a spiked tail", "Stegosaurus"], ["A giant long-necked plant-eater with long front legs", "Brachiosaurus"],
      ["A fast, feathered hunter about the size of a turkey", "Velociraptor"], ["An armored plant-eater with a club on its tail", "Ankylosaurus"], ["Had a tall sail on its back and caught fish", "Spinosaurus"], ["Had a long tube-shaped crest on its head", "Parasaurolophus"],
      ["Very long neck and a whip-like tail", "Diplodocus"], ["Had a very thick, dome-shaped skull", "Pachycephalosaurus"], ["Had a spike on each thumb", "Iguanodon"], ["A big meat-eater from the Jurassic period", "Allosaurus"],
      ["A flying reptile, not a dinosaur", "Pteranodon"], ["An early bird-like dinosaur with feathers", "Archaeopteryx"], ["A giant reptile that swam in the sea", "Mosasaurus"], ["Bones or footprints turned to stone", "Fossil"],
      ["A scientist who digs up and studies fossils", "Paleontologist"], ["A plant-eater", "Herbivore"], ["A meat-eater", "Carnivore"], ["The first period of the age of dinosaurs", "Triassic"],
      ["The middle period of the age of dinosaurs", "Jurassic"], ["The last period of the age of dinosaurs", "Cretaceous"], ["Died out completely", "Extinct"], ["A space rock that hit Earth about 66 million years ago", "Asteroid"],
    ],
  },
  {
    id: "birthday-party", title: "Birthday party words", subject: "Parties", level: "Ages 4+", publish: "2026-10-25",
    intro: "Twenty-four birthday words for a kids' party: cake and candles, balloons and streamers, the piñata, the goodie bag and the wish. Clue Bingo with a dozen cards keeps a room of six-year-olds focused for fifteen minutes, and Act, Draw or Say works for older kids and grown-ups.",
    items: [
      ["A sweet treat with candles on top", "Birthday cake"], ["You blow these out and make a wish", "Candles"], ["Filled with air and tied with string", "Balloons"], ["Wrapped gifts", "Presents"],
      ["Pointy hats for a party", "Party hats"], ["Covers a gift before it's opened", "Wrapping paper"], ["A folded note with a message inside", "Birthday card"], ["A frozen dessert served with cake", "Ice cream"],
      ["A little cake baked in a paper cup", "Cupcake"], ["Long paper ribbons hung on the walls", "Streamers"], ["Tiny pieces of paper thrown to celebrate", "Confetti"], ["You hit it to make the candy fall out", "Piñata"],
      ["Small bag of treats to take home", "Goodie bag"], ["Asks friends to come to the party", "Invitation"], ["Musical chairs and freeze dance are", "Party games"], ["The song everyone sings to the guest of honor", "Happy Birthday"],
      ["What you make before blowing out the candles", "A wish"], ["Tiny colorful sugar bits on frosting", "Sprinkles"], ["The sweet creamy layer on a cake", "Frosting"], ["A paper horn that unrolls when you blow", "Party blower"],
      ["The number of candles shows this", "Age"], ["The people you invite", "Friends"], ["A picture to remember the day", "Photo"], ["A shiny paper crown for the birthday kid", "Crown"],
    ],
  },
  {
    id: "baby-shower", title: "Baby shower words", subject: "Parties", level: "Adults", publish: "2026-10-25",
    intro: "Twenty-four baby words for a shower game: diapers, onesies, the stroller, the crib, swaddles and lullabies. Hand out bingo cards as guests arrive and play while gifts are opened, crossing off each item as it's unwrapped, or use the clues for a Talk Around It round after cake.",
    items: [
      ["Changed many times a day", "Diaper"], ["Holds milk or formula", "Bottle"], ["Where the baby sleeps, with high sides", "Crib"], ["A seat on wheels for walks", "Stroller"],
      ["A shaky toy that makes noise", "Rattle"], ["A baby sucks on it to feel calm", "Pacifier"], ["A one-piece outfit with snaps", "Onesie"], ["Catches drips at mealtime", "Bib"],
      ["Soft and warm for wrapping up", "Blanket"], ["A cuddly stuffed toy", "Teddy bear"], ["Keeps the baby safe in the car", "Car seat"], ["A soft song to help a baby sleep", "Lullaby"],
      ["Damp cloths for quick cleanups", "Baby wipes"], ["Tiny knitted shoes", "Booties"], ["A tall seat for mealtime", "High chair"], ["Hangs over the crib and spins", "Mobile"],
      ["The baby's room", "Nursery"], ["A splashy part of the evening routine", "Bath time"], ["Goes over a shoulder after feeding", "Burp cloth"], ["Lets parents hear the baby from another room", "Baby monitor"],
      ["Wrapping a baby snugly in a blanket", "Swaddle"], ["A small bed for the first months", "Bassinet"], ["A first ___ is a big milestone", "Step"], ["Two babies born at the same time", "Twins"],
    ],
  },
  {
    id: "camping-outdoors", title: "Camping and the outdoors", subject: "Parties", level: "All ages", publish: "2026-10-25",
    intro: "Twenty-four camping words for a scout meeting, a summer camp or a backyard campout: tent, campfire, s'mores, lantern, compass, canoe and trail mix. Bring the cards along: Talk Around It and Act, Draw or Say need nothing but the deck and a timer, which makes them perfect around a campfire.",
    items: [
      ["A shelter you set up and sleep in", "Tent"], ["A fire you sit around at night", "Campfire"], ["Chocolate and toasted marshmallow between crackers", "S'mores"], ["Fluffy and white; you toast it on a stick", "Marshmallow"],
      ["A padded bag you sleep in", "Sleeping bag"], ["A small light you carry in your hand", "Flashlight"], ["A light that hangs or sits on the table", "Lantern"], ["A tool whose needle points north", "Compass"],
      ["Shows the trails and lakes", "Map"], ["Sturdy shoes for walking on trails", "Hiking boots"], ["Carries your gear on your back", "Backpack"], ["A narrow boat you paddle", "Canoe"],
      ["Used to catch fish", "Fishing rod"], ["A path through the woods", "Trail"], ["Help you see birds far away", "Binoculars"], ["Keeps mosquitoes away", "Bug spray"],
      ["Protects your skin from the sun", "Sunscreen"], ["Holds bandages for scrapes", "First aid kit"], ["A person who looks after a park", "Ranger"], ["A snack mix of nuts and raisins", "Trail mix"],
      ["Wood gathered for the fire", "Firewood"], ["Falls from evergreen trees", "Pine cone"], ["Twinkle in the night sky", "Stars"], ["A night bird that hoots", "Owl"],
    ],
  },
];

// Weekly backlog: published on these dates by the scheduled rebuild.
PACKS.push(
  {
    id: "ocean-animals", title: "Ocean animals", subject: "Science", level: "Grades 1–4", publish: "2026-11-02",
    intro: "Twenty-four sea creatures with one memorable fact each: the octopus's three hearts, the narwhal's tusk, the sea otter that holds hands while it sleeps. A favorite for an ocean unit or a beach-themed party; Act, Draw or Say gets very silly very quickly with this one.",
    items: [
      ["The largest animal that has ever lived", "Blue whale"], ["A smart sea mammal that clicks and whistles", "Dolphin"], ["Has eight arms and three hearts", "Octopus"], ["A see-through animal that can sting", "Jellyfish"],
      ["A reptile that swims the oceans and lays eggs on beaches", "Sea turtle"], ["A fish with rows of sharp teeth", "Shark"], ["Has five arms and can regrow one", "Starfish"], ["Walks sideways on the sand", "Crab"],
      ["A fish whose father carries the babies", "Seahorse"], ["Tiny animals that build reefs", "Coral"], ["An orange-and-white fish that lives in sea anemones", "Clownfish"], ["A seabird that cannot fly but swims very well", "Penguin"],
      ["Barks and claps its flippers", "Sea lion"], ["Has big claws and is often red when cooked", "Lobster"], ["Has ten arms and squirts ink", "Squid"], ["A wide, flat fish that glides like a kite", "Manta ray"],
      ["A long fish shaped like a snake", "Eel"], ["Floats on its back and holds hands while it sleeps", "Sea otter"], ["Has long tusks and whiskers", "Walrus"], ["A whale with a long spiral tusk", "Narwhal"],
      ["A spiky ball that crawls on the seabed", "Sea urchin"], ["Tiny drifting plants and animals that many creatures eat", "Plankton"], ["A tall seaweed that forms underwater forests", "Kelp"], ["A black-and-white whale that hunts in groups", "Orca"],
    ],
  },
  {
    id: "forces-motion", title: "Forces and motion", subject: "Science", level: "Grades 3–6", publish: "2026-11-09",
    intro: "Pushes and pulls, friction, gravity and the six simple machines: twenty-four clues for a physical-science unit. Each clue points to something students can feel or build (a ramp, a seesaw, a pulley), which makes Talk Around It a surprisingly good check of whether the ideas have landed.",
    items: [
      ["A push or a pull", "Force"], ["The force that slows things rubbing together", "Friction"], ["The force that pulls things toward Earth", "Gravity"], ["Attracts iron and steel", "Magnet"],
      ["How fast something moves", "Speed"], ["Things keep doing what they're doing unless a force acts", "Inertia"], ["A change in position", "Motion"], ["How heavy something is on Earth", "Weight"],
      ["A seesaw is this simple machine", "Lever"], ["A wheel with a rope used to lift loads", "Pulley"], ["A ramp is this simple machine", "Inclined plane"], ["A doorknob and a steering wheel are this machine", "Wheel and axle"],
      ["An axe blade is this simple machine", "Wedge"], ["A ramp wrapped around a pole, like on a jar lid", "Screw"], ["The fixed point a lever turns on", "Fulcrum"], ["Getting faster", "Acceleration"],
      ["The force of air pushing against moving things", "Air resistance"], ["Forces that cancel each other out", "Balanced forces"], ["Opposite ends of a magnet", "Poles"], ["The ability to do work or cause change", "Energy"],
      ["Energy of something moving", "Kinetic energy"], ["Stored energy, like in a stretched rubber band", "Potential energy"], ["The unit used to measure force", "Newton"], ["The pull between two magnets placed north to south", "Attraction"],
    ],
  },
  {
    id: "musical-instruments", title: "Musical instruments", subject: "Parties", level: "All ages", publish: "2026-11-16",
    intro: "Twenty-four instruments described by how they look and sound: the piano's 88 keys, the cello played between the knees, the triangle's single ring. Use it in a music class, or as a party game where the Act, Draw or Say cards turn into a very loud air-band contest.",
    items: [
      ["Has 88 black and white keys", "Piano"], ["Six strings, strummed or picked", "Guitar"], ["Played with a bow and tucked under the chin", "Violin"], ["A big string instrument played between the knees", "Cello"],
      ["The biggest string instrument in the orchestra", "Double bass"], ["A silver tube you blow across, held sideways", "Flute"], ["A black wooden tube with a reed", "Clarinet"], ["A curvy brass horn often heard in jazz", "Saxophone"],
      ["A bright brass instrument with three valves", "Trumpet"], ["A brass instrument with a slide", "Trombone"], ["The biggest, deepest brass instrument", "Tuba"], ["A set of drums played with sticks", "Drum kit"],
      ["A metal triangle struck with a rod", "Triangle"], ["Wooden bars you hit with mallets", "Xylophone"], ["A small four-string guitar from Hawaii", "Ukulele"], ["Has many strings plucked by hand, often in a frame", "Harp"],
      ["You squeeze it in and out and press its keys", "Accordion"], ["A small instrument you blow into and suck through", "Harmonica"], ["Two metal plates crashed together", "Cymbals"], ["A frame with jingles you shake or hit", "Tambourine"],
      ["A shaker filled with beads or seeds", "Maracas"], ["A huge instrument with pipes, in some churches and halls", "Organ"], ["A small plastic flute many kids learn first", "Recorder"], ["A brass instrument shaped in a circle", "French horn"],
    ],
  },
  {
    id: "spanish-family-home", title: "Spanish family and home words", subject: "Languages", level: "Beginner Spanish", publish: "2026-11-23",
    intro: "Twenty-four Spanish words for family members and rooms and things at home: madre, abuelo, hermana, la cocina, la cama, la ventana. The clue is the Spanish and the answer is the English. Draw-it cards make the home words easy for visual learners.",
    items: [
      ["la madre", "Mother"], ["el padre", "Father"], ["la hermana", "Sister"], ["el hermano", "Brother"], ["la abuela", "Grandmother"], ["el abuelo", "Grandfather"],
      ["la tía", "Aunt"], ["el tío", "Uncle"], ["la prima", "Cousin (girl)"], ["el bebé", "Baby"], ["la familia", "Family"], ["la casa", "House"],
      ["la cocina", "Kitchen"], ["el baño", "Bathroom"], ["el dormitorio", "Bedroom"], ["la sala", "Living room"], ["la puerta", "Door"], ["la ventana", "Window"],
      ["la mesa", "Table"], ["la silla", "Chair"], ["la cama", "Bed"], ["el jardín", "Garden"], ["el perro", "Dog"], ["el gato", "Cat"],
    ],
  },
  {
    id: "hanukkah", title: "Hanukkah words", subject: "Holidays", level: "All ages", publish: "2026-11-30",
    intro: "Twenty Hanukkah words and their meanings: the menorah's eight branches and the shamash that lights the others, latkes and sufganiyot, the dreidel's four letters and the gelt. Written for classrooms learning about the holiday and for families who want a game for one of the eight nights.",
    items: [
      ["Hanukkah lasts this many nights", "Eight"], ["A candleholder with nine branches", "Menorah"], ["The helper candle that lights the others", "Shamash"], ["A spinning top with four Hebrew letters", "Dreidel"],
      ["Chocolate coins, or money given as a gift", "Gelt"], ["Fried potato pancakes", "Latkes"], ["Jelly-filled doughnuts", "Sufganiyot"], ["Food is fried in this to remember the miracle", "Oil"],
      ["Hanukkah celebrates the rededication of this", "The Temple"], ["The city where the Temple stood", "Jerusalem"], ["The small group who won the fight for freedom", "Maccabees"], ["Another name for Hanukkah", "Festival of Lights"],
      ["Dreidel letter that means you get nothing", "Nun"], ["Dreidel letter that means you take everything", "Gimel"], ["Dreidel letter that means you take half", "Hei"], ["Dreidel letter that means you put one in", "Shin"],
      ["Candles are added from this direction", "Right to left"], ["The menorah is often placed here to share the light", "Window"], ["Hanukkah begins on the 25th of this Hebrew month", "Kislev"], ["Hanukkah means this in Hebrew", "Dedication"],
    ],
  },
  {
    id: "winter-snow", title: "Winter and snow", subject: "Holidays", level: "Ages 4+", publish: "2026-12-07",
    intro: "Twenty-four winter words for the season between the holidays and spring: snowflakes, icicles, sledding, scarves, hibernating bears and the shortest day of the year. A no-holiday winter pack that works for any classroom in December, January or February.",
    items: [
      ["Tiny ice crystals that fall from clouds", "Snowflake"], ["A pointed stick of ice hanging from a roof", "Icicle"], ["Riding down a snowy hill", "Sledding"], ["Wrapped around your neck to stay warm", "Scarf"],
      ["Warm gloves without fingers", "Mittens"], ["A big storm with heavy snow and wind", "Blizzard"], ["White crystals on grass on a cold morning", "Frost"], ["A ball of snow you throw", "Snowball"],
      ["A house made from blocks of snow", "Igloo"], ["Gliding on blades across ice", "Ice skating"], ["Long boards for sliding on snow", "Skis"], ["A machine that clears snow from roads", "Snowplow"],
      ["Animals sleep through winter in a deep sleep", "Hibernation"], ["The shortest day of the year", "Winter solstice"], ["Water freezes into this", "Ice"], ["Cozy footwear for snow", "Boots"],
      ["A warm drink with marshmallows", "Hot chocolate"], ["Keeps your head warm", "Hat"], ["A fire indoors to keep warm", "Fireplace"], ["Made of snow with a carrot nose", "Snowman"],
      ["The first month of the new year", "January"], ["The coldest season", "Winter"], ["A thick warm coat", "Parka"], ["Birds fly south to escape it", "Cold"],
    ],
  },
  {
    id: "new-years-eve", title: "New Year's Eve", subject: "Holidays", level: "All ages", publish: "2026-12-14",
    intro: "Twenty New Year's words for a family countdown party: resolutions, the countdown, confetti, noisemakers and the stroke of midnight. Play a round of bingo while you wait for the ball to drop, or use Quiz Night to look back on the year with your own questions.",
    items: [
      ["A promise to do better in the new year", "Resolution"], ["Counting down from ten", "Countdown"], ["The time the new year begins", "Midnight"], ["Tiny paper pieces thrown to celebrate", "Confetti"],
      ["Paper horns you blow at midnight", "Noisemakers"], ["Bright bursts of light in the sky", "Fireworks"], ["Raising glasses and saying a few words", "Toast"], ["The last day of the year", "December 31"],
      ["The first day of the year", "January 1"], ["A calendar starts a new one", "Year"], ["A celebration with friends", "Party"], ["A shiny cone hat", "Party hat"],
      ["Bubbly drink for a toast", "Sparkling cider"], ["Looking back at the year", "Memories"], ["What everyone shouts at midnight", "Happy New Year"], ["A big glittering ball drops in New York's Times Square", "Ball drop"],
      ["A goal for the year ahead", "Goal"], ["Staying awake past your bedtime", "Staying up late"], ["Ringing in the new year with these", "Bells"], ["The New Year comes in this season in the north", "Winter"],
    ],
  },
  {
    id: "lunar-new-year", title: "Lunar New Year and the zodiac animals", subject: "Holidays", level: "All ages", publish: "2026-12-21",
    intro: "The twelve animals of the Chinese zodiac in order, plus the words of the Lunar New Year: red envelopes, lion dances, dumplings and lanterns. A good classroom pack for late January or February; the zodiac animals make an especially good Act, Draw or Say round.",
    items: [
      ["The first animal of the zodiac", "Rat"], ["The second animal of the zodiac", "Ox"], ["The third animal of the zodiac", "Tiger"], ["The fourth animal of the zodiac", "Rabbit"],
      ["The fifth animal of the zodiac", "Dragon"], ["The sixth animal of the zodiac", "Snake"], ["The seventh animal of the zodiac", "Horse"], ["The eighth animal of the zodiac", "Goat"],
      ["The ninth animal of the zodiac", "Monkey"], ["The tenth animal of the zodiac", "Rooster"], ["The eleventh animal of the zodiac", "Dog"], ["The twelfth animal of the zodiac", "Pig"],
      ["Money gifts given in red packets", "Red envelopes"], ["Performers in a costume dance to drums", "Lion dance"], ["A lucky food often eaten on New Year's Eve", "Dumplings"], ["Paper lights hung for the Lantern Festival", "Lanterns"],
      ["The color of luck and celebration", "Red"], ["Popped to scare away bad luck in old stories", "Firecrackers"], ["The festival ends on the fifteenth day with this", "Lantern Festival"], ["Families clean the house before the new year to sweep away this", "Bad luck"],
    ],
  },
  {
    id: "valentines-day", title: "Valentine's Day words", subject: "Holidays", level: "All ages", publish: "2026-12-28",
    intro: "Twenty Valentine's words for a class party or a family game night: cards and candy hearts, roses, Cupid's arrow and the color red. The clues are kid-friendly, and the set leaves room to add your own in-jokes in the editor if it's a game for two.",
    items: [
      ["A card you give on February 14", "Valentine"], ["A shape that stands for love", "Heart"], ["A winged boy with a bow and arrow", "Cupid"], ["A red flower given as a gift", "Rose"],
      ["Sweets in a heart-shaped box", "Chocolates"], ["Small candy hearts with short messages", "Conversation hearts"], ["The color of love", "Red"], ["A light pink color", "Pink"],
      ["A friendly kiss on paper", "X"], ["A hug on paper", "O"], ["Cupid shoots these", "Arrows"], ["The month of Valentine's Day", "February"],
      ["Someone you care about", "Friend"], ["Lacy paper cut into patterns", "Doily"], ["A short poem", "Verse"], ["Kind words to say", "Compliment"],
      ["Two birds often shown on cards", "Lovebirds"], ["A special meal for two", "Dinner date"], ["Ribbon tied in a loop", "Bow"], ["The day of the month", "Fourteenth"],
    ],
  },
  {
    id: "world-capitals-americas", title: "Capitals of the Americas", subject: "Geography", level: "Grades 4–8", publish: "2027-01-04",
    intro: "Twenty capitals of North, Central and South America and the Caribbean, from Ottawa and Mexico City to Lima, Santiago and Buenos Aires. Several are commonly confused (Ottawa, not Toronto; Brasília, not Rio), which makes them good bingo and quiz material.",
    items: [
      ["Capital of Canada", "Ottawa"], ["Capital of the United States", "Washington, D.C."], ["Capital of Mexico", "Mexico City"], ["Capital of Guatemala", "Guatemala City"], ["Capital of Costa Rica", "San José"],
      ["Capital of Panama", "Panama City"], ["Capital of Cuba", "Havana"], ["Capital of Jamaica", "Kingston"], ["Capital of the Dominican Republic", "Santo Domingo"], ["Capital of Colombia", "Bogotá"],
      ["Capital of Venezuela", "Caracas"], ["Capital of Ecuador", "Quito"], ["Capital of Peru", "Lima"], ["Capital of Brazil", "Brasília"], ["Capital of Chile", "Santiago"],
      ["Capital of Argentina", "Buenos Aires"], ["Capital of Uruguay", "Montevideo"], ["Capital of Paraguay", "Asunción"], ["Capital of Bolivia (seat of government)", "La Paz"], ["Capital of Honduras", "Tegucigalpa"],
    ],
  },
  {
    id: "healthy-eating", title: "Food groups and healthy eating", subject: "Science", level: "Grades K–3", publish: "2027-01-11",
    intro: "Twenty-four foods and nutrition words sorted by what they do for the body: proteins, grains, fruits, vegetables and dairy, plus vitamins, water and a balanced plate. A friendly health-class pack for young students that avoids labeling foods good or bad.",
    items: [
      ["A group of foods like beans, eggs and fish that build muscle", "Protein"], ["Bread, rice and pasta belong to this group", "Grains"], ["Apples, bananas and berries", "Fruits"], ["Carrots, broccoli and peas", "Vegetables"],
      ["Milk, cheese and yogurt", "Dairy"], ["The best drink when you're thirsty", "Water"], ["Help your body stay healthy, like vitamin C", "Vitamins"], ["Energy from food is measured in these", "Calories"],
      ["Eating a mix of all the food groups", "Balanced diet"], ["The first meal of the day", "Breakfast"], ["A small bite between meals", "Snack"], ["Helps you digest food; found in whole grains", "Fiber"],
      ["An orange vegetable that rabbits love", "Carrot"], ["A green vegetable that looks like a little tree", "Broccoli"], ["A yellow fruit you peel", "Banana"], ["A breakfast grain often eaten with milk", "Cereal"],
      ["A dairy food often eaten with fruit", "Yogurt"], ["Made by bees and very sweet", "Honey"], ["A protein food from hens", "Eggs"], ["A small green vegetable in pods", "Peas"],
      ["Keep your teeth healthy by brushing and eating less of this", "Sugar"], ["Washing these before eating keeps germs away", "Hands"], ["Moving your body every day", "Exercise"], ["Your body repairs itself while you do this", "Sleep"],
    ],
  },
  {
    id: "greek-mythology", title: "Greek gods and myths", subject: "English", level: "Grades 4–8", publish: "2027-01-18",
    intro: "Twenty-four figures from Greek mythology and what each is known for: Zeus and his thunderbolts, Athena and wisdom, Hermes and his winged sandals, Medusa, Pegasus and the Minotaur. Pairs well with a mythology unit or a reading of the Odyssey.",
    items: [
      ["King of the gods, who throws thunderbolts", "Zeus"], ["Queen of the gods and goddess of marriage", "Hera"], ["God of the sea, with a trident", "Poseidon"], ["God of the underworld", "Hades"],
      ["Goddess of wisdom; the owl is her symbol", "Athena"], ["God of music, poetry and the sun", "Apollo"], ["Goddess of the hunt and the moon", "Artemis"], ["Messenger of the gods with winged sandals", "Hermes"],
      ["God of war", "Ares"], ["Goddess of love and beauty", "Aphrodite"], ["God of fire and blacksmiths", "Hephaestus"], ["Goddess of the harvest", "Demeter"],
      ["The mountain where the gods lived", "Mount Olympus"], ["A hero famous for twelve labors", "Heracles"], ["A woman with snakes for hair", "Medusa"], ["A winged horse", "Pegasus"],
      ["Half man, half bull, in a maze", "Minotaur"], ["The hero who sailed home for ten years after the Trojan War", "Odysseus"], ["A box she opened let troubles into the world", "Pandora"], ["He flew too close to the sun on wax wings", "Icarus"],
      ["A giant with one eye", "Cyclops"], ["A wooden horse full of soldiers got into this city", "Troy"], ["The hero who killed Medusa", "Perseus"], ["God of wine and celebration", "Dionysus"],
    ],
  },
  {
    id: "counting-coins", title: "Counting US coins", subject: "Math", level: "Grades K–3", publish: "2027-01-25",
    intro: "Twenty-one coin combinations, each with a different total, from a single penny to nine dimes. Students add up pennies, nickels, dimes, quarters and half dollars, which is the whole skill. Put real or play coins on the table and Match Up becomes a hands-on station; Clue Bingo works as a quick whole-class check.",
    items: [
      ["1 penny", "1¢"], ["1 nickel", "5¢"], ["1 dime", "10¢"], ["1 quarter", "25¢"], ["1 half dollar", "50¢"], ["4 quarters", "$1.00"], ["2 dimes", "20¢"],
      ["3 nickels", "15¢"], ["1 dime and 2 pennies", "12¢"], ["1 quarter and 1 dime", "35¢"], ["2 quarters and 1 nickel", "55¢"], ["3 dimes", "30¢"], ["1 quarter and 3 pennies", "28¢"], ["2 nickels and 1 penny", "11¢"],
      ["3 quarters", "75¢"], ["4 dimes", "40¢"], ["1 quarter and 2 dimes", "45¢"], ["7 pennies", "7¢"], ["2 quarters and 2 dimes", "70¢"], ["1 half dollar and 1 dime", "60¢"], ["9 dimes", "90¢"],
    ],
  },
  {
    id: "earth-day", title: "Earth Day and recycling", subject: "Holidays", level: "Grades 1–5", publish: "2027-02-01",
    intro: "Twenty-four words for Earth Day and every day: reduce, reuse, recycle, compost, solar and wind power, pollution and habitats. A positive, action-focused pack for April 22 or any environmental unit, with clues that point to something students can do.",
    items: [
      ["Use less of something", "Reduce"], ["Use something again instead of throwing it away", "Reuse"], ["Turn old things into new ones", "Recycle"], ["Food scraps that rot into rich soil", "Compost"],
      ["Energy from the sun", "Solar power"], ["Energy from moving air", "Wind power"], ["Dirt and harmful things in air, water or land", "Pollution"], ["Garbage dropped on the ground", "Litter"],
      ["Planting these gives us shade and clean air", "Trees"], ["Where trash goes when it isn't recycled", "Landfill"], ["The day Earth Day is celebrated", "April 22"], ["Turn this off when you leave a room", "Lights"],
      ["Bring this to the store instead of using plastic bags", "Reusable bag"], ["The gas trees take in", "Carbon dioxide"], ["The natural world around us", "Environment"], ["A place where plants and animals live", "Habitat"],
      ["Animals at risk of disappearing", "Endangered species"], ["Water we can drink", "Fresh water"], ["Turn this off while you brush your teeth", "Faucet"], ["Bins for paper, glass and cans", "Recycling bins"],
      ["Our home planet", "Earth"], ["Walking or biking instead of driving saves this", "Fuel"], ["A garden of plants that feed bees", "Pollinator garden"], ["Picking up trash at a park together", "Cleanup"],
    ],
  },
  {
    id: "world-capitals-asia", title: "Capitals of Asia", subject: "Geography", level: "Grades 5–8", publish: "2027-02-08",
    intro: "Twenty capitals across Asia and the Middle East, from Tokyo and Beijing to New Delhi, Jakarta and Riyadh. A step up from the European set, with a few that surprise even adults, like Naypyidaw and Astana. The clue names the country; the answer is the capital city.",
    items: [
      ["Capital of Japan", "Tokyo"], ["Capital of China", "Beijing"], ["Capital of South Korea", "Seoul"], ["Capital of India", "New Delhi"], ["Capital of Pakistan", "Islamabad"],
      ["Capital of Bangladesh", "Dhaka"], ["Capital of Thailand", "Bangkok"], ["Capital of Vietnam", "Hanoi"], ["Capital of the Philippines", "Manila"], ["Capital of Indonesia", "Jakarta"],
      ["Capital of Malaysia", "Kuala Lumpur"], ["Capital of Nepal", "Kathmandu"], ["Capital of Saudi Arabia", "Riyadh"], ["Capital of Turkey", "Ankara"], ["Capital of Iran", "Tehran"],
      ["Capital of Uzbekistan", "Tashkent"], ["Capital of Mongolia", "Ulaanbaatar"], ["Capital of Kazakhstan", "Astana"], ["Capital of Myanmar", "Naypyidaw"], ["Capital of Singapore", "Singapore"],
    ],
  },
  {
    id: "spring", title: "Spring words", subject: "Holidays", level: "Ages 4+", publish: "2027-02-15",
    intro: "Twenty-four spring words for March to May: buds and blossoms, puddles and rainbows, ducklings, butterflies and the spring equinox. A cheerful seasonal pack for younger classes; Act, Draw or Say works well here because almost every answer can be drawn.",
    items: [
      ["Small growths that open into leaves or flowers", "Buds"], ["Flowers on a fruit tree", "Blossoms"], ["Water collected on the ground after rain", "Puddles"], ["Colors in the sky after rain", "Rainbow"],
      ["A baby duck", "Duckling"], ["Comes out of a chrysalis", "Butterfly"], ["When day and night are about the same length in spring", "Equinox"], ["A yellow spring flower with a trumpet shape", "Daffodil"],
      ["A cup-shaped flower from bulbs", "Tulip"], ["A baby sheep", "Lamb"], ["A bird that builds a nest of twigs", "Robin"], ["Holds a bird's eggs", "Nest"],
      ["Rain gear for your feet", "Rain boots"], ["Keeps you dry in a shower", "Umbrella"], ["Grows from a planted seed", "Sprout"], ["Planting vegetables and flowers", "Gardening"],
      ["Comes out after a rain to wiggle", "Earthworm"], ["Flying on a windy day", "Kite"], ["The season after winter", "Spring"], ["Busy insects visiting flowers", "Bees"],
      ["Clouds dropping water", "Rain"], ["The month after March", "April"], ["Green leaves cover these again", "Trees"], ["A baby frog with a tail", "Tadpole"],
    ],
  },
  {
    id: "inventions", title: "Famous inventions", subject: "Science", level: "Grades 3–7", publish: "2027-02-22",
    intro: "Twenty inventions and the problem each one solved: the printing press, the light bulb, the telephone, vaccines, the airplane and the internet. Clues describe what the invention does rather than who is credited with it, so the games stay about ideas, which is where the history class conversation can start.",
    items: [
      ["Prints many copies of books quickly", "Printing press"], ["Makes light from electricity", "Light bulb"], ["Lets you talk to someone far away", "Telephone"], ["The first powered flight was in one in 1903", "Airplane"],
      ["Trains the body to fight a disease", "Vaccine"], ["A worldwide network of computers", "Internet"], ["Shows you which way is north", "Compass"], ["Turns wheels to move a vehicle or a factory", "Engine"],
      ["Takes pictures", "Camera"], ["Keeps food cold", "Refrigerator"], ["Moves people and goods on rails", "Train"], ["Measures time", "Clock"],
      ["Sees tiny living things", "Microscope"], ["Sees faraway stars", "Telescope"], ["Lets you hear broadcasts from far away", "Radio"], ["Rolls to move heavy loads, invented thousands of years ago", "Wheel"],
      ["Makes water flow into homes", "Plumbing"], ["Uses magnets and wires to make electricity", "Generator"], ["Stores electricity to use later", "Battery"], ["Writes on paper with ink from a ball", "Ballpoint pen"],
    ],
  },
  {
    id: "sports", title: "Sports words", subject: "Parties", level: "All ages", publish: "2027-03-01",
    intro: "Twenty-four sports and the gear and words that go with them: a hat trick, a slam dunk, a home run, a hole in one. Made for a sports-themed party or a gym-class rainy day; Act, Draw or Say turns into a mini Olympics.",
    items: [
      ["Played with a round ball and goals; the most popular sport in the world", "Soccer"], ["You dribble and shoot through a hoop", "Basketball"], ["Hit with a bat; run the bases", "Baseball"], ["Played with rackets over a net", "Tennis"],
      ["Players skate and shoot a puck", "Ice hockey"], ["Hit a small ball into holes with clubs", "Golf"], ["Swimming races in a pool", "Swimming"], ["Running, jumping and throwing events", "Track and field"],
      ["Three goals by one player in a game", "Hat trick"], ["A jump and a forceful shot through the hoop", "Slam dunk"], ["Hitting the ball out of the park", "Home run"], ["Getting the golf ball in with one shot", "Hole in one"],
      ["The official who enforces the rules", "Referee"], ["Where you play baseball", "Diamond"], ["Gold, silver and bronze", "Medals"], ["Riding on two wheels", "Cycling"],
      ["Rolling a ball at ten pins", "Bowling"], ["Bending, flipping and balancing on beams", "Gymnastics"], ["Hitting a ball over a high net with your hands", "Volleyball"], ["A long race of about 26 miles", "Marathon"],
      ["Protects your head", "Helmet"], ["The person who trains a team", "Coach"], ["The final game of a tournament", "Championship"], ["A team's cheering supporters", "Fans"],
    ],
  },
);

export const PACK_BY_ID = Object.fromEntries(PACKS.map((p) => [p.id, p]));
