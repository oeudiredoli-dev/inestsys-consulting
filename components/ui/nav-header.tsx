"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Position = { left: number; width: number; opacity: number };

function NavHeader() {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full p-1"
      style={{
        border: "1px solid rgba(255,107,53,0.28)",
        background: "rgba(14,16,18,0.70)",
        backdropFilter: "blur(16px)",
      }}
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} href="/">Home</Tab>
      <Tab setPosition={setPosition} href="/mission">Our Mission</Tab>
      <Tab setPosition={setPosition} href="/news">INEST News</Tab>
      <Tab setPosition={setPosition} href="/contact">Contact Us</Tab>
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-sm"
      style={{ fontFamily: "var(--font-syne)", letterSpacing: "0.1em" }}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 rounded-full md:h-12"
    style={{ background: "#FF6B35" }}
  />
);

export default NavHeader;
