import { CV_URL } from './assets';
import { placeholderPdf } from './pdf';

// Downloads the CV from /public/assets/cv/cv.pdf (auto-discovered).
// Falls back to a generated placeholder PDF if the file is absent.
export function downloadCv() {
  const link = document.createElement('a');
  link.rel = 'noopener';
  link.download = 'Mohamed-Ahmed-Helika-CV.pdf';

  const useFallback = () => {
    const url = URL.createObjectURL(placeholderPdf);
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!CV_URL) {
    useFallback();
    return;
  }

  link.href = CV_URL;
  fetch(CV_URL, { method: 'HEAD' })
    .then((res) => (res.ok ? link.click() : useFallback()))
    .catch(useFallback);
}
