# Build Output Repository

This folder contains the built/compiled extension files.

## Setup

This folder is initialized as a separate git repository pointing to:
https://github.com/mernmaster2025/freelancer-autobid-build

## Usage

After building the extension, commit and push the build output:

```bash
cd dist
git add .
git commit -m "Build: [version or description]"
git push origin main
```

## Note

The parent repository's `.gitignore` excludes `dist/` but allows `dist/.git` so this nested repository works properly.
