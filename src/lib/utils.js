/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a ripple effect on an element
 * @param {Event} event - The click event
 * @param {HTMLElement} element - The element to add the ripple to
 */
export function createRipple(event, element) {
  const circle = document.createElement("span");
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;

  const rect = element.getBoundingClientRect();

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple");

  // Remove existing ripple
  const ripple = element.querySelector(".ripple");
  if (ripple) {
    ripple.remove();
  }

  element.appendChild(circle);

  // Clean up after animation
  setTimeout(() => {
    if (circle) {
      circle.remove();
    }
  }, 700);
}

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} - Interpolated value
 */
export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

/**
 * Clamp a value between min and max
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get viewport dimensions
 * @returns {Object} - Object containing width and height
 */
export function getViewportDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
