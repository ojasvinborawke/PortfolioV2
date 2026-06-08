import { ProjectCard } from "../Components/ProjectCard";
import { useState, useEffect } from "react";

interface Repository {
  name: string;
  description: string;
  language: object;
  languages_url: string;
  homepage: string;
  has_pages: string;
}

function ProjectPage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = import.meta.env.VITE_SECRET_TOKEN;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/ojasvinborawke/repos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        console.log("gitdata :", data);
        setRepos(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch repositories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw", // Set a width for the scrollable container
          height: "100vh", // Set a height for the scrollable container
          overflowY: "auto", // Enable vertical scrolling
          overflowX: "hidden", // Disable horizontal scrolling
        }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-2xl text-gray-600">Loading repositories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-red-600">Error: {error}</div>
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100vw", // Set a width for the scrollable container
        height: "100vh", // Set a height for the scrollable container
        overflowY: "auto", // Enable vertical scrolling
        overflowX: "hidden", // Disable horizontal scrolling
      }}
    >
      <style>
        {`
          /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
          div::-webkit-scrollbar {
            display: none;
          }
          `}
      </style>
      <div className="min-h-screen py-20 ml-11 md:ml-16">
        <div className="container mx-auto px-4">
          <h1 className="text-7xl font-extrabold  text-[#b99757] mb-4 text-center">
            My Projects
          </h1>
          <p className="text-center mb-12 max-w-2xl mx-auto text-xl">
            Explore my portfolio of projects showcasing web development, design,
            and open source contributions. Hover over each card to learn more
            about the project.
          </p>
          <div className="grid md:grid-cols-2 gap-10 justify-items-center">
            {repos
            .filter((repo) => repo.name.toLowerCase() !== "ojasvinborawke")
            .map((repo) => (
              <ProjectCard key={repo.name} repository={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
