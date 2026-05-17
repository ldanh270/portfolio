// Stats

export const STATS = [
	{ number: 4, suffix: "+", label: "Years Learning" },
	{ number: 10, suffix: "+", label: "Projects Built" },
	{ number: 9, suffix: "", label: "Certifications" },
	{ number: 5, suffix: "+", label: "Technologies" },
] as const;

// Skills

type Skills = Record<string, string[]>;

export const SKILLS: Skills = {
	Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
	Backend: ["Express.js", "PostgreSQL", "MongoDB", "Redis"],
	Mobile: ["React Native", "Expo", "Flutter"],
	DevOps: ["Docker", "CI/CD", "Nginx", "Git"],
	Tools: ["Figma", "Postman", "VS Code", "Notion"],
};

// Journey
export type CareerEntry = {
	type: "experience" | "education";
	start: string;
	end: string;
	title: string;
	place: string;
	description: string;
	lane: number;
};

export const CAREER_ENTRIES: CareerEntry[] = [
	{
		type: "education",
		start: "2020",
		end: "2023",
		title: "High School Student",
		place: "Hoang Hoa Tham High School Da Nang",
		description:
			"Advanced math class. Coursework in physics, computer science, and English. Graduated with honors.",
		lane: 0,
	},
	{
		type: "experience",
		start: "2026",
		end: "Now",
		title: "Full-stack Developer",
		place: "OUTFIZ",
		description:
			"Production frontend work across real product flows, interface details, and feature delivery.",
		lane: 1,
	},
	{
		type: "education",
		start: "2023",
		end: "Now",
		title: "University Student - Software Engineering",
		place: "FPT University Da Nang",
		description:
			"Comprehensive software engineering curriculum. Coursework in data structures, algorithms, databases, and web development.",
		lane: 2,
	},
	{
		type: "experience",
		start: "2026",
		end: "Now",
		title: "Freelance Software Developer",
		place: "VieTech Solutions",
		description:
			"Full-stack development for various clients, delivering tailored software solutions to meet specific business needs.",
		lane: 3,
	},
];

export const TIMELINE_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "Now"];
export const YEAR_WIDTH = 350; // px per year

export type Certification = {
	label: string;
	title: string;
	description: string;
	tags: string[];
	url: string;
	issuer: string;
};

// ── Data ──────────────────────────────────────────────────────────

