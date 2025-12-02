import { useParams, useNavigate } from 'react-router-dom';
import './ProjectSupport.css';
import { useState } from 'react';

// Import logos
import ao from "../assets/ao.svg";
import alex from "../assets/alex.svg";
import dataOS from "../assets/dataOS.svg";
import hyperbeam from "../assets/hyperbeam_outline.svg";
import stamp from "../assets/stamp.svg";
import ucm from "../assets/ucm.svg";
import udl from "../assets/udl.svg";
import weavers from "../assets/weavers.svg";
import zine from "../assets/zine.svg";

interface ProjectData {
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

const projectsData: { [key: string]: ProjectData } = {
  "permaweb-journal": {
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
  "alex": {
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
  "ao": {
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
  "data-os": {
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
  "hyperbeam": {
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
  "stamp-protocol": {
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
  "universal-content-marketplace": {
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
  "universal-data-license": {
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
  "weavers": {
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
};

const ProjectSupport = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');

  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="project-support-container">
        <div className="error-container">
          <h1>Project Not Found</h1>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = (parseFloat(project.collected) / parseFloat(project.fundingGoal)) * 100;

  const handleConnect = () => {
    // Placeholder for wallet connection logic
    setWallet('mock-wallet-address-123456789');
  };

  const handleSupport = () => {
    // Placeholder for support logic
    alert(`Supporting ${project.header} with ${amount} AR`);
  };

  return (
    <div className="project-support-container">
      <header className="support-header">
        <button onClick={() => navigate('/')} className="back-link">
          ← Back to Campaigns
        </button>
        <div className="wallet-section">
          {wallet ? (
            <div className="wallet-info">
              {wallet.slice(0, 6)}...{wallet.slice(-4)}
            </div>
          ) : (
            <button onClick={handleConnect} className="connect-button">
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      <div className="support-grid">
        <div className="left-section">
          <div className="project-image-container">
            <img src={project.logo} alt={project.header} className="project-logo-large" />
            <div className="project-info-overlay">
              <div className="project-title">{project.header}</div>
              <div className="project-price">{project.price}</div>
            </div>
          </div>

          <div className="project-description">
            <h2>About This Campaign</h2>
            <p>{project.content}</p>
          </div>

          <div className="project-stats-grid">
            <div className="stat-card">
              <div className="stat-label">Backers</div>
              <div className="stat-value">{project.backers}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Days Left</div>
              <div className="stat-value">{project.daysLeft}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Funding Goal</div>
              <div className="stat-value">{project.fundingGoal}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Collected</div>
              <div className="stat-value success">{project.collected}</div>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="support-card">
            <h2>Support This Campaign</h2>

            <div className="progress-section">
              <div className="progress-info">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="progress-amounts">
                <span>{project.collected} raised</span>
                <span>of {project.fundingGoal}</span>
              </div>
            </div>

            <div className="support-form">
              <div className="form-group">
                <label htmlFor="amount">Contribution Amount (AR)</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  step="0.1"
                />
              </div>

              <button
                className="support-submit-button"
                onClick={handleSupport}
                disabled={!wallet || !amount}
              >
                {wallet ? 'Support Campaign' : 'Connect Wallet to Continue'}
              </button>

              <div className="support-info">
                <p>By supporting this campaign, you are contributing to the development and growth of {project.header} on the Arweave permaweb.</p>
              </div>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-project-link"
            >
              Visit Project Website →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSupport;
