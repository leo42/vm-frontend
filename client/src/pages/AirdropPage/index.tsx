import useFile from "./hooks/useFile";
import { TokenAddress, shortenAddress } from "./utils";
import useToken from "./hooks/useToken";
import Select from "./components/Select";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import ComingSoonPage from "../ComingSoonPage";
import "./index.scss";

const CLASS = "airdrop-page";

const AirdropPage = () => {
    const {
        tokens,
        selectedToken,
        setSelectedToken,
        validated,
        exec,
        addressList,
        handleAddressList,
        airdropDetail,
        totalToken
    } = useToken();

    const { fileRef, parseFile } = useFile({ handleAddressList });
    const [enabled, setEnabled] = useState(false);

    useLayoutEffect(() => {
        axios.get("/features").then((res) => {
            setEnabled(res.data.airdrop_enabled);
        });
    }, []);

    return !enabled ? (
        <div className={CLASS}>
            <h1 className={`${CLASS}__title`}>Airdrop Tokens</h1>
            <div className={`${CLASS}__content ${CLASS}__select`}>
                <Select
                    tokens={tokens}
                    setSelectedToken={setSelectedToken}
                ></Select>
                <input
                    ref={fileRef}
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={() => parseFile()}
                    hidden
                />
                <label className={`${CLASS}__button`} htmlFor="file-upload">
                    Upload Addresses
                </label>
            </div>
            {addressList.length ? (
                <div className={`${CLASS}__content ${CLASS}__address-list`}>
                    <div className={`${CLASS}__address-list-header`}>
                        <h1>Address List</h1>
                        <span>{addressList.length} address added</span>
                    </div>
                    {addressList.map((addr: TokenAddress, i: number) => {
                        return (
                            <div
                                key={i}
                                className={`${CLASS}__address-list-address`}
                            >
                                {shortenAddress(addr.address)}:{" "}
                                {addr.tokenAmount}
                            </div>
                        );
                    })}
                </div>
            ) : null}
            {validated ? (
                <div className={`${CLASS}__content ${CLASS}__info`}>
                    <h1>Airdrop Breakdown</h1>
                    <div className={`${CLASS}__detail-row`}>Total token: {totalToken} {selectedToken?.ticker}</div>
                    <div className={`${CLASS}__detail-row`}>
                        Total ADA to spend: {airdropDetail.adaToSpend} ADA
                    </div>
                    <div className={`${CLASS}__detail-row`}>Estimated fee: {airdropDetail.txFee} ADA</div>
                </div>
            ) : null}
            <button
                className={`${CLASS}__button ${CLASS}__button-airdrop`}
                onClick={() => exec()}
            >
                {validated ? "Send Airdrop" : "Validate Airdrop"}
            </button>
        </div>
    ) : (
        <ComingSoonPage />
    );
};

export default AirdropPage;
