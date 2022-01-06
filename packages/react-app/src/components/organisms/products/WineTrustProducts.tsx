import { Box, HStack, Input, Tab, TabList, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useState, useContext } from "react";

import { DataContext } from "../../../contexts/DataContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";
import RemoveButton from "../../atoms/buttons/RemoveButton";

import AddNewProductFormModal from "./AddNewProductFormModal";
import ProductsTable from "./ProductsTable";

const WineTrustProducts = () => {
  const colors = useThemeColors();
  const { assets } = useContext(DataContext);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // states for the add new modals
  const {
    isOpen: isAddNewProductOpen,
    onOpen: openAddNewProduct,
    onClose: closeAddNewProduct,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const openAddNew = useCallback(() => {
    // open the appropriate add new modal
    openAddNewProduct();
  }, [openAddNewProduct]);

  const removeSelectedRows = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log(deleteList);
    } finally {
      setIsLoading(false);
      setDeleteList([]);
    }
  }, [deleteList]);

  return (
    <>
    <Box bg={colors.secondary} boxShadow="sm" flex="1" m="20px auto" maxW="80%">
      <Box p="16px">
        <HStack justifyContent="space-between" overflow="auto" p="10px 20px"  w="100%">
          <HStack>
            {deleteList.length > 0 && (
              <RemoveButton onClick={removeSelectedRows} />
            )}

            <AddNewButton onClick={openAddNew}/>
          </HStack>
        </HStack>
        <ProductsTable setDeleteList={setDeleteList} assets={assets} />
      </Box>
    </Box>
    {isAddNewProductOpen && (
      <AddNewProductFormModal
        isOpen={isAddNewProductOpen}
        onClose={closeAddNewProduct}
      />
    )}
    </>
  );
};

export default WineTrustProducts;
