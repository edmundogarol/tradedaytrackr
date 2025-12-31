import React from "react";
import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import { JournalContainer } from "./JournalStyledComponents";

const Journal: React.FunctionComponent = () => {
  return (
    <Page topBarShowMenu={true}>
      <JournalContainer>
        <Gap level={1} />
      </JournalContainer>
    </Page>
  );
};

export default Journal;
