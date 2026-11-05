import React from "react";
import type { TrustedOrg } from "@/lib/trustedBy";
import { ToneIcon } from "@/components/shared/ToneIcon";

/** One logo in the strip: mark + wordmark, muted until hovered. */
export function OrgLogo({ org }: { org: TrustedOrg }) {
  return (
    <span className="group inline-flex shrink-0 items-center gap-2.5 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0" title={org.name}>
      <ToneIcon icon={org.icon} tone={org.tone} size="sm" />
      <span className="heading-h5 font-bold text-primary-500 whitespace-nowrap tracking-tight">{org.name}</span>
    </span>
  );
}

export default OrgLogo;
