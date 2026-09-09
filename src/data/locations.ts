export interface LocationInfo {
  slug: string;
  name: string;
  urduName: string;
  type: "City" | "Tehsil" | "Town" | "Village" | "Locality";
  district: string;
  distanceKm: number;
  commuteTimeMinutes: number;
  transportAvailable: boolean;
  transportRoute: string;
  pickupPoints: string[];
  description: string;
  highlights: string[];
  nearbyLandmarks: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const LOCATIONS_DATA: LocationInfo[] = [
  {
    slug: "ghakhar-mandi",
    name: "Ghakhar Mandi",
    urduName: "گکھڑ منڈی",
    type: "Town",
    district: "Gujranwala",
    distanceKm: 0.5,
    commuteTimeMinutes: 3,
    transportAvailable: true,
    transportRoute: "Direct Campus Walking & Town Van Service along G.T. Road and Circular Road",
    pickupPoints: ["Model Police Station Stop", "Ghakhar Main Bazaar", "Circular Road", "Railway Station Chowk", "G.T. Road Main Gate"],
    description: "Home to the main campus of M. S. Naz High School on G.T. Road directly opposite the Model Police Station. Serving families across Ghakhar Mandi with over two decades of educational excellence, Oxford English curriculum, fully equipped science and AI labs, and consistent BISE Gujranwala matric distinctions.",
    highlights: [
      "Immediate proximity to MSNS main campus on G.T. Road",
      "Comprehensive Oxford Early Years to BISE Matric education",
      "Air-cooled, 100% solar-powered digital classrooms and laboratories",
      "Full Boy Scout and Girl Guide Leadership Corps training"
    ],
    nearbyLandmarks: ["Model Police Station Ghakhar", "Ghakhar Railway Station", "Main Bazaar", "Grain Market"],
    faqs: [
      {
        question: "Where is M. S. Naz High School located in Ghakhar Mandi?",
        answer: "MSNS is prominently situated on main G.T. Road directly opposite the Model Police Station in Ghakhar Mandi, offering easy and secure accessibility."
      },
      {
        question: "Are admissions open for students residing in Ghakhar Mandi?",
        answer: "Yes, admissions are open year-round for Playgroup through Grade 10 Matriculation with walk-in registrations at the campus admissions desk Monday to Saturday."
      },
      {
        question: "Is transport required for students in Ghakhar?",
        answer: "While many students walk or cycle due to the central location, dedicated school vans also provide pickup and drop-off across all inner mohallahs of Ghakhar."
      }
    ]
  },
  {
    slug: "wazirabad",
    name: "Wazirabad",
    urduName: "وزیرآباد",
    type: "City",
    district: "Wazirabad",
    distanceKm: 8,
    commuteTimeMinutes: 12,
    transportAvailable: true,
    transportRoute: "Direct G.T. Road Express Van Service connecting Wazirabad City Center to MSNS Campus",
    pickupPoints: ["Kutchery Road", "Nizamabad Chowk", "Railway Road", "Allahabad More", "Sialkot Bypass", "Circular Road"],
    description: "Situated just 8 km north of Ghakhar Mandi along the G.T. Road arterial corridor, Wazirabad students enjoy fast 10-12 minute door-to-school transport. MSNS is the top choice for Wazirabad parents seeking a high-discipline, Oxford curriculum institution with 100% Matriculation board pass rates.",
    highlights: [
      "Daily dedicated fleet of school vans covering all Wazirabad residential zones",
      "Consistent 1100+ marks board toppers from Wazirabad enrolled at MSNS",
      "Modern AI computing and robotics curriculum with 15 TB cloud access",
      "Safe, vetted transportation conductors and monitored travel schedules"
    ],
    nearbyLandmarks: ["Wazirabad Kutchery", "Nizamabad Cutlery Hub", "Wazirabad Railway Junction", "Maulana Zafar Ali Khan Trust"],
    faqs: [
      {
        question: "How long is the commute from Wazirabad to MSNS?",
        answer: "The commute is just 10 to 12 minutes via the direct, signal-free G.T. Road corridor using our monitored school transport fleet."
      },
      {
        question: "Which areas in Wazirabad does the MSNS transport van cover?",
        answer: "Our vans cover Kutchery Road, Nizamabad, Sialkot Bypass, Railway Road, Circular Road, Allahabad, and adjacent residential colonies."
      },
      {
        question: "Can Wazirabad students prepare for BISE Gujranwala Matric exams at MSNS?",
        answer: "Yes, MSNS is fully registered with BISE Gujranwala and provides extensive 3-phase test series, past paper rehearsals, and practical laboratory training."
      }
    ]
  },
  {
    slug: "rahwali",
    name: "Rahwali",
    urduName: "راہوالی",
    type: "Town",
    district: "Gujranwala",
    distanceKm: 6,
    commuteTimeMinutes: 9,
    transportAvailable: true,
    transportRoute: "Southbound G.T. Road Corridor Van Fleet connecting Rahwali Cantonment & Sugar Mills to MSNS",
    pickupPoints: ["Rahwali Cantt Gate", "Sugar Mills More", "Main G.T. Road Rahwali", "Railway Crossing Stop", "Old Toll Plaza"],
    description: "Located just 6 km south along G.T. Road, Rahwali families benefit from a 9-minute safe transit directly to M. S. Naz High School. Rahwali students achieve outstanding academic growth with our Oxford curriculum, STEM laboratories, and character-building leadership wings.",
    highlights: [
      "Quick 9-minute transit via G.T. Road",
      "Punctual morning pickup and afternoon return runs for Rahwali Cantt & Sugar Mills areas",
      "Individualized mentoring with a low 1:16 teacher-student ratio",
      "Active Scout Leader and Girl Guide character formation"
    ],
    nearbyLandmarks: ["Rahwali Cantonment", "Rahwali Sugar Mills", "Rahwali Railway Station", "G.T. Road Commercial Area"],
    faqs: [
      {
        question: "Is school transport available from Rahwali Cantt to MSNS?",
        answer: "Yes, dedicated MSNS transport vans operate daily pickup and drop-off services for students throughout Rahwali Cantt, Sugar Mills, and surrounding neighborhoods."
      },
      {
        question: "What curriculum does MSNS offer for Rahwali students?",
        answer: "MSNS offers Oxford University Press syllabus from Pre-School to Grade 8 and BISE Gujranwala Matriculation for Grades 9 and 10."
      }
    ]
  },
  {
    slug: "gujranwala",
    name: "Gujranwala",
    urduName: "گوجرانوالہ",
    type: "City",
    district: "Gujranwala",
    distanceKm: 18,
    commuteTimeMinutes: 22,
    transportAvailable: true,
    transportRoute: "Northbound G.T. Road Express Route connecting Northern Gujranwala, DC Colony, & Master City",
    pickupPoints: ["DC Colony Main Gate", "Master City", "Citi Housing Phase 1", "Wapda Town Bypass", "Chan Da Qila Intersection"],
    description: "Gujranwala city families looking for disciplined, non-commercialized, high-standard schooling choose MSNS. Situated in a clean suburban environment free from urban congestion, students experience focused academics, solar-powered facilities, and personalized mentorship.",
    highlights: [
      "Rapid transit from northern Gujranwala societies (DC Colony, Citi Housing, Wapda Town)",
      "Premier BISE Gujranwala Matriculation results with science & computer labs",
      "Stress-free, peaceful campus setting away from central city smog and traffic",
      "Comprehensive scholarship programs for high-achieving Gujranwala students"
    ],
    nearbyLandmarks: ["DC Colony", "Citi Housing Gujranwala", "Wapda Town", "G.T. Road Bypass"],
    faqs: [
      {
        question: "Do students from northern Gujranwala societies attend MSNS?",
        answer: "Yes, many students from DC Colony, Master City, and northern residential zones attend MSNS via our express G.T. Road transit."
      },
      {
        question: "What are the fee advantages at MSNS compared to Gujranwala city schools?",
        answer: "MSNS offers tier-one Oxford and Matric standards at transparent, accessible fee tiers with sibling discounts and merit scholarships."
      }
    ]
  },
  {
    slug: "aujla-kalan",
    name: "Aujla Kalan",
    urduName: "اوجلہ کلاں",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 3.5,
    commuteTimeMinutes: 6,
    transportAvailable: true,
    transportRoute: "Aujla Kalan Feeder Van Route via Ghakhar Link Road",
    pickupPoints: ["Main Aujla Kalan Adda", "Govt Dispensary Chowk", "Central Jamia Masjid Stop", "Aujla Link Road"],
    description: "Aujla Kalan is an adjacent agrarian town located merely 3.5 km east of Ghakhar Mandi. MSNS has been the primary academic partner for Aujla Kalan families for over 20 years, providing generational education from kindergarten to matriculation.",
    highlights: [
      "Doorstep van pickup across Aujla Kalan",
      "Strong tradition of Aujla Kalan alumni entering medical, engineering, and armed forces careers",
      "Emphasis on moral ethics, respect, and Islamic values alongside modern STEM",
      "Affordable rural concession packages"
    ],
    nearbyLandmarks: ["Aujla Kalan Main Adda", "Jamia Masjid Aujla", "Govt Rural Dispensary"],
    faqs: [
      {
        question: "Is there a daily school van for Aujla Kalan?",
        answer: "Yes, our dedicated Aujla Kalan van ensures children are picked up right from their streets and returned safely after classes."
      },
      {
        question: "Can girls from Aujla Kalan safely commute to MSNS?",
        answer: "Absolutely. Safety is our hallmark; all transport vans have vetted conductors, designated female seating, and verified security protocols."
      }
    ]
  },
  {
    slug: "kotli-kalan",
    name: "Kotli Kalan",
    urduName: "کوٹلی کلاں",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 4,
    commuteTimeMinutes: 7,
    transportAvailable: true,
    transportRoute: "Kotli Kalan to Ghakhar Feeder Shuttle",
    pickupPoints: ["Kotli Kalan Adda", "Canal Bridge Stop", "Village High School More", "Kotli Main Chowk"],
    description: "Kotli Kalan residents enjoy direct proximity to MSNS Ghakhar Mandi campus. Our school vans provide prompt transit, enabling students from Kotli Kalan to access premier science laboratories, Oxford course materials, and computer programming education.",
    highlights: [
      "7-minute commute time via paved link roads",
      "Comprehensive science practical labs for Matric students",
      "Full digital classroom setup with uninterrupted solar electricity",
      "Supportive remedial evening study sessions"
    ],
    nearbyLandmarks: ["Kotli Kalan Canal Bridge", "Main Village Adda", "Kotli Sports Ground"],
    faqs: [
      {
        question: "How do Kotli Kalan students reach MSNS?",
        answer: "Dedicated MSNS vans make scheduled morning and afternoon runs through Kotli Kalan, picking up students at designated neighborhood stops."
      }
    ]
  },
  {
    slug: "kotli-khoja",
    name: "Kotli Khoja",
    urduName: "کوٹلی خوجہ",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 4.5,
    commuteTimeMinutes: 8,
    transportAvailable: true,
    transportRoute: "Kotli Khoja Link Service via Circular Road Connector",
    pickupPoints: ["Kotli Khoja Adda", "Jamia Masjid Road", "Primary School Chowk"],
    description: "Serving Kotli Khoja students with quality English medium education, MSNS bridges the gap between rural roots and modern global education through English language fluency, mathematics mastery, and science labs.",
    highlights: [
      "Convenient morning pickup from Kotli Khoja",
      "Oxford University Press books and active English conversation workshops",
      "Special focus on mathematics conceptual fundamentals",
      "Safe, caring environment for young children"
    ],
    nearbyLandmarks: ["Kotli Khoja Central Ground", "Main Adda Kotli Khoja"],
    faqs: [
      {
        question: "Are Playgroup and Nursery classes available for Kotli Khoja children?",
        answer: "Yes, our Foundational Stage offers child-friendly Montessori activity rooms, gentle mentors, and safe transportation for young learners."
      }
    ]
  },
  {
    slug: "bhagat-pura",
    name: "Bhagat Pura",
    urduName: "بھگت پورہ",
    type: "Locality",
    district: "Gujranwala",
    distanceKm: 2,
    commuteTimeMinutes: 4,
    transportAvailable: true,
    transportRoute: "Inner Ghakhar Shuttle & Walking Route",
    pickupPoints: ["Bhagat Pura Main Gate", "Water Tank More", "East Circular Road"],
    description: "Bhagat Pura is an integral residential locality bordering Ghakhar Mandi. Students walk or take short 4-minute van rides to our G.T. Road campus, enjoying full access to advanced IT education and matric board preparation.",
    highlights: [
      "4-minute transit time to school",
      "High neighborhood enrollment with strong community bonding",
      "Active parent-teacher conferences and regular progress reports",
      "Participation in intra-school sports and speech competitions"
    ],
    nearbyLandmarks: ["Bhagat Pura Water Tank", "East Circular Road"],
    faqs: [
      {
        question: "Can Bhagat Pura students walk to MSNS campus?",
        answer: "Yes, Bhagat Pura is within comfortable walking and cycling distance, though school van service is also available."
      }
    ]
  },
  {
    slug: "eimanabad-road",
    name: "Eimanabad Road",
    urduName: "ایمن آباد روڈ",
    type: "Locality",
    district: "Gujranwala",
    distanceKm: 3,
    commuteTimeMinutes: 5,
    transportAvailable: true,
    transportRoute: "Eimanabad Road Transit Route to G.T. Road Campus",
    pickupPoints: ["Eimanabad Road Phatak", "Babu Town More", "Green Town Chowk", "G.T. Road Confluence"],
    description: "The expanding residential communities along Eimanabad Road find MSNS to be the most trusted and convenient education institution. Our campus offers world-class facilities right at the gateway of G.T. Road.",
    highlights: [
      "Rapid access via Eimanabad link road",
      "Extensive extracurricular clubs including Science, Robotics, and Arts",
      "Uninterrupted education supported by our full solar-inverter network",
      "Regular testing system with computerized progress cards"
    ],
    nearbyLandmarks: ["Eimanabad Road Crossing", "Green Town", "Babu Town"],
    faqs: [
      {
        question: "Are school vans running along Eimanabad Road?",
        answer: "Yes, multiple vans ply the Eimanabad Road residential corridor with multiple pickup stations."
      }
    ]
  },
  {
    slug: "nat-kalan",
    name: "Nat Kalan",
    urduName: "نت کلاں",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 7.5,
    commuteTimeMinutes: 12,
    transportAvailable: true,
    transportRoute: "Nat Kalan & Nat Road Dedicated Bus Line",
    pickupPoints: ["Nat Kalan Main Lari Adda", "Govt Hospital Chowk", "Nat Rural Health Center", "Canal Rest House"],
    description: "Nat Kalan is a prominent historic town east of Ghakhar. MSNS delivers dependable bus and van transport to Nat Kalan, ensuring students have complete access to BISE board toppers' faculty, practical labs, and Oxford English curricula.",
    highlights: [
      "Dedicated school bus connection for Nat Kalan",
      "Substantial enrollment of boys and girls across all grades",
      "Outstanding track record in BISE Gujranwala matric exams",
      "Disciplined school environment focused on student character"
    ],
    nearbyLandmarks: ["Nat Kalan Rural Health Center", "Historic Nat Rest House", "Nat Main Adda"],
    faqs: [
      {
        question: "Is reliable transport guaranteed for Nat Kalan students?",
        answer: "Yes, our established Nat Kalan bus route operates with high punctuality throughout the academic year."
      }
    ]
  },
  {
    slug: "dhillanwali",
    name: "Dhillanwali",
    urduName: "ڈھلاں والی",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 6,
    commuteTimeMinutes: 10,
    transportAvailable: true,
    transportRoute: "Dhillanwali Rural Connect Route",
    pickupPoints: ["Dhillanwali Main Stop", "Canal Bridge", "Central Village More"],
    description: "Students from Dhillanwali receive first-rate education at MSNS. Our curriculum emphasizes conceptual mastery in Physics, Chemistry, Biology, and Computer Science, turning rural learners into academic leaders.",
    highlights: [
      "10-minute commute to campus",
      "Safe and monitored student transport",
      "Modern computer lab training from Class 1 onward",
      "Scholarships for orphans and deserving students"
    ],
    nearbyLandmarks: ["Dhillanwali Canal Bridge", "Dhillanwali Main Chowk"],
    faqs: [
      {
        question: "Does MSNS provide fee concessions for deserving students from Dhillanwali?",
        answer: "Yes, MSNS has an active welfare and merit scholarship scheme for deserving families."
      }
    ]
  },
  {
    slug: "piro-chak",
    name: "Piro Chak",
    urduName: "پیرو چک",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 5,
    commuteTimeMinutes: 8,
    transportAvailable: true,
    transportRoute: "Piro Chak Feeder Van Service",
    pickupPoints: ["Piro Chak Main Adda", "Piro Chak School Road", "Canal Crossing"],
    description: "Located close to Ghakhar Mandi, Piro Chak parents rely on MSNS for quality schooling. Our students achieve top matric grades, develop fluent bilingual speaking skills, and practice leadership through our scout wings.",
    highlights: [
      "Prompt 8-minute commute via van",
      "Comprehensive science experiment demonstrations",
      "Oxford reading program with interactive library access",
      "Sports training in cricket, badminton, and football"
    ],
    nearbyLandmarks: ["Piro Chak Adda", "Canal Distributary"],
    faqs: [
      {
        question: "What sports facilities are offered to Piro Chak students?",
        answer: "MSNS hosts annual sports galas with cricket, badminton, table tennis, track athletics, and house tournaments."
      }
    ]
  },
  {
    slug: "kot-inayat-khan",
    name: "Kot Inayat Khan",
    urduName: "کوٹ عنایت خان",
    type: "Village",
    district: "Wazirabad",
    distanceKm: 9,
    commuteTimeMinutes: 14,
    transportAvailable: true,
    transportRoute: "Kot Inayat Khan to Ghakhar Rural Transport Route",
    pickupPoints: ["Kot Inayat Khan Main Chowk", "Dera Malik More", "Canal Bank Stop"],
    description: "Situated in Tehsil Wazirabad, Kot Inayat Khan students travel comfortably to MSNS via our regional transport fleet. We provide students with top-tier education matching major metropolitan standards.",
    highlights: [
      "Convenient morning and afternoon transport",
      "Strong BISE matric science division track record",
      "English language fluency enhancement programs",
      "Safe, caring, and disciplined campus life"
    ],
    nearbyLandmarks: ["Kot Inayat Khan Chowk", "Canal Bank"],
    faqs: [
      {
        question: "Can Kot Inayat Khan students join science practicals in Class 9 & 10?",
        answer: "Yes, our physics, chemistry, biology, and computer labs provide weekly practical sessions for all matric students."
      }
    ]
  },
  {
    slug: "talwandi-rahwali",
    name: "Talwandi Rahwali",
    urduName: "تلونڈی راہوالی",
    type: "Town",
    district: "Gujranwala",
    distanceKm: 7,
    commuteTimeMinutes: 11,
    transportAvailable: true,
    transportRoute: "Talwandi Rahwali to G.T. Road Ghakhar Van Service",
    pickupPoints: ["Talwandi Main Adda", "Phatak Chowk", "Talwandi High School Road", "Grain Market"],
    description: "Talwandi Rahwali is a vibrant commercial and agricultural community. MSNS provides Talwandi Rahwali families with high-caliber schooling, integrating ethical Islamic upbringing with modern STEM subjects.",
    highlights: [
      "11-minute travel time via direct paved route",
      "Oxford curriculum integration up to middle school",
      "Personalized student attention with structured parent feedback",
      "Boy Scouts and Girl Guides programs"
    ],
    nearbyLandmarks: ["Talwandi Railway Phatak", "Talwandi Main Adda"],
    faqs: [
      {
        question: "What are the school timings for Talwandi Rahwali students?",
        answer: "Regular campus hours are 7:30 AM to 1:30 PM with transport arriving 15 minutes before school assembly."
      }
    ]
  },
  {
    slug: "gondlanwala",
    name: "Gondlanwala",
    urduName: "گوندلانوالہ",
    type: "Town",
    district: "Gujranwala",
    distanceKm: 14,
    commuteTimeMinutes: 20,
    transportAvailable: true,
    transportRoute: "Gondlanwala to Ghakhar Van Route via Bypass",
    pickupPoints: ["Gondlanwala Main Adda", "Canal Bridge", "Hospital Chowk"],
    description: "Families from Gondlanwala prioritize MSNS for its reputation of academic discipline and proven BISE matriculation distinctions. Our dedicated transport enables effortless commuting.",
    highlights: [
      "Safe bypass commute to Ghakhar Mandi",
      "Proven 1000+ board marks training systems",
      "Practical computer coding classes",
      "Clean, secure, CCTV-monitored premises"
    ],
    nearbyLandmarks: ["Gondlanwala Adda", "Canal Bridge"],
    faqs: [
      {
        question: "Is transport available from Gondlanwala?",
        answer: "Yes, MSNS operates a scheduled van route for students from Gondlanwala and adjacent localities."
      }
    ]
  },
  {
    slug: "ladhewala-waraich",
    name: "Ladhewala Waraich",
    urduName: "لدھیوالہ وڑائچ",
    type: "Town",
    district: "Gujranwala",
    distanceKm: 12,
    commuteTimeMinutes: 18,
    transportAvailable: true,
    transportRoute: "Ladhewala Waraich Express Van Service",
    pickupPoints: ["Ladhewala Main Adda", "Bypass More", "Waraich Chowk"],
    description: "Ladhewala Waraich students experience transformative education at MSNS, benefiting from structured curricula, digital learning resources, and dedicated mentorship from senior faculty.",
    highlights: [
      "Direct transit connection via link arterial roads",
      "Oxford textbook frameworks and active lab experiments",
      "Regular monthly assessment and exam preparation",
      "Experienced teachers with over a decade of board training"
    ],
    nearbyLandmarks: ["Ladhewala Main Chowk", "Ladhewala Bypass"],
    faqs: [
      {
        question: "What subjects are offered in Matric for Ladhewala students?",
        answer: "Both Science (Biology, Physics, Chemistry, Math) and Computer Science groups under BISE Gujranwala."
      }
    ]
  },
  {
    slug: "qila-didar-singh",
    name: "Qila Didar Singh",
    urduName: "قلعہ دیدار سنگھ",
    type: "Town",
    district: "Gujranwala",
    distanceKm: 22,
    commuteTimeMinutes: 28,
    transportAvailable: true,
    transportRoute: "Qila Didar Singh Regional Transport Connector",
    pickupPoints: ["Main Lari Adda Qila Didar Singh", "College Road", "Kutchery Chowk"],
    description: "Students from Qila Didar Singh travel to MSNS for exceptional matriculation coaching, dedicated lab facilities, and Oxford English language grounding.",
    highlights: [
      "Reliable regional school transit",
      "Exemplary board examination success records",
      "Robust leadership, scouting, and physical education programs",
      "Safe, welcoming academic atmosphere"
    ],
    nearbyLandmarks: ["Qila Didar Singh Lari Adda", "Govt Degree College"],
    faqs: [
      {
        question: "Can Qila Didar Singh students participate in after-school sports?",
        answer: "Yes, transportation schedules accommodate co-curricular practices and sports gala events."
      }
    ]
  },
  {
    slug: "alipur-chatha",
    name: "Alipur Chatha",
    urduName: "علی پور چٹھہ",
    type: "City",
    district: "Wazirabad",
    distanceKm: 25,
    commuteTimeMinutes: 32,
    transportAvailable: true,
    transportRoute: "Alipur Chatha to Ghakhar Regional Van Connection",
    pickupPoints: ["Alipur Main Chowk", "Tehsil Complex", "Railway Road Alipur"],
    description: "Alipur Chatha students aiming for top tier academic scores choose MSNS. Our institution offers rigorous science practicals and individualized board coaching.",
    highlights: [
      "Comprehensive BISE Gujranwala Matric program",
      "State-of-the-art computer and science labs",
      "15 TB cloud infrastructure for student portfolios",
      "Scholarships for high academic achievers"
    ],
    nearbyLandmarks: ["Alipur Chatha Tehsil Complex", "Railway Road"],
    faqs: [
      {
        question: "How are practical exams handled for Alipur Chatha students?",
        answer: "Our fully equipped science laboratories provide complete hands-on practice matching BISE examination standards."
      }
    ]
  },
  {
    slug: "dhaunkal",
    name: "Dhaunkal",
    urduName: "دھونکل",
    type: "Town",
    district: "Wazirabad",
    distanceKm: 4.5,
    commuteTimeMinutes: 7,
    transportAvailable: true,
    transportRoute: "Dhaunkal to Ghakhar Direct G.T. Road Shuttle",
    pickupPoints: ["Dhaunkal Railway Station Stop", "Shrine More", "G.T. Road Dhaunkal Chowk", "Civil Dispensary"],
    description: "Located between Ghakhar and Wazirabad, Dhaunkal is only 7 minutes away from MSNS. Dhaunkal families trust MSNS for its legacy of disciplined education and strong moral foundation.",
    highlights: [
      "Quick 7-minute transit via G.T. Road",
      "Doorstep van pickup across Dhaunkal town",
      "Proven excellence in Matric science and computer streams",
      "Dedicated Girl Guide and Boy Scout leadership training"
    ],
    nearbyLandmarks: ["Historic Dhaunkal Shrine", "Dhaunkal Railway Station", "G.T. Road Junction"],
    faqs: [
      {
        question: "How frequent is the transport between Dhaunkal and MSNS?",
        answer: "Vans run daily in the morning and afternoon with timely pickups directly along the Dhaunkal G.T. Road artery."
      }
    ]
  },
  {
    slug: "sohdra",
    name: "Sohdra",
    urduName: "سوہدرہ",
    type: "Town",
    district: "Wazirabad",
    distanceKm: 12,
    commuteTimeMinutes: 16,
    transportAvailable: true,
    transportRoute: "Sohdra to Ghakhar Express Route via Wazirabad Bypass",
    pickupPoints: ["Sohdra Main Adda", "Chenab River Road", "High School Chowk", "Historic Bazaar"],
    description: "Historic Sohdra town on the banks of River Chenab connects directly to MSNS. Parents value our school's focus on English language fluency, mathematics, and high matric marks.",
    highlights: [
      "Safe, comfortable transport from Sohdra",
      "Oxford University Press syllabus standards",
      "High matric board scores crossing 1050+ marks",
      "Solar-powered campus ensuring uninterrupted learning"
    ],
    nearbyLandmarks: ["Historic Sohdra Bazaar", "Chenab River Viewpoint", "Sohdra Adda"],
    faqs: [
      {
        question: "Is school transport safe for female students from Sohdra?",
        answer: "Yes, our transport fleet features dedicated female seating, verified adult conductors, and strict security monitoring."
      }
    ]
  },
  {
    slug: "nizamabad",
    name: "Nizamabad",
    urduName: "نظام آباد",
    type: "Town",
    district: "Wazirabad",
    distanceKm: 7,
    commuteTimeMinutes: 10,
    transportAvailable: true,
    transportRoute: "Nizamabad to Ghakhar G.T. Road Route",
    pickupPoints: ["Nizamabad Main Chowk", "Sialkot Bypass", "Industrial Area More", "Kutchery Road Stop"],
    description: "Nizamabad is located right at the edge of Wazirabad, just 10 minutes from MSNS. Its students benefit from top science laboratories, modern IT education, and board exam preparation.",
    highlights: [
      "10-minute commute via G.T. Road",
      "Cutting-edge AI computer lab with high-speed fiber internet",
      "Specialized faculty for BISE Gujranwala matric subjects",
      "Merit-based admissions and fee concessions"
    ],
    nearbyLandmarks: ["Nizamabad Industrial Zone", "Sialkot Bypass Cut", "Small Industries Estate"],
    faqs: [
      {
        question: "Does MSNS offer computer science for Nizamabad students?",
        answer: "Yes, our computer curriculum includes coding, web literacy, algorithms, and 15 TB student cloud storage."
      }
    ]
  },
  {
    slug: "veropal",
    name: "Veropal",
    urduName: "ویرو پال",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 5,
    commuteTimeMinutes: 8,
    transportAvailable: true,
    transportRoute: "Veropal Feeder Shuttle to Ghakhar",
    pickupPoints: ["Veropal Main Chowk", "Canal Bridge Veropal", "Dera Chaudhrian"],
    description: "Veropal students experience high-standard education at MSNS. With small class sizes and personalized attention, every child is supported to excel.",
    highlights: [
      "8-minute commute time",
      "Individualized academic focus (1:16 ratio)",
      "Daily homework diaries and digital tracking via MSNS LMS",
      "Active co-curricular participation"
    ],
    nearbyLandmarks: ["Veropal Canal Bridge", "Veropal Main Adda"],
    faqs: [
      {
        question: "Can parents monitor student attendance digitally?",
        answer: "Yes, MSNS LMS provides real-time digital attendance and grade tracking accessible to parents."
      }
    ]
  },
  {
    slug: "gillwala",
    name: "Gillwala",
    urduName: "گل والا",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 6,
    commuteTimeMinutes: 10,
    transportAvailable: true,
    transportRoute: "Gillwala Rural Van Connector",
    pickupPoints: ["Gillwala Adda", "Gillwala Primary School Road", "Canal Confluence"],
    description: "Gillwala families choose MSNS for its proven reputation of academic rigor and moral discipline. Our school vans make the daily commute effortless.",
    highlights: [
      "10-minute safe journey to campus",
      "Thorough syllabus coverage with 3-phase revision tests",
      "Oxford English readers and conversation practice",
      "Hygienic campus with RO filtered drinking water"
    ],
    nearbyLandmarks: ["Gillwala Adda", "Canal Road Gillwala"],
    faqs: [
      {
        question: "Is drinking water safe and filtered on campus?",
        answer: "Yes, MSNS maintains a commercial-grade Reverse Osmosis (RO) plant providing purified drinking water."
      }
    ]
  },
  {
    slug: "kalaske",
    name: "Kalaske",
    urduName: "کلاسکے",
    type: "Town",
    district: "Wazirabad",
    distanceKm: 16,
    commuteTimeMinutes: 22,
    transportAvailable: true,
    transportRoute: "Kalaske to Ghakhar Regional Transport Route",
    pickupPoints: ["Kalaske Main Chowk", "Kalaske Hospital Stop", "Canal Rest House"],
    description: "Kalaske students access premier matriculation and Oxford education at MSNS through our reliable regional transport service.",
    highlights: [
      "Direct transit to Ghakhar Mandi",
      "Rigorous BISE Gujranwala preparation",
      "Clean, modern, solar-powered facilities",
      "Full Scout and Guide uniforms and leadership badges"
    ],
    nearbyLandmarks: ["Kalaske Main Adda", "Civil Hospital Kalaske"],
    faqs: [
      {
        question: "Are there uniform rules for Kalaske students?",
        answer: "Yes, MSNS enforces standard bottle-green tunics for girls, white shirts and black trousers for boys, and distinguished scout leader attire."
      }
    ]
  },
  {
    slug: "kot-natha",
    name: "Kot Natha",
    urduName: "کوٹ ناتھا",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 7,
    commuteTimeMinutes: 11,
    transportAvailable: true,
    transportRoute: "Kot Natha Link Service to Ghakhar",
    pickupPoints: ["Kot Natha Main Adda", "Canal Bridge", "Village Chowk"],
    description: "Kot Natha students benefit from MSNS's comprehensive academic programs, turning fundamental concepts into board examination success.",
    highlights: [
      "Convenient 11-minute commute",
      "High marks in BISE Matric examinations",
      "Moral training and character building",
      "Regular parent-teacher coordination"
    ],
    nearbyLandmarks: ["Kot Natha Adda", "Canal Bank"],
    faqs: [
      {
        question: "How often are parent-teacher meetings held?",
        answer: "Formal PTMs are held at the end of each term, with informal faculty access available anytime by appointment."
      }
    ]
  },
  {
    slug: "kot-hara",
    name: "Kot Hara",
    urduName: "کوٹ ہرا",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 8,
    commuteTimeMinutes: 12,
    transportAvailable: true,
    transportRoute: "Kot Hara to Ghakhar Van Shuttle",
    pickupPoints: ["Kot Hara Main Stop", "Dera Mehr", "School Road More"],
    description: "Kot Hara families have placed their trust in MSNS for generations. We provide world-class education right within convenient reach.",
    highlights: [
      "12-minute transit time",
      "Interactive digital classrooms",
      "Dedicated science lab demonstrations",
      "Affordable fee structure with flexible installments"
    ],
    nearbyLandmarks: ["Kot Hara Main Stop", "Kot Hara Sports Field"],
    faqs: [
      {
        question: "Can school fees be paid in installments?",
        answer: "Yes, our finance office provides convenient monthly challans payable at local banks or digital channels."
      }
    ]
  },
  {
    slug: "badoki-gosaian",
    name: "Badoki Gosaian",
    urduName: "بڈھوکے گوسائیاں",
    type: "Town",
    district: "Gujranwala",
    distanceKm: 11,
    commuteTimeMinutes: 16,
    transportAvailable: true,
    transportRoute: "Badoki Gosaian to Ghakhar Transport Service",
    pickupPoints: ["Badoki Main Lari Adda", "Hospital More", "Bazaar Chowk"],
    description: "Badoki Gosaian students excel at MSNS, gaining admission into top medical and engineering colleges following their matriculation success.",
    highlights: [
      "Daily scheduled school van connectivity",
      "Proven track record in 9th & 10th science exams",
      "Focus on English composition and spoken fluency",
      "Co-curricular and sports events participation"
    ],
    nearbyLandmarks: ["Badoki Gosaian Main Adda", "Historic Town Center"],
    faqs: [
      {
        question: "What are the career counseling options for Badoki students?",
        answer: "MSNS conducts career counseling seminars guiding matriculants into FSc Pre-Medical, Pre-Engineering, and ICS streams."
      }
    ]
  },
  {
    slug: "hardo-udoke",
    name: "Hardo Udoke",
    urduName: "ہردو ادوکے",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 9,
    commuteTimeMinutes: 13,
    transportAvailable: true,
    transportRoute: "Hardo Udoke to Ghakhar Rural Route",
    pickupPoints: ["Hardo Udoke Adda", "Canal Crossing", "Main Chowk"],
    description: "Hardo Udoke families count on MSNS for nurturing intellect and personal discipline, preparing students for competitive high-school exams.",
    highlights: [
      "13-minute daily commute",
      "Comprehensive syllabus coverage",
      "Safe school van transportation",
      "Strong emphasis on Islamic ethics and respect"
    ],
    nearbyLandmarks: ["Hardo Udoke Adda", "Canal Crossing"],
    faqs: [
      {
        question: "Is Islamic education integrated into the curriculum?",
        answer: "Yes, Nazra Quran, Tarjuma-tul-Quran, and Islamiyat are taught with deep moral grounding across all classes."
      }
    ]
  },
  {
    slug: "chhina",
    name: "Chhina",
    urduName: "چھینہ",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 6.5,
    commuteTimeMinutes: 10,
    transportAvailable: true,
    transportRoute: "Chhina Link Shuttle to Ghakhar",
    pickupPoints: ["Chhina Main Chowk", "Chhina High School Road", "Canal Bank"],
    description: "Chhina students develop academic confidence and competitive skills at MSNS with guided laboratory practice and Oxford textbooks.",
    highlights: [
      "10-minute commute to Ghakhar G.T. Road",
      "Practical science experiments for matric groups",
      "Active debate and public speaking clubs",
      "Regular revision tests with marked feedback"
    ],
    nearbyLandmarks: ["Chhina Main Chowk", "Canal Bank Road"],
    faqs: [
      {
        question: "Are public speaking and debate competitions held at MSNS?",
        answer: "Yes, our Debating Society hosts regular Urdu and English speech contests and inter-house events."
      }
    ]
  },
  {
    slug: "jora-sian",
    name: "Jora Sian",
    urduName: "جوڑہ سیان",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 10,
    commuteTimeMinutes: 15,
    transportAvailable: true,
    transportRoute: "Jora Sian to Ghakhar School Van Route",
    pickupPoints: ["Jora Sian Adda", "Village Dispensary Stop", "Canal Bridge"],
    description: "Jora Sian students commute safely to MSNS, participating in comprehensive academic, sports, and leadership activities.",
    highlights: [
      "15-minute transport route",
      "High matriculation board success rate",
      "Modern AI computing and internet literacy",
      "Safe and supportive learning environment"
    ],
    nearbyLandmarks: ["Jora Sian Adda", "Village Dispensary"],
    faqs: [
      {
        question: "How are science practicals conducted for matric students?",
        answer: "Students perform hands-on experiments weekly in our dedicated physics, chemistry, and biology labs."
      }
    ]
  },
  {
    slug: "fatehpur-gujran",
    name: "Fatehpur Gujran",
    urduName: "فتح پور گجراں",
    type: "Village",
    district: "Gujranwala",
    distanceKm: 8.5,
    commuteTimeMinutes: 13,
    transportAvailable: true,
    transportRoute: "Fatehpur Gujran to Ghakhar Rural Transport",
    pickupPoints: ["Fatehpur Main Adda", "Dera Gujran", "Canal More"],
    description: "Fatehpur Gujran families value MSNS for its steady academic rigor, compassionate mentors, and high moral standards.",
    highlights: [
      "13-minute journey via school van",
      "Individual student support and small batches",
      "Modern computer lab training",
      "Clean campus environment with full solar backup"
    ],
    nearbyLandmarks: ["Fatehpur Adda", "Dera Gujran"],
    faqs: [
      {
        question: "Is there uninterrupted electricity during school hours?",
        answer: "Yes, our campus is 100% solar powered, ensuring lights, fans, computers, and labs run continuously."
      }
    ]
  },
  {
    slug: "mansoorwali",
    name: "Mansoorwali",
    urduName: "منصور والی",
    type: "Town",
    district: "Wazirabad",
    distanceKm: 10,
    commuteTimeMinutes: 15,
    transportAvailable: true,
    transportRoute: "Mansoorwali to Ghakhar Transport Service via G.T. Road",
    pickupPoints: ["Mansoorwali Main Chowk", "Railway Crossing", "Bypass Confluence"],
    description: "Mansoorwali students enjoy convenient G.T. Road transport to MSNS, achieving high grades in BISE Gujranwala matric exams.",
    highlights: [
      "15-minute commute via G.T. Road corridor",
      "Oxford English medium standard curriculum",
      "Experienced teachers with board exam marking insights",
      "Active sports and co-curricular calendar"
    ],
    nearbyLandmarks: ["Mansoorwali Railway Crossing", "Main Chowk"],
    faqs: [
      {
        question: "Can Mansoorwali students prepare for entry test foundations at MSNS?",
        answer: "Yes, our conceptual matric curriculum builds strong foundations for future MDCAT and ECAT tests."
      }
    ]
  },
  {
    slug: "rasool-nagar",
    name: "Rasool Nagar",
    urduName: "رسول نگر",
    type: "Town",
    district: "Wazirabad",
    distanceKm: 28,
    commuteTimeMinutes: 35,
    transportAvailable: true,
    transportRoute: "Rasool Nagar Regional Transport Line",
    pickupPoints: ["Rasool Nagar Main Adda", "Chenab Barrage Road", "Kutchery Chowk"],
    description: "Students from Rasool Nagar travel to MSNS for exceptional matriculation coaching, dedicated lab facilities, and Oxford English language grounding.",
    highlights: [
      "Reliable regional school transit connection",
      "Exemplary board examination success records",
      "Robust leadership, scouting, and physical education programs",
      "Safe, welcoming academic atmosphere"
    ],
    nearbyLandmarks: ["Historic Rasool Nagar Town", "Chenab River Bank"],
    faqs: [
      {
        question: "Does MSNS provide study materials for board exams?",
        answer: "Yes, students receive complete chapter-wise notes, SLO model papers, and solved past papers."
      }
    ]
  },
  {
    slug: "kamoke",
    name: "Kamoke",
    urduName: "کامونکی",
    type: "City",
    district: "Gujranwala",
    distanceKm: 32,
    commuteTimeMinutes: 38,
    transportAvailable: true,
    transportRoute: "G.T. Road Express Commuter Line to MSNS Campus",
    pickupPoints: ["Kamoke Main G.T. Road Adda", "Grain Market Chowk", "Railway Road Crossing"],
    description: "Kamoke families who seek an elite, values-driven institution with proven board results and AI computer labs choose MSNS on G.T. Road.",
    highlights: [
      "Direct G.T. Road corridor access",
      "100% board matric pass rates with distinction holders",
      "15 TB cloud storage for academic projects and IT literacy",
      "Boy Scout and Girl Guide Leadership distinction corps"
    ],
    nearbyLandmarks: ["Kamoke Grain Market", "Kamoke Railway Station", "G.T. Road Flyover"],
    faqs: [
      {
        question: "Why do Kamoke parents choose MSNS over local institutions?",
        answer: "MSNS offers an unmatched combination of Oxford curricula, advanced AI computer labs, high moral discipline, and proven BISE matriculation results."
      }
    ]
  }
];

export function getLocationBySlug(slug: string): LocationInfo | undefined {
  return LOCATIONS_DATA.find((l) => l.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS_DATA.map((l) => l.slug);
}
