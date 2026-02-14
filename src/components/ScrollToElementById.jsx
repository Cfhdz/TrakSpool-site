// File: src/components/ScrollToElementById.jsx

/**
 * Helper function to scroll to an element by ID
 * Used by CTA buttons to scroll to newsletter signup
 */
export function ScrollToElementById(elementId) {
  const element = document.getElementById(elementId);
  
  if (element) {
    // Scroll with offset to account for fixed header
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // Focus the element for accessibility
    setTimeout(() => {
      element.focus({ preventScroll: true });
    }, 500);
  }
}
