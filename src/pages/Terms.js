import styled from "styled-components";

const TermsContainer = styled.div`
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

function Terms() {
  return (
    <TermsContainer>
      <Title>Terms and Conditions</Title>

      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          These terms and conditions govern your use of our pharmacy management
          React app; by using our app, you accept these terms and conditions in
          full.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. License to use the app</SectionTitle>
        <Paragraph>
          You may view, download for caching purposes only, and print pages from
          the app for your own personal use, subject to the restrictions set out
          below and elsewhere in these terms and conditions.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Acceptable use</SectionTitle>
        <Paragraph>
          You must not use our app in any way that causes, or may cause, damage
          to the app or impairment of the availability or accessibility of the
          app; or in any way which is unlawful, illegal, fraudulent or harmful,
          or in connection with any unlawful, illegal, fraudulent or harmful
          purpose or activity.
        </Paragraph>
      </Section>

      {/* Add more sections as needed */}
    </TermsContainer>
  );
}

export default Terms;
