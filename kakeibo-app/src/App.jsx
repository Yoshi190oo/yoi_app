import { useState, useMemo, useEffect } from "react";

// ─── Color palettes ──
const LIGHT = {
  bg:"#F2F6F4", surface:"#FFFFFF", surfaceAlt:"#EBF1EE", border:"#D0DDD8",
  blue:"#4E8C73", blueDim:"#E8F2ED", blueLight:"#B7CDBF",
  text:"#111827", textMid:"#4B5563", textMuted:"#9CA3AF",
  green:"#16A34A", greenBg:"#DCFCE7",
  red:"#DC2626", redBg:"#FEE2E2",
  amber:"#D97706", amberBg:"#FEF3C7",
  purple:"#7C3AED",
  calSat:"#2F7FD4", calSun:"#DC2626",
  need:"#4E8C73", want:"#D97706", future:"#7C3AED",
};

const DARK = {
  bg:"#0F1611", surface:"#1A2520", surfaceAlt:"#243029", border:"#2F3D35",
  blue:"#6FB592", blueDim:"#1F2D26", blueLight:"#4E8C73",
  text:"#F3F4F6", textMid:"#D1D5DB", textMuted:"#9CA3AF",
  green:"#34D399", greenBg:"#0F2A1E",
  red:"#F87171", redBg:"#2A1414",
  amber:"#FBBF24", amberBg:"#2A1F0A",
  purple:"#A78BFA",
  calSat:"#60A5FA", calSun:"#F87171",
  need:"#6FB592", want:"#FBBF24", future:"#A78BFA",
};

// Live theme object - mutated when theme changes
const C = Object.assign({}, LIGHT);
function applyTheme(theme){
  var src = theme === "dark" ? DARK : LIGHT;
  for(var k in src){ C[k] = src[k]; }
}

// ─── Icon ──
function Icon(props){
  const name = props.name;
  const size = props.size || 20;
  const color = props.color || C.textMid;
  const sw = props.strokeWidth || 1.6;
  const style = { width:size, height:size, display:"block", flexShrink:0 };
  let inner = null;
  if(name==="home") inner = <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21V12h6v9" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/></>;
  else if(name==="chart") inner = <><path d="M18 20V10" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"/><path d="M12 20V4" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"/><path d="M6 20v-6" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"/></>;
  else if(name==="calendar") inner = <><rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M16 2v4M8 2v4M3 10h18" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="gear") inner = <><circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth={sw}/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="plus") inner = <path d="M12 5v14M5 12h14" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"/>;
  else if(name==="bank") inner = <path d="M3 21h18M3 10h18M5 10V21M19 10V21M12 3L3 10h18L12 3z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="edit") inner = <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" fill="none" stroke={color} strokeWidth={sw}/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="trash") inner = <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="chevronR") inner = <path d="M9 18l6-6-6-6" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="chevronL") inner = <path d="M15 18l-6-6 6-6" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="chevronDown") inner = <path d="M6 9l6 6 6-6" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="chevronUp") inner = <path d="M18 15l-6-6-6 6" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="repeat") inner = <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="piggy") inner = <><path d="M20 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4M2 12a8 8 0 0116 0" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="refresh") inner = <><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke={color} strokeWidth={sw}/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="shield") inner = <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="heart") inner = <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="trendUp") inner = <><path d="M23 6l-9.5 9.5-5-5L1 18" fill="none" stroke={color} strokeWidth={sw}/><path d="M17 6h6v6" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="utensils") inner = <path d="M3 2v7c0 1.1.9 2 2 2s2-.9 2-2V2M7 11v11M12 2a5 5 0 015 5 5 5 0 01-5 5v9" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="car") inner = <><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5a2 2 0 01-2 2h-3" fill="none" stroke={color} strokeWidth={sw}/><circle cx="7.5" cy="17.5" r="2.5" fill="none" stroke={color} strokeWidth={sw}/><circle cx="17.5" cy="17.5" r="2.5" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="music") inner = <><path d="M9 18V5l12-2v13" fill="none" stroke={color} strokeWidth={sw}/><circle cx="6" cy="18" r="3" fill="none" stroke={color} strokeWidth={sw}/><circle cx="18" cy="16" r="3" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="shopping") inner = <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="tag") inner = <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="box") inner = <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="medal") inner = <><circle cx="12" cy="8" r="6" fill="none" stroke={color} strokeWidth={sw}/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="star") inner = <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="grip") inner = <><circle cx="9" cy="6" r="1" fill={color}/><circle cx="15" cy="6" r="1" fill={color}/><circle cx="9" cy="12" r="1" fill={color}/><circle cx="15" cy="12" r="1" fill={color}/><circle cx="9" cy="18" r="1" fill={color}/><circle cx="15" cy="18" r="1" fill={color}/></>;
  else if(name==="coffee") inner = <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="book") inner = <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" fill="none" stroke={color} strokeWidth={sw}/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="bolt") inner = <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="plane") inner = <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="tv") inner = <><rect x="2" y="7" width="20" height="15" rx="2" fill="none" stroke={color} strokeWidth={sw}/><polyline points="17 2 12 7 7 2" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="gift") inner = <><polyline points="20 12 20 22 4 22 4 12" fill="none" stroke={color} strokeWidth={sw}/><rect x="2" y="7" width="20" height="5" fill="none" stroke={color} strokeWidth={sw}/><line x1="12" y1="22" x2="12" y2="7" stroke={color} strokeWidth={sw}/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="pill") inner = <><path d="M10.5 20.5L20.5 10.5a4 4 0 00-5.66-5.66L4.84 14.84a4 4 0 005.66 5.66z" fill="none" stroke={color} strokeWidth={sw}/><line x1="8.12" y1="11.88" x2="13.42" y2="17.18" stroke={color} strokeWidth={sw}/></>;
  else if(name==="dumbbell") inner = <><path d="M6.5 6.5l11 11M21 21l-1-1M3 3l1 1M18 22l4-4M2 6l4-4M3 10l7-7M14 21l7-7" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="globe") inner = <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth={sw}/><line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth={sw}/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="briefcase") inner = <><rect x="2" y="7" width="20" height="14" rx="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="gas") inner = <><line x1="3" y1="22" x2="15" y2="22" stroke={color} strokeWidth={sw}/><line x1="4" y1="9" x2="14" y2="9" stroke={color} strokeWidth={sw}/><path d="M14 22V4a2 2 0 00-2-2H6a2 2 0 00-2 2v18M14 13h2a2 2 0 012 2v2a2 2 0 002 2h0a2 2 0 002-2V9.83a2 2 0 00-.59-1.42L18 5" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="phoneCall") inner = <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="wifi") inner = <><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" fill="none" stroke={color} strokeWidth={sw}/><line x1="12" y1="20" x2="12.01" y2="20" stroke={color} strokeWidth={sw}/></>;
  else if(name==="cake") inner = <><path d="M20 21V10a2 2 0 00-2-2H6a2 2 0 00-2 2v11M20 21H4M12 8V2M9 5h6" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="baby") inner = <><circle cx="12" cy="6" r="3" fill="none" stroke={color} strokeWidth={sw}/><path d="M9 10s-2 2-2 4 2 4 5 4 5-2 5-4-2-4-2-4M9 18v3M15 18v3" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="paw") inner = <><circle cx="11" cy="4" r="2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="18" cy="8" r="2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="4" cy="8" r="2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="6" cy="14" r="2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="16" cy="14" r="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M11 12a6 6 0 016 6c0 2-1 3-3 3H8c-2 0-3-1-3-3a6 6 0 016-6z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="leaf") inner = <path d="M11 20A7 7 0 014 13V8a7 7 0 0114 0v5a7 7 0 01-7 7zM12 8v12" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="palette") inner = <><circle cx="13.5" cy="6.5" r="1" fill={color}/><circle cx="17.5" cy="10.5" r="1" fill={color}/><circle cx="8.5" cy="7.5" r="1" fill={color}/><circle cx="6.5" cy="12.5" r="1" fill={color}/><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="scissors") inner = <><circle cx="6" cy="6" r="3" fill="none" stroke={color} strokeWidth={sw}/><circle cx="6" cy="18" r="3" fill="none" stroke={color} strokeWidth={sw}/><line x1="20" y1="4" x2="8.12" y2="15.88" stroke={color} strokeWidth={sw}/><line x1="14.47" y1="14.48" x2="20" y2="20" stroke={color} strokeWidth={sw}/><line x1="8.12" y1="8.12" x2="12" y2="12" stroke={color} strokeWidth={sw}/></>;
  else if(name==="dollar") inner = <><line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth={sw}/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="creditCard") inner = <><rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke={color} strokeWidth={sw}/><line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth={sw}/></>;
  else if(name==="train") inner = <><rect x="4" y="3" width="16" height="16" rx="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3" fill="none" stroke={color} strokeWidth={sw}/><circle cx="8" cy="15" r="1" fill={color}/><circle cx="16" cy="15" r="1" fill={color}/></>;
  else if(name==="bike") inner = <><circle cx="5.5" cy="17.5" r="3.5" fill="none" stroke={color} strokeWidth={sw}/><circle cx="18.5" cy="17.5" r="3.5" fill="none" stroke={color} strokeWidth={sw}/><path d="M15 6h3l3 8M5.5 17.5L9 8h6l3 9.5" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="home" || name==="house") inner = <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="none" stroke={color} strokeWidth={sw}/><path d="M9 21V12h6v9" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="building") inner = <><rect x="4" y="2" width="16" height="20" rx="1" fill="none" stroke={color} strokeWidth={sw}/><path d="M9 22V12h6v10M9 6h.01M15 6h.01M9 10h.01M15 10h.01" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="bed") inner = <><path d="M2 9V20M22 9V20M2 14h20M2 9c0-2 2-4 4-4h12c2 0 4 2 4 4" fill="none" stroke={color} strokeWidth={sw}/><circle cx="6" cy="11" r="1.5" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="bath") inner = <><path d="M4 12h16v4a3 3 0 01-3 3H7a3 3 0 01-3-3v-4zM5 12V6a2 2 0 014 0M9 6a2 2 0 014 0v2h-4V6z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="wrench") inner = <path d="M14.7 6.3a4 4 0 00-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 005.6-5.6L15 12l-3-3 2.7-2.7z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="basket") inner = <><path d="M3 9l3-6h12l3 6M3 9h18M3 9v9a2 2 0 002 2h14a2 2 0 002-2V9M8 13v3M12 13v3M16 13v3" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="bus") inner = <><rect x="3" y="5" width="18" height="13" rx="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M3 11h18M7 5V3h10v2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="7" cy="16" r="1.5" fill={color}/><circle cx="17" cy="16" r="1.5" fill={color}/></>;
  else if(name==="taxi") inner = <><rect x="3" y="11" width="18" height="6" rx="1" fill="none" stroke={color} strokeWidth={sw}/><path d="M5 11l2-5h10l2 5M9 6V4h6v2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="7" cy="17" r="1.5" fill={color}/><circle cx="17" cy="17" r="1.5" fill={color}/></>;
  else if(name==="walk") inner = <><circle cx="13" cy="4" r="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M9 22l3-7-3-3 2-4 4 2 3 4M5 22l3-9" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="sake") inner = <><path d="M8 3h8v4l-4 4-4-4V3zM12 11v8M8 19h8" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="bento") inner = <><rect x="3" y="6" width="18" height="13" rx="1" fill="none" stroke={color} strokeWidth={sw}/><path d="M3 12h18M12 6v13M9 9h.01M15 16h.01" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="pizza") inner = <path d="M12 2L2 22h20L12 2zM12 9v.01M9 13v.01M15 13v.01M12 16v.01" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="iceCream") inner = <><path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5zM7 12l5 10 5-10" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="camera") inner = <><rect x="2" y="6" width="20" height="14" rx="2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="12" cy="13" r="4" fill="none" stroke={color} strokeWidth={sw}/><path d="M8 6l2-3h4l2 3" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="gamepad") inner = <><rect x="2" y="8" width="20" height="11" rx="3" fill="none" stroke={color} strokeWidth={sw}/><circle cx="7" cy="13" r="1" fill={color}/><circle cx="17" cy="13" r="1" fill={color}/><path d="M14 12h4M16 10v4" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="gym") inner = <path d="M6 4v16M18 4v16M3 8v8M21 8v8M6 12h12" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="run") inner = <><circle cx="15" cy="4" r="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M4 17l4-3 3 5 4-5 5 1M9 9l3-2 4 3" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="school") inner = <><path d="M22 10L12 5 2 10l10 5 10-5z" fill="none" stroke={color} strokeWidth={sw}/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5M22 10v6" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="laptop") inner = <><rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M2 20h20" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="package") inner = <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill="none" stroke={color} strokeWidth={sw}/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22V12" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="basketball") inner = <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth={sw}/><path d="M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93M2 12h20M12 2v20" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="cat") inner = <><path d="M12 4l-4 4h8l-4-4zM4 12c0-4 4-8 8-8s8 4 8 8c0 5-3 8-8 8s-8-3-8-8z" fill="none" stroke={color} strokeWidth={sw}/><circle cx="9" cy="13" r="0.7" fill={color}/><circle cx="15" cy="13" r="0.7" fill={color}/></>;
  else if(name==="dog") inner = <><path d="M5 9c0-3 2-5 4-5v3l3-2 3 2v-3c2 0 4 2 4 5v8c0 2-1 3-3 3H8c-2 0-3-1-3-3V9z" fill="none" stroke={color} strokeWidth={sw}/><circle cx="10" cy="13" r="0.7" fill={color}/><circle cx="14" cy="13" r="0.7" fill={color}/></>;
  else if(name==="tree") inner = <><path d="M12 2L7 9h3l-3 5h3l-2 4h8l-2-4h3l-3-5h3l-5-7zM12 18v4" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="flower") inner = <><circle cx="12" cy="12" r="2" fill="none" stroke={color} strokeWidth={sw}/><path d="M12 7a3 3 0 010 6M12 17a3 3 0 010-6M7 12a3 3 0 016 0M17 12a3 3 0 01-6 0" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="cloud") inner = <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="sun2") inner = <><circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth={sw}/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="snowflake") inner = <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M12 7l-2-2M12 7l2-2M12 17l-2 2M12 17l2 2M7 12l-2-2M7 12l-2 2M17 12l2-2M17 12l2 2" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="wallet") inner = <><rect x="3" y="6" width="16" height="14" rx="2.5" fill="none" stroke={color} strokeWidth={sw}/><path d="M7 9.5h8" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"/><rect x="14" y="12" width="7" height="5" rx="2" fill="none" stroke={color} strokeWidth={sw}/><circle cx="17" cy="14.5" r="0.7" fill={color}/></>;
  else if(name==="lightbulb") inner = <><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7c.5.4 1 .8 1 1.3v2h6v-2c0-.5.5-.9 1-1.3A7 7 0 0012 2z" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="droplet") inner = <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="flame") inner = <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="ticket") inner = <path d="M3 7v2a3 3 0 010 6v2c0 1.1.9 2 2 2h14a2 2 0 002-2v-2a3 3 0 010-6V7a2 2 0 00-2-2H5a2 2 0 00-2 2zM13 5v2M13 17v2M13 11v2" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="cart") inner = <><circle cx="9" cy="21" r="1" fill={color}/><circle cx="20" cy="21" r="1" fill={color}/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" fill="none" stroke={color} strokeWidth={sw}/></>;
  else if(name==="apple") inner = <path d="M12 20.5c-3 0-6-2.5-6-7.5 0-4 2.5-6 5-6 1 0 2 .5 2.5 1.5C14 7.5 15 7 16 7c2.5 0 5 2 5 6 0 5-3 7.5-6 7.5-1.5 0-2-1-3-1s-1.5 1-3 1zM12 7V2" fill="none" stroke={color} strokeWidth={sw}/>;
  else if(name==="wine") inner = <path d="M8 22h8M12 16v6M6 3l1 8a5 5 0 0010 0l1-8H6z" fill="none" stroke={color} strokeWidth={sw}/>;
  else inner = <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth={sw}/>;
  return <svg viewBox="0 0 24 24" style={style}>{inner}</svg>;
}

