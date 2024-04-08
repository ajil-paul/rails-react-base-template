export const replaceSubdomain = (url, subdomain) =>
  url.replace(/^(https?:\/\/)?([^.])*/, `$1${subdomain}`);

export const getSubdomain = () => window.location.host.split(".")[0];
