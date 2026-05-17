export const SITE = {
	name: "Le Duc Anh",
	shortName: "LDA",
	email: "ducanhle.dn@gmail.com",
	location: "Da Nang, Vietnam",
} as const;

export const TAGS = [
	"Web Development",
	"Mobile Apps",
	"UI/UX Design",
	"Scalable Systems",
	"Full-Stack Development",
	"Software Engineering",
] as const;

export const SOCIAL_LINKS = [
	{
		label: "Email",
		value: "ducanhle.dn@gmail.com",
		href: "mailto:ducanhle.dn@gmail.com",
	},
	{
		label: "GitHub",
		value: "ldanh270",
		href: "https://github.com/ldanh270",
	},
	{
		label: "LinkedIn",
		value: "ldanh270",
		href: "https://www.linkedin.com/in/ldanh270",
	},
] as const;

export const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Works", href: "/work" },
	{ label: "Services", href: "/services" },
	{ label: "About", href: "/about" },
] as const;
