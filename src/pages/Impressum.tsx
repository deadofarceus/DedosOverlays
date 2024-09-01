import { Container } from "react-bootstrap";
import "../styles/Impressum.css";

function Impressum() {
  document.body.className = "noOBS";

  return (
    <Container className="Impressum">
      <h1>Legal Notice</h1>

      <h5>The requirements of § 5 TMG are met by the following information:</h5>
      <h5>Contact Information of the Responsible Party</h5>
      <p>
        Dedos Software
        <br />
        <i>Owner:</i> Dominik Langer
        <br />
        Hintergasse 12
        <br />
        34253 Lohfelden
      </p>

      <h5>Contact</h5>
      <p>
        <strong>Email:</strong> deadofarceus@gmail.com
      </p>

      <h2>Liability for Content</h2>
      <p>
        The content on our pages has been created with the greatest care.
        However, we cannot guarantee the accuracy, completeness, or timeliness
        of the content. As service providers, we are responsible for our own
        content on these pages under § 7 para.1 TMG according to general laws.
        According to §§ 8 to 10 TMG, we are not obligated to monitor transmitted
        or stored third-party information or investigate circumstances that
        indicate illegal activity. Obligations to remove or block the use of
        information according to general laws remain unaffected by this.
        However, liability in this regard is only possible from the time of
        knowledge of a specific legal violation. Upon becoming aware of such
        violations, we will remove the content immediately.
      </p>

      <h2>Liability for Links</h2>
      <p>
        Our offer contains links to external websites of third parties, over
        whose content we have no control. Therefore, we cannot assume any
        liability for these external contents. The respective provider or
        operator of the linked sites is always responsible for the content of
        the linked pages. The linked pages were checked for possible legal
        violations at the time of linking. No illegal content was recognizable
        at the time of linking. However, permanent content control of the linked
        pages is unreasonable without concrete evidence of a violation of the
        law. Upon becoming aware of legal violations, we will remove such links
        immediately.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works created by the site operators on this website are
        subject to German copyright law. Any reproduction, processing,
        distribution, or any form of utilization outside the limits of copyright
        law requires the written consent of the respective author or creator.
        Downloads and copies of this site are permitted only for private,
        non-commercial use.
      </p>
      <p>
        Insofar as the content on this site was not created by the operator, the
        copyrights of third parties are respected. Third-party content is
        specifically marked as such. If you nevertheless become aware of a
        copyright infringement, please inform us accordingly. Upon becoming
        aware of legal violations, we will remove such content immediately.
      </p>

      <h2>Privacy Policy</h2>
      <p>
        The use of our website is generally possible without providing personal
        data. Insofar as personal data (such as name, address, or email
        addresses) are collected on our pages, this is always done, as far as
        possible, on a voluntary basis. This data will not be passed on to third
        parties without your explicit consent. We would like to point out that
        data transmission over the Internet (e.g., when communicating via email)
        may have security vulnerabilities. Complete protection of data from
        access by third parties is not possible. The use of contact data
        published in the context of the legal notice obligation by third parties
        for sending unsolicited advertising and information materials is hereby
        expressly prohibited. The site operators expressly reserve the right to
        take legal action in the event of the unsolicited sending of advertising
        information, such as spam emails.
      </p>

      <h2>Netlify Privacy Policy</h2>
      <p>
        We use the web hosting provider Netlify for our website. The service
        provider is the American company Netlify Inc., 2325 3rd Street, Suite
        29, San Francisco, CA 94104, USA. Netlify processes your data, among
        other things, in the USA. We would like to point out that, according to
        the European Court of Justice, there is currently no adequate level of
        protection for data transfer to the USA. This may involve various risks
        for the legality and security of data processing. As a basis for data
        processing with recipients based in third countries (outside the
        European Union, Iceland, Liechtenstein, Norway, and particularly in the
        USA) or for data transfer there, Netlify uses so-called standard
        contractual clauses (= Art. 46 para. 2 and 3 GDPR). Standard contractual
        clauses (Standard Contractual Clauses – SCC) are templates provided by
        the EU Commission and are intended to ensure that your data also
        complies with European data protection standards when transferred to and
        stored in third countries (such as the USA). Through these clauses,
        Netlify commits to complying with European data protection standards
        when processing your relevant data, even if the data is stored,
        processed, and managed in the USA. These clauses are based on an
        implementing decision of the EU Commission. You can find the decision
        and the corresponding standard contractual clauses here:{" "}
        <a href="https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj?locale=en">
          https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj?locale=en
        </a>{" "}
        Netlify offers a data processing agreement in accordance with Art. 28
        GDPR, which serves as the legal basis for our customer relationship with
        Netlify. This agreement refers to the EU standard contractual clauses.
        You can find it here:{" "}
        <a href="https://www.netlify.com/pdf/netlify-dpa.pdf">
          https://www.netlify.com/pdf/netlify-dpa.pdf
        </a>{" "}
        You can learn more about the data processed through the use of Netlify
        in the privacy policy at{" "}
        <a href="https://www.netlify.com/privacy/">
          https://www.netlify.com/privacy/
        </a>
        {"."}
      </p>
    </Container>
  );
}
export default Impressum;
