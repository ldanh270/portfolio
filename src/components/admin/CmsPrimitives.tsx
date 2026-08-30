"use client";

import { Plus, Trash2 } from "lucide-react";
import { type ReactNode, useId } from "react";

export type CmsFieldKind = "text" | "textarea" | "number" | "tags" | "month" | "monthOrNow";

type CmsFieldProps = {
	label: string;
	value: string | number;
	kind?: CmsFieldKind;
	placeholder?: string;
	onChange: (value: string) => void;
};

export function CmsField({ label, value, kind = "text", placeholder, onChange }: CmsFieldProps) {
	const fieldId = useId();
	const stringValue = String(value ?? "");
	const isOngoing = kind === "monthOrNow" && stringValue.trim().toLowerCase() === "now";
	const monthValue = /^\d{4}$/.test(stringValue) ? `${stringValue}-01` : stringValue;
	const commonProps = {
		value: kind === "month" || kind === "monthOrNow" ? monthValue : stringValue,
		placeholder,
		onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			onChange(event.target.value),
		className: "admin-input mt-2 min-h-11 text-sm",
	};

	if (kind === "monthOrNow") {
		return (
			<div className="text-sm">
				<label htmlFor={fieldId} className="admin-text-muted">{label}</label>
				<div className="flex items-stretch gap-2">
					<input {...commonProps} id={fieldId} type="month" value={isOngoing ? "" : monthValue} disabled={isOngoing} />
					<button
						type="button"
						aria-pressed={isOngoing}
						onClick={() => onChange(isOngoing ? "" : "Now")}
						className={`admin-border-strong mt-2 min-h-11 shrink-0 border px-3 text-xs transition ${isOngoing ? "admin-action" : "admin-text-muted admin-surface-hover"}`}
					>
						Ongoing
					</button>
				</div>
			</div>
		);
	}

	return (
		<label className="block text-sm">
			<span className="admin-text-muted">{label}</span>
			{kind === "textarea" ? (
				<textarea {...commonProps} rows={4} />
			) : (
				<input {...commonProps} type={kind === "number" ? "number" : kind === "month" ? "month" : "text"} />
			)}
		</label>
	);
}

export function CmsTagsField({ label, values, onChange }: { label: string; values: string[]; onChange: (values: string[]) => void }) {
	return (
		<CmsField
			label={label}
			value={values.join(", ")}
			placeholder="React, Next.js, TypeScript"
			onChange={(value) => onChange(value.split(",").map((item) => item.trim()).filter(Boolean))}
		/>
	);
}

export function CmsSection({ title, description, children, action }: { title: string; description?: string; children: ReactNode; action?: ReactNode }) {
	return (
		<section className="admin-border admin-surface rounded-sm border p-5 sm:p-6">
			<div className="mb-5 flex flex-col justify-between gap-3 border-b admin-border pb-4 sm:flex-row sm:items-start">
				<div>
					<h2 className="text-base font-semibold">{title}</h2>
					{description && <p className="admin-text-subtle mt-1 max-w-2xl text-xs leading-5">{description}</p>}
				</div>
				{action}
			</div>
			{children}
		</section>
	);
}

export function CmsTab({ active, label, count, onClick }: { active: boolean; label: string; count?: number; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			className={`inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm transition ${active ? "border-white text-white" : "border-transparent admin-text-muted hover:border-neutral-600 hover:text-white"}`}
		>
			{label}
			{typeof count === "number" && <span className="admin-text-subtle font-mono text-[10px]">{String(count).padStart(2, "0")}</span>}
		</button>
	);
}

export type CmsListField<T extends object> = {
	key: keyof T;
	label: string;
	kind?: CmsFieldKind;
	};

type CmsListEditorProps<T extends object> = {
	items: T[];
	fields: CmsListField<T>[];
	emptyItem: T;
	addLabel: string;
	onChange: (items: T[]) => void;
	getTitle?: (item: T, index: number) => string;
};

function readListValue<T extends object>(item: T, key: keyof T): string | number {
	const value = item[key];
	if (Array.isArray(value)) return value.join(", ");
	if (typeof value === "number") return value;
	return typeof value === "string" ? value : "";
}

function writeListValue<T extends object>(item: T, field: CmsListField<T>, value: string): T {
	const current = item[field.key];
	const nextValue = Array.isArray(current)
		? value.split(",").map((entry) => entry.trim()).filter(Boolean)
		: field.kind === "number"
			? Number(value)
			: value;
	return { ...item, [field.key]: nextValue } as T;
}

export function CmsListEditor<T extends object>({ items, fields, emptyItem, addLabel, onChange, getTitle }: CmsListEditorProps<T>) {
	function updateItem(index: number, field: CmsListField<T>, value: string) {
		onChange(items.map((item, itemIndex) => itemIndex === index ? writeListValue(item, field, value) : item));
	}

	function removeItem(index: number) {
		onChange(items.filter((_, itemIndex) => itemIndex !== index));
	}

	return (
		<div className="space-y-3">
			{items.map((item, index) => (
				<div key={index} className="admin-border rounded-sm border p-4">
					<div className="mb-4 flex items-center justify-between gap-3">
						<p className="admin-text-strong min-w-0 truncate text-xs font-semibold">{getTitle?.(item, index) ?? `Item ${index + 1}`}</p>
						<button type="button" onClick={() => removeItem(index)} className="admin-danger inline-flex min-h-11 cursor-pointer items-center gap-1 text-xs hover:underline">
							<Trash2 size={13} aria-hidden="true" /> Remove
						</button>
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						{fields.map((field) => (
							<CmsField
								key={String(field.key)}
								label={field.label}
								kind={field.kind}
								value={readListValue(item, field.key)}
								onChange={(value) => updateItem(index, field, value)}
							/>
						))}
					</div>
				</div>
			))}
			<button type="button" onClick={() => onChange([...items, { ...emptyItem }])} className="admin-border-strong admin-text-strong inline-flex min-h-11 cursor-pointer items-center gap-2 border px-3 py-2 text-xs transition hover:border-white hover:text-white">
				<Plus size={14} aria-hidden="true" /> {addLabel}
			</button>
		</div>
	);
}

export function CmsSaveButton({ isSaving, message, onClick }: { isSaving: boolean; message: string | null; onClick: () => void }) {
	return (
		<div className="sticky bottom-0 z-20 -mx-4 flex flex-col items-stretch justify-end gap-3 border-t admin-border bg-[var(--admin-background)]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:flex-row sm:items-center sm:px-6 lg:-mx-10 lg:px-10">
			{message && <p className="admin-text-muted text-xs">{message}</p>}
			<button type="button" onClick={onClick} disabled={isSaving} aria-busy={isSaving} className="admin-action inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-50">
				{isSaving ? "Saving..." : "Save changes"}
			</button>
		</div>
	);
}
