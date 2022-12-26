import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalTypes } from "src/entities/common.entities";
import useComponentVisible from "src/hooks/useComponentVisible";
import { showModal } from "src/reducers/globalSlice";
import { WalletKeys } from "src/services/connectors/wallet.connector";
import { RootState } from "src/store";
import { abbreviateAddress } from "src/utils";
import Connect from "./Connect";
import Connected from "./Connected";
import Disconnect from "./Disconnect";
import WrongNetwork from "./WrongNetwork";

function WalletSelector({
  connectWallet,
}: {
  connectWallet: (walletKey?: WalletKeys) => void;
}) {
  const dispatch = useDispatch();
  const connectedWallet = useSelector(
    (state: RootState) => state.wallet.walletApi
  );
  const isWrongNetwork = useSelector(
    (state: RootState) => state.wallet.isWrongNetwork
  );
  const networkId = useSelector((state: RootState) => state.wallet.networkId);
  const disconnectButtonMenu = useComponentVisible(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletIconUrl, setWalletIconUrl] = useState("");
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);

  useEffect(() => {
    async function init() {
      setIsWalletConnecting(true);
      if (connectedWallet?.wallet?.api) {
        const addr = abbreviateAddress(await connectedWallet.getAddress());
        setWalletAddress(addr);
        setWalletIconUrl(connectedWallet.wallet.icon);
      } else {
        setWalletAddress("");
      }
      setIsWalletConnecting(false);
    }
    init();
  }, [connectedWallet]);

  const showWalletSelection = () => {
    dispatch(
      showModal({
        modalType: ModalTypes.wallet,
      })
    );
  };

  const disconnectWallet = () => {
    disconnectButtonMenu.setVisible(false);
    connectWallet();
  };

  const toggleDisconnectButton = () => {
    disconnectButtonMenu.setVisible(!disconnectButtonMenu.visible);
  };

  return (
    <div className="relative text">
      {isWrongNetwork ? (
        <WrongNetwork onClick={toggleDisconnectButton}></WrongNetwork>
      ) : connectedWallet?.wallet?.api ? (
        <Connected
          address={walletAddress}
          onClick={toggleDisconnectButton}
          connecting={isWalletConnecting}
          iconUrl={walletIconUrl}
          prefix={networkId === 0 ? "(preview) " : ""}
        ></Connected>
      ) : (
        <Connect onClick={showWalletSelection}></Connect>
      )}
      <Disconnect
        ref={disconnectButtonMenu.ref}
        isShown={
          connectedWallet?.wallet?.api != null && disconnectButtonMenu.visible
        }
        onClick={disconnectWallet}
      ></Disconnect>
    </div>
  );
}

export default WalletSelector;
