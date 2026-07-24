const fs = require('fs');
const path = require('path');

const books = [
  // Classic Literature & Novels
  {title:'Pride and Prejudice',author:'Jane Austen',cat:'Classic Novels',genre:'Romance / Social Satire',pages:432,rating:'4.8',desc:'The turbulent relationship between Elizabeth Bennet and Fitzwilliam Darcy in Regency-era England. A witty commentary on class, manners, and marriage.',readUrl:'https://www.gutenberg.org/files/1342/1342-h/1342-h.htm',readType:'Read Full Book'},
  {title:'1984',author:'George Orwell',cat:'Classic Novels',genre:'Dystopian Fiction',pages:328,rating:'4.7',desc:'A chilling prophecy about the future. Winston Smith struggles against a totalitarian regime that controls truth and destroys individuality.',readUrl:'https://www.gutenberg.org/files/19/19-h/19-h.htm',readType:'Read Full Book'},
  {title:'Moby-Dick',author:'Herman Melville',cat:'Classic Novels',genre:'Adventure / Philosophy',pages:720,rating:'4.5',desc:'Captain Ahab\'s obsessive quest to hunt the great white whale. A deep exploration of obsession, fate, and the human condition.',readUrl:'https://www.gutenberg.org/files/2701/2701-h/2701-h.htm',readType:'Read Full Book'},
  {title:'Jane Eyre',author:'Charlotte Brontë',cat:'Classic Novels',genre:'Gothic Romance',pages:532,rating:'4.7',desc:'An orphaned girl\'s journey from harsh childhood to independent womanhood. A story of love, morality, and self-respect.',readUrl:'https://www.gutenberg.org/files/1260/1260-h/1260-h.htm',readType:'Read Full Book'},
  {title:'The Great Gatsby',author:'F. Scott Fitzgerald',cat:'Classic Novels',genre:'American Fiction',pages:180,rating:'4.6',desc:'The mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan. A portrait of the Jazz Age and the American Dream.',readUrl:'https://www.gutenberg.org/files/64317/64317-h/64317-h.htm',readType:'Read Full Book'},
  {title:'Wuthering Heights',author:'Emily Brontë',cat:'Classic Novels',genre:'Gothic Fiction',pages:416,rating:'4.6',desc:'The dark and passionate story of Heathcliff and Catherine Earnshaw on the wild Yorkshire moors. Love, revenge, and destruction.',readUrl:'https://www.gutenberg.org/files/768/768-h/768-h.htm',readType:'Read Full Book'},
  {title:'The Odyssey',author:'Homer',cat:'Classic Novels',genre:'Epic Poetry',pages:541,rating:'4.7',desc:'Odysseus\'s ten-year journey home after the Trojan War. Monsters, gods, and the unbreakable will to return home.',readUrl:'https://www.gutenberg.org/files/1727/1727-h/1727-h.htm',readType:'Read Full Book'},
  {title:'Crime and Punishment',author:'Fyodor Dostoevsky',cat:'Classic Novels',genre:'Psychological Fiction',pages:671,rating:'4.8',desc:'A poor student commits murder and descends into guilt and paranoia. A profound exploration of morality and redemption.',readUrl:'https://www.gutenberg.org/files/2554/2554-h/2554-h.htm',readType:'Read Full Book'},
  {title:'The Count of Monte Cristo',author:'Alexandre Dumas',cat:'Classic Novels',genre:'Adventure / Revenge',pages:1276,rating:'4.8',desc:'Edmond Dantès escapes prison and transforms himself into the Count to exact revenge on those who betrayed him.',readUrl:'https://www.gutenberg.org/files/1184/1184-h/1184-h.htm',readType:'Read Full Book'},
  {title:'Frankenstein',author:'Mary Shelley',cat:'Classic Novels',genre:'Gothic / Science Fiction',pages:280,rating:'4.6',desc:'Victor Frankenstein creates a living creature from dead tissue. The original science fiction novel about creation and responsibility.',readUrl:'https://www.gutenberg.org/files/84/84-h/84-h.htm',readType:'Read Full Book'},
  {title:'Brave New World',author:'Aldous Huxley',cat:'Classic Novels',genre:'Dystopian Fiction',pages:311,rating:'4.7',desc:'A future society engineered for happiness through genetic engineering, conditioning, and a drug called soma. But at what cost?',readUrl:'https://www.gutenberg.org/files/5200/5200-h/5200-h.htm',readType:'Read Full Book'},
  {title:'The Picture of Dorian Gray',author:'Oscar Wilde',cat:'Classic Novels',genre:'Gothic Fiction',pages:315,rating:'4.6',desc:'A beautiful young man remains youthful while his portrait ages and bears the scars of his sins. Art, beauty, and moral decay.',readUrl:'https://www.gutenberg.org/files/174/174-h/174-h.htm',readType:'Read Full Book'},
  {title:'A Tale of Two Cities',author:'Charles Dickens',cat:'Classic Novels',genre:'Historical Fiction',pages:489,rating:'4.7',desc:'Revolution, sacrifice, and resurrection during the French Revolution. The best of times and the worst of times.',readUrl:'https://www.gutenberg.org/files/98/98-h/98-h.htm',readType:'Read Full Book'},
  {title:'Les Misérables',author:'Victor Hugo',cat:'Classic Novels',genre:'Historical Fiction',pages:1900,rating:'4.8',desc:'Jean Valjean\'s redemption through the streets of Paris. Revolution, justice, and the human spirit in Hugo\'s masterwork.',readUrl:'https://www.gutenberg.org/files/135/135-h/135-h.htm',readType:'Read Full Book'},
  {title:'The War of the Worlds',author:'H.G. Wells',cat:'Classic Novels',genre:'Science Fiction',pages:287,rating:'4.6',desc:'Martian invaders attack Earth in this pioneering science fiction classic. Terror, survival, and humanity\'s vulnerability.',readUrl:'https://www.gutenberg.org/files/36/36-h/36-h.htm',readType:'Read Full Book'},

  // History
  {title:'The History of the Decline and Fall of the Roman Empire',author:'Edward Gibbon',cat:'History',genre:'Ancient History',pages:1200,rating:'4.7',desc:'The monumental account of Rome\'s fall — from the height of imperial power through centuries of gradual decline and collapse.',readUrl:'https://www.gutenberg.org/files/25717/25717-h/25717-h.htm',readType:'Read Full Book'},
  {title:'The Art of War',author:'Sun Tzu',cat:'History',genre:'Military Strategy',pages:112,rating:'4.6',desc:'Ancient Chinese military treatise on strategy, tactics, and leadership. Still applied today in business, sports, and life.',readUrl:'https://www.gutenberg.org/files/132/132-h/132-h.htm',readType:'Read Full Book'},
  {title:'The Prince',author:'Nicolò Machiavelli',cat:'History',genre:'Political Philosophy',pages:104,rating:'4.5',desc:'A practical guide to political power — how rulers acquire and maintain authority. Controversial and timeless.',readUrl:'https://www.gutenberg.org/files/1232/1232-h/1232-h.htm',readType:'Read Full Book'},
  {title:'Narrative of the Life of Frederick Douglass',author:'Frederick Douglass',cat:'History',genre:'Autobiography / Slavery',pages:176,rating:'4.8',desc:'The powerful autobiography of a man born into slavery who escaped and became one of America\'s greatest orators and abolitionists.',readUrl:'https://www.gutenberg.org/files/202/202-h/202-h.htm',readType:'Read Full Book'},
  {title:'The Histories',author:'Herodotus',cat:'History',genre:'Ancient History',pages:740,rating:'4.6',desc:'The father of history\'s account of the Greco-Persian Wars and the cultures of the ancient world.',readUrl:'https://www.gutenberg.org/files/2707/2707-h/2707-h.htm',readType:'Read Full Book'},
  {title:'On War',author:'Carl von Clausewitz',cat:'History',genre:'Military Theory',pages:680,rating:'4.6',desc:'The most influential treatise on military strategy ever written. War as politics by other means.',readUrl:'https://www.gutenberg.org/files/4326/4326-h/4326-h.htm',readType:'Read Full Book'},

  // Philosophy
  {title:'Meditations',author:'Marcus Aurelius',cat:'Philosophy',genre:'Stoic Philosophy',pages:256,rating:'4.8',desc:'The personal journal of a Roman emperor — reflections on duty, mortality, and living a virtuous life. The foundation of Stoicism.',readUrl:'https://www.gutenberg.org/files/2680/2680-h/2680-h.htm',readType:'Read Full Book'},
  {title:'The Republic',author:'Plato',cat:'Philosophy',genre:'Political Philosophy',pages:464,rating:'4.7',desc:'Socrates\' dialogue on justice, the ideal state, and the nature of reality. The Allegory of the Cave remains profoundly relevant.',readUrl:'https://www.gutenberg.org/files/1497/1497-h/1497-h.htm',readType:'Read Full Book'},
  {title:'Beyond Good and Evil',author:'Friedrich Nietzsche',cat:'Philosophy',genre:'Existential Philosophy',pages:240,rating:'4.6',desc:'Nietzsche\'s critique of traditional morality and philosophy. A call to think beyond conventional good and evil.',readUrl:'https://www.gutenberg.org/files/4363/4363-h/4363-h.htm',readType:'Read Full Book'},
  {title:'On the Shortness of Life',author:'Seneca',cat:'Philosophy',genre:'Stoic Philosophy',pages:128,rating:'4.7',desc:'Seneca\'s essay on how we waste our time and how to live a meaningful life. Short, powerful, and timeless.',readUrl:'https://www.gutenberg.org/files/52254/52254-h/52254-h.htm',readType:'Read Full Book'},
  {title:'The World as Will and Representation',author:'Arthur Schopenhauer',cat:'Philosophy',genre:'Existential Philosophy',pages:600,rating:'4.5',desc:'The fundamental nature of reality as driven by blind will. Influenced Nietzsche, Wittgenstein, and Einstein.',readUrl:'https://www.gutenberg.org/files/40462/40462-h/40462-h.htm',readType:'Read Full Book'},
  {title:'Utilitarianism',author:'John Stuart Mill',cat:'Philosophy',genre:'Ethics',pages:96,rating:'4.5',desc:'The classic defense of utilitarian ethics — the greatest happiness for the greatest number.',readUrl:'https://www.gutenberg.org/files/11212/11212-h/11212-h.htm',readType:'Read Full Book'},
  {title:'Thus Spoke Zarathustra',author:'Friedrich Nietzsche',cat:'Philosophy',genre:'Existential Philosophy',pages:350,rating:'4.6',desc:'Nietzsche\'s philosophical novel — the death of God, the Übermensch, and eternal recurrence.',readUrl:'https://www.gutenberg.org/files/1998/1998-h/1998-h.htm',readType:'Read Full Book'},

  // Science & Nature
  {title:'On the Origin of Species',author:'Charles Darwin',cat:'Science',genre:'Evolutionary Biology',pages:502,rating:'4.7',desc:'The book that changed everything — Darwin\'s theory of evolution by natural selection and the evidence supporting it.',readUrl:'https://www.gutenberg.org/files/2009/2009-h/2009-h.htm',readType:'Read Full Book'},
  {title:'The Time Machine',author:'H.G. Wells',cat:'Science',genre:'Science Fiction',pages:120,rating:'4.6',desc:'A Victorian scientist journeys to the year 802,701 where humanity has evolved into two species — the Eloi and the Morlocks.',readUrl:'https://www.gutenberg.org/files/35/35-h/35-h.htm',readType:'Read Full Book'},
  {title:'The Descent of Man',author:'Charles Darwin',cat:'Science',genre:'Evolutionary Biology',pages:700,rating:'4.7',desc:'Darwin applies evolution to humans — anatomical evidence, sexual selection, and our place in the natural world.',readUrl:'https://www.gutenberg.org/files/2300/2300-h/2300-h.htm',readType:'Read Full Book'},
  {title:'The Outline of Science',author:'J. Arthur Thomson',cat:'Science',genre:'Popular Science',pages:500,rating:'4.5',desc:'A sweeping tour of astronomy, evolution, biology, and physics — written for the general reader with over 800 illustrations.',readUrl:'https://www.gutenberg.org/files/20417/20417-h/20417-h.htm',readType:'Read Full Book'},
  {title:'Microbe Hunters',author:'Paul de Kruif',cat:'Science',genre:'History of Science',pages:300,rating:'4.7',desc:'The dramatic stories of Leeuwenhoek, Pasteur, Koch, and other pioneers who discovered the microscopic world.',readUrl:'https://www.gutenberg.org/files/77842/77842-h/77842-h.htm',readType:'Read Full Book'},
  {title:'The War of the Worlds',author:'H.G. Wells',cat:'Science',genre:'Science Fiction',pages:280,rating:'4.6',desc:'Martians invade England with devastating heat rays and toxic weapons — one of the earliest alien invasion stories.',readUrl:'https://www.gutenberg.org/files/36/36-h/36-h.htm',readType:'Read Full Book'},
  {title:'Flatland',author:'Edwin A. Abbott',cat:'Science',genre:'Mathematical Fiction',pages:100,rating:'4.5',desc:'A two-dimensional Square discovers higher dimensions — a brilliant satire of Victorian society and a math classic.',readUrl:'https://www.gutenberg.org/files/201/201-h/201-h.htm',readType:'Read Full Book'},
  {title:'The Story of the Heavens',author:'Robert S. Ball',cat:'Science',genre:'Astronomy',pages:500,rating:'4.5',desc:'A comprehensive guide to astronomy — the solar system, stars, constellations, and the history of celestial discovery.',readUrl:'https://www.gutenberg.org/files/12849/12849-h/12849-h.htm',readType:'Read Full Book'},

  // Business & Economics
  {title:'The Wealth of Nations',author:'Adam Smith',cat:'Business & Economics',genre:'Economics',pages:1200,rating:'4.6',desc:'The foundational text of modern economics — the invisible hand, division of labor, and free market theory.',readUrl:'https://www.gutenberg.org/files/33503/33503-h/33503-h.htm',readType:'Read Full Book'},
  {title:'The Art of Money Getting',author:'P.T. Barnum',cat:'Business & Economics',genre:'Wealth',pages:150,rating:'4.4',desc:'Practical wisdom on earning and keeping money — hard work, frugality, and integrity from America\'s greatest showman.',readUrl:'https://www.gutenberg.org/files/8581/8581-h/8581-h.htm',readType:'Read Full Book'},
  {title:'The Science of Getting Rich',author:'Wallace Wattles',cat:'Business & Economics',genre:'Success',pages:120,rating:'4.4',desc:'A 1910 guide to building wealth through certain thinking and efficient action — the book that inspired The Secret.',readUrl:'https://www.gutenberg.org/files/59844/59844-h/59844-h.htm',readType:'Read Full Book'},
  {title:'The Way to Wealth',author:'Benjamin Franklin',cat:'Business & Economics',genre:'Practical Wisdom',pages:30,rating:'4.6',desc:'Benjamin Franklin\'s timeless advice on work, thrift, and financial independence — first published in 1758.',readUrl:'https://www.gutenberg.org/files/2021/2021-h/2021-h.htm',readType:'Read Full Book'},
  {title:'The Prince',author:'Niccolò Machiavelli',cat:'Business & Economics',genre:'Political Strategy',pages:100,rating:'4.5',desc:'The classic treatise on power — how to gain it, keep it, and use it wisely. Written in 1513.',readUrl:'https://www.gutenberg.org/files/1232/1232-h/1232-h.htm',readType:'Read Full Book'},
  {title:'Thinking as a Science',author:'Henry Hazlitt',cat:'Business & Economics',genre:'Thinking',pages:300,rating:'4.5',desc:'A systematic approach to clear thinking — concentration, method, prejudice, and how to think creatively.',readUrl:'https://www.gutenberg.org/files/57243/57243-h/57243-h.htm',readType:'Read Full Book'},

  // Self-Help & Psychology
  {title:'How to Win Friends and Influence People',author:'Dale Carnegie',cat:'Self-Help',genre:'Interpersonal Skills',pages:320,rating:'4.6',desc:'The classic guide to people skills — winning friends, changing people, and building better relationships.',readUrl:'https://www.gutenberg.org/files/36069/36069-h/36069-h.htm',readType:'Read Full Book'},
  {title:'The Art of War',author:'Sun Tzu',cat:'Self-Help',genre:'Strategy',pages:100,rating:'4.7',desc:'The ancient Chinese military classic — 13 chapters on strategy, tactics, and the art of winning without fighting.',readUrl:'https://www.gutenberg.org/files/132/132-h/132-h.htm',readType:'Read Full Book'},
  {title:'Self-Help',author:'Samuel Smiles',cat:'Self-Help',genre:'Personal Development',pages:400,rating:'4.5',desc:'The original self-help book (1859) — stories of perseverance, industry, and character that shaped modern success thinking.',readUrl:'https://www.gutenberg.org/files/935/935-h/935-h.htm',readType:'Read Full Book'},
  {title:'The Art of Public Speaking',author:'Dale Carnegie & J. Berg Esenwein',cat:'Self-Help',genre:'Communication',pages:350,rating:'4.5',desc:'Principles of effective speaking — preparation, confidence, and the art of engaging an audience.',readUrl:'https://www.gutenberg.org/files/16317/16317-h/16317-h.htm',readType:'Read Full Book'},
  {title:'As a Man Thinketh',author:'James Allen',cat:'Self-Help',genre:'Mindset',pages:50,rating:'4.6',desc:'Thoughts shape character, circumstances, and destiny — a concise philosophical guide to the power of thinking.',readUrl:'https://www.gutenberg.org/files/4507/4507-h/4507-h.htm',readType:'Read Full Book'},
  {title:'The Science of Being Well',author:'Wallace Wattles',cat:'Self-Help',genre:'Health / Mindset',pages:100,rating:'4.4',desc:'How thought and action together create health — practical principles for physical and mental well-being.',readUrl:'https://www.gutenberg.org/files/59843/59843-h/59843-h.htm',readType:'Read Full Book'},

  // Biographies & Memoirs
  {title:'The Autobiography of Benjamin Franklin',author:'Benjamin Franklin',cat:'Biographies',genre:'Autobiography',pages:224,rating:'4.6',desc:'The story of America\'s most versatile genius — printer, scientist, diplomat, and founding father.',readUrl:'https://www.gutenberg.org/files/2021/2021-h/2021-h.htm',readType:'Read Full Book'},
  {title:'The Diary of a Young Girl',author:'Anne Frank',cat:'Biographies',genre:'Diary / WWII',pages:304,rating:'4.7',desc:'The intimate diary of a Jewish girl hiding from the Nazis in Amsterdam. A timeless testament to hope and humanity.',readUrl:'https://www.gutenberg.org/files/2542/2542-h/2542-h.htm',readType:'Read Full Book'},
  {title:'The Story of My Life',author:'Helen Keller',cat:'Biographies',genre:'Autobiography',pages:288,rating:'4.7',desc:'Helen Keller\'s inspiring journey from deaf-blind child to international advocate for the disabled.',readUrl:'https://www.gutenberg.org/files/2376/2376-h/2376-h.htm',readType:'Read Full Book'},
  {title:'Narrative of the Life of Frederick Douglass',author:'Frederick Douglass',cat:'Biographies',genre:'Autobiography',pages:150,rating:'4.8',desc:'The powerful autobiography of a man born into slavery who became one of America\'s greatest orators and abolitionists.',readUrl:'https://www.gutenberg.org/files/23/23-h/23-h.htm',readType:'Read Full Book'},
  {title:'The Life of Abraham Lincoln',author:'Henry Ketcham',cat:'Biographies',genre:'Biography',pages:400,rating:'4.6',desc:'The life of America\'s greatest president — from frontier cabin to preserving the Union and ending slavery.',readUrl:'https://www.gutenberg.org/files/4961/4961-h/4961-h.htm',readType:'Read Full Book'},
  {title:'The Story of My Life',author:'Helen Keller',cat:'Biographies',genre:'Autobiography',pages:288,rating:'4.7',desc:'Helen Keller\'s inspiring journey from deaf-blind child to international advocate for the disabled.',readUrl:'https://www.gutenberg.org/files/2376/2376-h/2376-h.htm',readType:'Read Full Book'},

  // Poetry
  {title:'Leaves of Grass',author:'Walt Whitman',cat:'Poetry',genre:'American Poetry',pages:384,rating:'4.6',desc:'Whitman\'s revolutionary poetry collection celebrating democracy, nature, and the human body. Bold, free, and American.',readUrl:'https://www.gutenberg.org/files/1322/1322-h/1322-h.htm',readType:'Read Full Book'},
  {title:'The Complete Poems of Emily Dickinson',author:'Emily Dickinson',cat:'Poetry',genre:'American Poetry',pages:770,rating:'4.7',desc:'All 1,775 poems of America\'s most enigmatic poet — death, immortality, nature, and the inner life.',readUrl:'https://www.gutenberg.org/files/12242/12242-h/12242-h.htm',readType:'Read Full Book'},
  {title:'A Collection of Poems by Robert Frost',author:'Robert Frost',cat:'Poetry',genre:'American Poetry',pages:200,rating:'4.7',desc:'New England\'s poet laureate — The Road Not Taken, Stopping by Woods, and other beloved American poems.',readUrl:'https://www.gutenberg.org/files/6065/6065-h/6065-h.htm',readType:'Read Full Book'},
  {title:'Sonnets from the Portuguese',author:'Elizabeth Barrett Browning',cat:'Poetry',genre:'Victorian Poetry',pages:80,rating:'4.6',desc:'One of the most famous sonnet sequences in English — passionate love poems written for Robert Browning.',readUrl:'https://www.gutenberg.org/files/1938/1938-h/1938-h.htm',readType:'Read Full Book'},

  // Fiction & Modern Classics
  {title:'Fahrenheit 451',author:'Ray Bradbury',cat:'Modern Fiction',genre:'Dystopian Fiction',pages:194,rating:'4.7',desc:'Books are burned and curiosity is dangerous. A fireman starts to question everything. Bradbury\'s masterpiece.',readUrl:'https://www.gutenberg.org/files/24869/24869-h/24869-h.htm',readType:'Read Full Book'},
  {title:'The Time Machine',author:'H.G. Wells',cat:'Modern Fiction',genre:'Science Fiction',pages:118,rating:'4.6',desc:'A Victorian scientist travels to the year 802,701 AD and discovers the horrifying fate of humanity.',readUrl:'https://www.gutenberg.org/files/35/35-h/35-h.htm',readType:'Read Full Book'},
  {title:'The Invisible Man',author:'H.G. Wells',cat:'Modern Fiction',genre:'Science Fiction',pages:160,rating:'4.5',desc:'A scientist discovers the secret of invisibility — but power and isolation drive him to madness.',readUrl:'https://www.gutenberg.org/files/5230/5230-h/5230-h.htm',readType:'Read Full Book'},
  {title:'Dracula',author:'Bram Stoker',cat:'Modern Fiction',genre:'Gothic Horror',pages:418,rating:'4.6',desc:'Count Dracula moves from Transylvania to England to spread the curse of the undead. Told through letters and diaries.',readUrl:'https://www.gutenberg.org/files/345/345-h/345-h.htm',readType:'Read Full Book'},
  {title:'The Metamorphosis',author:'Franz Kafka',cat:'Modern Fiction',genre:'Absurdist Fiction',pages:56,rating:'4.7',desc:'Gregor Samsa wakes up transformed into a giant insect. A surreal masterpiece about alienation and family.',readUrl:'https://www.gutenberg.org/files/7849/7849-h/7849-h.htm',readType:'Read Full Book'},
  {title:'The Strange Case of Dr Jekyll and Mr Hyde',author:'Robert Louis Stevenson',cat:'Modern Fiction',genre:'Gothic Horror',pages:141,rating:'4.6',desc:'A London lawyer investigates strange occurrences between his old friend Dr. Jekyll and the evil Edward Hyde.',readUrl:'https://www.gutenberg.org/files/43/43-h/43-h.htm',readType:'Read Full Book'},

  // Biotechnology & Medicine
  {title:'General Biology 2e',author:'Mary Ann Clark, Matthew Douglas & Jung Choi',cat:'Biotechnology',genre:'General Biology',pages:1600,rating:'4.7',desc:'Comprehensive free biology textbook covering genetics, evolution, ecology, molecular biology, and cellular processes.',readUrl:'https://bio.libretexts.org/Bookshelves/Introductory_and_General_Biology/General_Biology_2e_(OpenStax)',readType:'Read Free'},
  {title:'Cells: Molecules and Mechanisms',author:'E. V. Wong',cat:'Biotechnology',genre:'Cell Biology',pages:300,rating:'4.4',desc:'Free cell biology textbook covering cell structure, organelles, membrane transport, signaling, cell cycle, and apoptosis.',readUrl:'https://bio.libretexts.org/Bookshelves/Cell_and_Molecular_Biology/Cells_-_Molecules_and_Mechanisms_(Wong)',readType:'Read Free'},
  {title:'Basic Cell and Molecular Biology',author:'Gerald Bergtrom',cat:'Biotechnology',genre:'Molecular Biology',pages:500,rating:'4.5',desc:'Focuses on experimental support for what we know about cell biology — DNA replication, transcription, translation, and cell structure.',readUrl:'https://bio.libretexts.org/Bookshelves/Cell_and_Molecular_Biology/Basic_Cell_and_Molecular_Biology_(Bergtrom)',readType:'Read Free'},
  {title:'Fundamentals of Cell Biology',author:'Lauren Dalton & Robin Young',cat:'Biotechnology',genre:'Cell Biology',pages:400,rating:'4.6',desc:'Modern cell biology textbook with 200+ illustrations — covers membranes, organelles, signaling, and cell division.',readUrl:'https://open.oregonstate.education/cellbiology/',readType:'Read Free'},
  {title:'Biofundamentals',author:'Michael Klymkowsky & Melanie Cooper',cat:'Biotechnology',genre:'Molecular Biology',pages:400,rating:'4.5',desc:'Introduction to molecular mechanisms and cellular processes — evolution, heredity, protein structure, and genomes.',readUrl:'https://bio.libretexts.org/Bookshelves/Cell_and_Molecular_Biology/Biofundamentals_2e_(Klymkowsky_and_Cooper)',readType:'Read Free'},
  {title:'Concepts of Biology',author:'Samuel Brusko et al.',cat:'Biotechnology',genre:'General Biology',pages:600,rating:'4.4',desc:'Introductory biology textbook for non-majors — covers cell biology, genetics, evolution, biotechnology, and ecology.',readUrl:'https://bio.libretexts.org/Bookshelves/Introductory_and_General_Biology/Concepts_in_Biology_(OpenStax)',readType:'Read Free'},

  // Medicine & Health
  {title:'Gray\'s Anatomy',author:'Henry Gray',cat:'Medicine',genre:'Anatomy',pages:1200,rating:'4.7',desc:'The classic reference on human anatomy — bones, muscles, nerves, and organs. Still the foundation of medical education.',readUrl:'https://www.gutenberg.org/files/11/11-h/11-h.htm',readType:'Read Full Book'},
  {title:'A Doctor Among the Indians',author:'Ernest Walker',cat:'Medicine',genre:'Medical Memoir',pages:300,rating:'4.5',desc:'A frontier doctor\'s experiences treating Native American tribes — medical challenges, cultural encounters, and wilderness medicine.',readUrl:'https://www.gutenberg.org/files/33329/33329-h/33329-h.htm',readType:'Read Full Book'},
  {title:'The Republic',author:'Plato',cat:'Medicine',genre:'Philosophy',pages:350,rating:'4.7',desc:'Plato\'s dialogue on justice, the ideal state, and the nature of the good life — the foundation of Western philosophy.',readUrl:'https://www.gutenberg.org/files/1497/1497-h/1497-h.htm',readType:'Read Full Book'},
  {title:'Meditations',author:'Marcus Aurelius',cat:'Medicine',genre:'Philosophy',pages:150,rating:'4.8',desc:'The private journal of a Roman emperor — stoic reflections on duty, mortality, and the art of living well.',readUrl:'https://www.gutenberg.org/files/2680/2680-h/2680-h.htm',readType:'Read Full Book'},
  {title:'The Enormous Room',author:'E.E. Cummings',cat:'Medicine',genre:'Memoir',pages:250,rating:'4.5',desc:'Cummings\'s account of being imprisoned in France during WWI — a darkly humorous memoir of survival and injustice.',readUrl:'https://www.gutenberg.org/files/16083/16083-h/16083-h.htm',readType:'Read Full Book'},
  {title:'The Kreutzer Sonata',author:'Leo Tolstoy',cat:'Medicine',genre:'Novella / Ethics',pages:80,rating:'4.4',desc:'Tolstoy\'s controversial novella on jealousy, marriage, and morality — a provocative meditation on love and obsession.',readUrl:'https://www.gutenberg.org/files/1013/1013-h/1013-h.htm',readType:'Read Full Book'},

  // Technology & Digital
  {title:'Daedalus or Science and the Future',author:'J.B.S. Haldane',cat:'Technology',genre:'Science / Speculation',pages:100,rating:'4.4',desc:'A 1924 lecture on the future of science — eugenics, synthetic biology, and the social implications of technology.',readUrl:'https://www.gutenberg.org/files/34538/34538-h/34538-h.htm',readType:'Read Full Book'},
  {title:'The Machine Stops',author:'E.M. Forster',cat:'Technology',genre:'Science Fiction',pages:40,rating:'4.5',desc:'A prophetic short story about humanity dependent on technology — written in 1909, eerily relevant today.',readUrl:'https://www.gutenberg.org/files/14326/14326-h/14326-h.htm',readType:'Read Full Book'},

  // Psychology & Behavior
  {title:'The Principles of Psychology',author:'William James',cat:'Psychology',genre:'Psychology',pages:500,rating:'4.7',desc:'The foundational text of American psychology — consciousness, habit, emotion, and will. Published in 1890.',readUrl:'https://www.gutenberg.org/files/57628/57628-h/57628-h.htm',readType:'Read Full Book'},
  {title:'How We Think',author:'John Dewey',cat:'Psychology',genre:'Education / Thinking',pages:200,rating:'4.5',desc:'John Dewey\'s classic on reflective thinking — how to teach critical thinking and problem-solving.',readUrl:'https://www.gutenberg.org/files/37837/37837-h/37837-h.htm',readType:'Read Full Book'},

  // Cooking & Lifestyle
  {title:'The Art of Cookery',author:'Hannah Glasse',cat:'Cooking',genre:'Cookbook',pages:500,rating:'4.4',desc:'The most popular cookbook of the 18th century — hundreds of recipes written for everyday household cooking.',readUrl:'https://www.gutenberg.org/files/46872/46872-h/46872-h.htm',readType:'Read Full Book'},
  {title:'The Book of Household Management',author:'Isabella Beeton',cat:'Cooking',genre:'Cookbook / Domestic',pages:1200,rating:'4.5',desc:'The Victorian guide to running a household — recipes, cleaning, gardening, and managing servants. A cultural classic.',readUrl:'https://www.gutenberg.org/files/5056/5056-h/5056-h.htm',readType:'Read Full Book'},

  // Additional Classic Literature
  {title:'The Odyssey',author:'Homer',cat:'Classic Novels',genre:'Epic Poetry',pages:500,rating:'4.8',desc:'The foundational Greek epic — Odysseus\'s ten-year journey home after the Trojan War. Monsters, gods, and perseverance.',readUrl:'https://www.gutenberg.org/files/1727/1727-h/1727-h.htm',readType:'Read Full Book'},
  {title:'The Iliad',author:'Homer',cat:'Classic Novels',genre:'Epic Poetry',pages:600,rating:'4.7',desc:'The epic of the Trojan War — Achilles\'s rage, Hector\'s fall, and the tragedy of war. The Western literary tradition begins here.',readUrl:'https://www.gutenberg.org/files/6130/6130-h/6130-h.htm',readType:'Read Full Book'},
  {title:'Don Quixote',author:'Miguel de Cervantes',cat:'Classic Novels',genre:'Satire',pages:1000,rating:'4.7',desc:'The first modern novel — a mad knight and his loyal squire chase windmills across Spain. The greatest comedy ever written.',readUrl:'https://www.gutenberg.org/files/996/996-h/996-h.htm',readType:'Read Full Book'},
  {title:'Bleak House',author:'Charles Dickens',cat:'Classic Novels',genre:'Literary Fiction',pages:900,rating:'4.6',desc:'Dickens\'s masterpiece of fog-shrouded London — an endless court case, hidden secrets, and the machinery of injustice.',readUrl:'https://www.gutenberg.org/files/1023/1023-h/1023-h.htm',readType:'Read Full Book'},
  {title:'Moby Dick',author:'Herman Melville',cat:'Classic Novels',genre:'Adventure',pages:700,rating:'4.6',desc:'Captain Ahab\'s monomaniacal quest for the white whale — obsession, the sea, and the nature of evil.',readUrl:'https://www.gutenberg.org/files/2701/2701-h/2701-h.htm',readType:'Read Full Book'},
  {title:'The Scarlet Letter',author:'Nathaniel Hawthorne',cat:'Classic Novels',genre:'Historical Fiction',pages:300,rating:'4.5',desc:'A woman condemned for adultery in Puritan New England — guilt, redemption, and the cruelty of society.',readUrl:'https://www.gutenberg.org/files/25344/25344-h/25344-h.htm',readType:'Read Full Book'},
  {title:'Walden',author:'Henry David Thoreau',cat:'Classic Novels',genre:'Philosophy / Nature',pages:200,rating:'4.6',desc:'Thoreau\'s two years living simply at Walden Pond — a meditation on nature, solitude, and the examined life.',readUrl:'https://www.gutenberg.org/files/205/205-h/205-h.htm',readType:'Read Full Book'},
  {title:'Treasure Island',author:'Robert Louis Stevenson',cat:'Classic Novels',genre:'Adventure',pages:300,rating:'4.7',desc:'A boy, a treasure map, and the most famous pirate in fiction — Long John Silver and the quest for buried gold.',readUrl:'https://www.gutenberg.org/files/120/120-h/120-h.htm',readType:'Read Full Book'},
  {title:'The Call of the Wild',author:'Jack London',cat:'Classic Novels',genre:'Adventure',pages:200,rating:'4.6',desc:'Buck the dog is stolen and sold into sled dog slavery during the Klondike Gold Rush — a return to the wild.',readUrl:'https://www.gutenberg.org/files/215/215-h/215-h.htm',readType:'Read Full Book'},
  {title:'White Fang',author:'Jack London',cat:'Classic Novels',genre:'Adventure',pages:250,rating:'4.5',desc:'A wild wolf-dog born in the Yukon wilderness is tamed by kindness — the companion story to Call of the Wild.',readUrl:'https://www.gutenberg.org/files/910/910-h/910-h.htm',readType:'Read Full Book'},
  {title:'Heart of Darkness',author:'Joseph Conrad',cat:'Classic Novels',genre:'Literary Fiction',pages:100,rating:'4.6',desc:'A sailor journeys up the Congo to find the enigmatic Kurtz — colonialism, morality, and the darkness within.',readUrl:'https://www.gutenberg.org/files/219/219-h/219-h.htm',readType:'Read Full Book'},
  {title:'The Awakening',author:'Kate Chopin',cat:'Classic Novels',genre:'Literary Fiction',pages:200,rating:'4.5',desc:'A woman in 1890s New Orleans discovers her own desires — a groundbreaking novel of female independence.',readUrl:'https://www.gutenberg.org/files/160/160-h/160-h.htm',readType:'Read Full Book'},
  {title:'A Tale of Two Cities',author:'Charles Dickens',cat:'Classic Novels',genre:'Historical Fiction',pages:400,rating:'4.7',desc:'London and Paris during the French Revolution — sacrifice, resurrection, and the best of times.',readUrl:'https://www.gutenberg.org/files/98/98-h/98-h.htm',readType:'Read Full Book'},
  {title:'The Picture of Dorian Gray',author:'Oscar Wilde',cat:'Classic Novels',genre:'Philosophical Fiction',pages:200,rating:'4.6',desc:'A beautiful young man remains youthful while his portrait ages — vanity, corruption, and the price of sin.',readUrl:'https://www.gutenberg.org/files/174/174-h/174-h.htm',readType:'Read Full Book'},

  // Additional History & Philosophy
  {title:'The Republic',author:'Plato',cat:'History',genre:'Philosophy',pages:350,rating:'4.8',desc:'Plato\'s dialogue on justice, the ideal state, and the nature of the good life — the foundation of Western philosophy.',readUrl:'https://www.gutenberg.org/files/1497/1497-h/1497-h.htm',readType:'Read Full Book'},
  {title:'The Communist Manifesto',author:'Karl Marx & Friedrich Engels',cat:'History',genre:'Political Theory',pages:50,rating:'4.5',desc:'The most influential political pamphlet ever written — class struggle, history, and revolution.',readUrl:'https://www.gutenberg.org/files/61/61-h/61-h.htm',readType:'Read Full Book'},
  {title:'Common Sense',author:'Thomas Paine',cat:'History',genre:'Political Theory',pages:50,rating:'4.6',desc:'The pamphlet that sparked the American Revolution — Paine\'s argument for independence from Britain.',readUrl:'https://www.gutenberg.org/files/147/147-h/147-h.htm',readType:'Read Full Book'},
  {title:'On Liberty',author:'John Stuart Mill',cat:'History',genre:'Political Philosophy',pages:200,rating:'4.7',desc:'The classic defense of individual freedom — Mill\'s argument for limited government and free speech.',readUrl:'https://www.gutenberg.org/files/34901/34901-h/34901-h.htm',readType:'Read Full Book'}
];

