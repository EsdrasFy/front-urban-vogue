"use client";
import { ContextApp } from "@/app/contexts/ContextApp";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";

function Favorites() {
  const context = useContext(ContextApp);

  if (!context) {
    // Tratar o caso onde o contexto não está definido, se necessário
    return null;
  }
  const { isOpen, onOpen, onClose } = context.disclosureFav;
  const { cartSummary } = context;

  const btnRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Drawer
        size={"lg"}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>FAVORITES</DrawerHeader>

          <DrawerBody>
            <input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Favorites;
