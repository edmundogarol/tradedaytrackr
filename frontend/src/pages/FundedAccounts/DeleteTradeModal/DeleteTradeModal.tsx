import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Else, If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import ModalWrapper from "@components/Modal/Modal";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { color } from "@styles/colors";
import { HorizontalSection, SectionText } from "@styles/globalStyledComponents";
import { decimalStringToInt, formatter } from "@utils/utils";
import moment from "moment";
import React from "react";
import {
  DateContainer,
  PnL,
  PreviewDayValueContainer,
  TradeDay,
  TradeJournalPnL,
  TradePreview,
  TradePreviewContainer,
} from "../FundedAccountDetail/FundedAccountDetailStyledComponents";
import {
  DaysContainer,
  DaysItem,
  DaysItemSubtitle,
  DaysItemValue,
} from "../FundedAccountsStyledComponents";
import useDeleteTradeHandler from "../hooks/useDeleteTradeHandler";
import useFundedAccountsDispatch from "../hooks/useFundedAccountsDispatch";
import useFundedAccountsState from "../hooks/useFundedAccountsState";

const DeleteTradeModal: React.FunctionComponent = () => {
  const { deleteTradeErrors, deleteTradeModalOpen, selectedTrade } =
    useFundedAccountsState();
  const { updateDeleteTradeModalOpen, updateDeleteTradeErrors } =
    useFundedAccountsDispatch();
  const navigation = useReactNavigation();
  const { deleteTrade, loading: deletingTrade } = useDeleteTradeHandler();

  return (
    <ModalWrapper
      title="Delete Trade"
      open={deleteTradeModalOpen}
      setOpen={updateDeleteTradeModalOpen}
    >
      <GlassTile
        featureTile
        minHeight={10}
        minWidth={10}
        padding={7}
        noGlow={true}
      >
        <TradeDay>
          <PreviewDayValueContainer>
            <TradePreviewContainer>
              <If condition={!!selectedTrade.journalEntry}>
                <TradePreview
                  $src={selectedTrade.journalEntry?.image}
                  onClick={() =>
                    navigation.navigate(PageEnum.JournalEntry, {
                      id: selectedTrade.journalEntry?.id.toString() || "",
                    })
                  }
                />
                <TradeJournalPnL
                  $positive={selectedTrade.journalEntry?.totalPnl > 0}
                >
                  ${selectedTrade.journalEntry?.totalPnl || 0}
                </TradeJournalPnL>
                <Else>
                  <InfoPopout infoDescription={`Link or create journal entry`}>
                    <div>
                      <Icon
                        type={IconTypeEnum.FontAwesome5}
                        name="link"
                        size={30}
                        color={color("SystemLabel1")}
                        style={{ transform: "rotate(135deg)" }}
                      />
                    </div>
                  </InfoPopout>
                </Else>
              </If>
            </TradePreviewContainer>
          </PreviewDayValueContainer>
          <DateContainer>
            <DaysContainer>
              <DaysItem>
                <GlassTile
                  positive={(selectedTrade.pnl ?? 0) > 0}
                  featureTile
                  minHeight={10}
                  minWidth={10}
                  padding={7}
                >
                  <DaysItemValue $positive={(selectedTrade.pnl ?? 0) > 0}>
                    {`${(selectedTrade.pnl ?? 0) > 0 ? "+" : ""}${decimalStringToInt(selectedTrade.pnl ?? 0)}`}
                  </DaysItemValue>
                </GlassTile>
                <DaysItemSubtitle $smaller>
                  {moment(selectedTrade.date).format("hh:mm A")}
                </DaysItemSubtitle>
              </DaysItem>
            </DaysContainer>
          </DateContainer>
          <DateContainer>
            {moment(selectedTrade.date).format("MMM D, YYYY")}
          </DateContainer>
          <PnL $positive={(selectedTrade.pnl ?? 0) >= 0}>
            {formatter.format(selectedTrade.pnl ?? 0)}
          </PnL>
        </TradeDay>
      </GlassTile>
      <Gap level={1} />
      <SectionText>
        {selectedTrade?.journalEntry?.accountCount > 0
          ? "This trade is linked to a journal entry - and could affect the entry's final details. "
          : ""}
        {"Are you sure you want to delete this trade?"}
      </SectionText>
      <Gap level={1} />
      <If condition={!!deleteTradeErrors?.error}>
        <FormError error={deleteTradeErrors?.error} />
        <Gap level={2} />
      </If>
      <HorizontalSection>
        <Button
          loading={deletingTrade}
          text={"Permanently Delete"}
          style={{ backgroundColor: color("SystemRed") }}
          onClick={() => {
            deleteTrade(selectedTrade.id.toString());
          }}
        />
        <Button
          text={"Cancel"}
          onClick={() => {
            updateDeleteTradeModalOpen(false);
            updateDeleteTradeErrors({});
          }}
        />
      </HorizontalSection>
    </ModalWrapper>
  );
};

export default DeleteTradeModal;
