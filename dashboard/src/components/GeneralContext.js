import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openTradeWindow: (uid, mode) => {},
  closeTradeWindow: (didTrade) => {},
  refreshTick: 0,
});

export const GeneralContextProvider = (props) => {
  const [isTradeWindowOpen, setIsTradeWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [tradeMode, setTradeMode] = useState("BUY");
  const [refreshTick, setRefreshTick] = useState(0);

  const handleOpenTradeWindow = (uid, mode = "BUY") => {
    setIsTradeWindowOpen(true);
    setSelectedStockUID(uid);
    setTradeMode(mode);
  };

  const handleCloseTradeWindow = (didTrade = false) => {
    setIsTradeWindowOpen(false);
    setSelectedStockUID("");
    if (didTrade) {
      setRefreshTick((t) => t + 1);
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        openTradeWindow: handleOpenTradeWindow,
        closeTradeWindow: handleCloseTradeWindow,
        refreshTick,
      }}
    >
      {props.children}
      {isTradeWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={tradeMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
