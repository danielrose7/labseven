export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pageview = (url) => {
  if (GTM_ID)
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};