export const CERTIFICATES: Certification[] = [
	{
		label: "02/2025",
		title: "AI for Everyone",
		description:
			"The meaning behind common AI terminology, including neural networks, machine learning, deep learning, and data science.",
		tags: [
			"AI/ML",
			"Generative AI",
			"Data Ethics",
			"Artificial Intelligence",
			"Business Ethics",
			"Technology Strategies",
			"Business Intelligence",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/TNLHD0SMK05P",
		issuer: "DeepLearning.AI",
	},
	{
		label: "03/2025",
		title: "Academic Skills for University Success",
		description:
			"Build Learning Skills to Excel at University. Learn to solve problems, think critically, and communicate effectively in your university courses.",
		tags: [
			"Critical Thinking",
			"Analytical Skills",
			"Research",
			"Information Management",
			"Systems Thinking",
			"Logical Reasoning",
			"Problem Solving",
		],
		url: "https://coursera.org/share/e21300c8c048091947ec95f08708a001",
		issuer: "The University of Sydney Business School",
	},
	{
		label: "06/2025",
		title: "Web Design for Everybody: Basics of Web Development & Coding",
		description:
			"Learn to Design and Create Websites. Build a responsive and accessible web portfolio using HTML5, CSS3, and JavaScript.",
		tags: [
			"Web Design",
			"Event-Driven Programming",
			"User Interface (UI)",
			"Usability",
			"JavaScript",
			"Web Applications",
			"HTML5",
			"Cascading Style Sheets (CSS)",
			"Wireframing",
			"Bootstrap (Front-End Framework)",
			"Web Content Accessibility Guidelines",
			"Web Development Tools",
			"Web Content",
		],
		url: "https://www.coursera.org/account/accomplishments/specialization/certificate/463Z20U8VUU2",
		issuer: "University of Michigan",
	},
	{
		label: "12/2025",
		title: "Google Certified Educator Level 1 & 2",
		description:
			"For educators who are super users and enthusiasts of Google’s tools in the classroom, this Level 2 certification validates advanced technology implementation skills.",
		tags: ["Google Tools", "Education Technology", "Classroom Integration", "Digital Literacy"],
		url: "https://edu.google.accredible.com/d771e24f-f83f-496d-9538-a3442e886cd6#acc.ClpJu2fL",
		issuer: "Google for Education",
	},
	{
		label: "01/2026",
		title: "Generative AI in Software Development",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Generative AI",
			"Prompt Engineering",
			"Software Development Tools",
			"AI Enablement",
			"Strategic Decision-Making",
			"LLM Application",
			"ChatGPT",
			"Artificial Intelligence",
			"Digital Transformation",
			"Debugging",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/2CIWJBYR7YH3",
		issuer: "Amazon",
	},
	{
		label: "01/2026",
		title: "Software Engineering: Modeling Software Systems using UML",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Project Planning",
			"Software Engineering",
			"Object Oriented Design",
			"Unified Modeling Language (UML)",
			"Systems Design",
			"Project Management",
			"Software Design",
			"System Development",
			"Software Architecture",
			"Quality Assurance",
			"Process Driven Development",
			"Software Development Life Cycle (SDLC)",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/B02GH2J0LJBS",
		issuer: "The Hong Kong University of Science and Technology",
	},
	{
		label: "01/2026",
		title: "Software Engineering: Implementation and Testing",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Requirements Analysis",
			"Software Development",
			"Integration Testing",
			"Unified Modeling Language (UML)",
			"White-Box Testing",
			"System Testing",
			"Acceptance Testing",
			"Software Development Methodologies",
			"Test Cases",
			"Software Engineering",
			"Software Development Life Cycle (SDLC)",
			"Configuration Management",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/OVCD5P8A4A0H",
		issuer: "The Hong Kong University of Science and Technology",
	},
	{
		label: "01/2026",
		title: "Software Engineering: Software Design and Project Management",
		description:
			"Discuss the principles, applications, and role of Generative AI in automating repetitive tasks in software development.",
		tags: [
			"Project Planning",
			"Software Engineering",
			"Object Oriented Design",
			"Unified Modeling Language (UML)",
			"Systems Design",
			"Project Management",
			"Software Design",
			"System Development",
			"Software Architecture",
			"Quality Assurance",
			"Process Driven Development",
			"Software Development Life Cycle (SDLC)",
		],
		url: "https://www.coursera.org/account/accomplishments/verify/GU5ZRUURCN4Q",
		issuer: "The Hong Kong University of Science and Technology",
	},
	{
		label: "02/2026",
		title: "Gemini Certified Faculty",
		description:
			"A Google Certified Gemini Faculty member can articulate and demonstrate foundational knowledge of generative AI concepts and the core features and capabilities of Gemini within the educational context.",
		tags: ["Generative AI", "Google Gemini", "Education Technology", "AI in Education"],
		url: "https://edu.google.accredible.com/50922889-7d59-4f25-93bf-8fde89a93eb7",
		issuer: "Google for Education",
	},
];

// Awards

export type Award = {
	title: string;
	position: string;
	date: string;
	description: string;
	category: string;
	tags: string[];
	url?: string;
};

export const AWARDS: Award[] = [
	{
		title: "City-level Excellent Student Contest in Informatics 2020 (Grade C3)",
		position: "Third Prize",
		date: "2020",
		description:
			"Competed against top high-school students citywide in algorithmic problem-solving. Tasks covered graph theory, dynamic programming, and greedy strategies under strict time limits.",
		category: "Algorithm Competition",
		tags: ["C++", "Algorithm", "Graph Theory", "Dynamic Programming"],
	},
	{
		title: "City-level Informatics Contest",
		position: "Third Prize",
		date: "2020",
		description:
			"Solved a set of challenging competitive programming problems focused on data structures and efficient search techniques. Strengthened foundational skills in time-complexity optimization.",
		category: "Algorithm Competition",
		tags: ["Data Structures", "Binary Search", "Sorting", "C++"],
	},
	{
		title: "Central Highlands & Central Vietnam Informatics Olympic – 3rd Edition",
		position: "Third Prize",
		date: "2022",
		description:
			"Regional-scale olympiad bringing together the strongest student programmers from central Vietnam. Tackled advanced problems involving number theory, combinatorics, and segment trees across two contest rounds.",
		category: "Regional Olympiad",
		tags: ["Number Theory", "Combinatorics", "Segment Tree", "Competitive Programming"],
	},
	{
		title: "City-level Youth Informatics Contest – 25th Edition",
		position: "Third Prize",
		date: "2022",
		description:
			"Annual city contest with a legacy of 25 editions. Demonstrated consistent growth in competitive programming with problems spanning string processing, recursion, and brute-force optimization.",
		category: "Algorithm Competition",
		tags: ["String Processing", "Recursion", "Optimization", "Problem Solving"],
	},
	{
		title: "D3 Regional Round – National Youth Informatics Contest - 29th Edition",
		position: "Consolation Prize",
		date: "2023",
		description:
			"Participated in the regional qualifying round of Vietnam's most prestigious youth informatics contest. Gained valuable experience competing at national-level difficulty with problems in graph algorithms and advanced DP.",
		category: "National Contest",
		tags: ["National Level", "Graph Algorithms", "Advanced DP", "C++"],
	},
	{
		title: "D3 City-level Youth Informatics Contest - 28th Edition",
		position: "Second Prize",
		date: "2023",
		description:
			"Achieved runner-up position among city participants. Excelled in problems requiring creative algorithmic design, including shortest-path variants and tree-based computations.",
		category: "Algorithm Competition",
		tags: ["Shortest Path", "Tree Algorithms", "Algorithm Design", "Silver Medal"],
	},
	{
		title: "Provincial Science and Technology Contest for High School Students",
		position: "Third Prize",
		date: "2023",
		description:
			"Presented a research project applying technology to solve real-world problems. Combined software development skills with scientific methodology to deliver a working prototype judged by academic professionals.",
		category: "Science & Technology",
		tags: ["Research", "Prototype", "Innovation", "Scientific Method"],
	},
	{
		title: "City-level Informatics Excellent Student Contest",
		position: "Consolation Prize",
		date: "2023",
		description:
			"Competed in an elite-tier contest reserved for top-performing informatics students. Problems demanded deep understanding of computational geometry and advanced data structures.",
		category: "Algorithm Competition",
		tags: ["Computational Geometry", "Advanced Data Structures", "Elite Tier"],
	},
	{
		title: "NAI Challenge Cup – Hue ICT Challenge",
		position: "Third Prize",
		date: "2023",
		description:
			"Inter-city ICT challenge hosted in Hue, combining algorithmic contests with practical software development tasks. Balanced speed-coding with solution architecture under competition pressure.",
		category: "ICT Challenge",
		tags: ["ICT", "Speed Coding", "Software Development", "Inter-City"],
	},
	{
		title: "D2 Central Highlands & Central Vietnam Informatics Olympiad – 4th Edition",
		position: "Bronze Medal",
		date: "2023",
		description:
			"Earned a bronze medal in the upgraded D2 division of the regional olympiad. Faced harder problem sets involving heavy implementation, math-based algorithms, and multi-step reasoning under a 5-hour session.",
		category: "Regional Olympiad",
		tags: ["Bronze Medal", "Heavy Implementation", "Math Algorithms", "5-Hour Contest"],
	},
	{
		title: "City-level Science and Technology Contest",
		position: "Third Prize",
		date: "2023",
		description:
			"Developed and presented a technology-driven solution addressing local community needs. Project evaluated on innovation, feasibility, and technical execution by a panel of industry and academic judges.",
		category: "Science & Technology",
		tags: ["Community Impact", "Feasibility", "Technical Execution", "Presentation"],
	},
];