// ─── i18n ──
const T = {
  appName:"yoi",
  income:"収入", expenses:"支出", balance:"収支",
  thisWeek:"今週", today:"今日",
  monthlyBudget:"月予算", consumed:"使用済", remaining:"残り", overdrawn:"超過",
  categories:"カテゴリー", weeklyExpenses:"今週支出",
  addCategory:"カテゴリー追加",
  save:"保存",
  newEntry:"新規記帳", editEntry:"記帳を編集",
  expenseBtn:"支出", incomeBtn:"収入", descPlaceholder:"例：スーパー…",
  noEntries:"データなし",
  months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  dowS:["月","火","水","木","金","土","日"],
  dowL:["月曜","火曜","水曜","木曜","金曜","土曜","日曜"],
  accounts:"資産", totalAssets:"総資産",
  addAccount:"資産を追加", editAccount:"資産を編集",
  subscriptions:"サブスクリプション", addSub:"追加", editSub:"編集",
  subPerMonth:"/ 月", subCycleMonthly:"毎月", subCycleYearly:"毎年",
  savings:"貯金",
  budgetSplit:"予算配分（50/30/20）",
  splitNeeds:"Need（50%）", splitWants:"Want（30%）", splitFuture:"Future（20%）",
  catSettings:"カテゴリー設定",
};

// ─── Default Data ──
const DEFAULT_CATS = [
  {id:1, name:"家賃・光熱費", icon:"home",     color:"#3B82F6", monthBudget:0, dayBudget:null, split:"need"},
  {id:2, name:"食料品",       icon:"shopping", color:"#F59E0B", monthBudget:0, dayBudget:null, split:"need"},
  {id:3, name:"交通費",       icon:"car",      color:"#8B5CF6", monthBudget:0, dayBudget:null, split:"need"},
  {id:4, name:"外食",         icon:"utensils", color:"#EF4444", monthBudget:0, dayBudget:null, split:"want"},
  {id:5, name:"医療・健康",   icon:"shield",   color:"#10B981", monthBudget:0, dayBudget:null, split:"need"},
  {id:6, name:"娯楽・文化",   icon:"music",    color:"#6366F1", monthBudget:0, dayBudget:null, split:"want"},
  {id:7, name:"衣類",         icon:"tag",      color:"#F97316", monthBudget:0, dayBudget:null, split:"want"},
  {id:8, name:"その他",       icon:"box",      color:"#6B7280", monthBudget:0, dayBudget:null, split:"want"},
  {id:9, name:"貯金",         icon:"piggy",    color:"#16A34A", monthBudget:0, dayBudget:null, split:"future"},
];
const INC_BASE = [
  {id:"i1", name:"給与",   icon:"medal",   color:"#10B981"},
  {id:"i2", name:"副業",   icon:"star",    color:"#10B981"},
  {id:"i3", name:"投資",   icon:"trendUp", color:"#10B981"},
  {id:"i4", name:"その他", icon:"box",     color:"#10B981"},
];
const DEFAULT_ACCOUNTS = [
  {id:"a1", name:"普通口座",   bank:"",  balance:0,  color:"#2F7FD4", isSavings:false},
  {id:"a2", name:"貯金口座",   bank:"", balance:0,  color:"#16A34A", isSavings:true},
];
const DEFAULT_SUBS = [];

const NOW = new Date();
function toLocalISO(d){
  var y = d.getFullYear();
  var m = String(d.getMonth()+1).padStart(2,"0");
  var dd = String(d.getDate()).padStart(2,"0");
  return y + "-" + m + "-" + dd;
}
const TODAY_STR = toLocalISO(NOW);
function daysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }
function dowMon(d){ return (d.getDay()+6)%7; }
function weekStart(d){ var r=new Date(d); r.setDate(r.getDate()-dowMon(r)); r.setHours(0,0,0,0); return r; }

const cy = NOW.getFullYear();
const cm = String(NOW.getMonth()+1).padStart(2,"0");
const td = NOW.getDate();
function sd(n){ var d=new Date(NOW); d.setDate(d.getDate()-n); return toLocalISO(d); }

const SEED = [];

// ─── Formatters ──
function fmtEur(n){ return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"EUR"}).format(n||0); }
function fmtShort(n){
  if(Math.abs(n)>=1000) return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"EUR",maximumFractionDigits:0,notation:"compact"}).format(n);
  return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
}

async function fetchJpyEurRate(){
  try{
    const res = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:512,
        tools:[{type:"web_search_20250305",name:"web_search"}],
        messages:[{role:"user",content:'Search current EUR/JPY rate. Return ONLY JSON: {"rate":162.5}'}]
      })
    });
    const data = await res.json();
    var text = "";
    for(var i=0;i<data.content.length;i++){
      if(data.content[i].type==="text") text += data.content[i].text;
    }
    text = text.replace(/```json|```/g,"").trim();
    const parsed = JSON.parse(text);
    if(parsed.rate && typeof parsed.rate === "number") return parsed.rate;
  }catch(e){}
  return null;
}

// ─── UI atoms ──
function Card(props){
  const style = Object.assign({
    background:C.surface, borderRadius:16, padding:"16px",
    boxShadow:"0 1px 4px rgba(30,60,120,0.07)",
    border:"1px solid "+C.border,
  }, props.style || {});
  return <div style={style}>{props.children}</div>;
}

function SectionTitle(props){
  return <div style={{fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:C.textMuted,marginBottom:10,marginTop:20}}>{props.children}</div>;
}

