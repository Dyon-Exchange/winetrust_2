import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useState, useContext } from "react";
import { useQuery } from "react-query";

import removeClients from "../../../api/data/clients/removeClients";
import removeProducts from "../../../api/data/products/removeProducts";
import { DataContext } from "../../../contexts/DataContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";
import RemoveButton from "../../atoms/buttons/RemoveButton";
import DataTableSpinner from "../../molecules/dataTables/DataTableSpinner";

import AddNewClientFormModal from "./clients/AddNewClientFormModal";
import ClientsTable from "./clients/ClientsTable";
import AddNewProductFormModal from "./products/AddNewProductFormModal";
import ProductsTable from "./products/ProductsTable";
import AddNewWarehouseFormModal from "./warehouses/AddNewWarehouseFormModal";
import WarehousesTable from "./warehouses/WarehousesTable";

const WineTrustData = () => {
  const colors = useThemeColors();

  // state for the tab index
  const [tabIndex, setTabIndex] = useState(0);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { assets } = useContext(DataContext);

  // states for the add new modals
  const {
    isOpen: isAddNewWarehouseOpen,
    onOpen: openAddNewWarehouse,
    onClose: closeAddNewWarehouse,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const {
    isOpen: isAddNewClientOpen,
    onOpen: openAddNewClient,
    onClose: closeAddNewClient,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const {
    isOpen: isAddNewProductOpen,
    onOpen: openAddNewProduct,
    onClose: closeAddNewProduct,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  // tab change handler
  const handleTabChange = useCallback(
    (index: number) => {
      setDeleteList([]);
      setTabIndex(index);
    },
    [setTabIndex, setDeleteList]
  );

  // open add new handler
  const openAddNew = useCallback(() => {
    // open the appropriate add new modal
    if (tabIndex === 0) openAddNewWarehouse();
    if (tabIndex === 1) openAddNewClient();
    if (tabIndex === 2) openAddNewProduct();
  }, [tabIndex, openAddNewWarehouse, openAddNewClient, openAddNewProduct]);

  const removeSelectedRows = useCallback(async () => {
    setIsLoading(true);
    // Warehouse
    if (tabIndex === 0) console.log(deleteList);
    // Client
    if (tabIndex === 1) {
      const result = await removeClients(deleteList);
      console.log(result);
    }
    // Product
    if (tabIndex === 2) {
      const result = await removeProducts(deleteList);
      console.log(result);
    }
    setIsLoading(false);
    setDeleteList([]);
    console.log(assets);
  }, [deleteList, tabIndex, assets]);

  return (
    <>
      <Box
        bg={colors.secondary}
        boxShadow='sm'
        flex='1'
        m='20px auto'
        maxW='80%'>
        <Tabs index={tabIndex} isLazy onChange={handleTabChange}>
          <HStack
            justifyContent='space-between'
            overflow='auto'
            p='10px 20px'
            w='100%'>
            <TabList mr='20px'>
              <Tab>Warehouses</Tab>
              <Tab>Clients</Tab>
              <Tab>Products</Tab>
            </TabList>
            <HStack>
              {deleteList.length > 0 && (
                <RemoveButton onClick={removeSelectedRows} />
              )}
              <AddNewButton onClick={openAddNew} />
            </HStack>
          </HStack>

          <TabPanels>
            <TabPanel>
              {isLoading ? (
                <DataTableSpinner />
              ) : (
                <WarehousesTable
                  setDeleteList={setDeleteList}
                  assets={assets}
                />
              )}
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <DataTableSpinner />
              ) : (
                <ClientsTable setDeleteList={setDeleteList} assets={assets} />
              )}
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <DataTableSpinner />
              ) : (
                <ProductsTable setDeleteList={setDeleteList} assets={assets} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Add new modals */}
      {/* only render the modals when their open states are true, so that useForm hook resets */}
      {isAddNewWarehouseOpen && (
        <AddNewWarehouseFormModal
          isOpen={isAddNewWarehouseOpen}
          onClose={closeAddNewWarehouse}
        />
      )}
      {isAddNewClientOpen && (
        <AddNewClientFormModal
          isOpen={isAddNewClientOpen}
          onClose={closeAddNewClient}
        />
      )}
      {isAddNewProductOpen && (
        <AddNewProductFormModal
          isOpen={isAddNewProductOpen}
          onClose={closeAddNewProduct}
        />
      )}
    </>
  );
};

export default WineTrustData;
