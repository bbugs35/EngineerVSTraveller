// Top-line journey metrics — the "Journey Stats" panel on the road page.
// `value` is the numeric part (animated as a count-up); `suffix` wraps it.
export const TRAVEL_HUD_STATS = [
  { id: "countries", label: "Countries",       value: 7,      suffix: "",  icon: "globe"  },
  { id: "distance",   label: "Kilometers",      value: 24450,  suffix: "",  icon: "route"  },
  { id: "days",       label: "Days on the road", value: 150,    suffix: "",  icon: "clock"  },
  { id: "memories",   label: "Memories",         value: Infinity, suffix: "", icon: "infinity" },
];