function CatIcon(props){
  const cat = props.cat || {};
  const size = props.size || 38;
  const col = cat.color || C.blue;
  return (
    <div style={{width:size,height:size,borderRadius:size*0.28,flexShrink:0,background:col+"18",border:"1.5px solid "+col+"30",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Icon name={cat.icon||"box"} size={size*0.55} color={col} strokeWidth={1.8}/>
    </div>
  );
}

function BudgetBar(props){
  const spent = props.spent || 0;
  const budget = props.budget;
  const color = props.color || C.blue;
  const h = props.h || 6;
  if(!budget) return null;
  const pct = Math.min((spent/budget)*100, 100);
  var bc = color;
  if(spent>budget) bc = C.red;
  else if(pct>80) bc = C.amber;
  return (
    <div style={{height:h,background:C.surfaceAlt,borderRadius:99,overflow:"hidden"}}>
      <div style={{height:"100%",width:pct+"%",background:bc,borderRadius:99,transition:"width .4s ease"}}/>
    </div>
  );
}

function CollapsibleSection(props){
  const [open, setOpen] = useState(props.defaultOpen || false);
  const bc = props.badgeColor || C.blue;
  function toggle(){ setOpen(!open); }
  return (
    <div style={{marginBottom:4}}>
      <Card style={{borderRadius: open ? "14px 14px 0 0" : 14, marginBottom:0}}>
        <button onClick={toggle} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12,padding:0,fontFamily:"inherit"}}>
          <div style={{width:40,height:40,borderRadius:10,background:C.blueDim,border:"1.5px solid "+C.blueLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Icon name={props.iconName||"box"} size={19} color={C.blue} strokeWidth={1.7}/>
          </div>
          <div style={{flex:1,textAlign:"left"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text}}>{props.title}</div>
            {props.subtitle && <div style={{fontSize:11,color:C.textMuted,marginTop:1}}>{props.subtitle}</div>}
          </div>
          {props.badge && <div style={{fontSize:16,fontWeight:800,color:bc,marginRight:6}}>{props.badge}</div>}
          <Icon name={open?"chevronUp":"chevronDown"} size={17} color={C.textMuted}/>
        </button>
      </Card>
      {open && (
        <div style={{background:C.surface,borderRadius:"0 0 14px 14px",border:"1px solid "+C.border,borderTop:"none",overflow:"hidden"}}>
          {props.children}
          {props.addButton && <div style={{padding:"10px 14px",borderTop:"1px solid "+C.border}}>{props.addButton}</div>}
        </div>
      )}
    </div>
  );
}

// ─── CatModal ──
function CatModal(props){
  const cat = props.cat;
  const COLORS = ["#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#F97316","#6366F1","#6B7280","#0EA5E9","#16A34A"];
  const ICONS = [
    "home","building","bed","bath","wrench","lightbulb",
    "shopping","cart","basket","apple","utensils","coffee","wine","cake","sake","bento","pizza","iceCream",
    "car","train","bike","bus","taxi","plane","walk","run","gas",
    "music","tv","book","gift","ticket","camera","gamepad","laptop","gym","basketball",
    "shield","pill","heart","dumbbell","baby","paw","cat","dog",
    "tree","flower","leaf","sun2","cloud","snowflake","flame","droplet",
    "tag","scissors","palette","package",
    "phoneCall","wifi","globe","briefcase","school",
    "piggy","dollar","creditCard","medal","star","bolt","trendUp","box"
  ];
  const initId = cat ? cat.id : Date.now();
  const [name, setName] = useState(cat ? cat.name : "");
  const [icon, setIcon] = useState(cat ? cat.icon : "box");
  const [color, setColor] = useState(cat ? cat.color : C.blue);
  const [monthBudget, setMonthBudget] = useState(cat ? String(cat.monthBudget||"") : "");
  const [dayBudget, setDayBudget] = useState(cat && cat.dayBudget ? String(cat.dayBudget) : "");
  const [split, setSplit] = useState(cat ? cat.split : "want");
  const inp = {background:C.surfaceAlt,border:"1.5px solid "+C.border,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"10px 12px",width:"100%",boxSizing:"border-box",fontSize:14};
  const lbl = {fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,display:"block",marginBottom:6};
  function save(){
    if(!name) return;
    props.onSave({id:initId, name:name, icon:icon, color:color, monthBudget:parseFloat(monthBudget)||0, dayBudget:dayBudget?parseFloat(dayBudget)||null:null, split:split});
  }
  function stop(e){ e.stopPropagation(); }
  return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={props.onClose}>
      <div onClick={stop} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>{cat?"カテゴリーを編集":"カテゴリーを追加"}</div>
        <label style={lbl}>アイコン</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
          {ICONS.map(function(nm){
            var active = icon === nm;
            return (
              <button key={nm} onClick={function(){setIcon(nm);}} style={{width:38,height:38,borderRadius:8,cursor:"pointer",border:"2px solid "+(active?C.blue:"transparent"),background:active?C.blueDim:C.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={nm} size={18} color={active?C.blue:C.textMid}/>
              </button>
            );
          })}
        </div>
        <label style={lbl}>カラー</label>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
          {COLORS.map(function(col){
            return <button key={col} onClick={function(){setColor(col);}} style={{width:28,height:28,borderRadius:"50%",background:col,cursor:"pointer",border:color===col?"3px solid "+C.blue:"3px solid transparent"}}/>;
          })}
        </div>
        <div style={{marginBottom:14}}>
          <label style={lbl}>カテゴリー名</label>
          <input value={name} onChange={function(e){setName(e.target.value);}} placeholder="例：食料品" style={inp}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <div><label style={lbl}>月予算 (€)</label><input type="number" value={monthBudget} onChange={function(e){setMonthBudget(e.target.value);}} placeholder="0" style={inp}/></div>
          <div><label style={lbl}>日予算（任意）</label><input type="number" value={dayBudget} onChange={function(e){setDayBudget(e.target.value);}} placeholder="なし" style={inp}/></div>
        </div>
        <div style={{marginBottom:20}}>
          <label style={lbl}>予算配分</label>
          <div style={{display:"flex",gap:6}}>
            <button onClick={function(){setSplit("need");}} style={{flex:1,padding:"8px 4px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,border:"1.5px solid "+(split==="need"?C.need:C.border),background:split==="need"?C.need+"18":C.surfaceAlt,color:split==="need"?C.need:C.textMuted}}>Need</button>
            <button onClick={function(){setSplit("want");}} style={{flex:1,padding:"8px 4px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,border:"1.5px solid "+(split==="want"?C.want:C.border),background:split==="want"?C.want+"18":C.surfaceAlt,color:split==="want"?C.want:C.textMuted}}>Want</button>
            <button onClick={function(){setSplit("future");}} style={{flex:1,padding:"8px 4px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,border:"1.5px solid "+(split==="future"?C.future:C.border),background:split==="future"?C.future+"18":C.surfaceAlt,color:split==="future"?C.future:C.textMuted}}>Future</button>
          </div>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{T.save}</button>
        {cat && props.onDelete && <button onClick={function(){props.onDelete(cat.id);props.onClose();}} style={{width:"100%",marginTop:10,padding:"13px",borderRadius:14,border:"1.5px solid "+C.red,background:C.redBg,color:C.red,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon name="trash" size={15} color={C.red}/>削除する</button>}
      </div>
    </div>
  );
}

// ─── SubModal ──
function SubModal(props){
  const sub = props.sub;
  const cats = props.cats || [];
  const COLORS = ["#E50914","#1DB954","#3B82F6","#9333EA","#F59E0B","#0891B2","#111827","#EF4444","#F97316","#6366F1"];
  const initId = sub ? sub.id : Date.now();
  const [name, setName] = useState(sub ? sub.name : "");
  const [amount, setAmount] = useState(sub ? String(sub.amount) : "");
  const [cycle, setCycle] = useState(sub ? sub.cycle : "monthly");
  const [note, setNote] = useState(sub ? sub.note : "");
  const [color, setColor] = useState(sub ? sub.color : C.blue);
  const [split, setSplit] = useState(sub ? sub.split : "want");
  const [catId, setCatId] = useState(sub && sub.catId !== undefined ? sub.catId : null);
  const inp = {background:C.surfaceAlt,border:"1.5px solid "+C.border,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"10px 12px",width:"100%",boxSizing:"border-box",fontSize:14};
  const lbl = {fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,display:"block",marginBottom:6};
  function save(){
    if(!name || !parseFloat(amount)) return;
    props.onSave({id:initId, name:name, amount:parseFloat(amount), cycle:cycle, note:note, color:color, split:split, catId:catId});
  }
  function stop(e){ e.stopPropagation(); }
  return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={props.onClose}>
      <div onClick={stop} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>{sub?T.editSub:T.addSub}</div>
        <div style={{marginBottom:12}}><label style={lbl}>名前</label><input value={name} onChange={function(e){setName(e.target.value);}} placeholder="Netflix…" style={inp}/></div>
        <div style={{marginBottom:12}}><label style={lbl}>金額 (€)</label><input type="number" value={amount} onChange={function(e){setAmount(e.target.value);}} placeholder="0.00" style={inp}/></div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>サイクル</label>
          <div style={{display:"flex",background:C.surfaceAlt,borderRadius:12,padding:4,gap:4}}>
            <button onClick={function(){setCycle("monthly");}} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:cycle==="monthly"?C.blue:"transparent",color:cycle==="monthly"?"#fff":C.textMuted,fontSize:13,fontWeight:600}}>{T.subCycleMonthly}</button>
            <button onClick={function(){setCycle("yearly");}} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:cycle==="yearly"?C.blue:"transparent",color:cycle==="yearly"?"#fff":C.textMuted,fontSize:13,fontWeight:600}}>{T.subCycleYearly}</button>
          </div>
        </div>
        {/* Category selector */}
        <div style={{marginBottom:12}}>
          <label style={lbl}>カテゴリー（任意）</label>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
            <button onClick={function(){setCatId(null);}} style={{padding:"6px 12px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(catId===null?C.blue:C.border),background:catId===null?C.blueDim:C.surfaceAlt,color:catId===null?C.blue:C.textMid,fontSize:12,fontWeight:catId===null?700:400}}>なし</button>
            {cats.map(function(cat){
              var active = catId === cat.id;
              return (
                <button key={cat.id} onClick={function(){setCatId(cat.id);}} style={{padding:"6px 10px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(active?cat.color:C.border),background:active?cat.color+"18":C.surfaceAlt,color:active?cat.color:C.textMid,fontSize:12,fontWeight:active?700:400,display:"flex",alignItems:"center",gap:5}}>
                  <Icon name={cat.icon} size={12} color={active?cat.color:C.textMid}/>{cat.name}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{marginBottom:12}}><label style={lbl}>メモ（任意）</label><input value={note} onChange={function(e){setNote(e.target.value);}} placeholder="…" style={inp}/></div>
        <div style={{marginBottom:12}}>
          <label style={lbl}>予算配分</label>
          <div style={{display:"flex",gap:6}}>
            <button onClick={function(){setSplit("need");}} style={{flex:1,padding:"8px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,border:"1.5px solid "+(split==="need"?C.need:C.border),background:split==="need"?C.need+"18":C.surfaceAlt,color:split==="need"?C.need:C.textMuted}}>Need</button>
            <button onClick={function(){setSplit("want");}} style={{flex:1,padding:"8px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,border:"1.5px solid "+(split==="want"?C.want:C.border),background:split==="want"?C.want+"18":C.surfaceAlt,color:split==="want"?C.want:C.textMuted}}>Want</button>
            <button onClick={function(){setSplit("future");}} style={{flex:1,padding:"8px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,border:"1.5px solid "+(split==="future"?C.future:C.border),background:split==="future"?C.future+"18":C.surfaceAlt,color:split==="future"?C.future:C.textMuted}}>Future</button>
          </div>
        </div>
        <div style={{marginBottom:18}}>
          <label style={lbl}>カラー</label>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {COLORS.map(function(col){
              return <button key={col} onClick={function(){setColor(col);}} style={{width:26,height:26,borderRadius:"50%",background:col,cursor:"pointer",border:color===col?"3px solid "+C.blue:"3px solid transparent"}}/>;
            })}
          </div>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{T.save}</button>
        {sub && props.onDelete && <button onClick={function(){props.onDelete(sub.id);props.onClose();}} style={{width:"100%",marginTop:10,padding:"13px",borderRadius:14,border:"1.5px solid "+C.red,background:C.redBg,color:C.red,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon name="trash" size={15} color={C.red}/>削除する</button>}
      </div>
    </div>
  );
}

// ─── AccountModal ──
function AccountModal(props){
  const account = props.account;
  const COLORS = ["#2F7FD4","#16A34A","#9333EA","#D97706","#EF4444","#0891B2","#7C3AED","#F97316"];
  const initId = account ? account.id : Date.now();
  const [name, setName] = useState(account ? account.name : "");
  const [bank, setBank] = useState(account ? account.bank : "");
  // For new accounts: initial balance. For existing: this stays the same.
  const [amount, setAmount] = useState(account ? String(account.balance) : "");
  const [color, setColor] = useState(account ? account.color : C.blue);
  const [isSavings, setIsSavings] = useState(account ? account.isSavings : false);
  // Deposit/withdraw fields (only for existing accounts)
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState("deposit"); // "deposit" or "withdraw"
  const [txNote, setTxNote] = useState("");

  const inp = {background:C.surfaceAlt,border:"1.5px solid "+C.border,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"10px 12px",width:"100%",boxSizing:"border-box",fontSize:14};
  const lbl = {fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,display:"block",marginBottom:6};

  function save(){
    if(!name) return;
    var finalBalance = parseFloat(amount) || 0;
    // Apply deposit/withdraw for existing accounts
    if(account && txAmount){
      var ta = parseFloat(txAmount) || 0;
      if(txType === "deposit") finalBalance = account.balance + ta;
      else finalBalance = account.balance - ta;
    }
    props.onSave({id:initId, name:name, bank:bank, balance:finalBalance, color:color, isSavings:isSavings});
  }
  function stop(e){ e.stopPropagation(); }
  function toggleSavings(){ setIsSavings(!isSavings); }

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={props.onClose}>
      <div onClick={stop} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>{account?T.editAccount:T.addAccount}</div>

        <div style={{marginBottom:12}}><label style={lbl}>名称</label><input value={name} onChange={function(e){setName(e.target.value);}} placeholder="普通口座" style={inp}/></div>
        <div style={{marginBottom:12}}><label style={lbl}>金融機関・種別</label><input value={bank} onChange={function(e){setBank(e.target.value);}} placeholder="三菱UFJ銀行" style={inp}/></div>

        {/* Existing account: show current balance + deposit/withdraw UI */}
        {account ? (
          <div>
            <div style={{background:C.surfaceAlt,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontSize:11,color:C.textMuted,marginBottom:4}}>現在の残高</div>
              <div style={{fontSize:22,fontWeight:800,color:color}}>{fmtEur(account.balance)}</div>
              {txAmount && parseFloat(txAmount) > 0 && (
                <div style={{fontSize:12,marginTop:6,color:C.textMid}}>
                  {txType==="deposit" ? "+" : "−"}{fmtEur(parseFloat(txAmount))} →&nbsp;
                  <b style={{color:C.text}}>{fmtEur(txType==="deposit" ? account.balance + parseFloat(txAmount) : account.balance - parseFloat(txAmount))}</b>
                </div>
              )}
            </div>

            <label style={lbl}>入金・出金</label>
            <div style={{display:"flex",background:C.surfaceAlt,borderRadius:12,padding:4,gap:4,marginBottom:10}}>
              <button onClick={function(){setTxType("deposit");}} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:txType==="deposit"?C.greenBg:"transparent",color:txType==="deposit"?C.green:C.textMuted,fontSize:13,fontWeight:700}}>＋ 入金</button>
              <button onClick={function(){setTxType("withdraw");}} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:txType==="withdraw"?C.redBg:"transparent",color:txType==="withdraw"?C.red:C.textMuted,fontSize:13,fontWeight:700}}>− 出金</button>
            </div>
            <input type="number" step="0.01" value={txAmount} onChange={function(e){setTxAmount(e.target.value);}} placeholder="金額 (€) 例: 100.00" style={Object.assign({},inp,{marginBottom:14})}/>
          </div>
        ) : (
          <div style={{marginBottom:12}}>
            <label style={lbl}>初期残高 (€)</label>
            <input type="number" step="0.01" value={amount} onChange={function(e){setAmount(e.target.value);}} placeholder="0.00" style={inp}/>
          </div>
        )}

        <div style={{marginBottom:14}}>
          <label style={lbl}>カラー</label>
          <div style={{display:"flex",gap:8}}>
            {COLORS.map(function(col){
              return <button key={col} onClick={function(){setColor(col);}} style={{width:28,height:28,borderRadius:"50%",background:col,cursor:"pointer",border:color===col?"3px solid "+C.blue:"3px solid transparent"}}/>;
            })}
          </div>
        </div>
        <div style={{marginBottom:20,display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,border:"1.5px solid "+(isSavings?C.green:C.border),background:isSavings?C.greenBg:C.surfaceAlt,cursor:"pointer"}} onClick={toggleSavings}>
          <Icon name="piggy" size={20} color={isSavings?C.green:C.textMuted}/>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:isSavings?C.green:C.text}}>貯金口座</div>
            <div style={{fontSize:11,color:C.textMuted}}>この資産の残高を貯金に反映</div>
          </div>
          <div style={{width:20,height:20,borderRadius:"50%",border:"2px solid "+(isSavings?C.green:C.border),background:isSavings?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {isSavings && <div style={{width:8,height:8,borderRadius:"50%",background:"#fff"}}/>}
          </div>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{T.save}</button>
        {account && props.onDelete && <button onClick={function(){props.onDelete(account.id);props.onClose();}} style={{width:"100%",marginTop:10,padding:"13px",borderRadius:14,border:"1.5px solid "+C.red,background:C.redBg,color:C.red,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon name="trash" size={15} color={C.red}/>この資産を削除する</button>}
      </div>
    </div>
  );
}

// ─── AddModal ──
function AddModal(props){
  const editTx = props.editTx;
  const cats = props.cats;
  const accounts = props.accounts;
  const initId = editTx ? editTx.id : Date.now();
  const [txType, setTxType] = useState(editTx ? editTx.type : "expense");
  // Filter out future-split cats for expense (they belong to transfer)
  var expenseCats = [];
  var transferCats = [];
  for(var ec=0; ec<cats.length; ec++){
    if(cats[ec].split === "future") transferCats.push(cats[ec]);
    else expenseCats.push(cats[ec]);
  }
  const [catId, setCatId] = useState(editTx ? editTx.catId : (expenseCats[0] ? expenseCats[0].id : 2));
  const [desc, setDesc] = useState(editTx ? editTx.desc : "");
  const [amount, setAmount] = useState(editTx ? String(editTx.amount) : "");
  const [date, setDate] = useState(editTx ? editTx.date : (props.prefillDate || TODAY_STR));
  const [accountId, setAccountId] = useState(editTx ? editTx.accountId : null);
  // Transfer-specific
  const [fromAccountId, setFromAccountId] = useState(editTx && editTx.fromAccountId ? editTx.fromAccountId : (accounts[0] ? accounts[0].id : null));
  const [toAccountId, setToAccountId] = useState(editTx && editTx.toAccountId ? editTx.toAccountId : (accounts[1] ? accounts[1].id : null));
  // Transfer category (for Future tracking) - if set, transfer is counted in budget Future
  const [transferCatId, setTransferCatId] = useState(editTx && editTx.transferCatId ? editTx.transferCatId : null);
  const activeCats = txType === "expense" ? expenseCats : INC_BASE;
  const inp = {background:C.surfaceAlt,border:"1.5px solid "+C.border,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:10,padding:"11px 13px",fontSize:14};

  function save(){
    if(!amount || parseFloat(amount) <= 0) return;
    if(txType === "transfer"){
      if(!fromAccountId || !toAccountId || fromAccountId === toAccountId) return;
      props.onSave({id:initId, type:"transfer", catId:null, transferCatId:transferCatId, desc:desc||"振替", amount:parseFloat(amount), date:date, fromAccountId:fromAccountId, toAccountId:toAccountId, accountId:null});
      return;
    }
    var cid = isNaN(Number(catId)) ? catId : Number(catId);
    props.onSave({id:initId, type:txType, catId:cid, desc:desc, amount:parseFloat(amount), date:date, accountId:accountId});
  }
  function stop(e){ e.stopPropagation(); }
  function switchType(v){
    setTxType(v);
    if(v === "expense") setCatId(expenseCats[0] ? expenseCats[0].id : 2);
    else if(v === "income") setCatId("i1");
  }

  // Account picker label based on type
  var accountLabel = "口座（任意）";
  if(txType === "income") accountLabel = "支出元（任意）";

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={props.onClose}>
      <div onClick={stop} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:12}}>{editTx?T.editEntry:T.newEntry}</div>

        {/* Type tabs: expense / income / transfer */}
        <div style={{display:"flex",background:C.surfaceAlt,borderRadius:12,padding:4,marginBottom:12,gap:4}}>
          <button onClick={function(){switchType("expense");}} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:txType==="expense"?C.amberBg:"transparent",color:txType==="expense"?C.amber:C.textMuted,fontSize:13,fontWeight:700}}>{T.expenseBtn}</button>
          <button onClick={function(){switchType("income");}} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:txType==="income"?C.greenBg:"transparent",color:txType==="income"?C.green:C.textMuted,fontSize:13,fontWeight:700}}>{T.incomeBtn}</button>
          <button onClick={function(){switchType("transfer");}} style={{flex:1,padding:"9px",border:"none",borderRadius:9,fontFamily:"inherit",cursor:"pointer",background:txType==="transfer"?C.blueDim:"transparent",color:txType==="transfer"?C.blue:C.textMuted,fontSize:13,fontWeight:700}}>振替</button>
        </div>

        <div style={{textAlign:"center",marginBottom:14}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:22,color:C.blueLight}}>€</span>
            <input autoFocus type="number" min="0" step="0.01" value={amount} onChange={function(e){setAmount(e.target.value);}} placeholder="0.00" style={{width:150,background:"transparent",border:"none",borderBottom:"2px solid "+C.blue,color:C.text,fontSize:32,fontWeight:700,fontFamily:"inherit",outline:"none",textAlign:"center",padding:"4px 0"}}/>
          </div>
        </div>

        {/* Transfer UI */}
        {txType === "transfer" && (
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>送金元</div>
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:12}}>
              {accounts.map(function(acc){
                var active = fromAccountId === acc.id;
                return (
                  <button key={acc.id} onClick={function(){setFromAccountId(acc.id);}} style={{padding:"6px 12px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(active?acc.color:C.border),background:active?acc.color+"18":C.surfaceAlt,color:active?acc.color:C.textMid,fontSize:12,fontWeight:active?700:400,display:"flex",alignItems:"center",gap:5}}>
                    <Icon name={acc.isSavings?"piggy":"bank"} size={12} color={active?acc.color:C.textMid}/>{acc.name}
                  </button>
                );
              })}
            </div>
            <div style={{textAlign:"center",marginBottom:6}}><Icon name="chevronDown" size={20} color={C.textMuted}/></div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>送金先</div>
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:12}}>
              {accounts.map(function(acc){
                var active = toAccountId === acc.id;
                var disabled = fromAccountId === acc.id;
                return (
                  <button key={acc.id} disabled={disabled} onClick={function(){setToAccountId(acc.id);}} style={{padding:"6px 12px",borderRadius:99,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(active?acc.color:C.border),background:active?acc.color+"18":C.surfaceAlt,color:active?acc.color:C.textMid,fontSize:12,fontWeight:active?700:400,display:"flex",alignItems:"center",gap:5,opacity:disabled?0.3:1}}>
                    <Icon name={acc.isSavings?"piggy":"bank"} size={12} color={active?acc.color:C.textMid}/>{acc.name}
                  </button>
                );
              })}
            </div>
            {/* Future category selector (for budget tracking) */}
            {transferCats.length > 0 && (
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>貯金カテゴリー（任意・予算Futureに反映）</div>
                <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:12}}>
                  <button onClick={function(){setTransferCatId(null);}} style={{padding:"6px 12px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(transferCatId===null?C.blue:C.border),background:transferCatId===null?C.blueDim:C.surfaceAlt,color:transferCatId===null?C.blue:C.textMid,fontSize:12,fontWeight:transferCatId===null?700:400}}>なし</button>
                  {transferCats.map(function(cat){
                    var active = transferCatId === cat.id;
                    return (
                      <button key={cat.id} onClick={function(){setTransferCatId(cat.id);}} style={{padding:"6px 10px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(active?cat.color:C.border),background:active?cat.color+"18":C.surfaceAlt,color:active?cat.color:C.textMid,fontSize:12,fontWeight:active?700:400,display:"flex",alignItems:"center",gap:5}}>
                        <Icon name={cat.icon} size={13} color={active?cat.color:C.textMid}/>{cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Expense/Income UI */}
        {txType !== "transfer" && (
          <div>
            <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:8,marginBottom:10}}>
              {activeCats.map(function(cat){
                var active = String(catId) === String(cat.id);
                return (
                  <button key={cat.id} onClick={function(){setCatId(cat.id);}} style={{padding:"6px 10px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(active?cat.color:C.border),background:active?cat.color+"18":C.surfaceAlt,color:active?cat.color:C.textMid,fontSize:12,fontWeight:active?700:400,display:"flex",alignItems:"center",gap:5}}>
                    <Icon name={cat.icon} size={13} color={active?cat.color:C.textMid}/>{cat.name}
                  </button>
                );
              })}
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>{accountLabel}</div>
              <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
                <button onClick={function(){setAccountId(null);}} style={{padding:"6px 12px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(accountId===null?C.blue:C.border),background:accountId===null?C.blueDim:C.surfaceAlt,color:accountId===null?C.blue:C.textMid,fontSize:12,fontWeight:accountId===null?700:400}}>指定なし</button>
                {accounts.map(function(acc){
                  var active = accountId === acc.id;
                  return (
                    <button key={acc.id} onClick={function(){setAccountId(acc.id);}} style={{padding:"6px 12px",borderRadius:99,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",border:"1.5px solid "+(active?acc.color:C.border),background:active?acc.color+"18":C.surfaceAlt,color:active?acc.color:C.textMid,fontSize:12,fontWeight:active?700:400,display:"flex",alignItems:"center",gap:5}}>
                      <Icon name={acc.isSavings?"piggy":"bank"} size={12} color={active?acc.color:C.textMid}/>{acc.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:9,marginBottom:14}}>
          <input value={desc} onChange={function(e){setDesc(e.target.value);}} placeholder={T.descPlaceholder} style={Object.assign({},inp,{width:"100%"})}/>
          <input type="date" value={date} onChange={function(e){setDate(e.target.value);}} style={Object.assign({},inp,{fontSize:12})}/>
        </div>
        <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:C.blue,color:"#fff",fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",boxShadow:"0 4px 16px "+C.blue+"44"}}>{editTx?T.save+" ✓":T.save}</button>
        {editTx && props.onDelete && <button onClick={function(){props.onDelete(editTx.id);props.onClose();}} style={{width:"100%",marginTop:10,padding:"13px",borderRadius:14,border:"1.5px solid "+C.red,background:C.redBg,color:C.red,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon name="trash" size={15} color={C.red}/>この記帳を削除する</button>}
      </div>
    </div>
  );
}

// ─── MonthNav ──
function MonthNav(props){
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <button onClick={props.onPrev} style={{background:C.surfaceAlt,border:"1px solid "+C.border,width:28,height:28,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="chevronL" size={14} color={C.textMid}/></button>
      <div style={{textAlign:"center",minWidth:54}}>
        <div style={{fontSize:12,fontWeight:700,color:C.text}}>{T.months[props.month]}</div>
        <div style={{fontSize:10,color:C.textMuted}}>{props.year}</div>
      </div>
      <button onClick={props.onNext} style={{background:C.surfaceAlt,border:"1px solid "+C.border,width:28,height:28,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="chevronR" size={14} color={C.textMid}/></button>
    </div>
  );
}

// ─── WeeklyChart ──
function WeeklyChart(props){
  const txs = props.txs;
  const wbpd = props.weekBudgetPerDay;
  const onDayClick = props.onDayClick;
  // Use viewed month/year if provided, else current
  const vMonth = (props.vMonth !== undefined) ? props.vMonth : NOW.getMonth();
  const vYear = (props.vYear !== undefined) ? props.vYear : NOW.getFullYear();
  const isCurrentMonth = vMonth === NOW.getMonth() && vYear === NOW.getFullYear();
  // Reference date: today if current month, else 1st of viewed month
  const refDate = isCurrentMonth ? new Date(NOW) : new Date(vYear, vMonth, 1);
  const monStart = weekStart(refDate);
  var days = [];
  for(var i=0; i<7; i++){
    var d = new Date(monStart);
    d.setDate(d.getDate()+i);
    var ds = toLocalISO(d);
    var spent = 0;
    for(var j=0; j<txs.length; j++){
      var t = txs[j];
      if(t.type==="expense" && t.date===ds) spent += t.amount;
    }
    days.push({ds:ds, dow:T.dowS[i], spent:spent, isToday:ds===TODAY_STR, isFuture:d>NOW, date:new Date(d)});
  }
  var maxVal = wbpd > 0 ? wbpd : 1;
  for(var k=0; k<days.length; k++){ if(days[k].spent > maxVal) maxVal = days[k].spent; }
  const chartH = 100;
  return (
    <div style={{paddingTop:4}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:5,height:chartH,marginBottom:6}}>
        {days.map(function(item){
          var barH = item.spent > 0 ? Math.max((item.spent/maxVal)*chartH, 6) : 3;
          var budgetH = wbpd > 0 ? (wbpd/maxVal)*chartH : 0;
          var over = item.spent > wbpd && wbpd > 0;
          var bc = item.isFuture ? C.surfaceAlt : (over ? C.red : (item.spent > wbpd*0.8 && wbpd > 0 ? C.amber : C.blue));
          function handleClick(){ if(onDayClick) onDayClick(item.date); }
          return (
            <div key={item.ds} onClick={handleClick} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative",height:chartH,cursor:"pointer",minWidth:0}}>
              {/* Bar */}
              <div style={{position:"absolute",bottom:0,left:"8%",right:"8%",height:barH,background:bc,borderRadius:"4px 4px 2px 2px",boxShadow:item.isToday?"0 0 0 2px "+bc+"55":"none",opacity:item.isFuture?0.25:1,transition:"height .4s"}}/>
              {/* Budget line */}
              {wbpd > 0 && <div style={{position:"absolute",bottom:budgetH,left:0,right:0,height:1.5,background:"rgba(0,0,0,0.18)",pointerEvents:"none"}}/>}
              {/* Amount label above bar */}
              {item.spent > 0 && (
                <div style={{position:"absolute",bottom:barH+2,left:0,right:0,fontSize:8,fontWeight:700,color:over?C.red:C.textMid,textAlign:"center",lineHeight:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",pointerEvents:"none"}}>
                  {item.spent.toFixed(2)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:5}}>
        {days.map(function(item){
          var idx = T.dowS.indexOf(item.dow);
          var col = item.isToday ? C.blue : (idx===5 ? C.calSat : (idx===6 ? C.calSun : C.textMuted));
          var dayNum = item.date.getDate();
          return (
            <div key={item.ds} style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:11,fontWeight:item.isToday?800:700,color:col,lineHeight:1.1}}>{dayNum}</div>
              <div style={{fontSize:9,fontWeight:item.isToday?700:500,color:col,marginTop:2,lineHeight:1}}>{item.dow}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Calendar ──
function SimpleCalendar(props){
  const txs = props.txs;
  const cats = props.cats;
  const year = props.year;
  const month = props.month;
  const selectedDay = props.selectedDay;
  const mode = props.mode || "expense"; // "expense" or "income"
  const totalDays = daysInMonth(year, month);
  const firstDate = new Date(year, month, 1);
  const startOffset = dowMon(firstDate);
  const isCurrentView = NOW.getMonth()===month && NOW.getFullYear()===year;
  const todayNum = isCurrentView ? NOW.getDate() : -1;

  var daySpend = {};
  for(var i=0; i<txs.length; i++){
    var t = txs[i];
    if(t.type === mode){
      var d = parseInt(t.date.split("-")[2], 10);
      if(d>=1 && d<=31) daySpend[d] = (daySpend[d]||0) + t.amount;
    }
  }
  var maxAmount = 1;
  for(var key in daySpend){ if(daySpend[key] > maxAmount) maxAmount = daySpend[key]; }

  var allCats = cats.concat(INC_BASE);
  var selectedTxs = [];
  if(selectedDay){
    for(var j=0; j<txs.length; j++){
      var tx = txs[j];
      if(parseInt(tx.date.split("-")[2],10) !== selectedDay) continue;
      // Filter by mode: expense mode shows expenses + transfers, income mode shows only incomes
      if(mode === "income" && tx.type !== "income") continue;
      if(mode === "expense" && tx.type === "income") continue;
      selectedTxs.push(tx);
    }
    selectedTxs.sort(function(a,b){return b.amount - a.amount;});
  }

  var cells = [];
  for(var oi=0; oi<startOffset; oi++) cells.push({type:"empty", key:"e"+oi});
  for(var di=0; di<totalDays; di++) cells.push({type:"day", key:"d"+(di+1), num:di+1, dow:(startOffset+di)%7});

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:6}}>
        {T.dowS.map(function(d, i){
          var col = i===5 ? C.calSat : (i===6 ? C.calSun : C.text);
          return <div key={d} style={{textAlign:"center",fontSize:10,fontWeight:600,color:col,padding:"4px 0"}}>{d}</div>;
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {cells.map(function(cell){
          if(cell.type === "empty") return <div key={cell.key}/>;
          var d = cell.num;
          var spent = daySpend[d] || 0;
          var isToday = d === todayNum;
          var isSel = d === selectedDay;
          var numColor = isSel ? "#fff" : (isToday ? C.blue : (cell.dow===5 ? C.calSat : (cell.dow===6 ? C.calSun : C.text)));
          var borderColor = isToday ? C.blue : (isSel ? C.blue : C.border);
          return (
            <div key={cell.key} onClick={function(){props.onSelectDay(isSel ? null : d);}} style={{borderRadius:10,minHeight:46,cursor:"pointer",background:isSel?C.blue:"#FFFFFF",border:"1.5px solid "+borderColor,boxShadow:isToday?"0 0 0 2px "+C.blue+"44":"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,padding:"4px 2px"}}>
              <span style={{fontSize:12,lineHeight:1,fontWeight:isToday?700:400,color:numColor}}>{d}</span>
              {spent > 0 && <span style={{fontSize:8,fontWeight:700,lineHeight:1,color:isSel?"rgba(255,255,255,0.9)":(mode==="income"?C.calSat:C.red)}}>{spent.toFixed(2)}€</span>}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div style={{background:C.surface,borderRadius:14,padding:"14px",marginTop:14,border:"1px solid "+C.border}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted,marginBottom:10}}>
            {T.dowL[dowMon(new Date(year,month,selectedDay))]}・{selectedDay}日 {T.months[month]}
            {daySpend[selectedDay] ? "　"+(mode==="income"?"収入":"支出")+" "+fmtEur(daySpend[selectedDay]) : "　"+(mode==="income"?"収入なし":"支出なし")}
          </div>
          {selectedTxs.length === 0 && <div style={{fontSize:13,color:C.textMuted}}>{T.noEntries}</div>}
          {selectedTxs.map(function(tx){
            var cat = null;
            // For transfers, use transferCatId if set
            var lookupId = tx.type === "transfer" ? tx.transferCatId : tx.catId;
            for(var ai=0; ai<allCats.length; ai++){ if(allCats[ai].id === lookupId){ cat = allCats[ai]; break; } }
            // Fallback for transfers without category: show as "振替"
            if(!cat && tx.type === "transfer") cat = {icon:"repeat", color:C.green, name:"振替"};
            if(!cat) cat = {icon:"box", color:C.blue, name:"?"};
            // Color: transfer=green, income=blue(calSat), expense=red
            var amtColor = tx.type === "income" ? C.calSat : (tx.type === "transfer" ? C.green : C.red);
            // Amount prefix
            var amtPrefix = tx.type === "transfer" ? "↔ " : "";
            return (
              <div key={tx.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid "+C.border}}>
                <CatIcon cat={cat} size={32}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:C.text}}>{tx.desc || cat.name}</div>
                  <div style={{fontSize:10,color:C.textMuted}}>{cat.name}</div>
                </div>
                <div style={{fontSize:14,fontWeight:700,color:amtColor}}>{amtPrefix}{fmtEur(tx.amount)}</div>
                <button onClick={function(){props.onEditTx(tx);}} style={{background:C.surfaceAlt,border:"1px solid "+C.border,borderRadius:6,width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name="edit" size={12} color={C.textMid}/>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── CatStatRow ──
function CatStatRow(props){
  const cat = props.cat;
  const idx = props.idx;
  const stats = props.stats || {monthSpent:0};
  const onClick = props.onClick;
  var amtColor = C.textMid;
  if(stats.monthSpent > cat.monthBudget) amtColor = C.red;
  else if(stats.monthSpent > cat.monthBudget * 0.8) amtColor = C.amber;
  return (
    <div onClick={onClick} style={{padding:"10px 16px",borderTop:idx>0?"1px solid "+C.border:"none",cursor:onClick?"pointer":"default"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:3}}>
        <CatIcon cat={cat} size={30}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:600,color:C.text}}>{cat.name}</span>
            <span style={{fontSize:11,fontWeight:600,color:amtColor}}>
              {fmtEur(stats.monthSpent)}{cat.monthBudget?" / "+fmtEur(cat.monthBudget):""}
            </span>
          </div>
          <BudgetBar spent={stats.monthSpent} budget={cat.monthBudget} color={cat.color} h={4}/>
        </div>
        {onClick && <Icon name="edit" size={12} color={C.textMuted}/>}
      </div>
    </div>
  );
}

// ─── SubRow ──
function SubRow(props){
  const sub = props.sub;
  const pm = sub.cycle === "yearly" ? sub.amount/12 : sub.amount;
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 16px",borderTop:"1px solid "+C.border}}>
      <div style={{width:32,height:32,borderRadius:8,background:sub.color+"18",border:"1.5px solid "+sub.color+"44",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:sub.color}}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:C.text}}>{sub.name}</div>
        <div style={{fontSize:10,color:C.textMuted}}>{sub.note?sub.note+" · ":""}{sub.cycle==="yearly"?fmtEur(sub.amount)+"/年":"毎月"}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:13,fontWeight:700,color:C.blue}}>{fmtEur(pm)}</div>
        <div style={{fontSize:9,color:C.textMuted}}>{T.subPerMonth}</div>
      </div>
      <button onClick={props.onEdit} style={{background:C.surfaceAlt,border:"1px solid "+C.border,borderRadius:6,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Icon name="edit" size={13} color={C.textMid}/>
      </button>
    </div>
  );
}

// ─── SettingsCatRow ──
function SettingsCatRow(props){
  const [open, setOpen] = useState(false);
  const cat = props.cat;
  const stats = props.stats || {monthSpent:0};
  function toggle(){ setOpen(!open); }
  const splitLabels = {need:"Need", want:"Want", future:"Future", none:"なし"};
  const splitColors = {need:C.need, want:C.want, future:C.future, none:C.textMuted};
  return (
    <div style={{marginBottom:4}}>
      <div style={{background:C.surface,borderRadius:open?"12px 12px 0 0":12,border:"1px solid "+C.border,overflow:"hidden"}}>
        <button onClick={toggle} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12,padding:"11px 14px",fontFamily:"inherit"}}>
          <CatIcon cat={cat} size={34}/>
          <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,textAlign:"left"}}>{cat.name}</span>
          {cat.split && cat.split !== "none" && <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:99,background:splitColors[cat.split]+"18",color:splitColors[cat.split]}}>{splitLabels[cat.split]}</span>}
          <span style={{fontSize:12,color:C.textMuted,marginRight:4}}>{cat.monthBudget?fmtEur(cat.monthBudget):"—"}</span>
          <Icon name={open?"chevronUp":"chevronDown"} size={16} color={C.textMuted}/>
        </button>
      </div>
      {open && (
        <div style={{background:C.surface,borderRadius:"0 0 12px 12px",border:"1px solid "+C.border,borderTop:"none",padding:"12px 14px"}}>
          <div style={{display:"flex",gap:14,marginBottom:10,fontSize:12,color:C.textMid}}>
            <span>月予算: <b style={{color:C.text}}>{cat.monthBudget?fmtEur(cat.monthBudget):"未設定"}</b></span>
            <span>日予算: <b style={{color:C.text}}>{cat.dayBudget?fmtEur(cat.dayBudget):"なし"}</b></span>
          </div>
          {cat.monthBudget > 0 && (
            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.textMuted,marginBottom:3}}>
                <span>今月の支出</span>
                <span style={{color:stats.monthSpent>cat.monthBudget?C.red:C.textMid,fontWeight:600}}>{fmtEur(stats.monthSpent)} / {fmtEur(cat.monthBudget)}</span>
              </div>
              <BudgetBar spent={stats.monthSpent} budget={cat.monthBudget} color={cat.color} h={6}/>
            </div>
          )}
          <div style={{display:"flex",gap:8}}>
            <button onClick={props.onEdit} style={{flex:1,padding:"9px",borderRadius:10,border:"1px solid "+C.border,background:C.surfaceAlt,color:C.textMid,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon name="edit" size={13} color={C.textMid}/>編集</button>
            <button onClick={props.onDelete} style={{flex:1,padding:"9px",borderRadius:10,border:"1px solid "+C.red+"22",background:C.redBg,color:C.red,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Icon name="trash" size={13} color={C.red}/>削除</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SavingsLineChart ──
function SavingsLineChart(props){
  const data = props.data || [];
  if(data.length === 0) return <div style={{fontSize:12,color:C.textMuted,padding:"20px 0",textAlign:"center"}}>履歴がありません</div>;
  var sorted = data.slice().sort(function(a,b){
    if(a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });
  var max = 1;
  var min = sorted[0].amount;
  for(var i=0; i<sorted.length; i++){
    if(sorted[i].amount > max) max = sorted[i].amount;
    if(sorted[i].amount < min) min = sorted[i].amount;
  }
  // Add some headroom for labels
  var range = max - min;
  if(range === 0) range = max || 1;
  var displayMax = max + range * 0.25;
  var displayMin = Math.max(0, min - range * 0.1);
  var displayRange = displayMax - displayMin || 1;

  const W = 320, H = 160, PL = 16, PR = 16, PT = 24, PB = 30;
  const cw = W - PL - PR, ch = H - PT - PB;
  var pts = [];
  for(var j=0; j<sorted.length; j++){
    var x = PL + (sorted.length>1 ? j*(cw/(sorted.length-1)) : cw/2);
    var y = PT + ch - ((sorted[j].amount - displayMin)/displayRange)*ch;
    pts.push({x:x, y:y, d:sorted[j]});
  }
  var line = "";
  for(var k=0; k<pts.length; k++){ line += pts[k].x + "," + pts[k].y + " "; }
  var fillPath = "M" + pts[0].x + "," + (PT+ch);
  for(var m=0; m<pts.length; m++){ fillPath += " L" + pts[m].x + "," + pts[m].y; }
  fillPath += " L" + pts[pts.length-1].x + "," + (PT+ch) + " Z";

  function fmtAmt(n){
    return Math.round(n).toLocaleString("ja-JP");
  }

  return (
    <svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",height:H,display:"block"}}>
      <defs>
        <linearGradient id="svgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.green} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={C.green} stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#svgrad)"/>
      <polyline points={line.trim()} fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map(function(p, idx){
        return <circle key={"c"+idx} cx={p.x} cy={p.y} r="4" fill={C.green} stroke="#fff" strokeWidth="2"/>;
      })}
      {/* Amount labels above each point */}
      {pts.map(function(p, idx){
        // Alternate label position to avoid overlap
        var isLast = idx === pts.length - 1;
        var labelY = p.y - 10;
        return (
          <text key={"a"+idx} x={p.x} y={labelY} textAnchor="middle" fontSize={isLast?"11":"9"} fill={isLast?C.green:C.textMid} fontWeight={isLast?"700":"600"} fontFamily="inherit">
            {fmtAmt(p.d.amount)}€
          </text>
        );
      })}
      {/* Month labels below */}
      {pts.map(function(p, idx){
        return <text key={"m"+idx} x={p.x} y={H-8} textAnchor="middle" fontSize="9" fill={C.textMuted} fontFamily="inherit">{T.months[p.d.month]}</text>;
      })}
    </svg>
  );
}

// ─── Data persistence / migration ──
const STORAGE_KEY = "yoi_data_v2";
const DATA_VERSION = 2;

function migrateData(data){
  if(!data) return null;
  // Migrate to current version (DATA_VERSION = 1 currently)
  // Future migrations example:
  // if((data.version || 0) < 2) { data.txs.forEach(function(t){ if(!t.tags) t.tags = []; }); data.version = 2; }
  if(!data.version) data.version = 1;
  // Ensure all fields exist with defaults
  if(!data.txs) data.txs = [];
  if(!data.cats) data.cats = JSON.parse(JSON.stringify(DEFAULT_CATS));
  if(!data.accounts) data.accounts = JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS));
  if(!data.subs) data.subs = JSON.parse(JSON.stringify(DEFAULT_SUBS));
  if(!data.savingsHistory) data.savingsHistory = [];
  if(!data.settings) data.settings = {};
  if(data.settings.monthStartDay === undefined) data.settings.monthStartDay = 1;
  return data;
}

function loadFromStorage(){
  try {
    if(typeof localStorage === "undefined") return null;
    // Clean up old key (from before rename)
    try { localStorage.removeItem("haushaltsbuch_data_v1"); } catch(e){}
    var raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    var data = JSON.parse(raw);
    return migrateData(data);
  } catch(e) {
    return null;
  }
}

function saveToStorage(state){
  try {
    if(typeof localStorage === "undefined") return;
    var data = {
      version: DATA_VERSION,
      savedAt: new Date().toISOString(),
      txs: state.txs,
      cats: state.cats,
      accounts: state.accounts,
      subs: state.subs,
      savingsHistory: state.savingsHistory,
      settings: { monthStartDay: state.monthStartDay },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e) {}
}

function downloadDataFile(state){
  var data = {
    version: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    appName: "yoi",
    txs: state.txs,
    cats: state.cats,
    accounts: state.accounts,
    subs: state.subs,
    savingsHistory: state.savingsHistory,
    settings: { monthStartDay: state.monthStartDay },
  };
  var json = JSON.stringify(data, null, 2);
  var blob = new Blob([json], {type:"application/json"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  var dateStr = new Date().toISOString().slice(0,10);
  a.download = "kakeibo_backup_" + dateStr + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── SavingsHistoryModal ──
function SavingsHistoryModal(props){
  const accounts = props.accounts || [];
  const txs = props.txs || [];
  function stop(e){ e.stopPropagation(); }

  // Build savings history: all txs related to savings accounts
  var savingsAccountIds = {};
  for(var i=0; i<accounts.length; i++){
    if(accounts[i].isSavings) savingsAccountIds[accounts[i].id] = accounts[i];
  }

  // Collect relevant transactions
  var entries = [];
  for(var j=0; j<txs.length; j++){
    var t = txs[j];
    // Direct transactions on savings account
    if(t.accountId && savingsAccountIds[t.accountId]){
      entries.push({
        id: t.id + "_main",
        date: t.date,
        type: t.type,
        amount: t.amount,
        desc: t.desc || (t.type === "income" ? "収入" : "支出"),
        accountName: savingsAccountIds[t.accountId].name,
        isFuture: false,
      });
    }
    // Transfers TO savings
    if(t.type === "transfer" && t.toAccountId && savingsAccountIds[t.toAccountId]){
      entries.push({
        id: t.id + "_to",
        date: t.date,
        type: "income",
        amount: t.amount,
        desc: t.desc || "振替（入金）",
        accountName: savingsAccountIds[t.toAccountId].name,
        isFuture: false,
      });
    }
    // Transfers FROM savings
    if(t.type === "transfer" && t.fromAccountId && savingsAccountIds[t.fromAccountId]){
      entries.push({
        id: t.id + "_from",
        date: t.date,
        type: "expense",
        amount: t.amount,
        desc: t.desc || "振替（出金）",
        accountName: savingsAccountIds[t.fromAccountId].name,
        isFuture: false,
      });
    }
  }

  // Sort by date desc
  entries.sort(function(a, b){
    if(a.date !== b.date) return new Date(b.date) - new Date(a.date);
    return 0;
  });

  // Calculate running balance backwards for display
  var totalIn = 0, totalOut = 0;
  for(var k=0; k<entries.length; k++){
    if(entries[k].type === "income") totalIn += entries[k].amount;
    else totalOut += entries[k].amount;
  }

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(17,24,39,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={props.onClose}>
      <div onClick={stop} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"24px 24px 0 0",padding:"18px 20px 44px",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <Icon name="piggy" size={22} color={C.green}/>
          <div style={{flex:1}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.textMuted}}>貯金履歴</div>
            <div style={{fontSize:11,color:C.textMid,marginTop:2}}>入出金 {entries.length}件</div>
          </div>
        </div>

        {/* Summary */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          <div style={{background:C.greenBg,borderRadius:10,padding:"10px",textAlign:"center",border:"1px solid "+C.green+"22"}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:C.green,marginBottom:3}}>入金合計</div>
            <div style={{fontSize:14,fontWeight:800,color:C.green}}>{fmtEur(totalIn)}</div>
          </div>
          <div style={{background:C.redBg,borderRadius:10,padding:"10px",textAlign:"center",border:"1px solid "+C.red+"22"}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:C.red,marginBottom:3}}>出金合計</div>
            <div style={{fontSize:14,fontWeight:800,color:C.red}}>{fmtEur(totalOut)}</div>
          </div>
        </div>

        {/* List */}
        {entries.length === 0 ? (
          <div style={{padding:"30px 0",textAlign:"center",color:C.textMuted,fontSize:13}}>
            まだ入出金履歴はありません
          </div>
        ) : (
          <div>
            {entries.map(function(entry){
              var isIn = entry.type === "income";
              return (
                <div key={entry.id} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 0",borderBottom:"1px solid "+C.border}}>
                  <div style={{width:32,height:32,borderRadius:8,background:(isIn?C.green:C.red)+"18",border:"1.5px solid "+(isIn?C.green:C.red)+"30",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:14,fontWeight:700,color:isIn?C.green:C.red}}>
                    {isIn ? "+" : "−"}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.text,display:"flex",alignItems:"center",gap:6}}>
                      <span>{entry.desc}</span>
                      {entry.isFuture && <span style={{fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:4,background:C.future+"22",color:C.future}}>Future</span>}
                    </div>
                    <div style={{fontSize:10,color:C.textMuted}}>{entry.date} · {entry.accountName}</div>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:isIn?C.green:C.red}}>
                    {isIn ? "+" : "−"}{fmtEur(entry.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button onClick={props.onClose} style={{width:"100%",marginTop:16,padding:"13px",borderRadius:14,border:"1px solid "+C.border,background:C.surfaceAlt,color:C.textMid,fontSize:13,fontWeight:600,fontFamily:"inherit",cursor:"pointer"}}>閉じる</button>
      </div>
    </div>
  );
}

// ─── Main App ──
export default function App(){
  // Load persisted data once
  var saved = loadFromStorage();

  const [tab, setTab] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [editTxState, setEditTxState] = useState(null);
  const [txs, setTxs] = useState(saved ? saved.txs : SEED);
  const [cats, setCats] = useState(saved ? saved.cats : DEFAULT_CATS);
  const [accounts, setAccounts] = useState(saved ? saved.accounts : DEFAULT_ACCOUNTS);
  const [subs, setSubs] = useState(saved ? saved.subs : DEFAULT_SUBS);
  const [showSubModal, setShowSubModal] = useState(false);
  const [editSub, setEditSub] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [showCatModal, setShowCatModal] = useState(false);
  const [editCat, setEditCat] = useState(null);
  const [vMonth, setVMonth] = useState(NOW.getMonth());
  const [vYear, setVYear] = useState(NOW.getFullYear());
  const [calDay, setCalDay] = useState(null);
  const [calMode, setCalMode] = useState("expense"); // "expense" or "income"
  const [settingsTab, setSettingsTab] = useState("general");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);

  // Month start day: 1 = calendar month, other = custom (e.g. 25 for payday)
  const [monthStartDay, setMonthStartDay] = useState(saved && saved.settings ? saved.settings.monthStartDay : 1);

  // Drag-and-drop for category reordering
  const [dragCatId, setDragCatId] = useState(null);
  const [dragOverCatId, setDragOverCatId] = useState(null);

  // Savings history modal
  const [showSavingsHistory, setShowSavingsHistory] = useState(false);

  // Savings history: track monthly snapshots
  function buildInitialSavingsHistory(){
    return [];
  }
  const [savingsHistory, setSavingsHistory] = useState(saved && saved.savingsHistory ? saved.savingsHistory : buildInitialSavingsHistory);

  // Auto-save all data to localStorage whenever it changes
  useEffect(function(){
    saveToStorage({
      txs: txs,
      cats: cats,
      accounts: accounts,
      subs: subs,
      savingsHistory: savingsHistory,
      monthStartDay: monthStartDay,
    });
  }, [txs, cats, accounts, subs, savingsHistory, monthStartDay]);

  // Derived data
  function calcSubMonthly(){
    var t = 0;
    for(var i=0;i<subs.length;i++){ t += subs[i].cycle==="yearly" ? subs[i].amount/12 : subs[i].amount; }
    return t;
  }
  const subMonthlyTotal = useMemo(calcSubMonthly, [subs]);

  function filterMonthTxs(){
    // If monthStartDay === 1, use calendar month
    if(monthStartDay === 1){
      return txs.filter(function(t){ var d=new Date(t.date); return d.getMonth()===vMonth && d.getFullYear()===vYear; });
    }
    // Custom start day: vMonth represents the "billing month" starting on monthStartDay
    // E.g. if monthStartDay=25 and vMonth=Mar, period is Mar 25 - Apr 24
    var startDate = new Date(vYear, vMonth, monthStartDay);
    var endDate = new Date(vYear, vMonth+1, monthStartDay);
    return txs.filter(function(t){
      var d = new Date(t.date);
      return d >= startDate && d < endDate;
    });
  }
  const monthTxs = useMemo(filterMonthTxs, [txs, vMonth, vYear, monthStartDay]);

  function filterTodayTxs(){ return txs.filter(function(t){ return t.date === TODAY_STR; }); }
  const todayTxs = useMemo(filterTodayTxs, [txs]);

  const isCurrentMonth = vMonth === NOW.getMonth() && vYear === NOW.getFullYear();

  function calcIncome(){ var t=0; for(var i=0;i<monthTxs.length;i++){ if(monthTxs[i].type==="income") t+=monthTxs[i].amount; } return t; }
  function calcExpenseReal(){ var t=0; for(var i=0;i<monthTxs.length;i++){ if(monthTxs[i].type==="expense") t+=monthTxs[i].amount; } return t; }
  const totalIncome = useMemo(calcIncome, [monthTxs]);
  const totalExpenseReal = useMemo(calcExpenseReal, [monthTxs]);
  const totalExpense = totalExpenseReal + (isCurrentMonth ? subMonthlyTotal : 0);
  const balance = totalIncome - totalExpense;

  function calcMonthBudget(){ var t=0; for(var i=0;i<cats.length;i++){ t+=cats[i].monthBudget||0; } return t; }
  const totalMonthBudget = useMemo(calcMonthBudget, [cats]);
  const weekBudgetPerDay = totalMonthBudget > 0 ? totalMonthBudget/daysInMonth(vYear, vMonth) : 0;

  function calcTodayExp(){ var t=0; for(var i=0;i<todayTxs.length;i++){ if(todayTxs[i].type==="expense") t+=todayTxs[i].amount; } return t; }
  const todayExp = useMemo(calcTodayExp, [todayTxs]);

  function calcCatStats(){
    var result = [];
    for(var i=0; i<cats.length; i++){
      var cat = cats[i];
      var ms = 0, ds = 0;
      for(var j=0; j<monthTxs.length; j++){
        var mt = monthTxs[j];
        if(mt.type==="expense" && mt.catId===cat.id) ms += mt.amount;
        // Transfers with transferCatId count toward that category (e.g. savings)
        if(mt.type==="transfer" && mt.transferCatId===cat.id) ms += mt.amount;
      }
      for(var k=0; k<todayTxs.length; k++){
        var tt = todayTxs[k];
        if(tt.type==="expense" && tt.catId===cat.id) ds += tt.amount;
        if(tt.type==="transfer" && tt.transferCatId===cat.id) ds += tt.amount;
      }
      // Add subscription amounts linked to this category (only for current month)
      if(isCurrentMonth){
        for(var si=0; si<subs.length; si++){
          if(subs[si].catId === cat.id){
            ms += subs[si].cycle === "yearly" ? subs[si].amount/12 : subs[si].amount;
          }
        }
      }
      var c = Object.assign({}, cat);
      c.monthSpent = ms;
      c.daySpent = ds;
      result.push(c);
    }
    return result;
  }
  const catStats = useMemo(calcCatStats, [cats, monthTxs, todayTxs, subs, isCurrentMonth]);

  function calcWeekTxs(){
    var monD = weekStart(NOW);
    var sunD = new Date(monD); sunD.setDate(sunD.getDate()+6);
    return txs.filter(function(t){ var d=new Date(t.date); return d>=monD && d<=sunD; });
  }
  const weekTxs = useMemo(calcWeekTxs, [txs]);
  function calcWeekExp(){ var t=0; for(var i=0;i<weekTxs.length;i++){ if(weekTxs[i].type==="expense") t+=weekTxs[i].amount; } return t; }
  const weekExp = useMemo(calcWeekExp, [weekTxs]);
  const weekBudget = weekBudgetPerDay * 7;

  function calcAssets(){ var t=0; for(var i=0;i<accounts.length;i++){ t+=accounts[i].balance; } return t; }
  const totalAssets = useMemo(calcAssets, [accounts]);
  function calcSavings(){ var t=0; for(var i=0;i<accounts.length;i++){ if(accounts[i].isSavings) t+=accounts[i].balance; } return t; }
  const savingsBalance = useMemo(calcSavings, [accounts]);

  // Build chart data: history + current value as latest point
  function buildSavingsChartData(){
    var result = savingsHistory.slice();
    // Replace or add current month
    var thisY = NOW.getFullYear(), thisM = NOW.getMonth();
    var replaced = false;
    for(var i=0; i<result.length; i++){
      if(result[i].year === thisY && result[i].month === thisM){
        result[i] = {year:thisY, month:thisM, amount:savingsBalance};
        replaced = true;
        break;
      }
    }
    if(!replaced) result.push({year:thisY, month:thisM, amount:savingsBalance});
    return result;
  }
  const savingsChartData = useMemo(buildSavingsChartData, [savingsHistory, savingsBalance]);

  function getCatsBySplit(key){
    var r = [];
    for(var i=0; i<cats.length; i++){ if(cats[i].split === key) r.push(cats[i]); }
    return r;
  }
  function getSubsBySplit(key){
    var r = [];
    for(var i=0; i<subs.length; i++){ if(subs[i].split === key) r.push(subs[i]); }
    return r;
  }
  function calcSplitTotal(key){
    var t = 0;
    var cl = getCatsBySplit(key);
    for(var i=0; i<cl.length; i++){
      for(var j=0; j<catStats.length; j++){ if(catStats[j].id === cl[i].id){ t += catStats[j].monthSpent; break; } }
    }
    var sl = getSubsBySplit(key);
    for(var k=0; k<sl.length; k++){ t += sl[k].cycle==="yearly" ? sl[k].amount/12 : sl[k].amount; }
    return t;
  }

  // Handlers
  function prevMonth(){ if(vMonth===0){ setVMonth(11); setVYear(vYear-1); } else setVMonth(vMonth-1); }
  function nextMonth(){ if(vMonth===11){ setVMonth(0); setVYear(vYear+1); } else setVMonth(vMonth+1); }
  function saveTx(tx){
    // Find old tx if editing
    var oldTx = null;
    for(var oi=0; oi<txs.length; oi++){
      if(txs[oi].id === tx.id){ oldTx = txs[oi]; break; }
    }
    var nextAccounts = accounts.slice();

    // Revert old tx effects
    if(oldTx){
      if(oldTx.type === "transfer" && oldTx.fromAccountId && oldTx.toAccountId){
        for(var ri=0; ri<nextAccounts.length; ri++){
          if(nextAccounts[ri].id === oldTx.fromAccountId){
            nextAccounts[ri] = Object.assign({}, nextAccounts[ri], {balance: nextAccounts[ri].balance + oldTx.amount});
          }
          if(nextAccounts[ri].id === oldTx.toAccountId){
            nextAccounts[ri] = Object.assign({}, nextAccounts[ri], {balance: nextAccounts[ri].balance - oldTx.amount});
          }
        }
      } else if(oldTx.accountId){
        for(var ai=0; ai<nextAccounts.length; ai++){
          if(nextAccounts[ai].id === oldTx.accountId){
            var delta = oldTx.type === "income" ? -oldTx.amount : oldTx.amount;
            nextAccounts[ai] = Object.assign({}, nextAccounts[ai], {balance: nextAccounts[ai].balance + delta});
            break;
          }
        }
      }
    }

    // Apply new tx effects
    if(tx.type === "transfer" && tx.fromAccountId && tx.toAccountId){
      for(var rj=0; rj<nextAccounts.length; rj++){
        if(nextAccounts[rj].id === tx.fromAccountId){
          nextAccounts[rj] = Object.assign({}, nextAccounts[rj], {balance: nextAccounts[rj].balance - tx.amount});
        }
        if(nextAccounts[rj].id === tx.toAccountId){
          nextAccounts[rj] = Object.assign({}, nextAccounts[rj], {balance: nextAccounts[rj].balance + tx.amount});
        }
      }
    } else if(tx.accountId){
      for(var aj=0; aj<nextAccounts.length; aj++){
        if(nextAccounts[aj].id === tx.accountId){
          var delta2 = tx.type === "income" ? tx.amount : -tx.amount;
          nextAccounts[aj] = Object.assign({}, nextAccounts[aj], {balance: nextAccounts[aj].balance + delta2});
          break;
        }
      }
    }

    setAccounts(nextAccounts);

    // Update tx list
    var found = false;
    var next = [];
    for(var i=0; i<txs.length; i++){
      if(txs[i].id === tx.id){ next.push(tx); found = true; }
      else next.push(txs[i]);
    }
    if(!found) next.push(tx);
    setTxs(next);
    setShowAdd(false);
    setEditTxState(null);
  }
  function deleteTx(id){
    var toDelete = null;
    for(var i=0; i<txs.length; i++){ if(txs[i].id === id){ toDelete = txs[i]; break; } }
    if(toDelete){
      var nextAccounts = accounts.slice();
      if(toDelete.type === "transfer" && toDelete.fromAccountId && toDelete.toAccountId){
        for(var ri=0; ri<nextAccounts.length; ri++){
          if(nextAccounts[ri].id === toDelete.fromAccountId){
            nextAccounts[ri] = Object.assign({}, nextAccounts[ri], {balance: nextAccounts[ri].balance + toDelete.amount});
          }
          if(nextAccounts[ri].id === toDelete.toAccountId){
            nextAccounts[ri] = Object.assign({}, nextAccounts[ri], {balance: nextAccounts[ri].balance - toDelete.amount});
          }
        }
        setAccounts(nextAccounts);
      } else if(toDelete.accountId){
        for(var ai=0; ai<nextAccounts.length; ai++){
          if(nextAccounts[ai].id === toDelete.accountId){
            var delta = toDelete.type === "income" ? -toDelete.amount : toDelete.amount;
            nextAccounts[ai] = Object.assign({}, nextAccounts[ai], {balance: nextAccounts[ai].balance + delta});
            break;
          }
        }
        setAccounts(nextAccounts);
      }
    }
    setTxs(txs.filter(function(t){return t.id !== id;}));
  }
  function saveSub(s){
    var found = false; var next = [];
    for(var i=0;i<subs.length;i++){ if(subs[i].id===s.id){ next.push(s); found=true; } else next.push(subs[i]); }
    if(!found) next.push(s);
    setSubs(next); setShowSubModal(false); setEditSub(null);
  }
  function deleteSub(id){ setSubs(subs.filter(function(s){return s.id !== id;})); }
  function saveAccount(a){
    var found = false; var next = [];
    for(var i=0;i<accounts.length;i++){ if(accounts[i].id===a.id){ next.push(a); found=true; } else next.push(accounts[i]); }
    if(!found) next.push(a);
    setAccounts(next); setShowAccountModal(false); setEditAccount(null);
  }
  function deleteAccount(id){ setAccounts(accounts.filter(function(a){return a.id !== id;})); }
  function saveCat(c){
    var found = false; var next = [];
    for(var i=0;i<cats.length;i++){ if(cats[i].id===c.id){ next.push(c); found=true; } else next.push(cats[i]); }
    if(!found) next.push(c);
    setCats(next); setShowCatModal(false); setEditCat(null);
  }
  function deleteCat(id){ setCats(cats.filter(function(c){return c.id !== id;})); }
  function moveCatUp(id){
    var idx = -1;
    for(var i=0; i<cats.length; i++){ if(cats[i].id === id){ idx = i; break; } }
    if(idx <= 0) return;
    var next = cats.slice();
    var tmp = next[idx-1];
    next[idx-1] = next[idx];
    next[idx] = tmp;
    setCats(next);
  }
  function moveCatDown(id){
    var idx = -1;
    for(var i=0; i<cats.length; i++){ if(cats[i].id === id){ idx = i; break; } }
    if(idx < 0 || idx >= cats.length - 1) return;
    var next = cats.slice();
    var tmp = next[idx+1];
    next[idx+1] = next[idx];
    next[idx] = tmp;
    setCats(next);
  }
  function moveAccountUp(id){
    var idx = -1;
    for(var i=0; i<accounts.length; i++){ if(accounts[i].id === id){ idx = i; break; } }
    if(idx <= 0) return;
    var next = accounts.slice();
    var tmp = next[idx-1];
    next[idx-1] = next[idx];
    next[idx] = tmp;
    setAccounts(next);
  }
  function moveAccountDown(id){
    var idx = -1;
    for(var i=0; i<accounts.length; i++){ if(accounts[i].id === id){ idx = i; break; } }
    if(idx < 0 || idx >= accounts.length - 1) return;
    var next = accounts.slice();
    var tmp = next[idx+1];
    next[idx+1] = next[idx];
    next[idx] = tmp;
    setAccounts(next);
  }
  function exportData(){
    downloadDataFile({
      txs: txs,
      cats: cats,
      accounts: accounts,
      subs: subs,
      savingsHistory: savingsHistory,
      monthStartDay: monthStartDay,
    });
  }

  function importData(file){
    if(!file) return;
    var reader = new FileReader();
    reader.onload = function(e){
      try {
        var raw = e.target.result;
        var data = JSON.parse(raw);
        var migrated = migrateData(data);
        if(!migrated){ setImportError("ファイルが読み込めません"); return; }
        setTxs(migrated.txs || []);
        setCats(migrated.cats || JSON.parse(JSON.stringify(DEFAULT_CATS)));
        setAccounts(migrated.accounts || JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS)));
        setSubs(migrated.subs || JSON.parse(JSON.stringify(DEFAULT_SUBS)));
        setSavingsHistory(migrated.savingsHistory || []);
        if(migrated.settings && migrated.settings.monthStartDay !== undefined){
          setMonthStartDay(migrated.settings.monthStartDay);
        }
        setImportError(null);
        setImportSuccess("データを復元しました（" + (migrated.txs ? migrated.txs.length : 0) + "件の取引）");
        setTimeout(function(){ setImportSuccess(null); }, 4000);
      } catch(err) {
        setImportError("ファイルの形式が正しくありません: " + err.message);
        setTimeout(function(){ setImportError(null); }, 5000);
      }
    };
    reader.onerror = function(){ setImportError("ファイルの読み込みに失敗しました"); };
    reader.readAsText(file);
  }

  function handleReset(){
    // Reset all data to empty/zero state
    setTxs([]);
    // Categories: keep structure but zero out budgets
    var resetCats = [];
    for(var i=0; i<DEFAULT_CATS.length; i++){
      var c = Object.assign({}, DEFAULT_CATS[i]);
      c.monthBudget = 0;
      c.dayBudget = null;
      resetCats.push(c);
    }
    setCats(resetCats);
    // Accounts: keep structure but zero balances
    var resetAccounts = [];
    for(var j=0; j<DEFAULT_ACCOUNTS.length; j++){
      var a = Object.assign({}, DEFAULT_ACCOUNTS[j]);
      a.balance = 0;
      resetAccounts.push(a);
    }
    setAccounts(resetAccounts);
    // Subscriptions: keep structure but zero amounts
    var resetSubs = [];
    for(var k=0; k<DEFAULT_SUBS.length; k++){
      var s = Object.assign({}, DEFAULT_SUBS[k]);
      s.amount = 0;
      resetSubs.push(s);
    }
    setSubs(resetSubs);
    // Savings history: empty
    setSavingsHistory([]);
    setVMonth(NOW.getMonth());
    setVYear(NOW.getFullYear());
    setCalDay(null);
    setEditTxState(null);
    setEditSub(null);
    setEditAccount(null);
    setEditCat(null);
    setShowResetConfirm(false);
  }
  async function loadRate(){
    setRateLoading(true); setRateError(false);
    var r = await fetchJpyEurRate();
    if(r){ setSettingsRate(r); } else { setRateError(true); }
    setRateLoading(false);
  }
  function openEditTx(tx){ setEditTxState(tx); setShowAdd(true); }
  function openAddTx(){ setShowAdd(true); setEditTxState(null); }
  function closeAddTx(){ setShowAdd(false); setEditTxState(null); }
  function openEditSub(s){ setEditSub(s); setShowSubModal(true); }
  function openAddSub(){ setEditSub(null); setShowSubModal(true); }
  function closeSubModal(){ setShowSubModal(false); setEditSub(null); }
  function openEditAccount(a){ setEditAccount(a); setShowAccountModal(true); }
  function openAddAccount(){ setEditAccount(null); setShowAccountModal(true); }
  function closeAccountModal(){ setShowAccountModal(false); setEditAccount(null); }
  function openEditCat(c){ setEditCat(c); setShowCatModal(true); }
  function openAddCat(){ setEditCat(null); setShowCatModal(true); }
  function closeCatModal(){ setShowCatModal(false); setEditCat(null); }

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'DM Sans','Helvetica Neue','Hiragino Sans',sans-serif",paddingBottom:130}}>
      {(showAdd || editTxState) && <AddModal cats={cats} accounts={accounts} prefillDate={(tab===2 && calDay) ? (vYear+"-"+String(vMonth+1).padStart(2,"0")+"-"+String(calDay).padStart(2,"0")) : TODAY_STR} editTx={editTxState} onSave={saveTx} onDelete={deleteTx} onClose={closeAddTx}/>}
      {(showSubModal || editSub) && <SubModal sub={editSub} cats={cats} onSave={saveSub} onDelete={deleteSub} onClose={closeSubModal}/>}
      {(showAccountModal || editAccount) && <AccountModal account={editAccount} onSave={saveAccount} onDelete={deleteAccount} onClose={closeAccountModal}/>}
      {(showCatModal || editCat) && <CatModal cat={editCat} onSave={saveCat} onDelete={deleteCat} onClose={closeCatModal}/>}
      {showSavingsHistory && <SavingsHistoryModal accounts={accounts} txs={txs} onClose={function(){setShowSavingsHistory(false);}}/>}

      {/* HEIM */}
      {tab===0 && (
        <div>
          <div style={{padding:"calc(env(safe-area-inset-top, 0px) + 18px) 18px 14px",background:C.surface,borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:50}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:46,height:46,borderRadius:12,background:"#C6E8D0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 8px rgba(78,140,115,0.18)"}}>
                  <Icon name="wallet" size={28} color="#7A4A3A" strokeWidth={2}/>
                </div>
                <div>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:C.textMuted}}>{T.appName}</div>
                  <div style={{fontSize:22,fontWeight:800,color:C.text,marginTop:2}}>ホーム</div>
                </div>
              </div>
              <MonthNav month={vMonth} year={vYear} onPrev={prevMonth} onNext={nextMonth}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              <div onClick={function(){setTab(1);}} style={{background:C.greenBg,borderRadius:12,padding:"11px 8px",textAlign:"center",border:"1px solid "+C.green+"22",cursor:"pointer"}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.green,marginBottom:4}}>{T.income}</div>
                <div style={{fontSize:14,fontWeight:800,color:C.green}}>{fmtShort(totalIncome)}</div>
              </div>
              <div onClick={function(){setTab(2);}} style={{background:C.amberBg,borderRadius:12,padding:"11px 8px",textAlign:"center",border:"1px solid "+C.amber+"22",cursor:"pointer"}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.amber,marginBottom:4}}>{T.expenses}</div>
                <div style={{fontSize:14,fontWeight:800,color:C.amber}}>{fmtShort(totalExpense)}</div>
              </div>
              <div onClick={function(){var el=document.getElementById("home-savings-section");if(el)el.scrollIntoView({behavior:"smooth",block:"start"});}} style={{background:C.greenBg,borderRadius:12,padding:"11px 8px",textAlign:"center",border:"1px solid "+C.green+"22",cursor:"pointer"}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.green,marginBottom:4}}>{T.savings}</div>
                <div style={{fontSize:14,fontWeight:800,color:C.green}}>{fmtShort(savingsBalance)}</div>
              </div>
            </div>
          </div>

          <div style={{padding:"0 18px"}}>
            <SectionTitle>{T.thisWeek}</SectionTitle>
            <Card style={{marginBottom:4}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <span style={{fontSize:12,fontWeight:600,color:C.textMid}}>{T.expenses}</span>
                {weekBudgetPerDay > 0 && <span style={{fontSize:10,color:C.textMuted}}>{fmtEur(weekBudgetPerDay)}/日</span>}
              </div>
              <WeeklyChart txs={txs} weekBudgetPerDay={weekBudgetPerDay} vMonth={vMonth} vYear={vYear} onDayClick={function(d){
                setVMonth(d.getMonth());
                setVYear(d.getFullYear());
                setCalDay(d.getDate());
                setTab(2);
              }}/>
            </Card>

            <SectionTitle>{T.monthlyBudget} · {T.months[vMonth]}</SectionTitle>
            <CollapsibleSection iconName="chart" title={T.monthlyBudget} subtitle={T.expenses+": "+fmtEur(totalExpense)} badge={(totalMonthBudget>0?Math.round(totalExpense/totalMonthBudget*100):0)+"%"} badgeColor={totalExpense>totalMonthBudget?C.red:C.blue}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid "+C.border}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,fontWeight:600,color:C.text}}>
                  <span>合計</span><span>{fmtEur(totalExpense)} / {fmtEur(totalMonthBudget)}</span>
                </div>
                <BudgetBar spent={totalExpense} budget={totalMonthBudget} color={C.blue} h={7}/>
              </div>
              {cats.map(function(cat, idx){
                var stat = null;
                for(var i=0;i<catStats.length;i++){ if(catStats[i].id === cat.id){ stat = catStats[i]; break; } }
                return <CatStatRow key={cat.id} cat={cat} idx={idx} stats={stat}/>;
              })}
            </CollapsibleSection>

            <SectionTitle>{T.subscriptions}</SectionTitle>
            <CollapsibleSection iconName="repeat" title={T.subscriptions} subtitle={subs.length+"件"} badge={fmtEur(subMonthlyTotal)}
              addButton={<button onClick={openAddSub} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"10px",borderRadius:10,border:"1.5px dashed "+C.blueLight,background:C.blueDim,color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}><Icon name="plus" size={14} color={C.blue}/>{T.addSub}</button>}>
              {subs.map(function(s){
                return <SubRow key={s.id} sub={s} onEdit={function(){openEditSub(s);}}/>;
              })}
            </CollapsibleSection>

            <SectionTitle>{T.accounts}</SectionTitle>
            <CollapsibleSection iconName="bank" title={T.accounts} subtitle={accounts.length+"口座"} badge={fmtEur(totalAssets)}
              addButton={<button onClick={openAddAccount} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"10px",borderRadius:10,border:"1.5px dashed "+C.blueLight,background:C.blueDim,color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}><Icon name="plus" size={14} color={C.blue}/>{T.addAccount}</button>}>
              {accounts.map(function(acc, idx){
                var isFirst = idx === 0;
                var isLast = idx === accounts.length - 1;
                return (
                  <div key={acc.id} style={{display:"flex",alignItems:"center",gap:8,padding:"11px 14px",borderTop:idx>0?"1px solid "+C.border:"none"}}>
                    <div style={{display:"flex",flexDirection:"column",gap:3,flexShrink:0}}>
                      <button onClick={function(){moveAccountUp(acc.id);}} disabled={isFirst} style={{width:22,height:20,borderRadius:5,border:"1px solid "+C.border,background:isFirst?C.surfaceAlt:C.surface,cursor:isFirst?"not-allowed":"pointer",opacity:isFirst?0.4:1,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                        <Icon name="chevronUp" size={11} color={isFirst?C.textMuted:C.textMid}/>
                      </button>
                      <button onClick={function(){moveAccountDown(acc.id);}} disabled={isLast} style={{width:22,height:20,borderRadius:5,border:"1px solid "+C.border,background:isLast?C.surfaceAlt:C.surface,cursor:isLast?"not-allowed":"pointer",opacity:isLast?0.4:1,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                        <Icon name="chevronDown" size={11} color={isLast?C.textMuted:C.textMid}/>
                      </button>
                    </div>
                    <div style={{width:36,height:36,borderRadius:10,background:acc.color+"18",border:"1.5px solid "+acc.color+"30",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Icon name={acc.isSavings?"piggy":"bank"} size={17} color={acc.color}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:13,fontWeight:700,color:C.text}}>{acc.name}</span>
                        {acc.isSavings && <span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:99,background:C.greenBg,color:C.green}}>貯金</span>}
                      </div>
                      <div style={{fontSize:11,color:C.textMuted}}>{acc.bank}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:14,fontWeight:800,color:acc.color}}>{fmtEur(acc.balance)}</div>
                    </div>
                    <button onClick={function(){openEditAccount(acc);}} style={{background:C.surfaceAlt,border:"1px solid "+C.border,borderRadius:7,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Icon name="edit" size={13} color={C.textMid}/>
                    </button>
                  </div>
                );
              })}
            </CollapsibleSection>

            <div id="home-savings-section">
            <SectionTitle>{T.savings}</SectionTitle>
            <Card>
              {(function(){
                // Calculate change from last month
                var lastMonthAmount = null;
                var thisM = NOW.getMonth(), thisY = NOW.getFullYear();
                var lastM = thisM === 0 ? 11 : thisM - 1;
                var lastY = thisM === 0 ? thisY - 1 : thisY;
                for(var i=0; i<savingsHistory.length; i++){
                  if(savingsHistory[i].year === lastY && savingsHistory[i].month === lastM){
                    lastMonthAmount = savingsHistory[i].amount;
                    break;
                  }
                }
                var diff = lastMonthAmount !== null ? savingsBalance - lastMonthAmount : null;
                var pct = (lastMonthAmount !== null && lastMonthAmount > 0) ? (diff / lastMonthAmount) * 100 : null;
                var diffColor = diff === null ? C.textMuted : (diff >= 0 ? C.green : C.red);
                return (
                  <div onClick={function(){setShowSavingsHistory(true);}} style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,cursor:"pointer"}}>
                    <div style={{width:42,height:42,borderRadius:12,background:C.greenBg,border:"1.5px solid "+C.green+"30",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Icon name="piggy" size={22} color={C.green}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{fontSize:11,color:C.textMuted}}>{T.savings}</div>
                        <Icon name="chevronR" size={11} color={C.textMuted}/>
                      </div>
                      <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                        <div style={{fontSize:22,fontWeight:800,color:C.green}}>{fmtEur(savingsBalance)}</div>
                        {pct !== null && (
                          <div style={{fontSize:12,fontWeight:700,color:diffColor,display:"flex",alignItems:"center",gap:2}}>
                            <span>{diff >= 0 ? "▲" : "▼"}</span>
                            <span>{Math.abs(pct).toFixed(1)}%</span>
                            <span style={{fontSize:10,color:C.textMuted,fontWeight:500,marginLeft:4}}>先月比</span>
                          </div>
                        )}
                      </div>
                      {diff !== null && (
                        <div style={{fontSize:10,color:C.textMuted,marginTop:2}}>
                          先月: {fmtEur(lastMonthAmount)} → {diff >= 0 ? "+" : "−"}{fmtEur(Math.abs(diff))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
              <SavingsLineChart data={savingsChartData}/>
            </Card>
            </div>
          </div>
        </div>
      )}

      {/* BUDGET */}
      {tab===1 && (
        <div>
          <div style={{padding:"calc(env(safe-area-inset-top, 0px) + 18px) 18px 14px",background:C.surface,borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:50}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:C.text}}>予算</div>
              <MonthNav month={vMonth} year={vYear} onPrev={prevMonth} onNext={nextMonth}/>
            </div>
          </div>
          <div style={{padding:"0 18px"}}>
            {totalIncome > 0 && (
              <div>
                <SectionTitle>{T.budgetSplit}</SectionTitle>
                {[
                  {key:"need",  label:T.splitNeeds,  pct:50, color:C.need,   icon:"shield",  desc:"生活必需費：住居費や食料品など生活する上で最低限必要な出費"},
                  {key:"want",  label:T.splitWants,  pct:30, color:C.want,   icon:"heart",   desc:"ゆとり費：娯楽や交際費など自分の生活をより豊かにする出費"},
                  {key:"future",label:T.splitFuture, pct:20, color:C.future, icon:"trendUp", desc:"未来費：将来のための貯金や投資のための資金"}
                ].map(function(item){
                  var budget = totalIncome > 0 ? totalIncome*item.pct/100 : 0;
                  var spent = calcSplitTotal(item.key);
                  var splitCats = getCatsBySplit(item.key);
                  var splitSubs = getSubsBySplit(item.key);
                  var hasSplit = splitCats.length > 0 || splitSubs.length > 0;
                  return (
                    <CollapsibleSection key={item.key} iconName={item.icon} title={item.label} subtitle={item.desc} badge={fmtEur(budget)} badgeColor={item.color}>
                      <div style={{padding:"12px 16px",borderBottom:hasSplit?"1px solid "+C.border:"none"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,color:C.textMid}}>
                          <span>予算: {fmtEur(budget)}</span>
                          <span style={{fontWeight:600,color:spent>budget?C.red:item.color}}>使用: {fmtEur(spent)}</span>
                        </div>
                        <div style={{height:7,background:C.surfaceAlt,borderRadius:99,overflow:"hidden"}}>
                          <div style={{height:"100%",width:Math.min(budget>0?spent/budget*100:0,100)+"%",background:spent>budget?C.red:item.color,borderRadius:99}}/>
                        </div>
                      </div>
                      {splitCats.map(function(cat, idx){
                        var stat = null;
                        for(var i=0;i<catStats.length;i++){ if(catStats[i].id === cat.id){ stat = catStats[i]; break; } }
                        // Find subs linked to this category
                        var catSubs = [];
                        for(var si=0;si<subs.length;si++){
                          if(subs[si].catId === cat.id) catSubs.push(subs[si]);
                        }
                        // Position in full cats array for global up/down
                        var globalIdx = -1;
                        for(var gi=0; gi<cats.length; gi++){ if(cats[gi].id === cat.id){ globalIdx = gi; break; } }
                        var isFirst = globalIdx === 0;
                        var isLast = globalIdx === cats.length - 1;
                        return (
                          <div key={cat.id} style={{borderTop:idx>0?"1px solid "+C.border:"none"}}>
                            <div style={{display:"flex",alignItems:"stretch",gap:0}}>
                              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:3,padding:"6px 4px 6px 8px",flexShrink:0}}>
                                <button onClick={function(e){e.stopPropagation();moveCatUp(cat.id);}} disabled={isFirst} style={{width:22,height:20,borderRadius:5,border:"1px solid "+C.border,background:isFirst?C.surfaceAlt:C.surface,cursor:isFirst?"not-allowed":"pointer",opacity:isFirst?0.4:1,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                                  <Icon name="chevronUp" size={11} color={isFirst?C.textMuted:C.textMid}/>
                                </button>
                                <button onClick={function(e){e.stopPropagation();moveCatDown(cat.id);}} disabled={isLast} style={{width:22,height:20,borderRadius:5,border:"1px solid "+C.border,background:isLast?C.surfaceAlt:C.surface,cursor:isLast?"not-allowed":"pointer",opacity:isLast?0.4:1,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                                  <Icon name="chevronDown" size={11} color={isLast?C.textMuted:C.textMid}/>
                                </button>
                              </div>
                              <div style={{flex:1,minWidth:0}}>
                                <CatStatRow cat={cat} idx={0} stats={stat} onClick={function(){openEditCat(cat);}}/>
                              </div>
                            </div>
                            {catSubs.length > 0 && (
                              <div style={{paddingLeft:36,background:C.surfaceAlt}}>
                                {catSubs.map(function(sub){
                                  var pm = sub.cycle==="yearly" ? sub.amount/12 : sub.amount;
                                  return (
                                    <div key={sub.id} onClick={function(){openEditSub(sub);}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px 8px 6px",borderTop:"1px solid "+C.border,cursor:"pointer"}}>
                                      <Icon name="repeat" size={12} color={sub.color}/>
                                      <div style={{width:8,height:8,borderRadius:"50%",background:sub.color,flexShrink:0}}/>
                                      <div style={{flex:1,minWidth:0}}>
                                        <div style={{fontSize:12,fontWeight:600,color:C.text}}>{sub.name}</div>
                                        <div style={{fontSize:10,color:C.textMuted}}>{sub.cycle==="yearly"?"年額":"月額"}</div>
                                      </div>
                                      <div style={{fontSize:12,fontWeight:700,color:C.blue}}>{fmtEur(pm)}</div>
                                      <Icon name="edit" size={11} color={C.textMuted}/>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {/* Subs in this split that have no catId */}
                      {splitSubs.filter(function(s){return !s.catId;}).map(function(sub){
                        return <SubRow key={sub.id} sub={sub} onEdit={function(){openEditSub(sub);}}/>;
                      })}
                      {!hasSplit && <div style={{padding:"14px 16px",fontSize:12,color:C.textMuted}}>カテゴリーやサブスクをこのグループに振り分けるには、カテゴリー設定で予算配分を変更してください。</div>}
                    </CollapsibleSection>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CALENDAR */}
      {tab===2 && (
        <div>
          <div style={{padding:"calc(env(safe-area-inset-top, 0px) + 18px) 18px 14px",background:C.surface,borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:50,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:22,fontWeight:800,color:C.text}}>カレンダー</div>
            <MonthNav month={vMonth} year={vYear} onPrev={prevMonth} onNext={nextMonth}/>
          </div>
          <div style={{padding:"14px 18px 0"}}>
            <div style={{display:"flex",alignItems:"center",background:C.surface,borderRadius:12,padding:"6px",marginBottom:14,border:"1px solid "+C.border,gap:4}}>
              <div style={{display:"flex",background:C.surfaceAlt,borderRadius:9,padding:3,gap:3,flexShrink:0}}>
                <button onClick={function(){setCalMode("expense");setCalDay(null);}} style={{padding:"6px 14px",border:"none",borderRadius:7,fontFamily:"inherit",cursor:"pointer",background:calMode==="expense"?C.amberBg:"transparent",color:calMode==="expense"?C.amber:C.textMuted,fontSize:12,fontWeight:calMode==="expense"?700:500}}>支出</button>
                <button onClick={function(){setCalMode("income");setCalDay(null);}} style={{padding:"6px 14px",border:"none",borderRadius:7,fontFamily:"inherit",cursor:"pointer",background:calMode==="income"?C.greenBg:"transparent",color:calMode==="income"?C.green:C.textMuted,fontSize:12,fontWeight:calMode==="income"?700:500}}>収入</button>
              </div>
              <div style={{flex:1,textAlign:"right",paddingRight:8}}>
                <span style={{fontSize:11,color:C.textMuted}}>{T.months[vMonth]}</span>
                <span style={{fontSize:16,fontWeight:800,color:calMode==="income"?C.green:C.amber,marginLeft:8}}>{fmtEur(calMode==="income"?totalIncome:totalExpense)}</span>
              </div>
            </div>
            <SimpleCalendar txs={monthTxs} cats={cats} year={vYear} month={vMonth} selectedDay={calDay} onSelectDay={setCalDay} onEditTx={openEditTx} onPrev={prevMonth} onNext={nextMonth} mode={calMode}/>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {tab===3 && (
        <div>
          <div style={{padding:"calc(env(safe-area-inset-top, 0px) + 18px) 18px 14px",background:C.surface,borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:50}}>
            <div style={{fontSize:22,fontWeight:800,color:C.text}}>設定</div>
          </div>
          <div style={{padding:"0 18px"}}>
            <SectionTitle>表示設定</SectionTitle>
            <Card>
              <div style={{padding:"4px 0"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <Icon name="calendar" size={18} color={C.textMid}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.text}}>月の開始日</div>
                    <div style={{fontSize:10,color:C.textMuted}}>給料日を起点にしたい場合は変更</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:700,color:C.blue,minWidth:40,textAlign:"right"}}>{monthStartDay}日</div>
                </div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {[1,5,10,15,20,25,28].map(function(d){
                    var active = monthStartDay === d;
                    return (
                      <button key={d} onClick={function(){setMonthStartDay(d);}} style={{flex:"1 1 auto",minWidth:42,padding:"7px 6px",borderRadius:8,border:"1.5px solid "+(active?C.blue:C.border),background:active?C.blueDim:C.surfaceAlt,color:active?C.blue:C.textMid,fontSize:12,fontWeight:active?700:500,cursor:"pointer",fontFamily:"inherit"}}>{d}日</button>
                    );
                  })}
                </div>
                {monthStartDay !== 1 && (
                  <div style={{fontSize:10,color:C.textMuted,marginTop:6}}>
                    例：{T.months[vMonth]} = {monthStartDay}日 〜 翌月{monthStartDay-1}日
                  </div>
                )}
              </div>
            </Card>

            {/* 初期設定 - 折りたたみ */}
            <SectionTitle>初期設定</SectionTitle>
            <CollapsibleSection iconName="piggy" title="残高初期設定" subtitle="アプリ開始時の残高を一括入力">
              <div style={{padding:"14px 16px"}}>
                <div style={{fontSize:12,color:C.textMid,marginBottom:14,lineHeight:1.6}}>
                  各資産の名称や残高をここで編集できます。資産を追加・削除することも可能です。
                </div>
                {accounts.map(function(acc, idx){
                  return (
                    <div key={acc.id} style={{padding:"10px 0",borderTop:idx>0?"1px solid "+C.border:"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                        <button onClick={function(){openEditAccount(acc);}} style={{width:34,height:34,borderRadius:10,background:acc.color+"18",border:"1.5px solid "+acc.color+"30",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                          <Icon name={acc.isSavings?"piggy":"bank"} size={16} color={acc.color}/>
                        </button>
                        <input type="text" value={acc.name} onChange={function(e){
                          var v = e.target.value;
                          setAccounts(accounts.map(function(a){return a.id===acc.id ? Object.assign({},a,{name:v}) : a;}));
                        }} placeholder="資産名" style={{flex:1,background:C.surfaceAlt,border:"1.5px solid "+C.border,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:8,padding:"7px 10px",fontSize:13,fontWeight:600,minWidth:0}}/>
                        <button onClick={function(){
                          if(confirm("この資産を削除しますか？")){
                            setAccounts(accounts.filter(function(a){return a.id !== acc.id;}));
                          }
                        }} style={{width:30,height:30,borderRadius:8,border:"1px solid "+C.red+"33",background:C.redBg,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:0}}>
                          <Icon name="trash" size={13} color={C.red}/>
                        </button>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,paddingLeft:44}}>
                        <input type="text" value={acc.bank||""} onChange={function(e){
                          var v = e.target.value;
                          setAccounts(accounts.map(function(a){return a.id===acc.id ? Object.assign({},a,{bank:v}) : a;}));
                        }} placeholder="銀行名・備考（任意）" style={{flex:1,background:C.surfaceAlt,border:"1.5px solid "+C.border,color:C.textMid,fontFamily:"inherit",outline:"none",borderRadius:8,padding:"6px 10px",fontSize:11,minWidth:0}}/>
                        <input type="number" step="0.01" value={acc.balance} onChange={function(e){
                          var v = parseFloat(e.target.value) || 0;
                          setAccounts(accounts.map(function(a){return a.id===acc.id ? Object.assign({},a,{balance:v}) : a;}));
                        }} style={{width:100,background:C.surfaceAlt,border:"1.5px solid "+C.border,color:C.text,fontFamily:"inherit",outline:"none",borderRadius:8,padding:"6px 8px",fontSize:13,textAlign:"right",fontWeight:700}}/>
                        <span style={{fontSize:11,color:C.textMid}}>€</span>
                      </div>
                    </div>
                  );
                })}
                <button onClick={openAddAccount} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"10px",borderRadius:10,border:"1.5px dashed "+C.blueLight,background:C.blueDim,color:C.blue,fontSize:12,fontWeight:600,cursor:"pointer",marginTop:12}}>
                  <Icon name="plus" size={13} color={C.blue}/>資産を追加
                </button>
                <div style={{marginTop:14,padding:"10px 12px",background:C.blueDim,borderRadius:10,fontSize:11,color:C.blue,fontWeight:600,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>合計資産</span>
                  <span style={{fontSize:14,fontWeight:800}}>{fmtEur(totalAssets)}</span>
                </div>
              </div>
            </CollapsibleSection>

            {/* カテゴリー設定 - 折りたたみ */}
            <SectionTitle>{T.catSettings}</SectionTitle>
            <CollapsibleSection iconName="tag" title={T.catSettings} subtitle={cats.length+"件のカテゴリー"}>
              <div style={{padding:"12px 14px"}}>
                <div style={{fontSize:10,color:C.textMuted,marginBottom:8}}>▲▼ボタンで並び替え</div>
                {cats.map(function(cat, idx){
                  var stat = null;
                  for(var i=0;i<catStats.length;i++){ if(catStats[i].id === cat.id){ stat = catStats[i]; break; } }
                  var isFirst = idx === 0;
                  var isLast = idx === cats.length - 1;
                  return (
                    <div key={cat.id} style={{display:"flex",alignItems:"stretch",gap:6,marginBottom:4}}>
                      <div style={{display:"flex",flexDirection:"column",gap:4,paddingTop:4}}>
                        <button onClick={function(){moveCatUp(cat.id);}} disabled={isFirst} style={{width:30,height:24,borderRadius:6,border:"1px solid "+C.border,background:isFirst?C.surfaceAlt:C.surface,color:isFirst?C.textMuted:C.textMid,fontSize:11,cursor:isFirst?"not-allowed":"pointer",opacity:isFirst?0.4:1,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",padding:0}}>
                          <Icon name="chevronUp" size={14} color={isFirst?C.textMuted:C.textMid}/>
                        </button>
                        <button onClick={function(){moveCatDown(cat.id);}} disabled={isLast} style={{width:30,height:24,borderRadius:6,border:"1px solid "+C.border,background:isLast?C.surfaceAlt:C.surface,color:isLast?C.textMuted:C.textMid,fontSize:11,cursor:isLast?"not-allowed":"pointer",opacity:isLast?0.4:1,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",padding:0}}>
                          <Icon name="chevronDown" size={14} color={isLast?C.textMuted:C.textMid}/>
                        </button>
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <SettingsCatRow cat={cat} stats={stat} onEdit={function(){openEditCat(cat);}} onDelete={function(){deleteCat(cat.id);}}/>
                      </div>
                    </div>
                  );
                })}
                <button onClick={openAddCat} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px",borderRadius:14,border:"1.5px dashed "+C.blueLight,background:C.blueDim,color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer",marginTop:8,marginBottom:4}}>
                  <Icon name="plus" size={14} color={C.blue}/>{T.addCategory}
                </button>
              </div>
            </CollapsibleSection>

            {/* バックアップ・復元 - 折りたたみ */}
            <SectionTitle>バックアップ・復元</SectionTitle>
            <CollapsibleSection iconName="refresh" title="バックアップ・復元" subtitle="JSONファイルで保存・読み込み">
              <div style={{padding:"14px 16px"}}>
                <div style={{fontSize:11,color:C.textMid,marginBottom:12,lineHeight:1.6}}>
                  データをJSONファイルとして保存・復元できます。アプリ更新時やデバイス移行時にご利用ください。
                </div>
                <button onClick={function(){downloadDataFile({txs:txs,cats:cats,accounts:accounts,subs:subs,savingsHistory:savingsHistory,monthStartDay:monthStartDay});}} style={{width:"100%",padding:"13px",borderRadius:12,border:"1.5px solid "+C.blue,background:C.blueDim,color:C.blue,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:10}}>
                  <Icon name="trendUp" size={15} color={C.blue} strokeWidth={2}/>データをエクスポート（JSON）
                </button>
                <label style={{width:"100%",padding:"13px",borderRadius:12,border:"1.5px solid "+C.green,background:C.greenBg,color:C.green,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxSizing:"border-box"}}>
                  <Icon name="refresh" size={15} color={C.green} strokeWidth={2}/>データをインポート（JSON）
                  <input type="file" accept="application/json,.json" style={{display:"none"}} onChange={function(e){
                    var file = e.target.files && e.target.files[0];
                    if(!file) return;
                    var reader = new FileReader();
                    reader.onload = function(ev){
                      try {
                        var raw = ev.target.result;
                        var parsed = JSON.parse(raw);
                        var migrated = migrateData(parsed);
                        if(!migrated){ alert("ファイル形式が正しくありません"); return; }
                        if(!confirm("現在のデータを上書きしてインポートしますか？")) return;
                        setTxs(migrated.txs || []);
                        setCats(migrated.cats || JSON.parse(JSON.stringify(DEFAULT_CATS)));
                        setAccounts(migrated.accounts || JSON.parse(JSON.stringify(DEFAULT_ACCOUNTS)));
                        setSubs(migrated.subs || JSON.parse(JSON.stringify(DEFAULT_SUBS)));
                        setSavingsHistory(migrated.savingsHistory || []);
                        if(migrated.settings && migrated.settings.monthStartDay) setMonthStartDay(migrated.settings.monthStartDay);
                        alert("インポートが完了しました");
                      } catch(err) {
                        alert("ファイルの読み込みに失敗しました: " + err.message);
                      }
                    };
                    reader.readAsText(file);
                    e.target.value = "";
                  }}/>
                </label>
                <div style={{fontSize:10,color:C.textMuted,marginTop:10,lineHeight:1.5}}>
                  バージョン{DATA_VERSION}のフォーマット。将来のアップデートでも古いファイルは自動変換されます。
                </div>
              </div>
            </CollapsibleSection>

            <SectionTitle>データ管理</SectionTitle>
            {!showResetConfirm ? (
              <button onClick={function(){setShowResetConfirm(true);}} style={{width:"100%",padding:"14px",borderRadius:14,border:"1.5px solid "+C.red,background:C.redBg,color:C.red,fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <Icon name="trash" size={16} color={C.red}/>すべてのデータを初期化する
              </button>
            ) : (
              <Card style={{border:"1.5px solid "+C.red}}>
                <div style={{fontSize:14,fontWeight:700,color:C.red,marginBottom:8}}>本当に初期化しますか？</div>
                <div style={{fontSize:12,color:C.textMid,marginBottom:16}}>すべてのデータがリセットされます。元に戻せません。</div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={function(){setShowResetConfirm(false);}} style={{flex:1,padding:"12px",borderRadius:12,border:"1px solid "+C.border,background:C.surfaceAlt,color:C.textMid,fontSize:13,fontWeight:600,fontFamily:"inherit",cursor:"pointer"}}>キャンセル</button>
                  <button onClick={handleReset} style={{flex:1,padding:"12px",borderRadius:12,border:"none",background:C.red,color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>初期化する</button>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"#FFFFFF",borderTop:"1px solid "+C.border,boxShadow:"0 -4px 24px rgba(30,60,120,0.12)",display:"flex",alignItems:"flex-end",justifyContent:"center",maxWidth:480,margin:"0 auto",paddingBottom:34,opacity:1}}>
        <button onClick={function(){setTab(0);}} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 0 0",gap:4}}>
          <Icon name="home" size={20} color={tab===0?C.blue:C.textMuted} strokeWidth={tab===0?2:1.6}/>
          <span style={{fontSize:9,fontWeight:tab===0?700:500,letterSpacing:0.5,textTransform:"uppercase",color:tab===0?C.blue:C.textMuted,lineHeight:1}}>ホーム</span>
        </button>
        <button onClick={function(){setTab(1);}} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 0 0",gap:4}}>
          <Icon name="chart" size={20} color={tab===1?C.blue:C.textMuted} strokeWidth={tab===1?2:1.6}/>
          <span style={{fontSize:9,fontWeight:tab===1?700:500,letterSpacing:0.5,textTransform:"uppercase",color:tab===1?C.blue:C.textMuted,lineHeight:1}}>予算</span>
        </button>
        <button onClick={openAddTx} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 0 0",gap:4}}>
          <div style={{width:50,height:50,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px "+C.blue+"55",marginTop:-22}}>
            <Icon name="plus" size={22} color="#fff" strokeWidth={2.2}/>
          </div>
        </button>
        <button onClick={function(){setTab(2);}} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 0 0",gap:4}}>
          <Icon name="calendar" size={20} color={tab===2?C.blue:C.textMuted} strokeWidth={tab===2?2:1.6}/>
          <span style={{fontSize:9,fontWeight:tab===2?700:500,letterSpacing:0.5,textTransform:"uppercase",color:tab===2?C.blue:C.textMuted,lineHeight:1}}>カレンダー</span>
        </button>
        <button onClick={function(){setTab(3);}} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 0 0",gap:4}}>
          <Icon name="gear" size={20} color={tab===3?C.blue:C.textMuted} strokeWidth={tab===3?2:1.6}/>
          <span style={{fontSize:9,fontWeight:tab===3?700:500,letterSpacing:0.5,textTransform:"uppercase",color:tab===3?C.blue:C.textMuted,lineHeight:1}}>設定</span>
        </button>
      </div>
    </div>
  );
}
