import assert from "node:assert/strict";
import test from "node:test";
import { getClientIdentifier, hashIdentifier } from "./client-identifier";
import { escapeHtml } from "./html";
import { ContactSchema } from "../validations/contact";

const validContact = {
	name: "Le Duc Anh",
	email: "hello@example.com",
	phone: "0901234567",
	title: "Portfolio project",
	message: "Please help build this project.",
};

test("escapeHtml neutralizes email markup", () => {
	assert.equal(
		escapeHtml('<a href="https://malicious.test">click & win</a>'),
		"&lt;a href=&quot;https://malicious.test&quot;&gt;click &amp; win&lt;/a&gt;",
	);
});

test("contact honeypot accepts a bounded value for silent server rejection", () => {
	assert.equal(ContactSchema.safeParse({ ...validContact, website: "spam.test" }).success, true);
	assert.equal(ContactSchema.safeParse({ ...validContact, website: "" }).success, true);
});

test("client identifier uses a hashed trusted proxy IP", () => {
	const headers = new Headers({ "x-vercel-forwarded-for": "198.51.100.4" });
	const identifier = getClientIdentifier(headers);
	assert.equal(identifier, hashIdentifier("198.51.100.4"));
	assert.notEqual(identifier, "198.51.100.4");
});
