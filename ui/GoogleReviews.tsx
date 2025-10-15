'use client';
import { useEffect } from 'react';

export default function GoogleReviews() {
  useEffect(() => {
    const scriptId = 'elfsight-platform-script';

    // Avoid adding the script more than once
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="google-reviews-widget">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mt-22 text-center underline decoration-yellow-500 underline-offset-8 ">
        What Our Customers Say.
      </h2>
      <div
        className="elfsight-app-008df0f4-ce58-400e-be6b-8b985c38703e"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
}
