import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-column">
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

        <div className="footer-column">
          <h3>Need Help?</h3>
          <div className="footer-contact">
            <p>
              <strong>Phones:</strong>
            </p>
            <p>+233 (0) 32 229 9229</p>
            <p>+233 (0) 26 512 7717</p>
            <p>+233 (0) 32 219 8394</p>
            <p>+233 (0) 26 560 9987</p>
          </div>
          <div className="footer-contact">
            <p>
              <strong>Location:</strong> Cecilia Agyei Amoako Road, Daban, near
              Dr. Asafo Adjei Hospital Daban off Ricky Boakye Guinness Depot
            </p>
            <p>
              <strong>Email:</strong> support@hibs.edu.gh
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© The Hilltop International British School (HIBS) - 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
