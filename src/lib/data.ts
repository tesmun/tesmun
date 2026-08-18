export type Person = {
  name: string;
  role: string;
  slug?: string;
  bio?: string;
  image?: string;
  testimonial?: string;
  sourceUrl?: string;
  placeholder?: boolean;
};

export const secretariat = {
  sg: {
    name: "Dibas Khadka",
    role: "Secretary-General",
    slug: "dibas-khadka",
    image: "/images/secgen.png",
    placeholder: false,
  } as Person,
  dsg: {
    name: "Abhas Kunwar",
    role: "Deputy Secretary-General",
    slug: "abhas-kunwar",
    placeholder: false,
  } as Person,
};

export type CommitteeCategory = "national" | "international" | "facilitating";

export type CommitteeBoard = {
  chair?: Person;
  viceChair?: Person;
  moderator?: Person;
  headOf?: Person;
  coHeadOf?: Person;
  deputyHeadOf?: Person[];
};

export type Committee = {
  slug: string;
  abbr: string;
  name: string;
  category: CommitteeCategory;
  description: string;
  board: CommitteeBoard;
  guideUrl?: string;
  logo?: string;
};

export const committees: Committee[] = [
  {
    slug: "lp1",
    abbr: "LP I",
    name: "Legislative Parliament I",
    category: "national",
    description:
      "The first of TESMUN's three national Legislative Parliaments, deliberating on domestic policy through the lens of Nepal's parliamentary process.",
    board: {
      chair: { name: "Aakarshi Paudel", role: "Chair" },
      viceChair: { name: "Dilasha Oli", role: "Vice Chair" },
      moderator: { name: "Sijan Neupane", role: "Moderator" },
    },
    logo: "/images/committee-lp.png",
  },
  {
    slug: "lp2",
    abbr: "LP II",
    name: "Legislative Parliament II",
    category: "national",
    description:
      "The second Legislative Parliament, convened to debate national legislation and constitutional matters within a simulated parliamentary chamber.",
    board: {
      chair: { name: "Saksham Thapaliya", role: "Chair" },
      viceChair: { name: "Diya Shrestha", role: "Vice Chair" },
      moderator: { name: "Dijesh Niroula", role: "Moderator" },
    },
    guideUrl:
      "https://docs.google.com/document/d/1Fmh1U7z4DKfvuxWAhvQThbsbfq6n-NaB/edit?usp=sharing&ouid=104158985582123597718&rtpof=true&sd=true",
    logo: "/images/committee-lp.png",
  },
  {
    slug: "lp3",
    abbr: "LP III",
    name: "Legislative Parliament III",
    category: "national",
    description:
      "The third Legislative Parliament, offering delegates a parallel forum for legislative debate, coalition-building and procedural diplomacy.",
    board: {
      chair: { name: "Binayak Babu Rana", role: "Chair" },
      viceChair: { name: "Alisa Rijal", role: "Vice Chair" },
      moderator: { name: "Aayushma Shrestha", role: "Moderator" },
    },
    guideUrl: "https://docs.google.com/document/d/14ks8zy2wg8Aib0SunYwfMAxIbLR2h_Q2/edit",
    logo: "/images/committee-lp.png",
  },
  {
    slug: "hrc",
    abbr: "HRC",
    name: "Human Rights Council",
    category: "international",
    description:
      "The Human Rights Council addresses pressing violations and protections of fundamental human rights across the international community.",
    board: {
      chair: { name: "Kinjal Timalsina", role: "Chair" },
      viceChair: { name: "Saanvi K.C.", role: "Vice Chair" },
      moderator: { name: "Kritish Ghimire", role: "Moderator" },
    },
    guideUrl: "https://docs.google.com/document/d/1PX71jgNz19kJ0Gkz4WKtTsrWafjrZucocktpdjEeYUE/edit?tab=t.0",
    logo: "/images/committee-hrc.webp",
  },
  {
    slug: "disec",
    abbr: "DISEC",
    name: "Disarmament and International Security Committee",
    category: "international",
    description:
      "DISEC deliberates on matters of global disarmament, arms regulation and international security cooperation.",
    board: {
      chair: { name: "Dhiki Khando Lama", role: "Chair" },
      viceChair: { name: "Rijan Shrestha", role: "Vice Chair" },
      moderator: { name: "Prasanna Budhathoki", role: "Moderator" },
    },
    logo: "/images/committee-disec.webp",
  },
  {
    slug: "ecosoc",
    abbr: "ECOSOC",
    name: "Economic and Social Council",
    category: "international",
    description:
      "ECOSOC coordinates economic, social and related work, driving dialogue on sustainable development and global cooperation.",
    board: {
      chair: { name: "Prateek Bhattarai", role: "Chair" },
      viceChair: { name: "Sima Thapa Magar", role: "Vice Chair" },
      moderator: { name: "Kunjal Kakki", role: "Moderator" },
    },
    logo: "/images/committee-ecosoc.webp",
  },
  {
    slug: "unep",
    abbr: "UNEP",
    name: "United Nations Environment Programme",
    category: "international",
    description:
      "UNEP leads the global environmental agenda, guiding delegates through climate, biodiversity and sustainability negotiations.",
    board: {
      chair: { name: "Rujal Ojha", role: "Chair" },
      viceChair: { name: "Sankalpa Neupane", role: "Vice Chair" },
      moderator: { name: "Unnat Aryal", role: "Moderator" },
    },
    guideUrl:
      "https://docs.google.com/document/d/1dVN7n4nQLQ7KNc_ebO2xNRRPCkcKh40yNFKCsN4wRDM/edit?usp=sharing",
    logo: "/images/committee-unep.webp",
  },
  {
    slug: "ipc",
    abbr: "IPC",
    name: "International Press Corps",
    category: "international",
    description:
      "The International Press Corps reports on committee proceedings, capturing the conference through news, interviews and editorial coverage.",
    board: {
      headOf: { name: "To be announced", role: "Head of IPC", placeholder: true },
    },
    logo: "/images/committee-ipc.png",
  },
  {
    slug: "it",
    abbr: "IT",
    name: "Information Technology Committee",
    category: "facilitating",
    description:
      "The IT Committee builds and maintains the technical backbone of TESMUN XIV — from the conference website to on-site systems.",
    board: {
      headOf: { name: "Yubin KC", role: "Head of IT" },
      deputyHeadOf: [
        { name: "Suyog Acharya", role: "Deputy Head of IT" },
        { name: "Saksham Adhikari", role: "Deputy Head of IT" },
      ],
    },
    logo: "/images/it.png",
  },
  {
    slug: "press",
    abbr: "PRESS",
    name: "Press Committee",
    category: "facilitating",
    description:
      "The Press Committee documents TESMUN XIV in real time, producing news, vox pop, interviews and visual coverage throughout the conference.",
    board: {
      headOf: { name: "Dechen Hira Tamang", role: "Chief Editor" },
      deputyHeadOf: [
        { name: "Siddhartha Basnet", role: "Deputy Chief Editor" },
        { name: "Simran Devkota", role: "Deputy Chief Editor" },
        { name: "John Doe", role: "Deputy Chief Editor", placeholder: true },
      ],
    },
    logo: "/images/press.png",
  },
  {
    slug: "logistics",
    abbr: "LOGISTICS",
    name: "Logistics Committee",
    category: "facilitating",
    description:
      "The Logistics Committee coordinates the operational execution of TESMUN XIV, ensuring every session runs precisely as planned.",
    board: {
      headOf: { name: "Kushal Poudel", role: "Head of Logistics" },
      coHeadOf: { name: "Prasina Moktan", role: "Head of Logistics" },
    },
    logo: "/images/logistic.png",
  },
];

