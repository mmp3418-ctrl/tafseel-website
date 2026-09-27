"use client";

import type { ReactElement, SVGProps } from "react";
import type { SocialIconId } from "@/lib/home-settings";

type IconProps = SVGProps<SVGSVGElement>;

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.05v13.5a2.89 2.89 0 1 1-2.03-2.76v-3.1a6 6 0 1 0 5.08 5.93V9.4a8.16 8.16 0 0 0 3.77.94V6.69z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  );
}

function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
    </svg>
  );
}

function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.5 3.5A11 11 0 0 0 3.2 17.8L2 22l4.3-1.1A11 11 0 1 0 20.5 3.5zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.3-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4c.1-.1 0-.3 0-.4s-.5-1.3-.7-1.7-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a9.4 9.4 0 0 0 3.5 2.7c1.3.6 1.8.6 2.4.5s1.1-.5 1.2-.9.2-.8.1-.9-.2-.2-.4-.3z" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.9-6.4L5.4 22H2.6l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.9 8.8H3.7V21h3.2V8.8zM5.3 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM21 21h-3.2v-6.5c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V21H9.9V8.8h3.1v1.7h.1c.4-.8 1.5-2.2 3.6-2.2 3.8 0 4.5 2.5 4.5 5.8V21z" />
    </svg>
  );
}

function SnapchatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.1 2c2.6 0 4.5 1.7 4.8 4.3.1.6.1 1.2.1 1.6 0 .7.1 1.3.4 1.8.3.5.7.8 1.2 1 .4.2.6.4.6.7 0 .4-.4.7-.9.9-.3.1-.5.2-.5.4 0 .1.1.3.2.4.5.6 1.3 1.2 2.3 1.4.3.1.5.2.5.5 0 .5-.6.9-1.5 1.1-.2 0-.3.1-.3.3 0 .7.3 1.4.8 2 .4.4.5.8.3 1.1-.2.3-.6.3-1.1.2-1-.2-1.9-.7-2.7-.7-.5 0-.9.2-1.5.5-.8.4-1.7.8-2.8.8s-2-.4-2.8-.8c-.6-.3-1-.5-1.5-.5-.8 0-1.7.5-2.7.7-.5.1-.9.1-1.1-.2-.2-.3-.1-.7.3-1.1.5-.6.8-1.3.8-2 0-.2-.1-.3-.3-.3-.9-.2-1.5-.6-1.5-1.1 0-.3.2-.4.5-.5 1-.2 1.8-.8 2.3-1.4.1-.1.2-.3.2-.4 0-.2-.2-.3-.5-.4-.5-.2-.9-.5-1.2-1-.3-.5-.4-1.1-.4-1.8 0-.4 0-1 .1-1.6C7.6 3.7 9.5 2 12.1 2z" />
    </svg>
  );
}

function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9.4 15.5 9 19.2c.5 0 .8-.2 1.1-.5l2.6-2.5 5.4 4c1 .5 1.7.3 2-.9L22.8 4c.3-1.3-.5-1.9-1.5-1.5L2.3 9.2C1 9.7 1 10.5 2.1 10.8l4.9 1.5 11.4-7.2c.5-.3 1-.1.6.2L9.4 15.5z" />
    </svg>
  );
}

const ICONS: Record<SocialIconId, (props: IconProps) => ReactElement> = {
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsappIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  snapchat: SnapchatIcon,
  telegram: TelegramIcon,
};

export default function SocialIcon({
  icon,
  className,
}: {
  icon: SocialIconId | string;
  className?: string;
}) {
  const id = (icon in ICONS ? icon : "facebook") as SocialIconId;
  const Icon = ICONS[id];
  return <Icon className={className} aria-hidden />;
}
