"use client";

import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", budget: "" });

  return (
    <form
      className="grid gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(form);
      }}
    >
      <input className="w-full border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray focus:border-brand-black" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
      <input className="w-full border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray focus:border-brand-black" placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
      <select className="w-full border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none text-brand-gray focus:border-brand-black" value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })}>
        <option value="">Budget range</option>
        <option value="under-5k">Under $5k</option>
        <option value="5k-15k">$5k–$15k</option>
        <option value="15k-plus">$15k+</option>
      </select>
      <textarea className="min-h-40 w-full resize-none border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray focus:border-brand-black" placeholder="Message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
      <button className="rounded-sm bg-brand-black py-5 font-semibold tracking-wide text-brand-white transition hover:opacity-75" type="submit">
        Send message
      </button>
    </form>
  );
}
