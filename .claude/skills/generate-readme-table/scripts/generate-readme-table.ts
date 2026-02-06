#!/usr/bin/env bun
/**
 * Generate a markdown table of all skills and their descriptions.
 *
 * Usage:
 *   bun .claude/skills/generate-readme-table/scripts/generate-readme-table.ts          # Output to stdout
 *   bun .claude/skills/generate-readme-table/scripts/generate-readme-table.ts --write  # Update README.md
 */

import { Glob } from "bun";

interface SkillFrontmatter {
	name: string;
	description: string;
	license?: string;
}

function parseFrontmatter(content: string): SkillFrontmatter | null {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match?.[1]) return null;

	const yaml = match[1];
	const result: Record<string, string> = {};
	const lines = yaml.split("\n");

	let i = 0;
	while (i < lines.length) {
		const line = lines[i] ?? "";
		const colonIndex = line.indexOf(":");

		// Skip empty lines or indented continuation lines
		if (colonIndex === -1 || line.startsWith(" ") || line.startsWith("\t")) {
			i++;
			continue;
		}

		const key = line.slice(0, colonIndex).trim();
		let value = line.slice(colonIndex + 1).trim();

		// Handle multi-line values (indented continuation lines)
		if (value === "") {
			const valueLines: string[] = [];
			i++;
			while (i < lines.length) {
				const nextLine = lines[i] ?? "";
				// Check if it's an indented continuation line
				if (nextLine.startsWith("  ") || nextLine.startsWith("\t")) {
					valueLines.push(nextLine.trim());
					i++;
				} else {
					break;
				}
			}
			value = valueLines.join(" ");
		} else {
			// Handle quoted strings
			if (
				(value.startsWith('"') && value.endsWith('"')) ||
				(value.startsWith("'") && value.endsWith("'"))
			) {
				value = value.slice(1, -1);
			}
			i++;
		}

		result[key] = value;
	}

	if (!result.name || !result.description) return null;

	return {
		name: result.name,
		description: result.description,
		license: result.license,
	};
}

async function getSkills(): Promise<SkillFrontmatter[]> {
	const glob = new Glob("skills/*/SKILL.md");
	const skills: SkillFrontmatter[] = [];

	for await (const path of glob.scan(".")) {
		const file = Bun.file(path);
		const content = await file.text();
		const frontmatter = parseFrontmatter(content);

		if (frontmatter) {
			skills.push(frontmatter);
		}
	}

	// Sort alphabetically by name
	return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function generateTable(skills: SkillFrontmatter[]): string {
	const lines: string[] = [
		"| Skill | Description |",
		"|-------|-------------|",
	];

	for (const skill of skills) {
		// Escape pipe characters in description
		const desc = skill.description.replace(/\|/g, "\\|");
		const link = `[${skill.name}](skills/${skill.name}/SKILL.md)`;
		lines.push(`| ${link} | ${desc} |`);
	}

	return lines.join("\n");
}

const README_MARKER_START = "<!-- SKILLS-TABLE-START -->";
const README_MARKER_END = "<!-- SKILLS-TABLE-END -->";

async function updateReadme(
	table: string,
	skillCount: number,
): Promise<boolean> {
	const readmePath = "README.md";
	const file = Bun.file(readmePath);

	let content: string;
	if (await file.exists()) {
		content = await file.text();
	} else {
		// Create initial README with markers
		content = `# Kungfu

A modular plugin/skill marketplace for Claude Code.

${README_MARKER_START}
${README_MARKER_END}

## License

MIT
`;
	}

	// Check if markers exist
	if (
		!content.includes(README_MARKER_START) ||
		!content.includes(README_MARKER_END)
	) {
		console.error(
			`README.md must contain ${README_MARKER_START} and ${README_MARKER_END} markers`,
		);
		return false;
	}

	// Replace content between markers
	const before = content.slice(
		0,
		content.indexOf(README_MARKER_START) + README_MARKER_START.length,
	);
	const after = content.slice(content.indexOf(README_MARKER_END));

	const newContent = `${before}\n${table}\n${after}`;

	await Bun.write(readmePath, newContent);
	console.log(`Updated ${readmePath} with ${skillCount} skills`);
	return true;
}

// Main
const skills = await getSkills();
const table = generateTable(skills);

if (process.argv.includes("--write")) {
	await updateReadme(table, skills.length);
} else {
	console.log(table);
}
