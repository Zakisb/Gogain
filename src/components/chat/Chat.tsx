"use client";

import { FC, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "@/components/ui/button";
import CoachPng from "@/assets/images/icons/whistle.png";
import Lightening from "@/assets/images/icons/chat-lightening.svg";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import { Dot, ChevronDown } from "lucide-react";
const Chat: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatWindowVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };
  return (
    <div>
      <div className="p-3 cursor-pointer hover:bg-orange-600 text-white text-sm bg-orange-500 fixed right-10 bottom-8 border border-gray-200 z-40 rounded-full transition-colors duration-300 ease-in-out ">
        <div className="relative" onClick={() => setIsOpen(!isOpen)}>
          <Image
            src={CoachPng}
            height={35}
            alt="Virtual coach chat"
            className="z-10 "
          />
          {/* <Dumbbell className="text-white h-6 w-6" /> */}
          <div className="h-3 w-3 rounded-full bg-green-500 absolute -right-2 -bottom-2 z-20" />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            variants={chatWindowVariants}
            animate={isOpen ? "open" : "closed"}
            initial="closed"
            exit="closed"
            className={`fixed h-[80%] z-50 flex flex-col  max-h-[750px] w-[380px] bg-white text-black right-10 border bottom-8 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out shadow-[0_10px_40px_rgba(0,0,0,0.08)] ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {" "}
            {/* header  */}
            <div className="flex flex-row justify-between bg-orange-500 items-center gap-4 px-6 py-4">
              <div className="flex flex-row gap-4 items-center">
                <div className="relative">
                  <Image
                    src={Lightening}
                    height={35}
                    alt="Virtual coach chat"
                    className="z-10 "
                  />
                  <div className="h-2 w-2 rounded-full bg-green-500 absolute right-0 bottom-0 z-50" />
                </div>
                <span className="text-white">Coach sportif virtuel</span>
              </div>
              <ChevronDown
                className="text-white h-7 w-7 cursor-pointer hover:bg-opacity-10 hover:bg-white p-1 rounded-lg"
                onClick={() => setIsOpen(false)}
              />
            </div>
            {/* chat messages */}
            <ChatMessages />
            <ChatInput />
            {/* chat input */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