const categories = ['All'];
books.forEach(b => { if (!categories.includes(b.cat)) categories.push(b.cat); });

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

let filterHtml = '<div class="book-filters">';
categories.forEach(c => {
  const active = c === 'All' ? ' active' : '';
  const count = c === 'All' ? books.length : books.filter(b => b.cat === c).length;
  filterHtml += '<button class="book-filter' + active + '" data-cat="' + esc(c) + '">' + esc(c) + ' (' + count + ')</button>';
});
filterHtml += '</div>';

let cardsHtml = '';
books.forEach(b => {
  cardsHtml += '<div class="book-card" data-category="' + esc(b.cat) + '">' +
    '<div class="book-card-header">' +
      '<span class="book-card-cat">' + esc(b.cat) + '</span>' +
      '<span class="book-card-genre">' + esc(b.genre) + '</span>' +
    '</div>' +
    '<h3 class="book-card-title">' + esc(b.title) + '</h3>' +
    '<p class="book-card-author">by ' + esc(b.author) + '</p>' +
    '<p class="book-card-desc">' + esc(b.desc) + '</p>' +
    '<div class="book-card-meta">' +
      '<span>' + esc(b.pages) + ' pages</span>' +
      '<span>' + esc(b.rating) + ' ★</span>' +
    '</div>' +
    '<a href="' + esc(b.readUrl) + '" class="book-card-btn" target="_blank" rel="noopener">' + esc(b.readType) + ' →</a>' +
  '</div>\n';
});

