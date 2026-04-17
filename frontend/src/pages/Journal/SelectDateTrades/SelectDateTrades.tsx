import Button from "@components/Button/Button";
import { default as Modal } from "@components/Modal/Modal";
import Checkbox from "@mui/material/Checkbox";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import { decimalStringToInt, formatter, m } from "@utils/utils";
import React from "react";
import useJournalDispatch from "../hooks/useJournalDispatch";
import useJournalState from "../hooks/useJournalState";
import {
  TradeAccountsSelectSaveButtonContainer,
  TradesDetectedContainer,
  TradesDetectedPnL,
  TradesDetectedPnLTotal,
  TradesDetectedPnLTotalHighlighted,
  TradesDetectedTime,
  TradesDetectedTrade,
} from "../JournalEntry/JournalEntryStyledComponents";

interface SelectDateTradesProps {
  editingAccounts: boolean;
  setEditingAccounts: (editing: boolean) => void;
  detectedTradesPnL: number;
}

const SelectDateTrades: React.FunctionComponent<SelectDateTradesProps> = ({
  editingAccounts,
  setEditingAccounts,
  detectedTradesPnL,
}) => {
  const { journalEntry, selectedDateTrades, fundedView } = useJournalState();
  const { updateJournalEntry } = useJournalDispatch();

  const activeTradeIds = fundedView
    ? journalEntry.tradeIds
    : journalEntry.evalTradeIds || [];

  return (
    <Modal
      open={editingAccounts}
      setOpen={setEditingAccounts}
      title="Select Accounts Trades"
      onClose={() => {
        setEditingAccounts(false);
        if (fundedView) {
          updateJournalEntry({
            ...journalEntry,
            tradeIds: journalEntry.tradeIds,
          });
        } else {
          updateJournalEntry({
            ...journalEntry,
            evalTradeIds: journalEntry.evalTradeIds,
          });
        }
      }}
    >
      <TradesDetectedContainer>
        {`${selectedDateTrades.length} trades detected for ${m(journalEntry.dateTime).format("MMM DD")}`}
      </TradesDetectedContainer>
      <TradesDetectedContainer>
        {selectedDateTrades
          .filter((trade) => (fundedView ? !trade.isEval : trade.isEval))
          .map((trade) => {
            return (
              <TradesDetectedTrade key={trade.id}>
                <Checkbox
                  sx={{ color: "#a9b1c2" }}
                  checked={activeTradeIds.includes(trade.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (fundedView) {
                        updateJournalEntry({
                          ...journalEntry,
                          tradeIds: [...journalEntry.tradeIds, trade.id],
                        });
                      } else {
                        updateJournalEntry({
                          ...journalEntry,
                          evalTradeIds: [
                            ...(journalEntry.evalTradeIds || []),
                            trade.id,
                          ],
                        });
                      }
                    } else {
                      if (fundedView) {
                        updateJournalEntry({
                          ...journalEntry,
                          tradeIds: journalEntry.tradeIds.filter(
                            (id) => id !== trade.id,
                          ),
                        });
                      } else {
                        updateJournalEntry({
                          ...journalEntry,
                          evalTradeIds: (
                            journalEntry.evalTradeIds || []
                          ).filter((id) => id !== trade.id),
                        });
                      }
                    }
                  }}
                />
                <div>{trade.account.name}</div>
                <TradesDetectedTime>
                  {m(trade.date).format("hh:mm A")}
                </TradesDetectedTime>
                <TradesDetectedPnL
                  $positive={trade.pnl !== null && trade.pnl >= 0}
                >{`$${decimalStringToInt(trade.pnl || 0)}`}</TradesDetectedPnL>
              </TradesDetectedTrade>
            );
          })}
      </TradesDetectedContainer>
      <TradesDetectedPnLTotal>
        {`Total selected PnL: `}
        <TradesDetectedPnLTotalHighlighted $positive={detectedTradesPnL >= 0}>
          {formatter.format(detectedTradesPnL)}
        </TradesDetectedPnLTotalHighlighted>
      </TradesDetectedPnLTotal>
      <TradeAccountsSelectSaveButtonContainer>
        <Button
          onClick={() => {
            setEditingAccounts(false);
          }}
          text={"Save"}
          style={{ background: color("SystemGreen"), width: BUTTON_WIDTH }}
        />
      </TradeAccountsSelectSaveButtonContainer>
    </Modal>
  );
};

export default SelectDateTrades;
