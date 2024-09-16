const mongoose = require("mongoose");
const Component = require("./models/Locations");

const MONGO_URI = "mongodb://localhost:27017/nagpudial"; // Replace with your MongoDB URI

// Sample data
const sampleComponents = [
  {
    name: "Wardha Rd, Samarth Nagar East, Nagpur, Maharashtra 440015",
    description: "Radisson Blu Hotel Nagpur",
    number: "9171266658887",
  },
  {
    name: "Plot No. 5, Kanchan Sarita, Beside Lokmat Bhavan, Wardha Road, Ramdaspeth, Beside Lokmat Bhavan, Nagpur, Maharashtra 440010",
    description: "Sakshi Communication Advertising & Marketing Agency",
    number: "919822201709",
  },
  {
    name: "Chhatrapati Square, Wardha Rd, near by Sai Mandir, Nagpur, Maharashtra 440015",
    description: "Black9 Tattoo & Piercing Studio",
    number: "916263677976",
  },
  {
    name: "181, BHAGAT'S VILLA, Jogi Nagar Ring Road, Behind Dashrath Patil Library, Near New Water Tank, Shatabdi Square, Nagpur 440027",
    description: "Dr. Bhagat's CITY DENTAL CLINIC",
    number: "918087229895",
  },
  {
    name: "Shop no-7 Gansagar apartment aside of bhagyashree traders, Tukroji Square, Nagpur. 440027",
    description: "Sarthak Online Services",
    number: "918421333791",
  },
  {
    name: "Vimal Millenium Ft202, Jaitala Outer Ring Road, above Rohan Gas Agency, beside TIP TOP Convent, Nagpur, Maharashtra 440022",
    description: "Glitzy Moon Events & Entertainment",
    number: "917770086588",
  },
  {
    name: "New Rahul Nagar, Somalwada Wardha Road, Khamla, Nagpur - 440025 (Chhota Hanuman Mandir)",
    description: "Rahul Caterers",
    number: "919860241563",
  },
  {
    name: "State Office :- Avtar Meherbaba Complex, 1 Mala, Play 2 Whinj Enterprises, Bholepetrol Pump, Sitabuldi, Nagpur",
    description: "Maharish Edu Sales & Services",
    number: "917249787879",
  },
  {
    name: "Lower Ground Fortune Mall, behind Maharashtra bank, Sitabuldi, Nagpur",
    description: "PSK Speaking Club",
    number: "919975288300",
  },
  {
    name: "Netaji Market, shop no:59,, Sitabuldi, Nagpur, Maharashtra 440012",
    description: "SNAPSHOT STUDIO",
    number: "919850332177",
  },
  {
    name: "Plot No 349, Main Road, Baidhyanath Galli, Sitabuldi, Nagpur - 440012 (Mahalaxmi Caterers)",
    description: "Mahalaxmi Caterers",
    number: "919860122202",
  },
  {
    name: "lot No 55, Lashkaribagh Bhoslewadi, Nagpur - 440017 Associate Office: - Lower Ground Fortune Mall, behind Maharashtra bank, Sitabuldi, Nagpur",
    description: "Skill U Armoury",
    number: "919049749666",
  },
  {
    name: "RentOCamera Services 2nd Floor C-3, Swapnil Apartment, Abhyankar Marg, Dhantoli, Nagpur, Maharashtra 440012",
    description: "RentOCamera Services",
    number: "917447282244",
  },
  {
    name: "Fortune Mall, Lower ground Munje Square — Sitabuldi Nagpur- 440012",
    description: "Pragati's Makeup Mantra Academy",
    number: "917620583870",
  },
  {
    name: "Fortune Mall Near Jhansi Rani Square, Buty Marg, Sitabuldi, Nagpur, Maharashtra",
    description: "Nayak IAS Academy",
    number: "919766005766",
  },
  {
    name: "Nagpur Reg. office LG 51,Fortune mall, Sitabuldi, Nagpur.",
    description: "Viraj Auto Services",
    number: "918600540777",
  },
  {
    name: "Fortune Mall, Sitabuldi, Nagpur, Maharashtra 440012",
    description: "The Master Cut Salon",
    number: "918956004008",
  },
  {
    name: "Fortune Mall, Munje Chowk, Sitabuldi, Nagpur 440012.",
    description: "Refresh Mukhawas & Namkeen",
    number: "918999769379",
  },
  {
    name: "Cutting Katta Cafe and Restaurant, Near Santoshi Mata Mandir Kharbi, Kharbi, Nagpur - 440024",
    description: "Cutting Katta Events and Catering Kharbi",
    number: "919975829891",
  },
  {
    name: "181, BHAGAT'S VILLA, Jogi Nagar Ring Road, Behind Dashrath Patil Library, Near New Water Tank, Shatabdi Square, Nagpur 440027",
    description: "Dr. Bhagat's CITY DENTAL CLINIC",
    number: "918087229895",
  },
  {
    name: "C/o Raghuwanshi House, Plot No. 4/3 Opp. Khamla Nehru College (Girls Gate), Sakkardara Road, Raghuji Nagar, Nagpur ",
    description: "SAAGAR ENTERPRISES",
    number: "917719806088,",
  },
  {
    name: "181, BHAGAT'S VILLA, Jogi Nagar Ring Road, Behind Dashrath Patil Library, Near New Water Tank, Shatabdi Square, Nagpur 440027",
    description: "Dr. Bhagat's CITY DENTAL CLINIC",
    number: "918087229895",
  },
  {
    name: "Sadar Showroom - 5, Residency Rd, Sadar, Nagpur, Maharashtra 440001 Wardha Showroom - 24, Pragati Layout,Somalwada, Wardha Road, Nagpur, Maharashtra 440025",
    description: "Bharat Furniture",
    number: "9197644 41144",
  },
  {
    name: "Charu Girls Hostel Azad Chowk Sadar Nagpur, Maharashtra 440001 India",
    description: "Charu Girls Hostel",
    number: "917058557560",
  },
  {
    name: "Chandranil Apartment, Sadar Nagpur, Maharashtra 440001 India",
    description: "Mohanty Construction Corporation",
    number: "919923365525",
  },
  {
    name: "Amar Sajjan Complex, Sadar Chindwada Rd Nagpur, Maharashtra 440001 India",
    description: "The Bath Shoppe",
    number: "919657716115",
  },
  {
    name: "Dr. Bhagat's CITY DENTAL CLINIC",
    description:
      "181, BHAGAT'S VILLA, Jogi Nagar Ring Road, Behind Dashrath Patil Library, Near New Water Tank, Shatabdi Square, Nagpur 440027",
    number: "918087229895 ",
  },
  {
    name: "Plot No. 5, Kanchan Sarita, Beside Lokmat Bhavan, Wardha Road, Ramdaspeth, Beside Lokmat Bhavan, Nagpur, Maharashtra 440010",
    description: "Sakshi Communication Advertising & Marketing Agency",
    number: "98222 01709",
  },
  {
    name: "301 B, Neeti Gaurav Complex, 21, Central Bazar Road, Ramdaspeth, Nagpur, Maharashtra 440010",
    description: "Ashwini Kidney & Dialysis Centre Pvt. Ltd.",
    number: "917122448520",
  },
  {
    name: "HO:4th Floor, Rajkamal Complex, Panchsheel Square, Nagpur - 440012",
    description: "Simi Electronics Pvt. Ltd.",
    number: "917774036350",
  },
  {
    name: "Plot No.41 S. E. Railway Coloney-2, Near Rana Pratapnagar Square,Pratap Nagar Nagpur-440022",
    description: "Rampriya The Celebration House and Service Apartment",
    number: "",
  },
  {
    name: "Plot no. 14, मार्केट रोड, Surya Nagar, Nagpur, Maharashtra",
    description: "Shubhas CBSE Scholars",
    number: "918007423016",
  },
  {
    name: "Pardi Nagpur 441805",
    description: "RK Photography",
    number: "917798421296",
  },
  {
    name: "HO:4th Floor, Rajkamal Complex, Panchsheel Square, Nagpur - 440012",
    description: "Simi Electronics Pvt. Ltd.",
    number: "917774036350",
  },
  {
    name: "Behind Panchpaoli Police Station, Jhenda Chowk, Kunhadkar Peth, Lashishbagh, Nagpur-17",
    description: "Bhagwan Gas Pipe Line Fitting",
    number: "919503166553",
  },
  {
    name: "676, New Nandanvan, Near shamdham temple, Nagpur 440009",
    description: "AppsnWebs",
    number: "",
  },
  {
    name: "Plot no. 284 , Nandanvan , Behind - Anand Palace 1 , Nagpur ",
    description: "Servetech Electronics Pvt. Ltd.",
    number: "919860990934",
  },
  {
    name: "01, Balaji Residency, Narsala Road, Narsala Rd. Beldarnagar Sq. Nagpur-34",
    description: "Tejas Insurance Services",
    number: "919423101281",
  },
  {
    name: "3rd Floor Ghole Building ,Beside Trillium Mall,Medical Square Nagpur -440003",
    description: "SP Jute Craft Enterprises",
    number: "91",
  },
  {
    name: "Plot No.41 S. E. Railway Coloney-2, Near Rana Pratapnagar Square,Pratap Nagar Nagpur-440022",
    description: "Rampriya The Celebration House and Service Apartment",
    number: "91",
  },
  {
    name: "Plot No. 2, Near Ramteke Nagar (Manish Nagar), Beltarodi Road, Nagpur - 34",
    description: "V.S Car Care",
    number: "91",
  },
  {
    name: "Juni Mangalwari, Nagpur, Maharashtra 440008",
    description: "S POWERTECH Government Electrical Constructor",
    number: "919923738572",
  },
  {
    name: "Chikli road, New akash Nagar, Tapasya vidhyalaya, Manewada, plot no- 11",
    description: "Strong Muscle Gym",
    number: "918668360862",
  },
  {
    name: "Plot No. 84, Shilpa Housing Society, Shesh Nagar, Chikhali Road, MANEWADA, Nagpur - 440034 (Hanuman Mandir)",
    description: "Shagun Events and Wedding Planner",
    number: "917083799369",
  },
  {
    name: "84, Maa Bhagwati Nagar, Manewada Ring Road, -34 Nagpur",
    description: "A.V. Enterprise",
    number: "919637140222",
  },
  {
    name: "124, Cement Rd, New Shukrawari, Near Gandhi Gate, Mahal, Nagpur, Maharashtra 440032",
    description: "Appaji Cards",
    number: "918830503630",
  },
  {
    name: "",
    description: "Aditya Birla Sun Life Insurance",
    number: "",
  },
  {
    name: "Central Ave, opposite Gayatri Tower, Rampeth, Queta Colony, Lakadganj, Nagpur, Maharashtra",
    description: "Adarsh Coaching classes",
    number: "919021467118",
  },
  {
    name: "Before Koradi Naka No.1, Near Hero Honda Showroom, Koradi Rd, opp. Gotmare Automobile, Nagpur, Maharashtra 440030",
    description: "Zeal Pavers & Tiles",
    number: "919373103399",
  },
  {
    name: "191, Wathoda Layout, Gopal krushna Nagar, Kharbi, Nagpur, Maharashtra 440009",
    description: "AK Technology Marg Software Dealer",
    number: "91",
  },
  {
    name: "New Rahul Nagar, Somalwada Wardha Road, Khamla, Nagpur - 440025 (Chhota Hanuman Mandir)",
    description: "Rahul Caterers",
    number: "919860241563",
  },
  {
    name: "Duplex No.43, Shiv Arcade Society, Bhilgaon, Kamptee, Dist. Nagpur - 440026",
    description: "MOMADE FOOD INDUSTRY",
    number: "918085106173",
  },
  {
    name: "Plot No 505, Dr Ganjare Clinic, 2nd Floor, Kalpana Nagar, Nari Layout, Ring Rd, opposite Powergrid Guest House, near Powergrid Chowk, Jaripatka, Nagpur, Maharashtra 440026",
    description: "Steward Services Private Limited",
    number: "919075392373",
  },
  {
    name: "Near Ginger Mall, Bezonbagh Road, Jaripataka, Nagpur, Maharashtra",
    description: "Umang Career Development Class",
    number: "917020201167 ",
  },
  {
    name: "Near City Light photo Studio, Sai Vasan Shah Sq, Main Bazar Road , Jaripatka, Nagpur",
    description: "Sindhi tattoo Studio",
    number: "9195950 99921",
  },
  {
    name: "Plot No.60 Sindhu Nagar Society, Jaripatka, Nagpur, Maharashtra 440014",
    description: "Shubham Car Rentals Nagpur",
    number: "919890131665",
  },
  {
    name: "Itwara Sarafa Bajar, Itwari, Nagpur - 440002 (Nr Nick Galli,)",
    description: "Alankar Jewellers",
    number: "919822049233",
  },
  {
    name: "Khaparipura, Itwari, Nagpur, Maharashtra 440002",
    description: "Om Gift Works",
    number: "919850747817",
  },
  {
    name: "Kamptee Road, Indora, Nagpur - 441106 (Near Hanuman Mandir)",
    description: "JD Mr Catering Service & Wedding Planner",
    number: "919657777294",
  },
  {
    name: "513, INDORA SQ., OPP. TULI JASWANT MALL, KAMPTEE ROAD NAGPUR",
    description: "MENS PARLOR HAIR SALON",
    number: "919049608586",
  },
  {
    name: "Jagnath Budhwari, Nr. Golibar Chowk, Maskasath Road, Nagpur Sanjay Gandhi Nagar, Near New Hudkeshwar Police Station, Udaynagar Nagar, Sq., Nagpur",
    description: "Apple",
    number: "919372772839",
  },
  {
    name: "Hudkeshwar Rd, near Radha Krishna Mandir, Renuka Mata Nagar, Sanmarga Nagar, Nagpur, Maharashtra 440034",
    description: "Spanwood Furniture Pvt. Ltd.",
    number: "",
  },
  {
    name: "Hudkeshwar, Pipla Fata Bus Stop, Pipla, Nagpur - 440034, Near Pipla Gate",
    description: "Nagpure Celebration Hall and Lawn",
    number: "919689652695",
  },
  {
    name: "Plot No- 38, Ward No-3, Firth India Colony Rajeev Nagar, Hingna Road, Nagpur",
    description: "GLOBAL HYDRO ENGINEERS",
    number: "919422174059",
  },
  {
    name: "Shop No9 Anand Sankul, Hingna Road, Hingna Road, near Raisoni School, Nagpur, Maharashtra 440022",
    description: "Electronic Control Enterprises",
    number: "919822561120",
  },
  {
    name: "Plot No. 65A Niwara Society, Gorewada Rd, Utthan Nagar, Nagpur, Maharashtra 440013",
    description: "New Singh Intelligence Security Services",
    number: "919923780093",
  },
  {
    name: "Yamuna Yatan 225-B, 2nd Floor (Yellow Building), West High Court Road, Opposite of The Times of India, Gokulpeth, Nagpur, Maharashtra 440010",
    description: "SME Accelerated Growth Consulting Pvt. Ltd",
    number: "917776854334",
  },
  {
    name: "32, Mama Rd, Near Zenda Chowk, Dharampeth, Nagpur, Maharashtra 440010",
    description: "Spick and Span Services",
    number: "",
  },
  {
    name: "Rahul Complex, Wing 1, Block No. 40 Near S.T. Stand, Ganeshpeth , Nagpur , Maharashtra - 440018",
    description: "DHANLAXMI TOURS AND TRAVELS",
    number: "919373657272",
  },
  {
    name: "Chandra Shekhar Azar Square, Near Al Zam Zam Hotel, Gandhibagh, CA Road, Nagpur-440008.",
    description: "ARVIND FURNISHING",
    number: "91",
  },
  {
    name: "Shop No.02, Siddhivinyak, Nr. Hotel Harmony, Gandhibagh, Nagpur",
    description: "Balwani Real Estate",
    number: "919420471614",
  },
  {
    name: "Opp. Durga Mandir Jyoti Nagar, Khadan Gandhibag, Nagpur",
    description: "Rohit AIRCON",
    number: "917387982964",
  },
  {
    name: "Corporate Office: ICDI MULTITRADE PVT. LTD. Plot No.9, Rucha Prakashan, C/o Madhuri Mule, Gajanan Nagar, Nagpur - 440015",
    description: "ICDI MULTITRADE PVT. LTD",
    number: "917020959344",
  },
  {
    name: "Wardha Rd, Near Airport Centre Point Hotel, Somalwada, Nagpur, Maharashtra 440025",
    description: "Bharat Glass Traders",
    number: "91",
  },
  {
    name: "27, Swavalambi Nagar, Ring Rd, near Ram Mandir, Deendayal Nagar, Nagpur, Maharashtra 440022",
    description: "Disha's Hair & Beauty",
    number: "",
  },
  {
    name: "Sai Nagar, Pragati Auditorium, More, Dighori, Umred Road, Nagpur • 34",
    description: "प्रधान मंत्री भारतीय जन औषधि परियोजना",
    number: "917066657587",
  },
  {
    name: "444M+7GP, Dighori, Nagpur, Maharashtra 440034",
    description: "Amit English High School",
    number: "917122998728",
  },
  {
    name: "Kirti Nagar,Narsala Road,Dighori,Nagpur-440034",
    description: "Viraj Electrician Services",
    number: "919373474603",
  },
  {
    name: "Govindaprabhu Nagar, Dighori, Nagpur",
    description: "Sunrise Decoration & Events Organizer",
    number: "91",
  },
  {
    name: "109, Bhagwaghar Complex, Khare Town, Dharampeth, Nagpur",
    description: "Rruchita Unique Mindset Coach & NLP Master Practitioner",
    number: "9188056263005",
  },
  {
    name: "Rachna Galaxy, Plot -10, Ground Floor, Ambazari Rd, opp. Wockhardt Hospital, Dharampeth, Nagpur, Maharashtra 440010",
    description: "ORRA Diamond Jewellery",
    number: "917122760778",
  },
  {
    name: "Plot No. 45, Sugandh, opp. Childrens Traffic Park, Dharampeth, Nagpur, Maharashtra 440010",
    description: "GHUMANEWALA TRAVEL SERVICES",
    number: "918806085849",
  },
  {
    name: "Plot No.41 S. E. Railway Coloney-2, Near Rana Pratapnagar Square,Pratap Nagar Nagpur-440022",
    description: "Rampriya The Celebration House and Service Apartment",
    number: "91",
  },
  {
    name: "Anant Apartments, near Children Traffic Park, Khare Town, Dharampeth, Nagpur, Maharashtra 440010",
    description: "Sunshine Tutorials",
    number: "917387300081",
  },
  {
    name: "3rd floor, Mangalam Arcade, N Bazar Rd, Dharampeth Extension, Nagpur, Maharashtra 440010",
    description: "NIIT Nagpur Dharampeth Centre",
    number: "917122532673",
  },
  {
    name: "2nd Floor, Swami Sankul, opp Batukbhai Jewellers, W High Ct Rd, Dharampeth, Nagpur, Maharashtra 440010",
    description: "Gadge Panchang By Acharya Bhupesh Gadge",
    number: "918282888666",
  },
  {
    name: "1st floor, Dharampeth Extension, Cement Road, Ram Nagar, Nagpur, Maharashtra",
    description: "Orga Hammam & Spa",
    number: "917796696633",
  },
  {
    name: "Balpande Industries Private Limited R.K.Business Centre, 194 Cement Road, Dharampeth Extension, Nagpur – 440010",
    description: "BALPANDE INDUSTRIES PRIVATE LIMITED",
    number: "917498336490",
  },
  {
    name: "209, Orange City Towers, Opp Patrakar Bhavan, Dhantoli, Nagpur- 440012 India",
    description: "CBSE Coaching Institute in Nagpur",
    number: "919422082208",
  },
  {
    name: "Joyco Nx 69,70,71 Yeshwant Stadium, Dhantoli, Nagpur - 12",
    description: "JOYCO",
    number: "919823344344",
  },
  {
    name: "JCI India, National Headquarters, Sahar Plaza, 506, 5TH FLOOR, WINDFALL, near CHAKALA METRO STATION, J B Nagar, Andheri, Mumbai, Maharashtra 400059",
    description: "JCI Vision",
    number: "918369505509",
  },
  {
    name: "nd Floor C-3, Swapnil Apartment, Abhyankar Marg, Dhantoli, Nagpur, Maharashtra 440012",
    description: "RentOCamera Services",
    number: "917447282244",
  },
  {
    name: "Chhatrapati Square, Wardha Rd, near by Sai Mandir, Nagpur, Maharashtra 440015",
    description: "Black9 Tattoo & Piercing Studio",
    number: "916263677976",
  },
  {
    name: "PLOT NO 07, SHANTINIKETAN COLONY, Pratap Nagar, Nagpur, Maharashtra 440022",
    description: "KHADE",
    number: "91",
  },
  {
    name: "Near Sneh nagar Petrol Pump, Ring Rd, beside ICICI Bank, Chatrapati Sq, Nagpur, Maharashtra 440015",
    description: "Gadewar eye care",
    number: "91",
  },
  {
    name: "Shop No.36, Wardha Rd, Pragati Colony,Chatrapati Nagar Square, Chatrapati Nagar, Nagpur, Maharashtra 440015",
    description: "Payal Agencies",
    number: "91",
  },
  {
    name: "Plot no. 231, Ring Rd, opposite chatrapati hall, near peshwe tution classes, Pragati Colony, Chatrapati Nagar, Nagpur, Maharashtra 440015",
    description: "Chalpe Car Rental Services",
    number: "91",
  },
  {
    name: "G-19,20, Poonam Chambers Koradi Rd Chhaoni, Byramji Town Nagpur, Maharashtra 440013",
    description: "The Card Point",
    number: "917127960741",
  },
  {
    name: "Achraj Towers 1, 1, Chaoni T -Point, opp. Governor Kothi, Chaoni Square, Rajnagar, Nagpur, Maharashtra 440010",
    description: "Raj Bhandar Sweet's",
    number: "91",
  },
  {
    name: "1st Floor, Mohta Complex, Chhaoni Rd, opposite Moil Office, above SBI 440013, Tailors Line, Sadar, Nagpur, Maharashtra 440013",
    description: "Krub - The Salon",
    number: "91",
  },
  {
    name: "HOUSE NO, 6057, Bhagwan Nagar Rd, near CHANDRA NAGAR, Chandranagar, Rameshwari, Nagpur, Maharashtra 440027",
    description: "VEDANT TOURS & TRAVEL",
    number: "91",
  },
  {
    name: "Central Avenue Road,Telephone Exchange Square Behind Mascot Honda,Nagpur Nagpur",
    description: "KP Technology",
    number: "918928127539",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Locations.deleteMany();

    // Insert sample data
    await Locations.insertMany(sampleComponents);

    console.log("Sample data inserted successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedDatabase();
