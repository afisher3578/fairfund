import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainStyles.css";
import ao from "../../assets/ao.svg";
import alex from "../../assets/alex.svg";
import dataOS from "../../assets/dataOS.svg";
import hyperbeam from "../../assets/hyperbeam_outline.svg";

import stamp from "../../assets/stamp.svg";
import ucm from "../../assets/ucm.svg";
import udl from "../../assets/udl.svg";
import weavers from "../../assets/weavers.svg";
import zine from "../../assets/zine.svg";

import useParallaxScroll from "../../globalHooks/SlowScroll";
import arrowRight from "../../assets/arrowRight.svg";

interface Project {
  logo: string;
  header: string;
  content: string;
  link: string;
  price: string;
  fundingGoal: string;
  collected: string;
  backers: number;
  daysLeft: number;
  status: "active" | "past";
}

const Main = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  // Convert project header to URL-friendly slug
  const getProjectSlug = (header: string) => {
    return header.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
  };

  const projects: Project[] = [
    {
      logo: zine,
      header: "Permaweb Journal",
      content:
        "Permaweb Journal is an onchain and print publication covering the evolution of the web. Published quarterly in print and onchain, the journal explore the technical, cultural, and philosophical dimensions of building permanent digital infrastructure.",
      link: "https://r5oplrv7h4wuzcjn64s2fkn6x4o3rwdvxsok2pvyoo6lxmdnkm6a.arweave.net/j1z1xr8_LUyJLfcloqm-vx242HW8nK0-uHO8u7BtUzw/",
      price: "0.5 AR per issue",
      fundingGoal: "400 AR",
      collected: "158 AR",
      backers: 42,
      daysLeft: 15,
      status: "active",
    },
    {
      logo: alex,
      header: "Alex.",
      content:
        "Alex. is a decentralized archival platform. Inspired by the great library of alexandria, the mission of Alex. is to preserve important historical artifacts for the enrichment of all people. Institutions and creators are incentivized to publicly archive digital content by allowing anyone to become sponsors of their digital artifacts.",
      link: "http://alex.arweave.net",
      price: "0.5 AR per artifact",
      fundingGoal: "500 AR",
      collected: "342 AR",
      backers: 68,
      daysLeft: 22,
      status: "past",
    },
    {
      logo: ao,
      header: "AO",
      content:
        "ao is the Hyper Parallel Computer. ao allows countless parallel processes to interact within a single, cohesive computing environment, seamlessly interlinked through a native message-passing layer. It is a burgeoning ecosystem of decentralized programs, akin to the World Wide Web, where each process operates independently yet is intricately woven into a unified experience. ",
      link: "http://ao.arweave.net",
      price: "1.0 AR minimum",
      fundingGoal: "1000 AR",
      collected: "856 AR",
      backers: 124,
      daysLeft: 18,
      status: "active",
    },
    {
      logo: dataOS,
      header: "Data OS",
      content:
        "Data OS is an operating system on top of arweave, aiming to build a versatile data & AI backbone. It offers clear insights into Arweave's data, and aids protocols in crafting user-focused, data-centric applications. Data os enables a new generation of tools, including large language models and infrastructure tooling.",
      link: "https://www.dataos.so/",
      price: "0.25 AR per query",
      fundingGoal: "750 AR",
      collected: "623 AR",
      backers: 95,
      daysLeft: 12,
      status: "past",
    },
    {
      logo: hyperbeam,
      header: "Hyperbeam",
      content:
        "Hyperbeam is a decentralized operating system most known for its implementation of the AO-Core protocol.",
      link: "https://hyperbeam.ar.io",
      price: "2.0 AR minimum",
      fundingGoal: "2000 AR",
      collected: "1245 AR",
      backers: 87,
      daysLeft: 25,
      status: "active",
    },
    {
      logo: stamp,
      header: "Stamp Protocol",
      content:
        "Stamps are the universal and composable 'like' button of Arweave's permaweb. Stamps enable users to show their support and preferences to creators, and can be used to curate and rank content across an unlimited number of applications.",
      link: "https://stamps.arweave.net/#/en/main",
      price: "0.1 AR per stamp",
      fundingGoal: "300 AR",
      collected: "287 AR",
      backers: 156,
      daysLeft: 8,
      status: "active",
    },
    {
      logo: ucm,
      header: "Universal Content Marketplace",
      content:
        "UCM is a protocol that enables the trustless exchange of any atomic asset on the permaweb, implemented as a warp smart contract. It goes beyond just nfts, allowing for the exchange of images, music, videos, papers, names, components, and even entire web apps.",
      link: "https://twitter.com/rakis_me/status/1686833028432277504",
      price: "0.75 AR minimum",
      fundingGoal: "1500 AR",
      collected: "982 AR",
      backers: 73,
      daysLeft: 20,
      status: "active",
    },
    {
      logo: udl,
      header: "Universal Data License",
      content:
        "A standard framework for digital content monetization on the permaweb, UDL allows creators to set their own terms for the usage of content that they upload to Arweave, and for developers to permissionlessly license that data in their apps. The license provides programmable parameters for all aspects of monetization.",
      link: "https://arwiki.wiki/#/en/Universal-Data-License-How-to-use-it",
      price: "0.5 AR minimum",
      fundingGoal: "800 AR",
      collected: "654 AR",
      backers: 89,
      daysLeft: 14,
      status: "active",
    },
    {
      logo: weavers,
      header: "Weavers",
      content:
        "The most exciting community of devs and creatives in the arweave ecosystem. Weavers creates a wide range of events and initiatives that empower community members to contribute, connect, and have their voices heard.",
      link: "https://twitter.com/Weavers_Org",
      price: "0.3 AR minimum",
      fundingGoal: "600 AR",
      collected: "478 AR",
      backers: 102,
      daysLeft: 17,
      status: "past",
    },
  ];

  projects.sort((a, b) => {
    if (a.header.toLowerCase() < b.header.toLowerCase()) {
      return -1;
    }
    if (a.header.toLowerCase() > b.header.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const filteredProjects = projects.filter(
    (project) => project.status === activeTab
  );

  useParallaxScroll();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <main>
      <div className="main-wrapper">
        <div className="current-projects-wrapper">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "active" ? "active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Active Campaigns
            </button>
            <button
              className={`tab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Past Campaigns
            </button>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`project ${project.header}`}
                onClick={() => handleProjectClick(project)}
                style={{ cursor: "pointer" }}
              >
                <div className="project-top">
                  <div className="logo-header underline">
                    <img
                      src={project.logo}
                      alt={`${project.header}-outline-logo`}
                    />

                    <h3>{project.header}</h3>
                  </div>
                  <p className="project-content">{project.content}</p>
                </div>
                <div className="project-bottom">
                  <span className="learn-more">View Details</span>
                  <div className="project-links">
                    <img src={arrowRight} alt="arrow-right" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {selectedProject && (
        <>
          <div
            className={`panel-overlay ${isPanelOpen ? "open" : ""}`}
            onClick={handleClosePanel}
          />
          <div className={`side-panel ${isPanelOpen ? "open" : ""}`}>
            <div className="panel-header">
              <h2>{selectedProject.header}</h2>
              <button className="close-btn" onClick={handleClosePanel}>
                ✕
              </button>
            </div>

            <div className="panel-content">
              <div className="panel-logo">
                <img
                  src={selectedProject.logo}
                  alt={`${selectedProject.header}-logo`}
                />
              </div>

              <div className="panel-section">
                <h3>About</h3>
                <p>{selectedProject.content}</p>
              </div>

              <div className="panel-section">
                <h3>Campaign Stats</h3>
                <div className="funding-info">
                  <div className="funding-row">
                    <span className="label">Backers:</span>
                    <span className="value">{selectedProject.backers}</span>
                  </div>
                  <div className="funding-row">
                    <span className="label">Days Left:</span>
                    <span className="value">{selectedProject.daysLeft}</span>
                  </div>
                </div>
              </div>

              <div className="panel-section">
                <h3>Funding Progress</h3>
                <div className="funding-info">
                  <div className="funding-row">
                    <span className="label">Funding Allocated:</span>
                    <span className="value">{selectedProject.fundingGoal}</span>
                  </div>
                  <div className="funding-row">
                    <span className="label">Collected:</span>
                    <span className="value collected">{selectedProject.collected}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          (parseFloat(selectedProject.collected) /
                            parseFloat(selectedProject.fundingGoal)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="panel-actions">
                <button
                  className="collect-btn"
                  onClick={() => {
                    const slug = getProjectSlug(selectedProject.header);
                    navigate(`/project/${slug}`);
                  }}
                >
                  Support This Campaign
                </button>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  Visit Project →
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Main;
