"use client";

import { Modal } from "flowbite-react";
import { useState } from "react";
import { SolidButton } from "@base/base-ui";
import { FaPlus } from "react-icons/fa";
import { GeneralTab } from "@base/dashboard";

//prettier-ignore
const theme = {
    "root": {
      "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        "off": "hidden"
      },
      "sizes": {
        "sm": "max-w-sm",
        "md": "max-w-md",
        "lg": "max-w-lg",
        "xl": "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl"
      },
      "positions": {
        "top-left": "items-start justify-start",
        "top-center": "items-start justify-center",
        "top-right": "items-start justify-end",
        "center-left": "items-center justify-start",
        "center": "items-center justify-center",
        "center-right": "items-center justify-end",
        "bottom-right": "items-end justify-end",
        "bottom-center": "items-end justify-center",
        "bottom-left": "items-end justify-start"
      }
    },
    "content": {
      "base": "rounded-lg shadow-black relative h-full w-full  md:h-auto",
      "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-primary shadow dark:bg-gray-700"
    },
    "body": {
      "base": "flex-1 overflow-auto p-6",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      "popup": "border-b-0 p-2",
      "title": "text-xl font-medium text-secondary dark:text-white",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-secondary dark:hover:bg-gray-600 dark:hover:text-white",
        "icon": "h-5 w-5"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      "popup": "border-t"
    }
  }

function FormModal({ itemValues, category, cb, itemName }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className="w-full flex justify-end">
			<SolidButton
				className="md:w-auto self-end"
				onClick={() => setOpenModal(true)}
			>
				<span className="flex justify-center items-center">
					<span className="mr-2">Add New {itemName && itemName}</span>{" "}
					<FaPlus className="w-4 h-4"></FaPlus>
				</span>
			</SolidButton>
			<Modal theme={theme} show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header className="uppercase">New {itemName} form</Modal.Header>
				<Modal.Body>
					{itemValues && (
						<GeneralTab
							formValues={itemValues}
							activationToggle={itemValues?.hasSepareteActivationToggle}
							activationList={itemValues?.activationList}
							category={category}
							btnText="ADD"
							updateCb={(newItem) => {
								cb(newItem);
							}}
						></GeneralTab>
					)}
				</Modal.Body>
				{/*<Modal.Footer>
					<Button onClick={() => setOpenModal(false)}>I accept</Button>
					<Button color="gray" onClick={() => setOpenModal(false)}>
						Decline
					</Button>
				</Modal.Footer>*/}
			</Modal>
		</div>
	);
}

export default FormModal;
