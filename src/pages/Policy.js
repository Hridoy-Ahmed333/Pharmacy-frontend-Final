import styled from "styled-components";

const PolicyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #555;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.5;
`;

function Policy() {
  return (
    <PolicyContainer>
      <Title>Privacy Policy</Title>

      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          This privacy policy governs the manner in which our pharmacy
          management system React app collects, uses, maintains, and discloses
          information collected from users.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Information Collection and Use</SectionTitle>
        <Paragraph>
          We may collect personal identification information from users in
          various ways, including, but not limited to, when users visit our app,
          register on the app, place an order, and in connection with other
          activities, services, features, or resources we make available on our
          app.
        </Paragraph>
        {/* Add more content regarding information collection */}
      </Section>

      <Section>
        <SectionTitle>3. How We Use Collected Information</SectionTitle>
        <Paragraph>
          We may use the information we collect for various purposes, including
          to process transactions, send periodic emails, and improve customer
          service.
        </Paragraph>
        {/* Add more content regarding information usage */}
      </Section>

      {/* Add more sections as needed */}
    </PolicyContainer>
  );
}

export default Policy;
