"use client";
import { useState, useEffect } from "react";
import { Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import {
  IconRowRemove,
  IconArrowsSplit,
  IconGitCherryPick,
  IconDeviceMobileVibration,
  IconCut,
  IconArrowsJoin,
  IconPlayerRecordFilled,
  IconSwitchHorizontal,
  IconMenu2,
  IconWorld,
} from "@tabler/icons-react";
import classes from "./NavbarMinimal.module.css";

interface NavbarLinkProps {
  icon: typeof IconRowRemove;
  label: string;
  href: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  href,
  active,
  onClick,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <a href={href} className={classes.link} data-active={active || undefined}>
        <UnstyledButton onClick={onClick}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </UnstyledButton>
      </a>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconRowRemove, label: "Remover", href: "/remover" },
  { icon: IconArrowsSplit, label: "Splitter", href: "/splitter" },
  { icon: IconGitCherryPick, label: "Pitcher", href: "/pitcher" },
  {
    icon: IconDeviceMobileVibration,
    label: "Key BPM Finder",
    href: "/bpm-finder",
  },
  { icon: IconCut, label: "Cutter", href: "/" },
  { icon: IconArrowsJoin, label: "Joiner", href: "/joiner" },
  { icon: IconPlayerRecordFilled, label: "Recorder", href: "/recorder" },
  { icon: IconRowRemove, label: "Karaoke", href: "/karaoke" },
];

export default function Navbar() {
  const [active, setActive] = useState<number>(-1); // Set initial active as -1
  const [menuOpened, setMenuOpened] = useState(true);

  useEffect(() => {
    // Set initial active state to the index of "Cutter"
    const cutterIndex = mockdata.findIndex((item) => item.label === "Cutter");
    if (cutterIndex !== -1) {
      setActive(cutterIndex);
    }
  }, []);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <>
      <UnstyledButton
        className={`${classes.hamburgerButton} ${
          menuOpened ? classes.menuOpened : ""
        }`}
        onClick={() => setMenuOpened((prev) => !prev)}
      >
        <IconMenu2 style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
      </UnstyledButton>

      <nav className={`${classes.navbar} ${menuOpened ? classes.open : ""}`}>
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink
            icon={IconSwitchHorizontal}
            label="Support"
            href="/support"
          />
          <NavbarLink icon={IconWorld} label="Country" href="/language" />
        </Stack>
      </nav>
    </>
  );
}
