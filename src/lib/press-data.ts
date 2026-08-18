export type PressSectionSlug = "news" | "vox-pop" | "interviews" | "speeches" | "op-ed" | "cartoons";

export type NewsArticle = {
  slug: string;
  title: string;
  standfirst: string;
  body: string[];
  session: "Final Session" | "Second Session" | "First Session";
  author: string;
  date: string;
  image?: string;
  extraImages?: { src: string; alt: string; caption?: string }[];
  caption?: string;
  pullQuote?: string;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "final-session-consensus",
    session: "Final Session",
    title: "When the room found its language",
    standfirst: "A final session defined by sharper amendments, quieter negotiations and the discipline of listening.",
    body: [
      "By the final session, the room had learned its own rhythm. Delegates arrived with fewer speeches prepared and more questions ready, a small but meaningful sign that debate had become dialogue.",
      "The strongest resolutions were not the loudest. They were the ones revised in the margins, tested across blocs and carried forward because the room could recognise itself in them.",
      "Chairs spoke less and listened more. Notes still travelled between desks, but they were shorter now — a sentence, a concession, a request to meet after the unmoderated caucus. The conference had become fluent in its own diplomacy.",
    ],
    author: "International Press Corps",
    date: "August 2026",
    image: "/images/news-handshake.jpg",
    caption: "Agreement, when it arrives, is usually quieter than the debate that produced it.",
    extraImages: [
      { src: "/images/gallery-gavel.jpg", alt: "A wooden gavel resting on a formal desk after session", caption: "The gavel waits." },
    ],
    pullQuote: "Consensus is not the absence of disagreement; it is the shape disagreement takes when people stay in the room.",
  },
  {
    slug: "second-session-pressure",
    session: "Second Session",
    title: "The pressure between the lines",
    standfirst: "As opening positions hardened, the most consequential work moved into the corridors.",
    body: [
      "The second session brought the familiar pressure of time. Notes travelled between desks, chairs balanced competing motions and delegates learned that a persuasive intervention begins long before the microphone is on.",
      "Outside the committee rooms, the conference became a study in small decisions: who to approach, when to yield and how to make a sentence carry the weight of a national position.",
      "By late afternoon the corridors were as busy as the chambers. A working paper changed hands three times before it returned to the dais. That, more than any formal speech, was the day's work.",
    ],
    author: "International Press Corps",
    date: "August 2026",
    image: "/images/news-notes.jpg",
    caption: "The day's most consequential sentences were often written in the margins.",
    extraImages: [
      { src: "/images/gallery-delegates.jpg", alt: "Delegates in conversation around a formal table", caption: "Work continues between motions." },
    ],
    pullQuote: "The conference is built in public, but much of its diplomacy happens in the pause before a hand rises.",
  },
  {
    slug: "first-session-first-words",
    session: "First Session",
    title: "The first words set the weather",
    standfirst: "Opening statements gave each committee its atmosphere — and every delegate a place to begin.",
    body: [
      "The first session is full of beginnings. Placards are straightened, rules are tested and a room of strangers starts to understand how it might work together.",
      "Across the committees, opening statements turned broad global questions into particular points of view. They were not final positions. They were invitations to respond.",
      "Some rooms were formal from the first gavel. Others found their voice more slowly. In every chamber, the first words set a weather that the rest of the conference would have to live inside.",
    ],
    author: "International Press Corps",
    date: "August 2026",
    image: "/images/news-featured.jpg",
    caption: "The first edition is always a record of beginnings.",
    extraImages: [
      { src: "/images/gallery-podium.jpg", alt: "An empty conference room with podium and chairs before the first session", caption: "Before the first statement." },
    ],
    pullQuote: "Every position paper is also a door: it tells the room where to enter the conversation.",
  },
];

export const pressSections = {
  news: { label: "News", title: "The conference, in motion", intro: "Session-by-session dispatches from the rooms where debate becomes direction." },
  "vox-pop": { label: "Vox Pop", title: "Many voices, one moment", intro: "Short answers and honest reactions from the people between sessions." },
  interviews: { label: "Interviews", title: "The people behind the placards", intro: "Long-form conversations about diplomacy, pressure and possibility." },
  speeches: { label: "Speeches", title: "Words with weight", intro: "An archive of opening statements, closing reflections and ideas worth carrying forward." },
  "op-ed": { label: "OP-ED", title: "A point of view", intro: "Reflective writing on youth leadership, diplomacy and the world beyond the hall." },
  cartoons: { label: "Cartoons", title: "Diplomacy, drawn", intro: "Visual commentary that finds the human and surprising details of conference life." },
} satisfies Record<PressSectionSlug, { label: string; title: string; intro: string }>;

