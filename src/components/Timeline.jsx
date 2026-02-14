// File: src/components/Timeline.jsx

/**
 * Interactive timeline component for step-by-step processes
 * Features:
 * - Horizontal layout with connecting lines
 * - Responsive (vertical on mobile)
 * - Animated number indicators
 * - Hover effects for depth
 */
export default function Timeline({ steps }) {
  return (
    <div className="timeline">
      {steps.map((step, index) => (
        <div key={index} className="timelineItem">
          {/* Step number indicator */}
          <div className="timelineNumber">
            <span>{index + 1}</span>
          </div>

          {/* Connecting line (not shown on last item) */}
          {index < steps.length - 1 && (
            <div className="timelineLine" aria-hidden="true" />
          )}

          {/* Content card */}
          <div className="timelineCard">
            <h3 className="timelineTitle">{step.title}</h3>
            <p className="timelineDescription">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
