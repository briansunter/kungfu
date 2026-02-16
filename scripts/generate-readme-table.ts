#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const README_PATH = "README.md";
const SKILLS_DIR = "skills";
const START_MARKER = "<!-- SKILLS-TABLE-START -->";
const END_MARKER = "<!-- SKILLS-TABLE-END -->";

interface SkillEntry {
	name: string;
	description: string;
	category: string;
	path: string;
}

function unquote(value: string): string {
	if (value.length >= 2) {
		const first = value[0];
		const last = value[value.length - 1];
		if ((first === "\"" && last === "\"") || (first === "'" && last === "'")) {
			return value.slice(1, -1);
		}
	}
	return value;
}

function parseFrontmatter(content: string): Record<string, string> {
	const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
	if (!match || !match[1]) {
		throw new Error("Missing or malformed YAML frontmatter");
	}

	const fields: Record<string, string> = {};
	for (const rawLine of match[1].split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) {
			continue;
		}

		const separatorIndex = line.indexOf(":");
		if (separatorIndex === -1) {
			continue;
		}

		const key = line.slice(0, separatorIndex).trim();
		const value = unquote(line.slice(separatorIndex + 1).trim());
		fields[key] = value;
	}

	return fields;
}

function escapeCell(value: string): string {
	return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

async function collectSkills(): Promise<SkillEntry[]> {
	const dirEntries = await readdir(SKILLS_DIR, { withFileTypes: true });
	const skills: SkillEntry[] = [];

	for (const entry of dirEntries) {
		if (!entry.isDirectory()) {
			continue;
		}

		const skillPath = join(SKILLS_DIR, entry.name, "SKILL.md");
		if (!existsSync(skillPath)) {
			continue;
		}

		const content = await readFile(skillPath, "utf8");
		const frontmatter = parseFrontmatter(content);
		const name = frontmatter.name || entry.name;
		const description = frontmatter.description;
		const category = frontmatter.category || "uncategorized";

		if (!description) {
			throw new Error(`Missing description in ${skillPath}`);
		}

		skills.push({
			name,
			description,
			category,
			path: `skills/${entry.name}/SKILL.md`,
		});
	}

	skills.sort((a, b) => a.name.localeCompare(b.name));
	return skills;
}

function titleCase(kebab: string): string {
	return kebab
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function buildGroupedTable(skills: SkillEntry[]): string {
	const groups = new Map<string, SkillEntry[]>();
	for (const skill of skills) {
		const list = groups.get(skill.category) ?? [];
		list.push(skill);
		groups.set(skill.category, list);
	}

	const sortedCategories = [...groups.keys()].sort((a, b) =>
		a.localeCompare(b),
	);
	const sections: string[] = [];

	for (const category of sortedCategories) {
		const categorySkills = groups.get(category)!;
		categorySkills.sort((a, b) => a.name.localeCompare(b.name));

		const lines = [
			`### ${titleCase(category)}`,
			"",
			"| Skill | Description |",
			"|-------|-------------|",
			...categorySkills.map((skill) => {
				const name = escapeCell(skill.name);
				const description = escapeCell(skill.description);
				return `| [${name}](${skill.path}) | ${description} |`;
			}),
		];
		sections.push(lines.join("\n"));
	}

	return sections.join("\n\n");
}

function replaceSkillsTable(readmeContent: string, table: string): string {
	const start = readmeContent.indexOf(START_MARKER);
	const end = readmeContent.indexOf(END_MARKER);
	if (start === -1 || end === -1 || end < start) {
		throw new Error(`README markers not found or out of order in ${README_PATH}`);
	}

	const before = readmeContent.slice(0, start + START_MARKER.length);
	const after = readmeContent.slice(end);
	return `${before}\n${table}\n${after}`;
}

async function main() {
	const write = process.argv.includes("--write");
	const check = process.argv.includes("--check");

	if (write && check) {
		throw new Error("Use either --write or --check, not both");
	}

	const skills = await collectSkills();
	const table = buildGroupedTable(skills);

	if (!write && !check) {
		console.log(table);
		return;
	}

	const readme = await readFile(README_PATH, "utf8");
	const updated = replaceSkillsTable(readme, table);

	if (check) {
		if (readme !== updated) {
			throw new Error(
				"README skills table is out of date. Run `just readme-table --write`.",
			);
		}
		console.log("README skills table is up to date.");
		return;
	}

	if (readme === updated) {
		console.log("README skills table is already up to date.");
		return;
	}

	await writeFile(README_PATH, updated);
	console.log("Updated README skills table.");
}

main().catch((error) => {
	console.error(`Failed to generate README table: ${error}`);
	process.exitCode = 1;
});
