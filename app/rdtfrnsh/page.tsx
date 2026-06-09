"use client";

import React, { useState, useEffect } from "react";
import {
  IconLock,
  IconDeviceFloppy,
  IconPlus,
  IconTrash,
  IconChevronDown,
  IconChevronUp,
  IconArrowLeft,
  IconDeviceLaptop,
} from "@tabler/icons-react";

const LoadingSpinner = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// Types
interface HeroData {
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
}

interface RoleCard {
  title: string;
  subtitle: string;
  description: string;
  iconType: string;
  bg: string;
  text: string;
  accent: string;
}

interface ProjectData {
  category: string;
  title: string;
  src: string;
  description: string;
  stack: string[];
  features: string[];
}

interface LogoData {
  name: string;
  imageUrl: string;
  href: string;
}

interface FooterData {
  tagline: string;
  instagram: string;
  linkedin: string;
  github: string;
  email: string;
  copyright: string;
  thankYouText: string;
}

interface HomepageData {
  hero: HeroData;
  roles: RoleCard[];
  projects: ProjectData[];
  logos: LogoData[];
  footer: FooterData;
}

// Toast Component state
interface Toast {
  message: string;
  type: "success" | "error";
  visible: boolean;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "roles" | "projects" | "tech" | "footer">("hero");
  const [data, setData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // UI states
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(0);
  const [newTagInputs, setNewTagInputs] = useState<string[]>([]);
  const [newFeatureInputs, setNewFeatureInputs] = useState<string[]>([]);
  
  // Toast notification state
  const [toast, setToast] = useState<Toast>({ message: "", type: "success", visible: false });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Check if passcode is saved in sessionStorage
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem("rdtfrnsh_passcode");
    if (savedPasscode) {
      verifySavedPasscode(savedPasscode);
    }
  }, []);

  const verifySavedPasscode = async (code: string) => {
    setIsAuthenticating(true);
    try {
      const res = await fetch("/api/homepage-data", {
        headers: {
          Authorization: `Bearer ${code}`,
        },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setPasscode(code);
        sessionStorage.setItem("rdtfrnsh_passcode", code);
        const fetchedData = await res.json();
        setData(fetchedData);
        // Initialize helper inputs for project tags and features
        if (fetchedData.projects) {
          setNewTagInputs(new Array(fetchedData.projects.length).fill(""));
          setNewFeatureInputs(new Array(fetchedData.projects.length).fill(""));
        }
      } else {
        sessionStorage.removeItem("rdtfrnsh_passcode");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setIsAuthenticating(true);
    try {
      const res = await fetch("/api/homepage-data", {
        headers: {
          Authorization: `Bearer ${passcode}`,
        },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("rdtfrnsh_passcode", passcode);
        const fetchedData = await res.json();
        setData(fetchedData);
        if (fetchedData.projects) {
          setNewTagInputs(new Array(fetchedData.projects.length).fill(""));
          setNewFeatureInputs(new Array(fetchedData.projects.length).fill(""));
        }
        showToast("Logged in successfully!", "success");
      } else {
        showToast("Invalid passcode. Please try again.", "error");
      }
    } catch (err) {
      showToast("Server error occurred.", "error");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/homepage-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${passcode}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast("Homepage updated successfully!", "success");
      } else {
        const errData = await res.json();
        showToast(errData.error || "Failed to save data.", "error");
      }
    } catch (err) {
      showToast("Failed to connect to API.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("rdtfrnsh_passcode");
    setIsAuthenticated(false);
    setPasscode("");
    setData(null);
  };

  // State modification helpers
  const updateHero = (field: keyof HeroData, value: string) => {
    if (!data) return;
    setData({
      ...data,
      hero: {
        ...data.hero,
        [field]: value,
      },
    });
  };

  const updateRole = (index: number, field: keyof RoleCard, value: string) => {
    if (!data) return;
    const updatedRoles = [...data.roles];
    updatedRoles[index] = {
      ...updatedRoles[index],
      [field]: value,
    };
    setData({
      ...data,
      roles: updatedRoles,
    });
  };

  // Projects Helpers
  const updateProject = (index: number, field: keyof ProjectData, value: any) => {
    if (!data) return;
    const updatedProjects = [...data.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    setData({
      ...data,
      projects: updatedProjects,
    });
  };

  const addProject = () => {
    if (!data) return;
    const newProj: ProjectData = {
      category: "New Category",
      title: "New Project Title",
      src: "/images/image.png",
      description: "Project Description",
      stack: ["React", "CSS"],
      features: ["Feature 1"],
    };
    const updatedProjects = [...data.projects, newProj];
    setData({
      ...data,
      projects: updatedProjects,
    });
    setNewTagInputs([...newTagInputs, ""]);
    setNewFeatureInputs([...newFeatureInputs, ""]);
    setExpandedProjectIndex(updatedProjects.length - 1);
  };

  const deleteProject = (index: number) => {
    if (!data) return;
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = data.projects.filter((_, i) => i !== index);
      setData({
        ...data,
        projects: updatedProjects,
      });
      setNewTagInputs(newTagInputs.filter((_, i) => i !== index));
      setNewFeatureInputs(newFeatureInputs.filter((_, i) => i !== index));
      setExpandedProjectIndex(updatedProjects.length > 0 ? 0 : null);
    }
  };

  const addTag = (projIndex: number) => {
    if (!data) return;
    const tag = newTagInputs[projIndex].trim();
    if (!tag) return;
    
    const project = data.projects[projIndex];
    if (project.stack.includes(tag)) {
      showToast("Tag already exists", "error");
      return;
    }
    
    const updatedStack = [...project.stack, tag];
    updateProject(projIndex, "stack", updatedStack);
    
    // Clear input
    const updatedInputs = [...newTagInputs];
    updatedInputs[projIndex] = "";
    setNewTagInputs(updatedInputs);
  };

  const removeTag = (projIndex: number, tagIndex: number) => {
    if (!data) return;
    const project = data.projects[projIndex];
    const updatedStack = project.stack.filter((_, i) => i !== tagIndex);
    updateProject(projIndex, "stack", updatedStack);
  };

  const addFeature = (projIndex: number) => {
    if (!data) return;
    const feature = newFeatureInputs[projIndex].trim();
    if (!feature) return;

    const project = data.projects[projIndex];
    const updatedFeatures = [...project.features, feature];
    updateProject(projIndex, "features", updatedFeatures);

    // Clear input
    const updatedInputs = [...newFeatureInputs];
    updatedInputs[projIndex] = "";
    setNewFeatureInputs(updatedInputs);
  };

  const removeFeature = (projIndex: number, featureIndex: number) => {
    if (!data) return;
    const project = data.projects[projIndex];
    const updatedFeatures = project.features.filter((_, i) => i !== featureIndex);
    updateProject(projIndex, "features", updatedFeatures);
  };

  // Technologies (Logos) Helpers
  const updateLogo = (index: number, field: keyof LogoData, value: string) => {
    if (!data) return;
    const updatedLogos = [...data.logos];
    updatedLogos[index] = {
      ...updatedLogos[index],
      [field]: value,
    };
    setData({
      ...data,
      logos: updatedLogos,
    });
  };

  const addLogo = () => {
    if (!data) return;
    const newLogo: LogoData = {
      name: "New Technology",
      imageUrl: "https://cdn.simpleicons.org/react",
      href: "https://react.dev",
    };
    setData({
      ...data,
      logos: [...data.logos, newLogo],
    });
  };

  const deleteLogo = (index: number) => {
    if (!data) return;
    const updatedLogos = data.logos.filter((_, i) => i !== index);
    setData({
      ...data,
      logos: updatedLogos,
    });
  };

  // Footer Helpers
  const updateFooter = (field: keyof FooterData, value: string) => {
    if (!data) return;
    setData({
      ...data,
      footer: {
        ...data.footer,
        [field]: value,
      },
    });
  };

  // Passcode gate view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 font-sans text-white relative overflow-hidden">
        {/* Glow backdrop decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-md w-full backdrop-blur-md bg-zinc-900/40 border border-white/5 p-8 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center mb-6">
            <IconLock className="w-8 h-8 text-zinc-300" />
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-center uppercase">Admin Console</h1>
          <p className="text-zinc-500 text-sm text-center mb-8">
            Access restricted. Please enter the passcode to customize your web portfolio.
          </p>

          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-6">
              <label htmlFor="passcode" className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Passcode
              </label>
              <input
                id="passcode"
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                disabled={isAuthenticating}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-white/30 transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>
                  <LoadingSpinner className="w-4 h-4" />
                  Verifying...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>

        {/* Toast */}
        {toast.visible && (
          <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-300 transform translate-y-0 ${
            toast.type === "success" 
              ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/20" 
              : "bg-red-950/80 text-red-400 border-red-500/20"
          }`}>
            {toast.message}
          </div>
        )}
      </div>
    );
  }

  // Dashboard loaded view
  if (!data) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white font-sans">
        <LoadingSpinner className="w-8 h-8 text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-white/5 backdrop-blur-md bg-black/55 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/20 transition text-xs text-zinc-400 hover:text-white">
              <IconArrowLeft className="w-3.5 h-3.5" />
              View Site
            </a>
            <span className="h-4 w-px bg-white/10"></span>
            <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Admin console
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="text-xs text-zinc-500 hover:text-zinc-300 font-medium transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <LoadingSpinner className="w-3.5 h-3.5" />
                  Saving...
                </>
              ) : (
                <>
                  <IconDeviceFloppy className="w-3.5 h-3.5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Layout Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-1.5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 px-4 mb-2">Sections</h2>
          
          <button
            onClick={() => setActiveTab("hero")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "hero" 
                ? "bg-zinc-900 text-white border-l-2 border-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-950"
            }`}
          >
            Hero Header
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "roles" 
                ? "bg-zinc-900 text-white border-l-2 border-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-950"
            }`}
          >
            Roles scroll stack
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "projects" 
                ? "bg-zinc-900 text-white border-l-2 border-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-950"
            }`}
          >
            Projects Carousel
          </button>
          <button
            onClick={() => setActiveTab("tech")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "tech" 
                ? "bg-zinc-900 text-white border-l-2 border-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-950"
            }`}
          >
            Tech logos loop
          </button>
          <button
            onClick={() => setActiveTab("footer")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "footer" 
                ? "bg-zinc-900 text-white border-l-2 border-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-950"
            }`}
          >
            Footer Links & Socials
          </button>

          <div className="mt-8 p-4 rounded-2xl bg-zinc-900/30 border border-white/5">
            <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-zinc-500 block mb-2">Notice</span>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Ensure you click <strong className="text-white">Save Changes</strong> in the top right after making edits. Refreshes will discard unsaved work.
            </p>
          </div>
        </aside>

        {/* Dynamic Form Editor */}
        <main className="lg:col-span-3">
          
          {/* Hero Form */}
          {activeTab === "hero" && (
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-md flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold">Hero Customization</h3>
                <p className="text-zinc-500 text-xs mt-1">Configure the landing view titles and paragraph.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Title Part 1 (Left)</label>
                  <input
                    type="text"
                    value={data.hero.titlePart1}
                    onChange={(e) => updateHero("titlePart1", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Title Part 2 (Right)</label>
                  <input
                    type="text"
                    value={data.hero.titlePart2}
                    onChange={(e) => updateHero("titlePart2", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Bio / Subtitle Paragraph</label>
                <textarea
                  rows={4}
                  value={data.hero.subtitle}
                  onChange={(e) => updateHero("subtitle", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20 transition-all leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Roles Form */}
          {activeTab === "roles" && (
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-md">
                <h3 className="text-lg font-bold">Roles Stack Settings</h3>
                <p className="text-zinc-500 text-xs mt-1">Edit the details for the layered role cards displayed on scroll.</p>
              </div>

              {data.roles.map((role, idx) => (
                <div key={idx} className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 flex flex-col gap-6 relative">
                  <span className="absolute top-4 right-6 text-xs font-mono text-zinc-600">Card #{idx + 1}</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        value={role.title}
                        onChange={(e) => updateRole(idx, "title", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={role.subtitle}
                        onChange={(e) => updateRole(idx, "subtitle", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Description</label>
                    <textarea
                      rows={2}
                      value={role.description}
                      onChange={(e) => updateRole(idx, "description", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-zinc-400 text-[10px] uppercase tracking-wider font-semibold mb-1.5">Icon Type</label>
                      <select
                        value={role.iconType}
                        onChange={(e) => updateRole(idx, "iconType", e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none"
                      >
                        <option value="role">Generic Role</option>
                        <option value="aiml">AI / ML</option>
                        <option value="mlops">MLOps Gear</option>
                        <option value="website">Browser Website</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-[10px] uppercase tracking-wider font-semibold mb-1.5">Background Class</label>
                      <input
                        type="text"
                        value={role.bg}
                        onChange={(e) => updateRole(idx, "bg", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-[10px] uppercase tracking-wider font-semibold mb-1.5">Text Class</label>
                      <input
                        type="text"
                        value={role.text}
                        onChange={(e) => updateRole(idx, "text", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-[10px] uppercase tracking-wider font-semibold mb-1.5">Accent Class</label>
                      <input
                        type="text"
                        value={role.accent}
                        onChange={(e) => updateRole(idx, "accent", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Form */}
          {activeTab === "projects" && (
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">Featured Projects</h3>
                  <p className="text-zinc-500 text-xs mt-1">Manage project details, image paths, tech stack badges, and bullet points.</p>
                </div>
                <button
                  onClick={addProject}
                  className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  Add Project
                </button>
              </div>

              {data.projects.length === 0 ? (
                <div className="p-16 border border-dashed border-white/10 rounded-3xl text-center text-zinc-500 text-sm">
                  No projects added yet. Click &ldquo;Add Project&rdquo; to start.
                </div>
              ) : (
                data.projects.map((project, idx) => {
                  const isExpanded = expandedProjectIndex === idx;
                  return (
                    <div key={idx} className="border border-white/5 bg-zinc-900/10 rounded-3xl overflow-hidden">
                      {/* Collapse Header */}
                      <div
                        onClick={() => setExpandedProjectIndex(isExpanded ? null : idx)}
                        className="p-5 flex items-center justify-between cursor-pointer hover:bg-zinc-900/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-6 h-6 rounded-md bg-zinc-800 border border-white/10 text-xs flex items-center justify-center font-mono text-zinc-400">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">{project.category}</span>
                            <h4 className="text-sm font-bold mt-0.5 text-zinc-200">{project.title}</h4>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProject(idx);
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-950/30 text-zinc-500 hover:text-red-400 transition-colors"
                            title="Delete project"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                          {isExpanded ? <IconChevronUp className="w-4 h-4 text-zinc-500" /> : <IconChevronDown className="w-4 h-4 text-zinc-500" />}
                        </div>
                      </div>

                      {/* Content Form */}
                      {isExpanded && (
                        <div className="p-8 border-t border-white/5 bg-zinc-900/20 flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Category</label>
                              <input
                                type="text"
                                value={project.category}
                                onChange={(e) => updateProject(idx, "category", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20"
                              />
                            </div>
                            <div>
                              <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Image Source Path</label>
                              <input
                                type="text"
                                value={project.src}
                                onChange={(e) => updateProject(idx, "src", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none focus:border-white/20 font-mono text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Project Title</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProject(idx, "title", e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Project Description</label>
                            <textarea
                              rows={3}
                              value={project.description}
                              onChange={(e) => updateProject(idx, "description", e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none leading-relaxed"
                            />
                          </div>

                          {/* Tech Stack Tags */}
                          <div>
                            <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Tech Stack Tags</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.stack.map((tech, techIdx) => (
                                <span key={techIdx} className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-white/5 flex items-center gap-1.5 text-zinc-300 font-medium">
                                  {tech}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(idx, techIdx)}
                                    className="hover:text-red-400 text-[10px]"
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Add tech (e.g. Next.js, Python)"
                                value={newTagInputs[idx] || ""}
                                onChange={(e) => {
                                  const updated = [...newTagInputs];
                                  updated[idx] = e.target.value;
                                  setNewTagInputs(updated);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTag(idx);
                                  }
                                }}
                                className="flex-1 px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => addTag(idx)}
                                className="px-3 py-2 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
                              >
                                Add Tag
                              </button>
                            </div>
                          </div>

                          {/* Key Features Bullet points */}
                          <div>
                            <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Key Features (Bullet Points)</label>
                            <div className="flex flex-col gap-2 mb-3">
                              {project.features.map((feature, featIdx) => (
                                <div key={featIdx} className="flex justify-between items-start gap-4 p-3 rounded-lg bg-zinc-950 border border-white/5 text-xs text-zinc-400 leading-relaxed">
                                  <span>{feature}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFeature(idx, featIdx)}
                                    className="p-1 rounded hover:bg-zinc-900 text-zinc-500 hover:text-red-400 transition-colors"
                                  >
                                    <IconTrash className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Add feature detail bullet point..."
                                value={newFeatureInputs[idx] || ""}
                                onChange={(e) => {
                                  const updated = [...newFeatureInputs];
                                  updated[idx] = e.target.value;
                                  setNewFeatureInputs(updated);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addFeature(idx);
                                  }
                                }}
                                className="flex-1 px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => addFeature(idx)}
                                className="px-3 py-2 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
                              >
                                Add Feature
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Tech logos loop Form */}
          {activeTab === "tech" && (
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">Technologies &amp; Logoloop</h3>
                  <p className="text-zinc-500 text-xs mt-1">Configure name, brand SVG image links, and target websites for the slider.</p>
                </div>
                <button
                  onClick={addLogo}
                  className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  Add Tech
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.logos.map((logo, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-zinc-900/20 relative flex flex-col gap-4">
                    <button
                      onClick={() => deleteLogo(idx)}
                      className="absolute top-4 right-4 p-1 rounded hover:bg-zinc-800 text-zinc-600 hover:text-red-400"
                      title="Delete technology"
                    >
                      <IconTrash className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center overflow-hidden p-1.5">
                        {logo.imageUrl ? (
                          <img src={logo.imageUrl} alt={logo.name} className="w-full h-full object-contain" onError={(e)=>{e.currentTarget.style.display='none'}} />
                        ) : (
                          <IconDeviceLaptop className="w-5 h-5 text-zinc-600" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-zinc-300">{logo.name || "Unnamed"}</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mb-1">Name</label>
                        <input
                          type="text"
                          value={logo.name}
                          onChange={(e) => updateLogo(idx, "name", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mb-1">Icon URL (SimpleIcons CDN)</label>
                        <input
                          type="text"
                          value={logo.imageUrl}
                          onChange={(e) => updateLogo(idx, "imageUrl", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mb-1">Target Href URL</label>
                        <input
                          type="text"
                          value={logo.href}
                          onChange={(e) => updateLogo(idx, "href", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Form */}
          {activeTab === "footer" && (
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-md flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold">Footer Configuration</h3>
                <p className="text-zinc-500 text-xs mt-1">Configure contact parameters, copy lines, and social links.</p>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Footer Tagline</label>
                <textarea
                  rows={2}
                  value={data.footer.tagline}
                  onChange={(e) => updateFooter("tagline", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Instagram Link</label>
                  <input
                    type="text"
                    value={data.footer.instagram}
                    onChange={(e) => updateFooter("instagram", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">LinkedIn Link</label>
                  <input
                    type="text"
                    value={data.footer.linkedin}
                    onChange={(e) => updateFooter("linkedin", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">GitHub Link</label>
                  <input
                    type="text"
                    value={data.footer.github}
                    onChange={(e) => updateFooter("github", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={data.footer.email}
                    onChange={(e) => updateFooter("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Copyright Copy</label>
                  <input
                    type="text"
                    value={data.footer.copyright}
                    onChange={(e) => updateFooter("copyright", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Huge Bottom Text</label>
                  <input
                    type="text"
                    value={data.footer.thankYouText}
                    onChange={(e) => updateFooter("thankYouText", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-white text-sm focus:outline-none font-black text-xs"
                  />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Footer message */}
      <footer className="py-6 border-t border-white/5 bg-zinc-950 text-center text-xs text-zinc-600 mt-auto">
        <p>© {new Date().getFullYear()} Radit Portfolio Admin System. Under license.</p>
      </footer>

      {/* Toast */}
      {toast.visible && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl border text-sm font-medium shadow-2xl transition-all duration-300 transform translate-y-0 ${
          toast.type === "success" 
            ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/20" 
            : "bg-red-950/80 text-red-400 border-red-500/20"
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