export const voxQuestions = [
  {
    question: "What is one thing you learned today?",
    answers: [
      "Diplomacy starts with listening.",
      "A strong point can still make room for another voice.",
      "Procedure gives debate a rhythm.",
      "Every bloc has a story behind it.",
      "Confidence grows when you participate.",
      "The best ideas change as they travel.",
    ],
  },
  {
    question: "Which committee moment surprised you?",
    answers: [
      "A quiet amendment changed the whole direction.",
      "The room found common ground faster than expected.",
      "A question from the back row shifted the debate.",
      "Two opposing speakers agreed on the next step.",
      "The informal caucus became the real turning point.",
      "The chair made disagreement feel productive.",
    ],
  },
  {
    question: "What does good diplomacy sound like?",
    answers: [
      "A clear position, delivered with curiosity.",
      "The sentence that leaves someone space to respond.",
      "Firm on the issue, generous with the person.",
      "A proposal rather than a performance.",
      "The room getting quieter so the idea can land.",
      "A bridge built one question at a time.",
    ],
  },
  {
    question: "What would you tell a first-time delegate?",
    answers: [
      "Raise your placard before you feel ready.",
      "Research is useful; observation is essential.",
      "Find one person outside your bloc to speak with.",
      "A question is also a contribution.",
      "Do not confuse volume with influence.",
      "Stay present between the formal moments.",
    ],
  },
  {
    question: "What keeps the room moving?",
    answers: [
      "A good chair and a willing compromise.",
      "The feeling that every intervention matters.",
      "Notes passed at exactly the right moment.",
      "A shared deadline.",
      "Respect that survives disagreement.",
      "The next question.",
    ],
  },
];

export type Interview = {
  slug: string;
  title: string;
  subject: string;
  portrait?: string;
  youtubeUrl?: string;
};

export const interviews: Interview[] = [
  {
    slug: "finding-confidence",
    title: "A delegate on finding confidence in the room",
    subject: "Delegate, General Assembly",
    portrait: "/images/interview-portrait.jpg",
    youtubeUrl: "",
  },
  {
    slug: "chair-disagreement",
    title: "The chair's view: making space for disagreement",
    subject: "Committee Chair",
    youtubeUrl: "",
  },
  {
    slug: "behind-the-press-badge",
    title: "Behind the press badge: why documentation matters",
    subject: "Press Desk",
    youtubeUrl: "",
  },
];

export type Speech = {
  slug: string;
  title: string;
  speaker: string;
  role: string;
  committee: string;
  photo?: string;
  body: string[];
};

export const speeches: Speech[] = [
  {
    slug: "opening-address",
    title: "Opening address",
    speaker: "To be announced",
    role: "Speaker",
    committee: "Opening Ceremony",
    photo: "/images/speech-portrait.jpg",
    body: [
      "This speech will be published here once the conference record is complete. The Press Desk will add the speaker, role and full text as delivered.",
    ],
  },
  {
    slug: "practical-solidarity",
    title: "A delegate's call for practical solidarity",
    speaker: "To be announced",
    role: "Delegate",
    committee: "To be announced",
    body: [
      "A TESMUN editorial placeholder for the cadence and argument that shaped the committee floor. The delivered text will replace this note.",
    ],
  },
  {
    slug: "closing-reflection",
    title: "Closing reflection",
    speaker: "To be announced",
    role: "Speaker",
    committee: "Closing Ceremony",
    body: [
      "The closing reflection will be archived here after the final gavel, with the speaker, role and committee recorded as delivered.",
    ],
  },
];

export const opEdContributors = [
  { name: "Dibas Khadka", role: "Secretary-General", pdf: "", photo: "/images/secgen.png" },
  { name: "Abhash Kunwar", role: "Deputy Secretary-General", pdf: "" },
  { name: "Anuj Jung Thapa", role: "Delegate, Human Rights Council", pdf: "" },
  { name: "Eva Shakya", role: "Delegate, Human Rights Council", pdf: "" },
  { name: "Agrim Pandey", role: "Delegate, Human Rights Council", pdf: "" },
  { name: "Priyajala Dhungana", role: "Delegate", pdf: "" },
];

export const cartoons = [
  { src: "/images/cartoon-1.png", alt: "Editorial cartoon of a young diplomat at a circular table with an olive branch on a gavel" },
  { src: "/images/cartoon-2.png", alt: "Editorial cartoon of a globe in a school blazer addressing a podium" },
  { src: "/images/cartoon-3.png", alt: "Editorial cartoon of two country placards leaning together with a fountain pen between them" },
  { src: "/images/cartoon-4.png", alt: "Editorial cartoon of resolution papers folding into a paper crane above a committee room" },
];

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function getInterview(slug: string) {
  return interviews.find((item) => item.slug === slug);
}

export function getSpeech(slug: string) {
  return speeches.find((item) => item.slug === slug);
}
