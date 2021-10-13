import React, { useContext } from "react";

import { SUPPORTED_NETWORKS } from "../../../constants/network";
import { WalletContext } from "../../../contexts/WalletContext";

import WarningModal from "./WarningModal";

const NotAdminWarningModal = () => {
  const { isAdmin, networkDetails } = useContext(WalletContext);

  if (!networkDetails?.onSupportedNetwork) {
    const supportedNetworks = SUPPORTED_NETWORKS.map(({ name }) => name).join(
      ", "
    );

    return (
      <WarningModal
        title="Non-Supported Network Detected"
        desc={`Check the metamask extension and change your network to ${supportedNetworks}`}
      />
    );
  }

  if (!isAdmin) {
    return (
      <WarningModal
        title="Non-Admin Address Detected"
        desc="Check the metamask extension to change account."
      />
    );
  }

  return null;
};

export default NotAdminWarningModal;
