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
    href: "mailto:ducanhle.dn@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/ldanh270"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ldanh270"
  }
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
] as const;
