# Freelancer Autobid

Freelancer Autobid is a Chrome extension for automating parts of the Freelancer.com bidding workflow. It can monitor projects, filter them by your saved rules, prepare proposals from templates, submit bids, show logs, send Telegram notifications, and optionally use your own AI provider key for bid and chat message generation.

## Features

- Auto-search Freelancer.com projects by keyword, budget, country, currency, project type, and post time.
- Validate projects before bidding.
- Place bids from saved templates.
- Optional AI bid generation with your own OpenAI or Anthropic API key.
- Chat tools for project-related message threads.
- Telegram notifications.
- Free plan access without a license key.
- Paid signed license activation with email, plan, billing period, and license key. The expiration date is calculated from the signed billing period.

## Pricing

### Plan Differences

| Feature | Free | Premium | Ultra |
| --- | --- | --- | --- |
| License key required | No | Yes | Yes |
| Daily auto bids | 3 bids/day | 20 bids/day | Unlimited |
| Profile, project, filter, template, settings, and logs | Included | Included | Included |
| AI bid generation | Included with your OpenAI or Anthropic API key | Included with your OpenAI or Anthropic API key | Included with your OpenAI or Anthropic API key |
| AI chat generate/correct | Not included | 50 uses/day | Unlimited |
| AI provider/model selection | OpenAI and Anthropic | OpenAI and Anthropic | OpenAI and Anthropic |
| Custom system prompt | Not included | Default prompt only | Custom prompt supported |
| Project links in AI bids | Not included | Not included | Included |
| Telegram notifications | Not included | Included | Included |
| Best for | Trying basic bidding tools | Regular bidding automation | Heavy bidding and advanced AI customization |

### Prices

| Plan | Monthly | 3 Months | 6 Months | Annual |
| --- | ---: | ---: | ---: | ---: |
| Premium | $4.99 | $13.47 | $23.95 | $41.92 |
| Ultra | $9.99 | $26.97 | $47.95 | $83.92 |

Crypto discount prices:

| Plan | Monthly | 3 Months | 6 Months | Annual |
| --- | ---: | ---: | ---: | ---: |
| Premium | $4.49 | $12.12 | $21.55 | $37.72 |
| Ultra | $8.99 | $24.27 | $43.15 | $75.52 |

## Free Plan

The Free plan does not need a license key. Open the extension on Freelancer.com and click Start Free Plan.

Free plan limits:

- 3 auto bids per day
- AI bid generation is included with your own OpenAI or Anthropic API key
- OpenAI and Anthropic provider/model selection for AI bids
- No AI chat generate/correct
- No custom system prompt or project links
- No Telegram notifications
- Basic project, filter, template, settings, and log tools

## Paid Version

To use the paid version, pay to the EVM address below, then send the maintainer:

- Email address
- Plan
- Billing period: monthly, 3 months, 6 months, or annual
- Transaction data proving payment to `0xc3E55e24e7F4d4539e87205F3b03791e0034fdcE`

After payment is confirmed, you will receive a signed license key. The license expiration date is calculated from the selected billing period.

Open the extension on Freelancer.com, activate the license with:

- Email address
- Plan
- Billing period
- License key

Then reload the extension if needed.

## Donate (EVM)

Scan the QR code below to donate or pay from an EVM-compatible wallet.

![EVM donation QR](https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ethereum%3A0xc3E55e24e7F4d4539e87205F3b03791e0034fdcE)

EVM address:

```text
0xc3E55e24e7F4d4539e87205F3b03791e0034fdcE
```

## Install

1. Download or clone this build repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select this build folder.
6. Open Freelancer.com, log in, and activate your license from the extension.

## Notes

This extension is intended for users who understand Freelancer.com bidding rules and are responsible for their own account activity. AI features use API keys stored locally in the browser extension.