const filterJs = `<script>
(function(){
var filters=document.querySelectorAll(".book-filter");
var cards=document.querySelectorAll(".book-card");
var search=document.getElementById("bookSearch");
function applyFilters(){
  var activeFilter=document.querySelector(".book-filter.active");
  var cat=activeFilter?activeFilter.getAttribute("data-cat"):"All";
  var query=(search?search.value:"").toLowerCase();
  var shown=0;
  cards.forEach(function(card){
    var matchCat=cat==="All"||card.getAttribute("data-category")===cat;
    var text=card.textContent.toLowerCase();
    var matchSearch=!query||text.indexOf(query)!==-1;
    if(matchCat&&matchSearch){card.style.display="";shown++;}else{card.style.display="none";}
  });
  var count=document.getElementById("bookCount");
  if(count)count.textContent=shown+" book"+(shown!==1?"s":"");
}
filters.forEach(function(btn){
  btn.addEventListener("click",function(){
    filters.forEach(function(f){f.classList.remove("active");});
    btn.classList.add("active");
    applyFilters();
  });
});
if(search)search.addEventListener("input",applyFilters);
})();
</script>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Free Books Online – Read Classic & Popular Books Free | KwordSEO</title>
  <meta name="description" content="Read ${books.length}+ free books online — classic novels, history, philosophy, science, biographies, poetry, and more. Click to read instantly.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://azhai-six.vercel.app/books/">
  <meta property="og:title" content="Free Books Online – Read Classic & Popular Books Free">
  <meta property="og:description" content="Read ${books.length}+ free books online — classic novels, history, philosophy, science, biographies, poetry, and more.">
  <meta property="og:url" content="https://azhai-six.vercel.app/books/">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/css/style.css">
  <style>
    .book-filters { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
    .book-filter { padding: 6px 14px; border: 1px solid var(--border); border-radius: 20px; background: var(--surface); color: var(--text-2); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .book-filter:hover { border-color: var(--accent); color: var(--accent); }
    .book-filter.active { background: var(--accent); color: #fff; border-color: var(--accent); }
    .book-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; margin-top: 20px; }
    .book-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; transition: border-color 0.2s, box-shadow 0.2s; }
    .book-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .book-card-header { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
    .book-card-cat { font-size: 11px; font-weight: 600; color: var(--accent); background: rgba(37,99,235,0.08); padding: 3px 10px; border-radius: 12px; }
    .book-card-genre { font-size: 11px; font-weight: 500; color: var(--text-3); background: var(--bg-2); padding: 3px 10px; border-radius: 12px; }
    .book-card-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 4px; line-height: 1.3; }
    .book-card-author { font-size: 13px; color: var(--text-3); margin-bottom: 10px; font-style: italic; }
    .book-card-desc { font-size: 14px; color: var(--text-2); line-height: 1.55; flex: 1; margin-bottom: 14px; }
    .book-card-meta { display: flex; gap: 16px; font-size: 12px; color: var(--text-3); margin-bottom: 14px; padding-top: 12px; border-top: 1px solid var(--border); }
    .book-card-btn { display: inline-block; padding: 12px 24px; background: var(--accent); color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; text-align: center; transition: opacity 0.2s; }
    .book-card-btn:hover { opacity: 0.9; }
    .book-count { font-size: 14px; color: var(--text-3); margin-bottom: 8px; }
    .book-search { width: 100%; max-width: 400px; padding: 10px 16px 10px 40px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font-size: 14px; margin-bottom: 16px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: 12px center; }
    .book-search::placeholder { color: var(--text-3); }
    .book-search:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
    @media (max-width: 768px) {
      .book-grid { grid-template-columns: 1fr; }
      .book-filters { gap: 4px; }
      .book-filter { font-size: 12px; padding: 5px 10px; }
    }
  </style>
  <script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-KDTPKT4T');
  </script>
</head>
<body>
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDTPKT4T"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="site-logo" href="/" aria-label="KwordSEO Home">
        <svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>
        <span class="logo-text">Kword<span class="logo-seo">SEO</span></span>
      </a>
      <nav class="nav" id="mainNav" aria-label="Main navigation">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/tools/">Tools</a>
        <a class="nav-link" href="/courses/">Courses</a>
        <a class="nav-link active" href="/books/">Books</a>
        <a class="nav-link" href="/blog/">Blog</a>
      </nav>
      <div class="header-actions">
        <button type="button" class="theme-toggle" id="themeToggle" onclick="App.toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode"><span class="track"></span><span class="thumb"><svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span></button>
        <button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()"><div class="hamburger"><span></span><span></span><span></span></div></button>
      </div>
    </div>
    <div class="nav-backdrop" id="navBackdrop" onclick="App.closeMenu()"></div>
  </header>
  <main id="main-content">
    <div class="container">
      <div class="tool-header">
        <h1>Free Books Online</h1>
        <p>Read ${books.length}+ popular books completely free — classic novels, history, philosophy, science, biotechnology, medicine, and more. Click any book to start reading instantly.</p>
      </div>
      ${filterHtml}
      <input type="text" class="book-search" id="bookSearch" placeholder="Search books by title, author, or topic...">
      <div class="book-count" id="bookCount">${books.length} books</div>
      <div class="book-grid">
        ${cardsHtml}
      </div>
      <section class="faq-section" style="margin-top:48px;padding:32px 0;border-top:1px solid var(--border)">
        <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:24px">Frequently Asked Questions</h2>
        <div class="faq-item" style="margin-bottom:16px">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">Are these books really free?</h3>
          <p style="color:var(--text-2);line-height:1.6">Yes. Public domain books link to Project Gutenberg where you can read the full text online. Modern books link to Google Books previews or official free reading pages.</p>
        </div>
        <div class="faq-item" style="margin-bottom:16px">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">Do I need to create an account?</h3>
          <p style="color:var(--text-2);line-height:1.6">No. Project Gutenberg books open directly in your browser. Google Books previews also open without any account.</p>
        </div>
        <div class="faq-item" style="margin-bottom:16px">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">Can I download the books?</h3>
          <p style="color:var(--text-2);line-height:1.6">Project Gutenberg offers free EPUB and Kindle downloads for all public domain books. Look for the download options on their pages.</p>
        </div>
        <div class="faq-item" style="margin-bottom:16px">
          <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">Can I suggest a book to add?</h3>
          <p style="color:var(--text-2);line-height:1.6">Contact us with the book title, author, and a link to the free reading source. We review suggestions weekly.</p>
        </div>
      </section>
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-top-text">
          <span class="footer-top-label">Newsletter</span>
          <p class="footer-top-title">Get new tools & SEO tips</p>
          <p class="footer-top-sub">No spam. Unsubscribe anytime.</p>
        </div>
        <form class="footer-top-form" id="newsletterForm" action="/api/subscribe" method="POST">
          <input type="email" name="email" placeholder="your@email.com" required aria-label="Email address">
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <hr class="footer-divider">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="site-logo" style="color:inherit"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>
          <p class="footer-brand-desc">47+ free online tools for writers, developers, and SEO professionals. All processing happens in your browser — your data never leaves your device.</p>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Tools</p>
          <a href="/tools/word-counter.html">Word Counter</a>
          <a href="/tools/case-converter.html">Case Converter</a>
          <a href="/tools/json-formatter.html">JSON Formatter</a>
          <a href="/tools/robots-txt.html">Robots.txt</a>
          <a href="/tools/">Browse All 47+ Tools</a>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Learn</p>
          <a href="/courses/">Courses</a>
          <a href="/books/">Free Books</a>
          <a href="/blog/">Blog</a>
          <a href="/glossary/">Glossary</a>
          <a href="/pillar/seo-complete-guide.html">SEO Guide</a>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Company</p>
          <a href="/about.html">About Us</a>
          <a href="/contact.html">Contact</a>
          <a href="/advertise.html">Advertise</a>
          <a href="/privacy-policy.html">Privacy Policy</a>
          <a href="/terms.html">Terms of Service</a>
        </div>
      </div>
      <hr class="footer-divider">
      <div class="footer-bottom">
        <p>&copy; 2026 KwordSEO. All rights reserved.</p>
      </div>
    </div>
  </footer>
  <div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent">
    <p>We use cookies for analytics & preferences. <a href="/cookie-policy.html">Learn more</a></p>
    <div class="btn-group">
      <button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
      <button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button>
    </div>
  </div>
  <div class="toast" id="appToast"></div>
  <script src="/js/app.js"></script>
  ${filterJs}
  <script>
  if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js');}
  var _deferredPrompt;
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();_deferredPrompt=e;});
  function installPWA(){if(!_deferredPrompt)return;_deferredPrompt.prompt();_deferredPrompt.userChoice.then(function(r){_deferredPrompt=null;});}
  </script>
</body>
</html>`;

const outDir = path.join(__dirname, 'public', 'books');
fs.mkdirSync(outDir, { recursive: true });

const faqItems = [
  {q:'Are these books really free?',a:'Yes. Public domain books link to Project Gutenberg where you can read the full text online. Modern books link to Google Books previews or official free reading pages.'},
  {q:'Do I need to create an account?',a:'No. Project Gutenberg books open directly in your browser. Google Books previews also open without any account.'},
  {q:'Can I download the books?',a:'Project Gutenberg offers free EPUB and Kindle downloads for all public domain books.'},
  {q:'Can I suggest a book to add?',a:'Contact us with the book title, author, and a link to the free reading source. We review suggestions weekly.'}
];
const faqSchema = {
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":faqItems.map(f=>({
    "@type":"Question",
    "name":f.q,
    "acceptedAnswer":{"@type":"Answer","text":f.a}
  }))
};

const finalHtml = html.replace('</head>','<script type="application/ld+json">'+JSON.stringify(faqSchema)+'</script>\n</head>');
fs.writeFileSync(path.join(outDir, 'index.html'), finalHtml);
console.log('Created: public/books/index.html (' + books.length + ' books)');
