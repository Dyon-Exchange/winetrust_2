import {
  CloseButton,
  HStack,
  Stat,
  StatHelpText,
  StatLabel,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";

import supportedCurrencies from "../../../constants/supportedCurrencies";
import useThemeColors from "../../../hooks/theme/useThemeColors";

interface AssetCardProps {
  asset: NewAssetForm;
  removeAsset: (key: string) => void;
  removeDisabled: boolean | undefined;
}

const AssetCard = ({ asset, removeAsset, removeDisabled }: AssetCardProps) => {
  const colors = useThemeColors();
  const currencyObject = supportedCurrencies.find(
    (currency) => currency.code === asset.costPrice.currency
  );

  return (
    <HStack
      alignItems="start"
      bg={colors.tertiary}
      borderWidth="1px"
      borderRadius="lg"
      p="10px 15px"
      mb="15px"
    >
      <Stat>
        <HStack>
          <StatLabel>Product:</StatLabel>
          <StatHelpText>{` ${asset.product.productName}`}</StatHelpText>
        </HStack>
        <HStack>
          <StatLabel>Cost:</StatLabel>
          <StatHelpText>
            {`(${currencyObject?.code}) ${currencyObject?.symbol}${parseFloat(
              asset.costPrice.amount
            ).toLocaleString()}`}
          </StatHelpText>
        </HStack>
        <HStack>
          <StatLabel>Quantity:</StatLabel>
          <StatHelpText>{asset.quantity}</StatHelpText>
        </HStack>
        <HStack>
          <StatLabel>Expected Arrival:</StatLabel>
          <StatHelpText>
            {dayjs(asset.expectedArrivalDate).format("ddd MMM DD, YYYY")}
          </StatHelpText>
        </HStack>
      </Stat>
      <CloseButton
        disabled={removeDisabled}
        onClick={() => removeAsset(asset.key)}
      />
    </HStack>
  );
};

export default AssetCard;
