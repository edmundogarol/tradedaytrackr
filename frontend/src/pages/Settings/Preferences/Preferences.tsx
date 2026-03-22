import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Page from "@components/Page/Page";
import ArticleIcon from "@mui/icons-material/Article";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { BUTTON_WIDTH } from "@styles/constants";
import {
  PageContainer as Container,
  SectionText,
  SectionTitle,
} from "@styles/globalStyledComponents";
import React from "react";
import {
  AccountTemplatesSection,
  SectionContainer,
  SubsectionHeaderWrapper,
  TagsSection,
} from "./PreferencesStyledComponents";

interface PreferencesProps {}
const Preferences: React.FunctionComponent<PreferencesProps> = () => {
  return (
    <Page topBarShowMenu={true}>
      <Container>
        <SectionTitle>Settings</SectionTitle>
        <AccountTemplatesSection>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <SubsectionHeaderWrapper>
                <ArticleIcon style={{ color: "white", marginRight: 5 }} />
                Account Templates
                <Button
                  text="Add Template"
                  style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
                />
              </SubsectionHeaderWrapper>
              <SectionContainer>
                <SectionText>
                  Manage and create account templates for various prop account
                  rules and configurations.
                </SectionText>
              </SectionContainer>
            </GlassTileChildrenWrapper>
          </GlassTile>
        </AccountTemplatesSection>
        <Gap level={1} />

        <TagsSection>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <SubsectionHeaderWrapper>
                <LocalOfferIcon style={{ color: "white", marginRight: 5 }} />
                Tag Management
                <Button
                  text="Manage Tags"
                  style={{ marginLeft: "auto", width: BUTTON_WIDTH }}
                />
              </SubsectionHeaderWrapper>
              <SectionContainer>
                <SectionText>
                  Review and manage tags used for journal entiries.
                </SectionText>
              </SectionContainer>
            </GlassTileChildrenWrapper>
          </GlassTile>
        </TagsSection>
        <Gap level={1} />
      </Container>
    </Page>
  );
};

export default Preferences;
