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
