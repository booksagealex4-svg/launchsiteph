# LaunchSite PH — Website Build Kit

Everything needed to build the site, whether you use Claude Code or Lovable.

## What's in here

```
CLAUDE.md                      Project rules — Claude Code reads this automatically
brand/00-brand-brief.md        Positioning, audience, voice, what not to say
brand/01-design-system.md      Colors, type, spacing, animation rules
brand/02-build-sequence.md     The build order, phase by phase
content/packages.md            The three pricing packages + care plan
content/industries-and-templates.md   Target verticals and the 8 flagship templates
content/copy-bank.md           Approved headlines and section copy
content/ph-market-notes.md     Philippine market realities to design around
prompts/step-01..13            Copy-paste prompts, one per section
```

## Using this with Claude Code (recommended)

1. Install Node.js 18+ and get a GitHub account.
2. Install Claude Code, then `cd` into this folder and run `claude`.
3. First message: **"Read CLAUDE.md and everything in brand/ and content/. Then confirm
   you understand the project in 5 bullets before building anything."**
4. Then: **"Do Step 1 from prompts/step-01-foundation.md."**
5. Run `npm run dev` to preview. When a step looks right: `git add -A && git commit -m "step 1"`.
6. Move to the next step. If a step goes wrong, `git checkout .` and retry — costs nothing.

Why this beats Lovable here: no per-generation credit burn, real version history, you own
the code, and repetitive work (eight template demos) is cheap instead of expensive.

## Using this with Lovable instead

Paste the contents of each `prompts/step-XX.md` file into Lovable, one at a time, in order.
Check the result before moving on. Don't paste two steps at once — that's how results
get sprawling and expensive to fix.

## Before you start

Replace "LaunchSite PH" everywhere with your final brand name. It appears in CLAUDE.md,
the brand brief, the copy bank, and most prompt files. One find-and-replace does it.
