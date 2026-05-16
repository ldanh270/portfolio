export const site = {
	name: "Le Duc Anh",
	shortName: "LDA",
	email: "ducanhle.dn@gmail.com",
	location: "Da Nang, Vietnam",
} as const;

export const tags = [
	"Web Development",
	"Mobile Apps",
	"UI/UX Design",
	"Scalable Systems",
	"Full-Stack Development",
	"Software Engineering",
] as const;

export const socialLinks = [
	{
		label: "Email",
		value: site.email,
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

export const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "Works", href: "/work" },
	{ label: "About", href: "/about" },
	{ label: "Services", href: "/services" },
] as const;
