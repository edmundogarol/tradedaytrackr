import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import { Container } from "./JournalStyledComponents";

const Journal: React.FunctionComponent = () => {
  return (
    <Page topBarShowMenu={true}>
      <Container>
        <Gap level={1} />
      </Container>
    </Page>
  );
};

export default Journal;