export const committeesByCategory = {
  national: committees.filter((c) => c.category === "national"),
  international: committees.filter((c) => c.category === "international"),
  facilitating: committees.filter((c) => c.category === "facilitating"),
};

export function getCommittee(slug: string) {
  return committees.find((c) => c.slug === slug);
}

export const seniorLeadership: Person[] = [
  {
    name: "Sheetal Rana",
    role: "Chairperson",
    slug: "sheetal-rana",
    image: "/images/chairperson.png",
    testimonial:
      "It is a joy to see you all take part in the Model United Nations here at Excelsior. MUN is not just about debating global issues; it is about discovering more about yourself and how you can shape the world around you. Leadership is not about standing above others, but about building with others.",
    sourceUrl: "https://sites.google.com/view/tes-mun2025/testimonials/chairperson",
  },
  {
    name: "Prashant Rajak",
    role: "Principal",
    slug: "prashant-rajak",
    image: "/images/principal.jpg",
    testimonial:
      "Engagement creates interest. Exploration leads to a new world of knowledge. Expression helps to build confidence. TESMUN sharpens public speaking, researching, reading and writing skills while developing diplomatic negotiation, conflict resolution and peace-building across the world.",
    sourceUrl: "https://sites.google.com/view/tes-mun2025/testimonials/principal",
  },
];

