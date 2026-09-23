import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-About-HIBS">
          <h3>About HIBS</h3>
          <p>
            Accredited by Cambridge Assessment International Education in
            September 2010, The Hilltop International British School (HIBS),
            formerly The Hilltop International Science College offers students
            the opportunity to sit for the prestigious International Graduate
            Certificate of Secondary Education (IGCSE) and the Advanced (A)
            level. HIBS is part of The Hilltop School and a member of the PSGN
            of the British Council.
          </p>
        </div>
        <div className="footer-Phones">
          <div className="footer-contact">
            <strong>Find Us</strong>
            <div>
              The Hilltop International British School
              <p>
                1 Cecilia Agyei-Amoako Road,
                <p>Kumasi, Ghana</p>
              </p>
              <p>+233 (0) 32 229 9229</p>
              <p>+233 (0) 26 512 7717</p>
              <p>+233 (0) 32 219 8394</p>
              <p>+233 (0) 26 560 9987</p>
              <p>
                <strong>Email:</strong> support@hibs.edu.gh
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-contact">
        {/* <p>
          <strong>Location:</strong> Cecilia Agyei Amoako Road, Daban, near Dr.
          Asafo Adjei Hospital Daban off Ricky Boakye Guinness Depot
        </p> */}
        {/* <p>
          <strong>Email:</strong> support@hibs.edu.gh
        </p> */}
      </div>

      <div className="footer-bottom">
        <p>
          The Hilltop International British School (HIBS){" "}
          {new Date().getFullYear()}
        </p>

        <div className="footer-socials">
          <a
            href="#"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.78.22 2.42.46.66.26 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.24.64.41 1.36.46 2.42.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.78-.46 2.42a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.24-1.36.41-2.42.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.78-.22-2.42-.46a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.24-.64-.41-1.36-.46-2.42C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.78.46-2.42.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.43 2.55c.64-.24 1.36-.41 2.42-.46C8.91 2.01 9.25 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5zm5.2-8.45a1.17 1.17 0 1 0 0-2.34 1.17 1.17 0 0 0 0 2.34z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.64.49a2.75 2.75 0 0 0-1.94 1.95C2 8.93 2 12 2 12s0 3.07.42 4.81a2.75 2.75 0 0 0 1.94 1.95c1.74.49 7.64.49 7.64.49s5.9 0 7.64-.49a2.75 2.75 0 0 0 1.94-1.95C22 15.07 22 12 22 12s0-3.07-.42-4.81zM9.98 15.02V8.98L15.5 12l-5.52 3.02z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M16.6 2h-3.2v13.6a2.8 2.8 0 1 1-2.02-2.69v-3.28a6.03 6.03 0 1 0 5.22 5.97c0-.1 0-.2-.01-.3V8.9a7.9 7.9 0 0 0 4.4 1.33V7.03a4.68 4.68 0 0 1-4.4-3.39V2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
