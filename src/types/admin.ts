export type AdminRole = "owner" | "editor";

export type AdminUser = {
	id: string;
	email: string;
	role: AdminRole;
	isActive: boolean;
};

export type BlogPostStatus = "draft" | "published";

export type BlogPostInput = {
	slug: string;
	title: string;
	excerpt: string;
	body: string;
	tags: string[];
	status: BlogPostStatus;
	publishedAt: string | null;
	coverImage?: {
		url: string;
		publicId?: string;
		alt: string;
	};
	seo?: {
		title?: string;
		description?: string;
	};
};

export type BlogPost = BlogPostInput & {
	id: string;
	createdAt: string;
	updatedAt: string;
};