export const coordinators: Person[] = [
  {
    name: "Govinda Gautam",
    role: "MUN Coordinator",
    slug: "govinda-gautam",
    image: "/images/muncoordinator.jpg",
    testimonial:
      "We are proud to announce the 14th session of TESMUN at our school. TESMUN provides students with a unique opportunity to learn about Nepalese politics, international diplomacy, cross-cultural understanding, and global governance. It is a platform where young minds communicate, argue and reach a consensus over national and global issues.",
    sourceUrl: "https://sites.google.com/view/tes-mun2025/testimonials/mun-coordinator",
  },
  {
    name: "Pratik Subedi",
    role: "IT Coordinator",
    slug: "pratik-subedi",
    image: "/images/itcoordinator.jpeg",
    testimonial:
      "Serving as the IT Coordinator for TESMUN 2025 has been an enriching journey. Together, we shaped the digital face of the conference through the website, ceremony videos, invitation cards and dais portfolios. What stands out most is the way technology became a bridge for creativity and diplomacy.",
    sourceUrl: "https://sites.google.com/view/tes-mun2025/testimonials/it-coordinator",
  },
  {
    name: "Jitendra Basnet",
    role: "Logistics Coordinator",
    slug: "jitendra-basnet",
    image: "/images/logisticscoordinator.png",
    testimonial:
      "Love across the world and peace against the sword. As the logistics coordinator, I expect our team to be expressive according to MUN protocols and maintain discipline while working with the committees. The key to achieving the best is friendliness and the development of suitable habits.",
    sourceUrl: "https://sites.google.com/view/tes-mun2025/testimonials/logistic-coordinator",
  },
  {
    name: "Dipendra Silwal",
    role: "Press Coordinator",
    slug: "dipendra-silwal",
    image: "/images/presscoordinator.jpg",
    testimonial:
      "Learning is a beautiful and transformative journey, shaped by conscious choices and enriched with knowledge and skills. TESMUN offers a vibrant palette of opportunities where students become diplomats and policymakers, grappling with the world's most pressing issues and transforming from observers into active participants in society.",
    sourceUrl: "https://sites.google.com/view/tes-mun2025/testimonials/press-co-ordinator",
  },
];

export const conferenceDate = new Date("2026-08-29T09:00:00+05:45");

export const allocationsSheet =
  "https://docs.google.com/spreadsheets/d/1IXmUFmMha65Kks6TOtv_PV8vw6qFZa_1fla4kFSwGUA/edit?gid=2111183706#gid=2111183706";

export const teamMembers: Person[] = [
  ...seniorLeadership,
  ...coordinators,
  secretariat.sg,
  secretariat.dsg,
];

export function getTeamMember(slug: string) {
  return teamMembers.find((person) => person.slug === slug);
}

export const contactInfo = {
  school: "The Excelsior School",
  address: "Swoyambhu Cir Rd, Kathmandu 44600",
  phone: "01-5301917",
  email: "tesmun@excelsior.edu.np",
  mapEmbed:
    "https://maps.google.com/maps?q=The%20Excelsior%20School%20Swoyambhu%20Kathmandu&t=&z=16&ie=UTF8&iwloc=&output=embed",
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/@TheExcelsiorSchool" },
    { label: "Facebook", href: "https://www.facebook.com/TheExcelsiorSchool/" },
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/committees", label: "Committees" },
  { href: "/our-team", label: "Our Team" },
  { href: "/press", label: "Press" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export const galleryImages = [
  { src: "/images/cover.png", alt: "The Excelsior School campus illuminated at night for TESMUN", caption: "Campus at night" },
  { src: "/images/about-hero.png", alt: "Cinematic view of the TESMUN about hall", caption: "The hall" },
  { src: "/images/committees-hero.png", alt: "Committee room prepared for debate", caption: "Committee room" },
  { src: "/images/gallery-assembly.jpg", alt: "United Nations flags along the Allée des Nations in Geneva", caption: "Allée des Nations" },
  { src: "/images/gallery-debate.jpg", alt: "A young speaker addressing a formal discussion from a microphone", caption: "The floor" },
  { src: "/images/gallery-kathmandu.jpg", alt: "Silhouette of people at a historic pavilion in Kirtipur, Kathmandu", caption: "Kathmandu dusk" },
  { src: "/images/gallery-flags.jpg", alt: "A speaker at a podium during a formal conference address", caption: "The podium" },
  { src: "/images/gallery-gavel.jpg", alt: "Close-up of a wooden gavel on a formal desk", caption: "In session" },
  { src: "/images/gallery-library.jpg", alt: "Eyeglasses resting on a stack of research notebooks", caption: "Preparation" },
  { src: "/images/gallery-campus.jpg", alt: "Tree-lined courtyard between academic buildings", caption: "The grounds" },
  { src: "/images/gallery-podium.jpg", alt: "Empty conference room with a podium and rows of chairs", caption: "Before the gavel" },
  { src: "/images/gallery-delegates.jpg", alt: "Young people seated around a formal meeting table in discussion", caption: "Delegates" },
  { src: "/images/about-purpose.png", alt: "A delegate's hand resting on a wooden podium", caption: "The floor opens" },
  { src: "/images/about-vision.png", alt: "An empty conference table lined with chairs and flags", caption: "Ready for session" },
  { src: "/images/mottobg.png", alt: "Atmospheric backdrop used for the TESMUN motto", caption: "Engage · Express · Excell" },
  { src: "/images/press-hero.png", alt: "Editorial still from the TESMUN press desk", caption: "Press desk" },
];
