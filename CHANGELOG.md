# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-05-25

### Changed

- Marketplace `displayName` to **Carbon Rewind Theme** (the previous display name was reserved after the deleted `carbon-rewind-color-theme` listing; extension ID remains `darkmusic.carbon-rewind-theme`)

## [1.0.1] - 2026-05-25

### Added

- GitHub Actions release workflow: build VSIX, publish to Visual Studio Marketplace, and attach artifacts to GitHub Releases
- `@vscode/vsce` as a dev dependency with `publish:marketplace` script (`--skip-duplicate` for safe re-runs)

### Changed

- Marketplace extension ID to **`darkmusic.carbon-rewind-theme`** (package `name`: `carbon-rewind-theme`; was `carbon-rewind-color-theme`)
- README installation command updated for the new extension ID

### Fixed

- Exclude `.github/`, `.cursor/`, and `CHANGELOG.md` from the packaged VSIX

## [1.0.0] - 2026-05-24

### Added

- `.gitignore` and `.vscodeignore` for repository hygiene and extension packaging

### Changed

- Renamed the extension and color themes from **Carbon React Color Theme** to **Carbon Rewind Color Theme**
- Renamed theme files to the `CarbonRewind-*` naming scheme
- Updated README, `package.json`, marketplace icon, contributor credits, and license attribution

### Removed

- Default `editor.accessibilitySupport` configuration from extension settings
- Committed `.vsix` release artifacts (1.3.0–1.3.2)
- GitHub Sponsors `FUNDING.yml`
