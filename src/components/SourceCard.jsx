// File: src/components/SourceCard.jsx
// One open-source deliverable (CAD, PCB, firmware...) from src/data/project.js. A published entry
// links to its files; an unpublished one is a dashed placeholder that says where it will be.
import {
  BookOpen,
  Box,
  CircuitBoard,
  Cpu,
  ExternalLink,
  LayoutDashboard,
  ListChecks,
  MapPin,
} from "lucide-react";

const ICONS = {
  cad: Box,
  pcb: CircuitBoard,
  bom: ListChecks,
  firmware: Cpu,
  console: LayoutDashboard,
  docs: BookOpen,
};

function where(source) {
  if (!source.href) return "Location to be announced";
  return source.href.includes("github.com") ? "Will be published on GitHub" : "Location set, not public yet";
}

export default function SourceCard({ source, compact = false }) {
  const Icon = ICONS[source.icon] ?? Box;
  const live = source.published && source.href;

  const status = live ? (
    <span className="badge t-success">Available</span>
  ) : (
    <span className="badge">Coming soon</span>
  );

  if (compact) {
    return (
      <li className={`card sourceCard${live ? "" : " sourceCard--pending"}`}>
        <span className="iconTile">
          <Icon aria-hidden="true" />
        </span>
        <div className="sourceCardText">
          <h3>
            {live ? (
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
            ) : (
              source.title
            )}
          </h3>
          {status}
        </div>
      </li>
    );
  }

  return (
    <li className={`card sourceCard${live ? "" : " sourceCard--pending"}`}>
      <div className="sourceCardHead">
        <span className="iconTile">
          <Icon aria-hidden="true" />
        </span>
        <h3>{source.title}</h3>
      </div>
      <p>{source.description}</p>
      <ul className="chips" aria-label="File formats">
        {source.formats.map((format) => (
          <li key={format} className="chip">
            {format}
          </li>
        ))}
      </ul>
      <div className="sourceCardFoot">
        {status}
        {live ? (
          <a className="btn btn--ghost btn--sm" href={source.href} target="_blank" rel="noopener noreferrer">
            View files
            <ExternalLink aria-hidden="true" />
          </a>
        ) : (
          <span className="placeholderNote">
            <MapPin aria-hidden="true" />
            {where(source)}
          </span>
        )}
      </div>
    </li>
  );
}
