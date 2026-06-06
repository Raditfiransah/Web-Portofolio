import Hero from "./components/Hero";
import RolesSection from "./components/RolesSection";
import LogoLoop from "@/components/LogoLoop";

const logos = [
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

export default function Home() {
  const loopLogos = logos.map((logo) => ({
    src: logo.imageUrl,
    alt: logo.name,
    title: logo.name,
    href: logo.href,
  }));

  return (
    <>
      <Hero />
      <RolesSection />
      
      {/* LogoLoop Section */}
      <section className="w-full bg-black py-24 md:py-32 flex flex-col items-center justify-center border-t border-white/5">
        <div className="max-w-7xl w-full px-6 md:px-12 flex flex-col items-center">
          <h3 className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-12 text-center">
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
    </>
  );
}
