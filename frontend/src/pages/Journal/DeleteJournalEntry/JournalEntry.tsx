import GlassTile from "@components/GlassTile/GlassTile";
import { default as ModalWrapper } from "@components/Modal/Modal";
import {
  DateContainer,
  PnL,
  PreviewDayValueContainer,
  Time,
  TradeDay,
  TradePreview,
  TradePreviewContainer,
} from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetailStyledComponents";
import { color } from "@styles/colors";
import { formatter, m } from "@utils/utils";
import React from "react";
import useDeleteJournalEntryHandler from "../hooks/useDeleteJournalEntryHandler";
import useJournalDispatch from "../hooks/useJournalDispatch";
import useJournalState from "../hooks/useJournalState";
import {
  Description,
  TileTradeCount,
  TileTradeCountContainer,
} from "../JournalStyledComponents";

const DeleteJournalEntry: React.FunctionComponent = () => {
  const {
    journalEntry,
    deleteJournalEntryErrors,
    deleteJournalEntryModalOpen,
  } = useJournalState();
  const { updateDeleteJournalEntryModalOpen, updateDeleteJournalEntryErrors } =
    useJournalDispatch();

  const { deleteJournalEntry, loading: deletingJournalEntry } =
    useDeleteJournalEntryHandler();

  return (
    <ModalWrapper
      title="Delete Journal Entry"
      open={deleteJournalEntryModalOpen}
      setOpen={updateDeleteJournalEntryModalOpen}
      saveButton={{
        text: "Permanently Delete",
        style: { backgroundColor: color("SystemRed") },
        onClick: () => deleteJournalEntry(journalEntry.id),
        loading: deletingJournalEntry,
      }}
      cancelButton={{
        text: "Cancel",
        onClick: () => updateDeleteJournalEntryModalOpen(false),
        loading: false,
      }}
      confirmText={
        "Are you sure you want to permanently delete this journal entry?"
      }
      error={deleteJournalEntryErrors?.error}
      onClose={() => {
        updateDeleteJournalEntryErrors({});
      }}
    >
      <GlassTile
        featureTile
        minHeight={10}
        minWidth={10}
        padding={7}
        noGlow={true}
        overlay={
          <TileTradeCountContainer>
            <TileTradeCount className="trade-count">{`x${journalEntry.accountCount} acc`}</TileTradeCount>
          </TileTradeCountContainer>
        }
      >
        <TradeDay>
          <PreviewDayValueContainer>
            <TradePreviewContainer>
              <TradePreview $src={journalEntry.imageUrl} />
            </TradePreviewContainer>
            <DateContainer>
              {m(journalEntry.dateTime).format("MMM D, YYYY")}
              <Time>{m(journalEntry.dateTime).format("h:mm A")}</Time>
            </DateContainer>
          </PreviewDayValueContainer>
          <Description>{journalEntry.description}</Description>
          <PnL $positive={journalEntry.totalPnl >= 0}>
            {formatter.format(journalEntry.totalPnl)}
          </PnL>
        </TradeDay>
      </GlassTile>
    </ModalWrapper>
  );
};

export default DeleteJournalEntry;
