import React from 'react';
import AboutSection from '../components/AboutSection';
import PageBackdrop from '../components/PageBackdrop';

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageBackdrop section="about" />
      <AboutSection />
    </main>
  );
}
