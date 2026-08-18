"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import type { Award, CareerEntry, Certification } from "@/data/about";
import type { Project } from "@/data/projects";
import type { ApproachStep, FAQ, Service, TechCategory, Testimonial } from "@/data/services";
import type { ProjectContent, ProjectLink, ProjectScreenshot, ResultMetric, Feature, TechCategory as ProjectTechCategory } from "@/components/sections/work/content/types";
import type { AboutContent, CmsContent, SiteContent, WorkDetailContent } from "@/types/content";
import { CmsField, CmsListEditor, CmsSaveButton, CmsSection, CmsTagsField, CmsTab } from "@/components/admin/CmsPrimitives";

export type CmsTabKey = "overview" | "home" | "projects" | "services" | "tools" | "about" | "contact" | "work";
type SaveKey = keyof CmsContent;
type EditableRecord = Record<string, unknown>;
type SaveCmsContentVariables = { keys: SaveKey[]; content: CmsContent };

const tabs: Array<{ key: CmsTabKey; label: string }> = [
	{ key: "overview", label: "Overview" },
	{ key: "home", label: "Home" },
	{ key: "projects", label: "Projects" },
	{ key: "services", label: "Services" },
	{ key: "tools", label: "Tools" },
	{ key: "about", label: "About" },
	{ key: "contact", label: "Contact" },
	{ key: "work", label: "Work detail" },
];

function isRecord(value: unknown): value is EditableRecord {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getRecord(source: EditableRecord, path: string[]): EditableRecord {
	let current: unknown = source;
	for (const segment of path) current = isRecord(current) ? current[segment] : undefined;
	return isRecord(current) ? current : {};
}

function getString(source: EditableRecord, path: string[], fallback = ""): string {
	const value: unknown = path.reduce<unknown>((current, segment) => isRecord(current) ? current[segment] : undefined, source);
	return typeof value === "string" ? value : fallback;
}

function getStringArray(source: EditableRecord, path: string[]): string[] {
	const value: unknown = path.reduce<unknown>((current, segment) => isRecord(current) ? current[segment] : undefined, source);
	return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function setAtPath(source: EditableRecord, path: string[], value: unknown): EditableRecord {
	const [head, ...tail] = path;
	if (!head) return source;
	return { ...source, [head]: tail.length > 0 ? setAtPath(getRecord(source, [head]), tail, value) : value };
}

function updateItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
	return items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item);
}

function getProjectContent(project: Project): ProjectContent {
	return project.content ?? {};
}

