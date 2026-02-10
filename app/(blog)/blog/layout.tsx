import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <Section>
        <Container className="space-y-16">
          {children}
        </Container>
      </Section>
      <Footer />
    </div>
  );
}
