// File: src/components/Steps.jsx
// Numbered steps as a row of cards (one column on phones).
// Each step: { title, text, action? } where action is an optional element (a link) shown last.
export default function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step.title} className="card step">
          <span className="stepNumber" aria-hidden="true">
            {index + 1}
          </span>
          <h3>
            <span className="visually-hidden">Step {index + 1}: </span>
            {step.title}
          </h3>
          <p>{step.text}</p>
          {step.action && <div className="stepAction">{step.action}</div>}
        </li>
      ))}
    </ol>
  );
}
