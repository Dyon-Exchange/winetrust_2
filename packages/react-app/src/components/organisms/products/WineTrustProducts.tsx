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

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
    <Box bg={colors.secondary} boxShadow="sm" flex="1" m="20px auto" maxW="80%">
      <Box p="16px">
        <HStack justifyContent="space-between" overflow="auto" p="10px 20px"  w="100%">
          <Input
            placeholder="Search"
            size="sm"
            value={searchQuery}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setSearchQuery(event.currentTarget.value)
            }
            w="20%"
          />
          <HStack ml="auto">
            {deleteList.length > 0 && (
              <RemoveButton onClick={removeSelectedRows} />
            )}

            <AddNewButton onClick={openAddNew}/>
          </HStack>
        </HStack>
        <ProductsTable setDeleteList={setDeleteList} assets={assets} searchQuery={searchQuery} />
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