async function saveCmsContent({ keys, content }: SaveCmsContentVariables): Promise<void> {
	const responses = await Promise.all(keys.map((key) => fetch(key === "projects" ? "/api/admin/projects" : `/api/admin/content/${key}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(key === "projects" ? { projects: content.projects } : { data: content[key] }) })));
	if (responses.some((response) => !response.ok)) throw new Error("Save failed");
}

function ProjectEditor({ project, onChange }: { project: Project; onChange: (project: Project) => void }) {
	const content = getProjectContent(project);
	const update = (patch: Partial<Project>) => onChange({ ...project, ...patch });
	const updateContent = (nextContent: ProjectContent) => update({ content: nextContent });

	return (
		<div className="space-y-5">
			<CmsSection title="Project information" description="These fields power project cards, the work index and the case study header.">
				<div className="grid gap-4 md:grid-cols-2">
					<CmsField label="Title" value={project.title} onChange={(value) => update({ title: value })} />
					<CmsField label="Slug" value={project.slug} onChange={(value) => update({ slug: value.toLowerCase().replace(/\s+/g, "-") })} />
					<CmsField label="Project number" value={project.number} onChange={(value) => update({ number: value })} />
					<CmsField label="Year" value={project.year} onChange={(value) => update({ year: value })} />
					<CmsField label="Role" value={project.role} onChange={(value) => update({ role: value })} />
					<CmsField label="Live / repository URL" value={project.link ?? ""} onChange={(value) => update({ link: value || undefined })} />
					<CmsField label="Cover image URL" value={project.image ?? ""} onChange={(value) => update({ image: value || undefined })} />
					<CmsTagsField label="Technology tags" values={project.tags} onChange={(tags) => update({ tags })} />
					<CmsField label="Summary" kind="textarea" value={project.summary} onChange={(value) => update({ summary: value })} />
					<CmsField label="Description" kind="textarea" value={project.description} onChange={(value) => update({ description: value })} />
				</div>
			</CmsSection>

			<CmsSection title="Case study" description="Build the work detail page with structured sections instead of writing JSON.">
				<div className="space-y-5">
					<div className="grid gap-4 md:grid-cols-2">
						<CmsField label="Overview" kind="textarea" value={content.overview ?? ""} onChange={(value) => updateContent({ ...content, overview: value })} />
						<CmsField label="My role" kind="textarea" value={content.roleDetail ?? ""} onChange={(value) => updateContent({ ...content, roleDetail: value })} />
					</div>
					<CmsListEditor<Feature> items={content.features ?? []} fields={[{ key: "title", label: "Feature title" }, { key: "description", label: "Description", kind: "textarea" }]} emptyItem={{ title: "", description: "" }} addLabel="Add feature" onChange={(features) => updateContent({ ...content, features })} getTitle={(item) => item.title || "Untitled feature"} />
					<CmsListEditor<ProjectTechCategory> items={content.techStack ?? []} fields={[{ key: "category", label: "Category" }, { key: "tools", label: "Tools" }]} emptyItem={{ category: "", tools: [] }} addLabel="Add tech category" onChange={(techStack) => updateContent({ ...content, techStack })} getTitle={(item) => item.category || "Untitled category"} />
					<div className="grid gap-4 md:grid-cols-2">
						<CmsField label="Challenge" kind="textarea" value={content.challengeSolution?.challenge ?? ""} onChange={(value) => updateContent({ ...content, challengeSolution: { challenge: value, solution: content.challengeSolution?.solution ?? "" } })} />
						<CmsField label="Solution" kind="textarea" value={content.challengeSolution?.solution ?? ""} onChange={(value) => updateContent({ ...content, challengeSolution: { challenge: content.challengeSolution?.challenge ?? "", solution: value } })} />
					</div>
					<CmsListEditor<ResultMetric> items={content.results ?? []} fields={[{ key: "metric", label: "Metric" }, { key: "value", label: "Value" }]} emptyItem={{ metric: "", value: "" }} addLabel="Add result" onChange={(results) => updateContent({ ...content, results })} getTitle={(item) => item.metric || "Untitled result"} />
					<div className="space-y-3">
						{(content.lessons ?? []).map((lesson, index) => <div key={index} className="flex items-end gap-3"><div className="min-w-0 flex-1"><CmsField label={`Lesson ${index + 1}`} kind="textarea" value={lesson} onChange={(value) => updateContent({ ...content, lessons: updateItem(content.lessons ?? [], index, value) })} /></div><button type="button" onClick={() => updateContent({ ...content, lessons: (content.lessons ?? []).filter((_, itemIndex) => itemIndex !== index) })} className="admin-danger cursor-pointer pb-3 text-xs hover:underline">Remove</button></div>)}
						<button type="button" onClick={() => updateContent({ ...content, lessons: [...(content.lessons ?? []), ""] })} className="admin-border-strong admin-text-strong cursor-pointer border px-3 py-2 text-xs transition hover:border-white hover:text-white">Add lesson</button>
					</div>
					<CmsListEditor<ProjectScreenshot> items={(content.screenshots ?? []).filter((item): item is ProjectScreenshot => typeof item !== "string")} fields={[{ key: "title", label: "Screenshot title" }, { key: "description", label: "Description" }, { key: "image", label: "Image URL" }, { key: "variant", label: "Layout variant" }]} emptyItem={{ title: "", description: "", image: "", variant: "system" }} addLabel="Add screenshot" onChange={(screenshots) => updateContent({ ...content, screenshots })} getTitle={(item) => item.title || "Untitled screenshot"} />
					<CmsListEditor<ProjectLink> items={content.links ?? []} fields={[{ key: "label", label: "Label" }, { key: "href", label: "URL" }, { key: "type", label: "Type" }]} emptyItem={{ label: "", href: "", type: "other" }} addLabel="Add project link" onChange={(links) => updateContent({ ...content, links })} getTitle={(item) => item.label || "Untitled link"} />
				</div>
			</CmsSection>
		</div>
	);
}

function OverviewTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	const updateSite = (nextSite: SiteContent) => setContent({ ...content, site: nextSite });
	return (
		<div className="space-y-5">
			<CmsSection title="Profile" description="Identity and contact details used across the portfolio.">
				<div className="grid gap-4 md:grid-cols-2">
					{(["name", "shortName", "email", "location"] as const).map((key) => <CmsField key={key} label={key === "shortName" ? "Short name" : key[0].toUpperCase() + key.slice(1)} value={content.site.profile[key]} onChange={(value) => updateSite({ ...content.site, profile: { ...content.site.profile, [key]: value } })} />)}
				</div>
			</CmsSection>
			<CmsSection title="Social links" description="These links appear in the hero, footer and contact page.">
				<CmsListEditor items={content.site.socialLinks} fields={[{ key: "label", label: "Label" }, { key: "value", label: "Display value" }, { key: "href", label: "URL" }]} emptyItem={{ label: "", value: "", href: "" }} addLabel="Add social link" onChange={(socialLinks) => updateSite({ ...content.site, socialLinks })} getTitle={(item) => item.label || "Untitled link"} />
			</CmsSection>
			<CmsSection title="Navigation" description="Main navigation labels and routes.">
				<CmsListEditor items={content.site.navigation} fields={[{ key: "label", label: "Label" }, { key: "href", label: "Route" }]} emptyItem={{ label: "", href: "" }} addLabel="Add navigation item" onChange={(navigation) => updateSite({ ...content.site, navigation })} getTitle={(item) => item.label || "Untitled item"} />
			</CmsSection>
			<CmsSection title="Portfolio tags">
				<CmsTagsField label="Tags" values={content.site.tags} onChange={(tags) => updateSite({ ...content.site, tags })} />
			</CmsSection>
		</div>
	);
}

function HomeTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	const copy = content.copy;
	const setCopy = (path: string[], value: unknown) => setContent({ ...content, copy: setAtPath(copy, path, value) as CmsContent["copy"] });
	const home = getRecord(copy, ["home"]);
	const hero = getRecord(home, ["hero"]);
	const projects = getRecord(home, ["projects"]);
	const services = getRecord(home, ["services"]);
	return (
		<div className="space-y-5">
			<CmsSection title="Hero" description="The first screen visitors see on the homepage.">
				<div className="grid gap-4 md:grid-cols-2">
					<CmsField label="Name lines" value={getStringArray(hero, ["nameLines"]).join(", ")} onChange={(value) => setCopy(["home", "hero", "nameLines"], value.split(",").map((item) => item.trim()).filter(Boolean))} />
					<CmsField label="Handle" value={getString(hero, ["handle"])} onChange={(value) => setCopy(["home", "hero", "handle"], value)} />
					<CmsField label="Role" value={getString(hero, ["role"])} onChange={(value) => setCopy(["home", "hero", "role"], value)} />
					<CmsField label="Location" value={getString(hero, ["location"])} onChange={(value) => setCopy(["home", "hero", "location"], value)} />
					<CmsField label="Description" kind="textarea" value={getString(hero, ["description"])} onChange={(value) => setCopy(["home", "hero", "description"], value)} />
				</div>
			</CmsSection>
			<CmsSection title="Selected projects block">
				<div className="grid gap-4 md:grid-cols-2">
					<CmsField label="Marquee" value={getString(projects, ["marquee"])} onChange={(value) => setCopy(["home", "projects", "marquee"], value)} />
					<CmsField label="Label" value={getString(projects, ["label"])} onChange={(value) => setCopy(["home", "projects", "label"], value)} />
					<CmsField label="Description" kind="textarea" value={getString(projects, ["description"])} onChange={(value) => setCopy(["home", "projects", "description"], value)} />
					<CmsField label="View all label" value={getString(projects, ["viewAllLabel"])} onChange={(value) => setCopy(["home", "projects", "viewAllLabel"], value)} />
				</div>
			</CmsSection>
			<CmsSection title="Services block">
				<div className="grid gap-4 md:grid-cols-2">
					<CmsField label="Marquee" value={getString(services, ["marquee"])} onChange={(value) => setCopy(["home", "services", "marquee"], value)} />
					<CmsField label="View all label" value={getString(services, ["viewAllLabel"])} onChange={(value) => setCopy(["home", "services", "viewAllLabel"], value)} />
				</div>
			</CmsSection>
		</div>
	);
}

function ServicesTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	const updateServices = (services: Partial<CmsContent["services"]>) => setContent({ ...content, services: { ...content.services, ...services } });
	return (
		<div className="space-y-5">
			<CmsSection title="Services" description="Items shown on the home page and Services page.">
				<CmsListEditor<Service> items={content.services.services} fields={[{ key: "id", label: "ID" }, { key: "number", label: "Number" }, { key: "title", label: "Title" }, { key: "description", label: "Description", kind: "textarea" }, { key: "tags", label: "Tags" }]} emptyItem={{ id: "", number: "", title: "", description: "", tags: [] }} addLabel="Add service" onChange={(services) => updateServices({ services })} getTitle={(item) => item.title || "Untitled service"} />
			</CmsSection>
			<CmsSection title="Process / approach">
				<CmsListEditor<ApproachStep> items={content.services.approachSteps} fields={[{ key: "id", label: "ID" }, { key: "number", label: "Number" }, { key: "title", label: "Title" }, { key: "description", label: "Description", kind: "textarea" }, { key: "duration", label: "Duration" }, { key: "deliverables", label: "Deliverables" }]} emptyItem={{ id: "", number: "", title: "", description: "", duration: "", deliverables: [] }} addLabel="Add process step" onChange={(approachSteps) => updateServices({ approachSteps })} getTitle={(item) => item.title || "Untitled step"} />
			</CmsSection>
			<CmsSection title="FAQs">
				<CmsListEditor<FAQ> items={content.services.faqs} fields={[{ key: "id", label: "ID" }, { key: "question", label: "Question" }, { key: "answer", label: "Answer", kind: "textarea" }]} emptyItem={{ id: "", question: "", answer: "" }} addLabel="Add FAQ" onChange={(faqs) => updateServices({ faqs })} getTitle={(item) => item.question || "Untitled question"} />
			</CmsSection>
			<CmsSection title="Testimonials">
				<CmsListEditor<Testimonial> items={content.services.testimonials} fields={[{ key: "id", label: "ID" }, { key: "quote", label: "Quote", kind: "textarea" }, { key: "author", label: "Author" }, { key: "role", label: "Role" }, { key: "company", label: "Company" }]} emptyItem={{ id: "", quote: "", author: "", role: "", company: "" }} addLabel="Add testimonial" onChange={(testimonials) => updateServices({ testimonials })} getTitle={(item) => item.author || "Untitled testimonial"} />
			</CmsSection>
		</div>
	);
}

function ToolsTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	return (
		<CmsSection title="Tools & technologies" description="Technology groups rendered in the Services page and used as the portfolio stack.">
			<CmsListEditor<TechCategory> items={content.services.techStacks} fields={[{ key: "id", label: "ID" }, { key: "category", label: "Category" }, { key: "tools", label: "Tools" }]} emptyItem={{ id: "", category: "", tools: [] }} addLabel="Add tool group" onChange={(techStacks) => setContent({ ...content, services: { ...content.services, techStacks } })} getTitle={(item) => item.category || "Untitled group"} />
		</CmsSection>
	);
}

function SkillsEditor({ about, onChange }: { about: AboutContent; onChange: (skills: Record<string, string[]>) => void }) {
	const entries = Object.entries(about.skills);
	return (
		<div className="space-y-3">
			{entries.map(([group, items], index) => (
				<div key={group} className="grid gap-3 md:grid-cols-[0.35fr_1fr_auto] md:items-end">
					<CmsField label="Group" value={group} onChange={(value) => onChange(Object.fromEntries(entries.map(([key, current], itemIndex) => itemIndex === index ? [value, current] : [key, current])))} />
					<CmsTagsField label="Skills" values={items} onChange={(values) => onChange(Object.fromEntries(entries.map(([key, current], itemIndex) => itemIndex === index ? [key, values] : [key, current])))} />
					<button type="button" onClick={() => onChange(Object.fromEntries(entries.filter((_, itemIndex) => itemIndex !== index)))} className="admin-danger cursor-pointer pb-3 text-xs hover:underline">Remove</button>
				</div>
			))}
			<button type="button" onClick={() => onChange({ ...about.skills, [`Group ${entries.length + 1}`]: [] })} className="admin-border-strong admin-text-strong cursor-pointer border px-3 py-2 text-xs transition hover:border-white hover:text-white">Add skill group</button>
		</div>
	);
}

function AboutTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	const updateAbout = (about: Partial<AboutContent>) => setContent({ ...content, about: { ...content.about, ...about } });
	const aboutCopy = getRecord(content.copy, ["about"]);
	const heroCopy = getRecord(aboutCopy, ["hero"]);
	const skillsCopy = getRecord(aboutCopy, ["skills"]);
	const setCopy = (path: string[], value: unknown) => setContent({ ...content, copy: setAtPath(content.copy, path, value) as CmsContent["copy"] });
	return (
		<div className="space-y-5">
			<CmsSection title="About page copy">
				<div className="grid gap-4 md:grid-cols-2">
					<CmsField label="Marquee" value={getString(aboutCopy, ["marquee"])} onChange={(value) => setCopy(["about", "marquee"], value)} />
					<CmsField label="Hero headline" kind="textarea" value={getString(heroCopy, ["headline"])} onChange={(value) => setCopy(["about", "hero", "headline"], value)} />
					<CmsField label="Hero CTA" value={getString(heroCopy, ["cta"])} onChange={(value) => setCopy(["about", "hero", "cta"], value)} />
					<CmsField label="Skills description" kind="textarea" value={getString(skillsCopy, ["description"])} onChange={(value) => setCopy(["about", "skills", "description"], value)} />
				</div>
				<div className="mt-4 space-y-3">
					{getStringArray(heroCopy, ["paragraphs"]).map((paragraph, index) => <div key={index} className="flex items-end gap-3"><div className="min-w-0 flex-1"><CmsField label={`Hero paragraph ${index + 1}`} kind="textarea" value={paragraph} onChange={(value) => setCopy(["about", "hero", "paragraphs"], updateItem(getStringArray(heroCopy, ["paragraphs"]), index, value))} /></div><button type="button" onClick={() => setCopy(["about", "hero", "paragraphs"], getStringArray(heroCopy, ["paragraphs"]).filter((_, itemIndex) => itemIndex !== index))} className="admin-danger cursor-pointer pb-3 text-xs hover:underline">Remove</button></div>)}
					<button type="button" onClick={() => setCopy(["about", "hero", "paragraphs"], [...getStringArray(heroCopy, ["paragraphs"]), ""])} className="admin-border-strong admin-text-strong cursor-pointer border px-3 py-2 text-xs transition hover:border-white hover:text-white">Add paragraph</button>
				</div>
			</CmsSection>
			<CmsSection title="Stats">
				<CmsListEditor items={content.about.stats} fields={[{ key: "number", label: "Number", kind: "number" }, { key: "suffix", label: "Suffix" }, { key: "label", label: "Label" }]} emptyItem={{ number: 0, suffix: "", label: "" }} addLabel="Add stat" onChange={(stats) => updateAbout({ stats })} getTitle={(item) => item.label || "Untitled stat"} />
			</CmsSection>
			<CmsSection title="Skills">
				<SkillsEditor about={content.about} onChange={(skills) => updateAbout({ skills })} />
			</CmsSection>
			<CmsSection title="Career timeline">
				<CmsListEditor<CareerEntry> items={content.about.careerEntries} fields={[{ key: "type", label: "Type" }, { key: "start", label: "Start" }, { key: "end", label: "End" }, { key: "title", label: "Title" }, { key: "place", label: "Place" }, { key: "description", label: "Description", kind: "textarea" }, { key: "lane", label: "Lane", kind: "number" }]} emptyItem={{ type: "experience", start: "", end: "", title: "", place: "", description: "", lane: 0 }} addLabel="Add timeline entry" onChange={(careerEntries) => updateAbout({ careerEntries })} getTitle={(item) => item.title || "Untitled entry"} />
			</CmsSection>
			<CmsSection title="Certificates">
				<CmsListEditor<Certification> items={content.about.certificates} fields={[{ key: "label", label: "Date label" }, { key: "title", label: "Title" }, { key: "description", label: "Description", kind: "textarea" }, { key: "tags", label: "Tags" }, { key: "url", label: "Verification URL" }, { key: "issuer", label: "Issuer" }]} emptyItem={{ label: "", title: "", description: "", tags: [], url: "", issuer: "" }} addLabel="Add certificate" onChange={(certificates) => updateAbout({ certificates })} getTitle={(item) => item.title || "Untitled certificate"} />
			</CmsSection>
			<CmsSection title="Awards">
				<CmsListEditor<Award> items={content.about.awards} fields={[{ key: "title", label: "Title" }, { key: "position", label: "Position" }, { key: "date", label: "Date" }, { key: "description", label: "Description", kind: "textarea" }, { key: "category", label: "Category" }, { key: "tags", label: "Tags" }, { key: "url", label: "URL" }]} emptyItem={{ title: "", position: "", date: "", description: "", category: "", tags: [] }} addLabel="Add award" onChange={(awards) => updateAbout({ awards })} getTitle={(item) => item.title || "Untitled award"} />
			</CmsSection>
		</div>
	);
}

function ContactTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	const setCopy = (path: string[], value: unknown) => setContent({ ...content, copy: setAtPath(content.copy, path, value) as CmsContent["copy"] });
	const contact = getRecord(content.copy, ["contact"]);
	const metadata = getRecord(contact, ["metadata"]);
	const form = getRecord(contact, ["form"]);
	const fields = getRecord(form, ["fields"]);
	return (
		<div className="space-y-5">
			<CmsSection title="Contact page">
				<div className="grid gap-4 md:grid-cols-2">
					<CmsField label="Eyebrow" value={getString(contact, ["eyebrow"])} onChange={(value) => setCopy(["contact", "eyebrow"], value)} />
					<CmsField label="Headline" value={getString(contact, ["headline"])} onChange={(value) => setCopy(["contact", "headline"], value)} />
					<CmsField label="SEO title" value={getString(metadata, ["title"])} onChange={(value) => setCopy(["contact", "metadata", "title"], value)} />
					<CmsField label="SEO description" kind="textarea" value={getString(metadata, ["description"])} onChange={(value) => setCopy(["contact", "metadata", "description"], value)} />
				</div>
			</CmsSection>
			<CmsSection title="Contact form labels">
				<div className="grid gap-4 md:grid-cols-2">
					{["name", "email", "phone", "title", "message"].map((key) => <CmsField key={key} label={key[0].toUpperCase() + key.slice(1)} value={getString(fields, [key])} onChange={(value) => setCopy(["contact", "form", "fields", key], value)} />)}
					<CmsField label="Submit button" value={getString(form, ["submit"])} onChange={(value) => setCopy(["contact", "form", "submit"], value)} />
					<CmsField label="Processing label" value={getString(form, ["processing"])} onChange={(value) => setCopy(["contact", "form", "processing"], value)} />
				</div>
			</CmsSection>
		</div>
	);
}

function WorkTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	const setCopy = (path: string[], value: unknown) => setContent({ ...content, copy: setAtPath(content.copy, path, value) as CmsContent["copy"] });
	const work = getRecord(content.copy, ["work"]);
	const metadata = getRecord(work, ["metadata"]);
	const section = getRecord(work, ["section"]);
	return (
		<div className="space-y-5">
			<CmsSection title="Work index">
				<div className="grid gap-4 md:grid-cols-2">
					<CmsField label="Marquee" value={getString(work, ["marquee"])} onChange={(value) => setCopy(["work", "marquee"], value)} />
					<CmsField label="SEO title" value={getString(metadata, ["title"])} onChange={(value) => setCopy(["work", "metadata", "title"], value)} />
					<CmsField label="Section label" value={getString(section, ["label"])} onChange={(value) => setCopy(["work", "section", "label"], value)} />
					<CmsField label="Section description" kind="textarea" value={getString(section, ["description"])} onChange={(value) => setCopy(["work", "section", "description"], value)} />
				</div>
			</CmsSection>
			<CmsSection title="Case study labels" description="Text labels used by every project detail page.">
				<div className="grid gap-4 md:grid-cols-2">
					{[["header", "projectLabel"], ["header", "yearLabel"], ["header", "roleLabel"], ["header", "technologiesLabel"], ["header", "aboutLabel"], ["sections", "overview"], ["sections", "role"], ["sections", "features"], ["sections", "techStack"], ["sections", "results"], ["sections", "screenshots"], ["sections", "links"]].map(([group, key]) => <CmsField key={`${group}-${key}`} label={`${group}.${key}`} value={getString(getRecord(getRecord(content.copy, ["workDetail"]), [group]), [key])} onChange={(value) => setCopy(["workDetail", group, key], value)} />)}
				</div>
			</CmsSection>
			<CmsSection title="Section order" description="Reorder by changing the list order. The renderer keeps only sections with content.">
				<CmsListEditor<WorkDetailContent["sectionOrder"][number]> items={content.workDetail.sectionOrder} fields={[{ key: "type", label: "Type" }, { key: "label", label: "Label" }, { key: "id", label: "Anchor ID" }]} emptyItem={{ type: "", label: "", id: "" }} addLabel="Add case study section" onChange={(sectionOrder) => setContent({ ...content, workDetail: { sectionOrder } })} getTitle={(item) => item.label || "Untitled section"} />
			</CmsSection>
		</div>
	);
}

export function AdminCms({ initialContent, initialTab = "overview", showTabs = true }: { initialContent: CmsContent; initialTab?: CmsTabKey; showTabs?: boolean }) {
	const [activeTab, setActiveTab] = useState<CmsTabKey>(initialTab);
	const [content, setContent] = useState<CmsContent>(initialContent);
	const [message, setMessage] = useState<string | null>(null);
	const saveMutation = useMutation({
		mutationFn: saveCmsContent,
		onSuccess: () => setMessage("Changes saved"),
		onError: () => setMessage("Save failed. Check the fields and try again."),
	});
	const activeLabel = tabs.find((tab) => tab.key === activeTab)?.label ?? "CMS";

	function save(keys: SaveKey[]) {
		setMessage(null);
		saveMutation.mutate({ keys, content });
	}

	function renderTab() {
		if (activeTab === "overview") return <OverviewTab content={content} setContent={setContent} />;
		if (activeTab === "home") return <HomeTab content={content} setContent={setContent} />;
		if (activeTab === "projects") return <ProjectsTab content={content} setContent={setContent} />;
		if (activeTab === "services") return <ServicesTab content={content} setContent={setContent} />;
		if (activeTab === "tools") return <ToolsTab content={content} setContent={setContent} />;
		if (activeTab === "about") return <AboutTab content={content} setContent={setContent} />;
		if (activeTab === "contact") return <ContactTab content={content} setContent={setContent} />;
		return <WorkTab content={content} setContent={setContent} />;
	}

	const saveKey: SaveKey = activeTab === "overview" ? "site" : activeTab === "projects" ? "projects" : activeTab === "about" ? "about" : activeTab === "services" || activeTab === "tools" ? "services" : activeTab === "work" ? "workDetail" : "copy";
	const saveKeys: SaveKey[] = activeTab === "work" ? ["workDetail", "copy"] : [saveKey];

	return (
		<div className="space-y-6">
			<header>
				<div className="flex flex-wrap items-center gap-3">
					<p className="admin-text-subtle font-mono text-xs uppercase tracking-[0.2em]">Portfolio CMS</p>
					{!showTabs && <><span className="admin-text-subtle">/</span><Link href="/admin/home" className="admin-text-muted text-xs hover:text-white">All sections</Link></>}
				</div>
				<h1 className="mt-2 text-3xl font-semibold">Manage {activeLabel}</h1>
				<p className="admin-text-muted mt-3 max-w-3xl text-sm leading-6">Edit every frontend section from structured forms. Add items, update copy, reorder lists and save directly to the live content store.</p>
			</header>
			{showTabs && <div className="admin-border overflow-x-auto border-b">
				<nav className="flex min-w-max gap-1" aria-label="CMS sections">
					{tabs.map((tab) => <CmsTab key={tab.key} label={tab.label} active={activeTab === tab.key} count={tab.key === "projects" ? content.projects.length : tab.key === "services" ? content.services.services.length : tab.key === "tools" ? content.services.techStacks.length : tab.key === "about" ? content.about.certificates.length : undefined} onClick={() => { setActiveTab(tab.key); setMessage(null); }} />)}
				</nav>
			</div>}
			{renderTab()}
			<CmsSaveButton isSaving={saveMutation.isPending} message={message} onClick={() => save(saveKeys)} />
		</div>
	);
}

function ProjectsTab({ content, setContent }: { content: CmsContent; setContent: (content: CmsContent) => void }) {
	const [selectedSlug, setSelectedSlug] = useState(content.projects[0]?.slug ?? "");
	const selectedProject = content.projects.find((project) => project.slug === selectedSlug) ?? content.projects[0];

	function updateProjects(projects: Project[]) {
		setContent({ ...content, projects });
	}

	function addProject() {
		const project: Project = { slug: `project-${content.projects.length + 1}`, number: String(content.projects.length + 1).padStart(2, "0"), title: "New project", summary: "", description: "", tags: [], year: new Date().getFullYear().toString(), role: "", image: "" };
		updateProjects([...content.projects, project]);
		setSelectedSlug(project.slug);
	}

	return (
		<div className="grid gap-5 xl:grid-cols-[18rem_1fr]">
			<CmsSection title="Projects" description="Choose a project to edit its card and full case study. Changes save together to preserve ordering." action={<button type="button" onClick={addProject} className="admin-action inline-flex cursor-pointer items-center gap-2 px-3 py-2 text-xs font-semibold"><span aria-hidden="true">+</span> New project</button>}>
				<div className="space-y-2">
					{content.projects.map((project) => <button key={project.slug} type="button" onClick={() => setSelectedSlug(project.slug)} className={`block w-full cursor-pointer border p-3 text-left transition ${selectedProject?.slug === project.slug ? "admin-border-strong admin-surface-hover text-white" : "admin-border admin-text-muted hover:text-white"}`}><span className="font-mono text-[10px]">{project.number}</span><span className="mt-1 block text-sm font-semibold">{project.title}</span><span className="admin-text-subtle mt-1 block truncate text-xs">/{project.slug}</span></button>)}
					{content.projects.length === 0 && <p className="admin-text-subtle text-sm">No projects yet.</p>}
				</div>
			</CmsSection>
			{selectedProject ? <div><div className="mb-3 flex justify-end"><button type="button" onClick={() => { const next = content.projects.filter((project) => project.slug !== selectedProject.slug); updateProjects(next); setSelectedSlug(next[0]?.slug ?? ""); }} className="admin-danger cursor-pointer text-xs hover:underline">Remove this project</button></div><ProjectEditor project={selectedProject} onChange={(project) => { updateProjects(content.projects.map((item) => item.slug === selectedProject.slug ? project : item)); setSelectedSlug(project.slug); }} /></div> : <CmsSection title="Select a project"><p className="admin-text-muted text-sm">Create a project to start editing its case study.</p></CmsSection>}
		</div>
	);
}
