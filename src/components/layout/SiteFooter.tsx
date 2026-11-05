import React from "react";
import Link from "next/link";
import { NAV_LINKS, loginUrl, signupUrl } from "@/lib/site";
import { Logo } from "./Logo";

const PRODUCT = [
  { href: "/features#courses", label: "Courses & lessons" },
  { href: "/features#live", label: "Live classes" },
  { href: "/features#assessments", label: "Quizzes & assignments" },
  { href: "/features#payments", label: "Payments" },
];

/** Dark footer: brand blurb, product links, company links, sign-in. */
export function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <Logo tone="light" />
          <p className="body-sm-regular text-white/70 mt-4">
            The all-in-one platform for schools, coaching centres and training institutes to teach online, sell courses and run their academy.
          </p>
        </div>
        <div>
          <h3 className="body-sm-medium text-white">Product</h3>
          <ul className="mt-4 space-y-2.5">
            {PRODUCT.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="body-sm-regular text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="body-sm-medium text-white">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="body-sm-regular text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={loginUrl()} className="body-sm-regular text-white/70 hover:text-white transition-colors">
                Sign in
              </a>
            </li>
            <li>
              <a href={signupUrl()} className="body-sm-regular text-white/70 hover:text-white transition-colors">
                Start free trial
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 sm:px-6 body-xsm-regular text-white/50">© {new Date().getFullYear()} EduPro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
