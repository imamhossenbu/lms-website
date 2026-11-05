import { LEGAL, type LegalDoc } from "./config";

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  summary: `The agreement between ${LEGAL.company} and the academies and people who use our platform.`,
  keyPoints: [
    "Start with a free trial; paid plans renew monthly or yearly until you cancel.",
    "Your academy owns its content and student data.",
    "Use EduPro lawfully and keep your account secure.",
    "You can cancel any time and export your data before you leave.",
  ],
  body: `These Terms of Service ("Terms") govern your use of the ${LEGAL.company} website and platform. By creating an account or using the service, you agree to these Terms. If you sign up on behalf of an academy or other organisation, you confirm that you are allowed to accept these Terms for it.

## The service

${LEGAL.company} provides an online platform for academies to create courses, run live classes, assess students, issue certificates, accept payments and manage their team. Features and limits depend on the plan you choose, as described on our [pricing page](/pricing).

## Accounts

- Give accurate information when you sign up and keep it up to date.
- Keep your password secret, and turn on two-factor sign-in for admin accounts. You are responsible for activity under your account.
- Tell us promptly through the [contact form](${LEGAL.contactPath}) if you suspect unauthorised access.
- The academy owner controls the workspace, its team members and their permissions.

## Free trials and subscriptions

- New workspaces may start with a free trial. When it ends, the workspace needs a paid plan to keep using paid features.
- Paid plans are billed in advance, monthly or yearly, and **renew automatically** until cancelled.
- You can upgrade, downgrade or cancel from **Billing & Plan** in the admin panel. A cancellation takes effect at the end of the current billing period.
- Plan prices are shown in US dollars unless stated otherwise. Taxes or payment-provider charges may apply.
- If a payment fails, we may limit the workspace until the balance is paid.

Refunds are covered by our [Refund Policy](/refund-policy).

## Selling courses to students

Academies can sell courses to their students through bKash, SSLCommerz and Stripe. The academy sets its prices and its own refund rules for students, and is responsible for the courses it sells. ${LEGAL.company} provides the tools and records the transactions; payment providers process the payments under their own terms.

## Your content

You keep all rights to the courses, videos, files, questions and other content you upload ("your content"), and your academy owns its student data. You give ${LEGAL.company} permission to host, store, copy and display your content only as needed to run the service for you. You confirm that you have the rights to everything you upload.

## Acceptable use

You agree not to:

- upload content that is illegal, infringing, hateful, harassing or sexually explicit, or that exploits minors;
- use the service to send spam or to collect people's data without permission;
- try to break, overload, reverse-engineer or get around the security or limits of the service;
- resell or share access to the platform outside your academy without our written agreement.

We may remove content or suspend accounts that break these rules.

## Availability and support

We work to keep ${LEGAL.company} available and secure, and we make regular backups, but we cannot promise that the service will be uninterrupted or error-free. We may perform maintenance and change or improve features over time; we will give notice of changes that significantly reduce functionality you pay for.

## Ending the service

You may stop using ${LEGAL.company} at any time. We may suspend or close a workspace that breaks these Terms or remains unpaid, after giving notice where reasonable. Before a workspace is closed, the owner can export its data. After closure, data is deleted as described in our [Privacy Policy](/privacy).

## Limitation of liability

To the extent permitted by law, ${LEGAL.company} is not liable for indirect or consequential losses, such as lost profits or lost data, arising from the use of the service. Our total liability for any claim is limited to the amount you paid us for the service in the 12 months before the claim.

## Changes to these Terms

We may update these Terms from time to time. We will post the new version here with a new "last updated" date and notify account owners of significant changes. Continuing to use the service after a change means you accept the updated Terms.

## Governing law

These Terms are governed by ${LEGAL.governingLaw}. Any dispute will be handled by ${LEGAL.courts}, unless the law requires otherwise.

## Contact us

Questions about these Terms? Send us a message through the [contact form](${LEGAL.contactPath}).`,
};
