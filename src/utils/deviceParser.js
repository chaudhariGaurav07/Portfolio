export const parseUserAgent = (userAgent = "") => {
  const isMobile = /mobile/i.test(userAgent);
  const isWindows = /Windows/i.test(userAgent);
  const isMac = /Macintosh/i.test(userAgent);
  const isLinux = /Linux/i.test(userAgent);

  let browser = "Unknown";
  if (/Chrome/.test(userAgent)) browser = "Chrome";
  else if (/Firefox/.test(userAgent)) browser = "Firefox";
  else if (/Brave/.test(userAgent)) browser = "Brave";
  else if (/Edge/.test(userAgent)) browser = "Edge";

  let os = "Unknown";
  if (isWindows) os = "Windows";
  else if (isMac) os = "macOS";
  else if (isLinux) os = "Linux";

  return {
    browser,
    os,
    device: isMobile ? "Mobile" : "Desktop"
  };
};
