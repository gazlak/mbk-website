import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { PageAnimations } from '@/components/layout/page-animations';
import { TopBar } from '@/components/layout/top-bar';
import { Approach } from '@/components/sections/approach';
import { Calculator } from '@/components/sections/calculator';
import { Contact } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { InquiryForm } from '@/components/sections/inquiry-form';
import { MapSection } from '@/components/sections/map-section';
import { References } from '@/components/sections/references';
import { ServicesDetail } from '@/components/sections/services-detail';
import { ServicesTicker } from '@/components/sections/services-ticker';
import { FEATURES } from '@/data/site';

export default function Home() {
  return (
    <>
      <Header topBar={<TopBar />} />
      <Hero />
      <ServicesTicker />
      <ServicesDetail />
      <Approach />
      {FEATURES.references && <References />}
      {FEATURES.calculator && <Calculator />}
      <Contact />
      <InquiryForm />
      <MapSection />
      <Footer />
      <PageAnimations />
    </>
  );
}
