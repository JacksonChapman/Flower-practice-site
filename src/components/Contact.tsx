import { useRef, useState } from "react";
import type { FormEvent, RefObject } from "react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";

// No backend on a static site — this just logs the payload and hands off to
// mailto. Replace with a fetch() to Formspree / Netlify Forms / your own
// endpoint when you're ready for real submissions (see README).
const SHOP_EMAIL = "hello@flowersbyme.example";

const OCCASIONS = [
  "Everyday arrangement",
  "Wedding or event",
  "Bloom Club subscription",
  "Sympathy or funeral",
  "Workshop",
  "Something else",
];

type FieldName = "name" | "email" | "phone" | "date" | "message";
type ValueField = FieldName | "occasion";

function validate(name: FieldName, value: string): string {
  switch (name) {
    case "name":
      if (!value.trim()) return "Please tell us your name.";
      if (value.trim().length < 2) return "That looks a little short — full name, please.";
      return "";
    case "email":
      if (!value.trim()) return "We need an email to reply to.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return "That email address looks incomplete.";
      return "";
    case "phone":
      if (!value.trim()) return "";
      if (value.replace(/\D/g, "").length < 10) return "Please include the area code, or leave this blank.";
      return "";
    case "date": {
      if (!value) return "When do you need these?";
      const picked = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(picked.getTime())) return "That date didn't read correctly.";
      if (picked < today) return "Please choose today or a date ahead.";
      return "";
    }
    case "message":
      if (!value.trim()) return "A sentence or two is plenty.";
      if (value.trim().length < 10) return "Tell us a bit more so we can quote it properly.";
      return "";
  }
}

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", date: "", occasion: OCCASIONS[0], message: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const fieldRefs: Record<FieldName, RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    email: emailRef,
    phone: useRef(null),
    date: dateRef,
    message: messageRef,
  };

  const todayISO = new Date().toISOString().split("T")[0];

  function handleBlur(field: FieldName) {
    if (errors[field] !== undefined || values[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }));
    }
  }

  function handleChange(field: ValueField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field === "occasion") return;
    setErrors((prev) => (prev[field] !== undefined ? { ...prev, [field]: validate(field, value) } : prev));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const fields: FieldName[] = ["name", "email", "phone", "date", "message"];
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) nextErrors[field] = validate(field, values[field]);
    setErrors(nextErrors);

    const firstInvalid = fields.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus({ type: "error", text: "Almost — a couple of fields need another look." });
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || "(not given)",
      date: values.date,
      occasion: values.occasion,
      message: values.message.trim(),
    };

    console.log("[Flowers by Me] inquiry submitted:", payload);

    const subject = `Flower inquiry — ${payload.occasion} — ${payload.date}`;
    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Date needed: ${payload.date}`,
      `Occasion: ${payload.occasion}`,
      "",
      payload.message,
    ].join("\n");

    window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus({
      type: "success",
      text: `Thanks, ${payload.name.split(" ")[0]} — your email app should be opening with the details filled in. Hit send and we'll reply within one business day. In a hurry? Call (307) 555-0148.`,
    });

    setValues({ name: "", email: "", phone: "", date: "", occasion: OCCASIONS[0], message: "" });
    setErrors({});
  }

  return (
    <section id="contact" className="py-18 md:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 md:grid-cols-[1.15fr_.85fr] md:gap-16 md:px-8">
        <div>
          <Reveal as="header" className="mb-10">
            <Badge variant="eyebrow" className="mb-4">
              <span className="mr-3 inline-block h-px w-7 bg-current align-middle opacity-70" />
              Order or inquire
            </Badge>
            <h2 className="mb-3 text-4xl md:text-5xl">
              Tell us what you <em className="font-normal text-primary italic">need</em>
            </h2>
            <p className="max-w-[52ch] text-lg text-muted-foreground">
              Fill this out and we'll get back to you within one business day. In a hurry, or need
              same-day? Call the shop — that's always fastest.
            </p>
          </Reveal>

          <Reveal>
          <form noValidate onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-1.5">
              <Label htmlFor="name">
                Your name <span className="text-primary">*</span>
              </Label>
              <Input
                id="name"
                ref={nameRef}
                autoComplete="name"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              <p id="name-error" role="alert" className="text-sm font-medium text-primary-hover empty:hidden">
                {errors.name}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="email">
                  Email <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  ref={emailRef}
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                <p id="email-error" role="alert" className="text-sm font-medium text-primary-hover empty:hidden">
                  {errors.email}
                </p>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="phone">
                  Phone <span className="text-xs font-normal tracking-normal text-ink-faint normal-case">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(307) 555-0123"
                  value={values.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby="phone-error"
                />
                <p id="phone-error" role="alert" className="text-sm font-medium text-primary-hover empty:hidden">
                  {errors.phone}
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="date">
                  Date needed <span className="text-primary">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  ref={dateRef}
                  min={todayISO}
                  value={values.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  onBlur={() => handleBlur("date")}
                  aria-invalid={!!errors.date}
                  aria-describedby="date-error"
                />
                <p id="date-error" role="alert" className="text-sm font-medium text-primary-hover empty:hidden">
                  {errors.date}
                </p>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={values.occasion} onValueChange={(value) => handleChange("occasion", value)}>
                  <SelectTrigger id="occasion">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="message">
                What are you thinking? <span className="text-primary">*</span>
              </Label>
              <Textarea
                id="message"
                ref={messageRef}
                rows={5}
                placeholder="Colors you love, colors you don't, budget range, delivery address — anything helps."
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
              />
              <p id="message-error" role="alert" className="text-sm font-medium text-primary-hover empty:hidden">
                {errors.message}
              </p>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button type="submit">Send inquiry</Button>
              <p className="text-sm text-ink-faint">We'll never share your details. No spam, ever.</p>
            </div>

            {status && (
              <Alert variant={status.type === "success" ? "success" : "destructive"}>{status.text}</Alert>
            )}
          </form>
          </Reveal>
        </div>

        <Reveal as="aside" aria-label="Shop details">
          <div className="rounded-lg border border-border bg-secondary p-7 md:sticky md:top-27 md:p-9">
            <h3 className="mb-3 text-xs font-bold tracking-[0.16em] text-sage uppercase">Visit the shop</h3>
            <address className="font-serif text-xl not-italic">
              <a
                href="https://www.google.com/maps/search/?api=1&query=214+S+Wolcott+St+Casper+WY+82601"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-border text-foreground hover:border-primary-hover hover:text-primary-hover"
              >
                214 S. Wolcott St
                <br />
                Casper, WY 82601
              </a>
            </address>
            <p className="mt-3 text-sm text-muted-foreground">
              A few blocks off downtown, near the Old Yellowstone District. Street parking out front.
            </p>

            <h3 className="mt-8 border-t border-border pt-7 text-xs font-bold tracking-[0.16em] text-sage uppercase">
              Hours
            </h3>
            <table className="w-full text-[0.9375rem]">
              <tbody>
                <tr>
                  <th scope="row" className="py-2 text-left font-bold">
                    Tue – Sat
                  </th>
                  <td className="py-2 text-right text-muted-foreground">9am – 5pm</td>
                </tr>
                <tr className="text-ink-faint">
                  <th scope="row" className="py-2 text-left font-bold">
                    Sun – Mon
                  </th>
                  <td className="py-2 text-right">Closed</td>
                </tr>
              </tbody>
            </table>

            <h3 className="mt-8 border-t border-border pt-7 text-xs font-bold tracking-[0.16em] text-sage uppercase">
              Get in touch
            </h3>
            <ul className="grid gap-3">
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[0.7rem] font-bold tracking-[0.14em] text-ink-faint uppercase">Phone</span>
                <a href="tel:+13075550148" className="text-[0.9375rem] font-medium text-primary-hover">
                  (307) 555-0148
                </a>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[0.7rem] font-bold tracking-[0.14em] text-ink-faint uppercase">Instagram</span>
                <a
                  href="https://instagram.com/flowersbyme.casper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9375rem] font-medium text-primary-hover"
                >
                  @flowersbyme.casper
                </a>
              </li>
            </ul>

            <p className="mt-7 rounded-sm bg-accent px-4.5 py-4 text-[0.8438rem] leading-relaxed text-[#6e3520]">
              <strong>Same-day cutoff:</strong> order by 1pm for afternoon delivery in Casper, Mills and
              Evansville.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
