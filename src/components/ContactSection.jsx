import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle } from 'lucide-react';

const CONTACT_CHANNELS = [
  { icon: Mail, label: 'Email', value: 'hello@freshfind.local', href: 'mailto:hello@freshfind.local' },
  { icon: Phone, label: 'Community Helpline', value: '+1 (555) 019-4273', href: 'tel:+15550194273' },
  { icon: MapPin, label: 'Coordination Desk', value: '14 Market Hall Arcade, Downtown Civic District', href: null },
];

const FAQ_ITEMS = [
  {
    question: 'How often are market schedules updated?',
    answer:
      'Operating days and hours are verified weekly with regional farm organizers to account for seasonal shift changes.',
  },
  {
    question: 'Do markets stay open during rain?',
    answer:
      'Yes! Almost all certified farmers markets operate rain or shine under canopy tents.',
  },
  {
    question: 'What is the best arrival time?',
    answer:
      'Arrive within the first 60 minutes for rare wild items (morels, ramps), or the final 45 minutes for bulk discounts on ripe canning produce.',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Suggest a New Local Market',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Suggest a New Local Market', message: '' });
    }, 4000);
  };

  return (
    <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 scroll-mt-20">

      {/* Page Intro Band */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Community Contact</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif leading-tight text-slate-900">
          Get in Touch with <span className="text-emerald-600">FreshFind</span>
        </h2>
        <p className="text-slate-500 text-sm max-w-2xl">
          Have an update on market operating hours or want to suggest a new grower? Send us a message and our
          community coordination team will get back to you.
        </p>
      </div>

      {/* Direct Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CONTACT_CHANNELS.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {label}
                </span>
                <span className="text-xs font-semibold text-slate-800 block">{value}</span>
              </div>
            </>
          );

          return href ? (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              {content}
            </a>
          ) : (
            <div
              key={label}
              className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs"
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* Contact Form & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-serif text-slate-900">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-500">
              Have an update on market operating hours or want to suggest a new grower? Send us a message!
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm">Thank You for Your Feedback!</h4>
              <p className="text-xs text-slate-600">
                Your message has been received by our community coordination team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Farhan"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Suggest a New Local Market">Suggest a New Local Market</option>
                  <option value="Report Schedule / Hours Change">Report Schedule / Hours Change</option>
                  <option value="Grower Stall Inquiry">Grower Stall Inquiry</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about market locations, operating hours, or grower inquiries..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Community Message</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Accordion (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold font-serif">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Frequently Asked Resident Questions</span>
          </div>

          <div className="space-y-3 text-xs">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">{item.question}</strong>
                <p className="text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
