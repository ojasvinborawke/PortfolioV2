import { FC, useEffect, useState } from "react";
import "./ProjectCard.css";

interface Repository {
  name: string;
  description: string;
  language: object;
  languages_url: string;
  homepage: string;
  has_pages: string;
}

interface ProjectCardProps {
  repository: Repository;
}

export const ProjectCard: FC<ProjectCardProps> = ({ repository }) => {
  const [lang, setlang] = useState({});
  const [loading, setLoading] = useState(true);
  const token = import.meta.env.VITE_SECRET_TOKEN;

  useEffect(() => {
    const fetchlang = async () => {
      try {
        const response = await fetch(repository.languages_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch language");
        }
        const data = await response.json();
        console.log(
          `gitdata for ${repository.name}:`,
          data,
          `\n`,
          Object.keys(data)
        );
        setlang(data);
      } finally {
        setLoading(false);
        console.log(loading);
      }
    };

    fetchlang();
  }, []);

  return (
    <div className="card">
      <div className="border" />
      <div className="content">
        <h2 className="title">
          <div>{repository.name}</div>
        </h2>
        <div className="details">
          <div className="flex place-content-start justify-between mb-4">
            <div className="flex items-center space-x-3"></div>
          </div>
          <p className="text-[#bd9f67] text-base justify-center h-[4.5rem] overflow-y-hidden overflow-ellipsis mx-[0.45rem] mt-[-2rem] md:mt-0 md:h-fit">
            {repository.description || "No description available"}
          </p>
          {
            <div className="text-sm font-bold italic text-[#bd9f67] m-3">
              {Object.keys(lang).join(", ")}
            </div>
          }
          {/* Add buttons */}
          <div className="button-container">
            <a
              href={`https://github.com/ojasvinborawke/${repository.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              View GitHub
            </a>
            {repository.homepage || repository.has_pages ? (
              <a
                href={
                  repository.homepage
                    ? repository.homepage
                    : `https://ojasvinborawke.github.io/${repository.name}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Visit Live Site
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
