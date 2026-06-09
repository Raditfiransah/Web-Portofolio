import fs from "fs/promises";
import path from "path";
import Hero from "./components/Hero";
import RolesSection from "./components/RolesSection";
import LogoLoop from "@/components/LogoLoop";
import AppleCardsCarouselDemo from "@/components/apple-cards-carousel-demo";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

const staticLogosFallback = [
  {
    name: "Docker",
    imageUrl: "https://cdn.simpleicons.org/docker",
    href: "https://www.docker.com",
  },
  {
    name: "Laravel",
    imageUrl: "https://cdn.simpleicons.org/laravel",
    href: "https://laravel.com",
  },
  {
    name: "Python",
    imageUrl: "https://cdn.simpleicons.org/python",
    href: "https://www.python.org",
  },
  {
    name: "JavaScript",
    imageUrl: "https://cdn.simpleicons.org/javascript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React",
    imageUrl: "https://cdn.simpleicons.org/react",
    href: "https://react.dev",
  },
  {
    name: "Kubernetes",
    imageUrl: "https://cdn.simpleicons.org/kubernetes",
    href: "https://kubernetes.io",
  },
  {
    name: "TensorFlow",
    imageUrl: "https://cdn.simpleicons.org/tensorflow",
    href: "https://www.tensorflow.org",
  },
  {
    name: "PyTorch",
    imageUrl: "https://cdn.simpleicons.org/pytorch",
    href: "https://pytorch.org",
  },
  {
    name: "GitHub",
    imageUrl: "https://cdn.simpleicons.org/github/ffffff",
    href: "https://github.com",
  },
  {
    name: "FastAPI",
    imageUrl: "https://cdn.simpleicons.org/fastapi",
    href: "https://fastapi.tiangolo.com",
  },
  {
    name: "Prometheus",
    imageUrl: "https://cdn.simpleicons.org/prometheus",
    href: "https://prometheus.io",
  },
  {
    name: "Grafana",
    imageUrl: "https://cdn.simpleicons.org/grafana",
    href: "https://grafana.com",
  },
];

async function getHomepageData() {
  try {
    const filePath = path.join(process.cwd(), "data", "homepage.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading homepage data:", error);
    return null;
  }
}

export default async function Home() {
  const data = await getHomepageData();

  const heroData = data?.hero;
  const rolesData = data?.roles;
  const projectsData = data?.projects;
  const logosData = data?.logos || staticLogosFallback;
  const footerData = data?.footer;

  const loopLogos = logosData.map((logo: any) => ({
    src: logo.imageUrl,
    alt: logo.name,
    title: logo.name,
    href: logo.href,
  }));

  return (
    <>
      <Hero data={heroData} />
      <RolesSection data={rolesData} />
      
      <AppleCardsCarouselDemo data={projectsData} />
      
      {/* LogoLoop Section */}
      <section className="w-full bg-black py-10 md:py-16 flex flex-col items-center justify-center border-t border-white/5">
        <div className="max-w-7xl w-full px-6 md:px-12 flex flex-col items-center">
          <h3 className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-8 text-center">
            Technologies I Work With
          </h3>
          <div className="w-full overflow-hidden">
            <LogoLoop
              logos={loopLogos}
              speed={45}
              direction="left"
              logoHeight={36}
              gap={56}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#000000"
            />
          </div>
        </div>
      </section>

      <Footer data={footerData} />
    </>
  );
}
