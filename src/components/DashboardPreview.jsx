// File: src/components/DashboardPreview.jsx

/**
 * Dashboard Preview Placeholder
 * 
 * This component serves as a placeholder for the future interactive dashboard preview.
 * Currently shows a "coming soon" state with visual styling that matches the design system.
 * 
 * TODO: Replace with actual dashboard embed when ready
 */
export default function DashboardPreview() {
  return (
    <div className="dashboardPreview">
      <div className="dashboardPreviewInner">
        {/* Preview frame */}
        <div className="dashboardFrame">
          {/* Browser chrome mockup */}
          <div className="dashboardChrome">
            <div className="dashboardDots">
              <span className="dashboardDot"></span>
              <span className="dashboardDot"></span>
              <span className="dashboardDot"></span>
            </div>
            <div className="dashboardUrl">dashboard.trakspool.local</div>
          </div>

          {/* Preview content area */}
          <div className="dashboardContent">
            <div className="dashboardPlaceholder">
              <svg
                className="dashboardIcon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <div className="dashboardPlaceholderTitle">
                Interactive Dashboard Preview
              </div>
              <div className="dashboardPlaceholderText">
                Coming soon – Full dashboard demo will be available here
              </div>
            </div>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="dashboardFeatures">
          <div className="dashboardFeature">
            <span className="dashboardFeatureDot"></span>
            <span>Real-time inventory view</span>
          </div>
          <div className="dashboardFeature">
            <span className="dashboardFeatureDot"></span>
            <span>Material tracking</span>
          </div>
          <div className="dashboardFeature">
            <span className="dashboardFeatureDot"></span>
            <span>Usage analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
