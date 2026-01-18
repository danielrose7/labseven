export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pageview = (url) => {
  try {
    if (GTM_ID) window.dataLayer.push({ event: "pageview", page: url });
  } catch (error) {
    console.error("Error tracking pageview:", error);
  }
};

export const trackEvent = (eventName, params = {}) => {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};
