import { LEGAL, type LegalDoc } from "./config";

export const REFUND: LegalDoc = {
  slug: "refund-policy",
  title: "Refund Policy",
  summary: `When ${LEGAL.company} subscriptions can be refunded, and how refunds for course fees work.`,
  keyPoints: [
    "Try every plan free first — no payment needed for the trial.",
    `Your first subscription payment can be refunded within ${LEGAL.subscriptionRefundDays} days.`,
    "Cancel any time; renewals stop at the end of the billing period.",
    "Course fees paid to an academy follow that academy's own refund rules.",
  ],
  body: `This policy covers two kinds of payments: **subscription fees** that academies pay ${LEGAL.company} for the platform, and **course fees** that students pay academies through ${LEGAL.company}.

## Subscription fees (paid to ${LEGAL.company})

**Free trial.** New workspaces can try ${LEGAL.company} free before paying, so you can check that it fits your academy.

**First payment.** If you're not happy after your first paid charge for a new subscription, ask for a refund within **${LEGAL.subscriptionRefundDays} days** of that charge and we will refund it in full.

**Renewals.** Monthly and yearly renewals are not refundable once the new period has started, except where required by law or where the service was unavailable because of a fault on our side. You can cancel at any time from **Billing & Plan** to stop the next renewal; you keep access until the end of the period you have paid for.

**Plan changes.** When you upgrade, the new plan starts right away. When you downgrade, the change applies from the next billing period. We don't refund the difference for the remaining days of a period.

**Duplicate or wrong charges.** If you were charged twice or charged by mistake, tell us and we will refund the extra amount.

## Course fees (paid to an academy)

When a student buys a course, the payment goes to the **academy** that sells the course. Each academy sets its own refund rules for its students, and decides whether to approve a refund.

- To request a course refund, contact the academy you bought the course from.
- When an academy approves a refund, it is recorded in its admin panel and the student loses access to the course.
- The money is returned through the original payment method where the provider (bKash, SSLCommerz or Stripe) supports it.

Academies: please publish a clear refund policy for your students and link to it from your course pages.

## How to request a refund

Send us a message through the [contact form](${LEGAL.contactPath}) and choose **Support**. Include your workspace name, the email of the account owner and the date and amount of the charge.

## How long it takes

We reply within one working day. Approved refunds are sent back to the original payment method; depending on the provider and your bank, the money usually arrives within **5–10 working days**.

## Changes to this policy

We may update this policy from time to time. The version on this page, with its "last updated" date, is the one that applies.`,
};
