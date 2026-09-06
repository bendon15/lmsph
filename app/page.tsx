import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { RolePreview } from "@/components/marketing/role-preview";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="features">
          <FeatureGrid />
        </div>
        <div id="roles">
          <RolePreview />
        </div>
      </main>
      <Footer />
    </>
  );
}
