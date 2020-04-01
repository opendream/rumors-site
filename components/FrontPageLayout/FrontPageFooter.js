import React from 'react';
import { PROJECT_HACKFOLDR, CONTACT_EMAIL } from '../../constants/urls';
import GoogleWebsiteTranslator from 'components/GoogleWebsiteTranslator';
import i18n from '../../i18n';

export default function FrontPageFooter() {
  return (
    <footer>
      <a
        href="https://grants.g0v.tw/power/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://grants.g0v.tw/images/power/poweredby-long.svg"
          alt="Powered by g0v"
        />
      </a>
      <p>
        <a href={PROJECT_HACKFOLDR} target="_blank" rel="noopener noreferrer">
          {i18n.t("projectIntroduction")}
        </a>
        ・
        <a href={`mailto:${CONTACT_EMAIL}`}>{i18n.t("contactEmail")}</a>
      </p>
      {/* <GoogleWebsiteTranslator /> */}
      <style jsx>{`
        footer {
          padding: 30px 30px;
          text-align: center;
          color: white;
          border-top: 1px solid rgba(52, 58, 64, 0.3);
        }
        footer p {
          margin-bottom: 0;
        }
        img {
          width: 100%;
          max-width: 300px;
        }
      `}</style>
    </footer>
  );
}
