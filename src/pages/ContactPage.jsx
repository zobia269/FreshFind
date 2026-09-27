import React from 'react';
import ContactSection from '../components/ContactSection';
import PageBackdrop from '../components/PageBackdrop';

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageBackdrop section="contact" />
      <ContactSection />
    </main>
  );
}
