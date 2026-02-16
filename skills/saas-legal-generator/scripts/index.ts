#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";

// --- Types ---

interface Config {
    company_name?: string;
    domain?: string;
    contact_email?: string;
    support_email?: string;
    address?: string;
    jurisdiction?: string;
    currency?: string;
    service_description?: string;
    features?: string[];
    service_type?: string;
    min_age?: string;
    has_free_tier?: boolean;
    billing_cycle?: string;
    refund_policy?: string;
    refund_days?: string;
    collects_email?: boolean;
    collects_payment?: boolean;
    collects_usage?: boolean;
    uses_cookies?: boolean;
    cookie_categories?: string[];
    data_retention_days?: string;
    jurisdictions?: string[];
    gdpr_rep_email?: string;
    ccpa_agent_email?: string;
    third_parties?: {
        payment?: string;
        hosting?: string;
        analytics?: string;
        email?: string;
        support?: string;
    };
    documents?: string[];
}

const ALL_DOCUMENTS = [
    { name: "Privacy Policy", key: "privacy_policy", default: true },
    { name: "Terms of Service", key: "terms", default: true },
    { name: "Cookie Policy", key: "cookies", condition: (c: Config) => c.uses_cookies },
    { name: "Acceptable Use Policy", key: "aup", default: true },
    { name: "Data Processing Agreement (GDPR)", key: "dpa", condition: (c: Config) => c.jurisdictions?.includes("gdpr") },
    { name: "CCPA 'Do Not Sell' Link", key: "ccpa_opt_out", condition: (c: Config) => c.jurisdictions?.includes("ccpa") },
];

const TEMPLATE_MAP: Record<string, string> = {
    privacy_policy: "privacy-policy-global.md",
    terms: "terms-of-service-saas.md",
    cookies: "cookie-policy.md",
    aup: "acceptable-use-policy.md",
    dpa: "data-processing-agreement.md",
    ccpa_opt_out: "ccpa-opt-out-link.md",
};

const OUTPUT_FILENAMES: Record<string, string> = {
    privacy_policy: "privacy-policy.md",
    terms: "terms-of-service.md",
    cookies: "cookie-policy.md",
    aup: "acceptable-use-policy.md",
    dpa: "data-processing-agreement.md",
    ccpa_opt_out: "do-not-sell-my-information.md",
};


// --- Generator Class ---

class LegalGenerator {
    private outputDir: string;
    private templateDir: string;
    private config: Config = {};
    private rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    constructor() {
        this.outputDir = join(import.meta.dir, "../output");
        this.templateDir = join(import.meta.dir, "../templates");
    }

    async loadConfig(path: string) {
        try {
            const content = await readFile(path, 'utf8');
            const loadedConfig = JSON.parse(content);
            this.config = { ...this.config, ...loadedConfig };
            console.log(`Loaded configuration from ${path}`);
        } catch (error) {
            throw new Error(`Failed to load config from ${path}: ${error}`);
        }
    }

    private async getInput(prompt: string, defaultValue: string = "", required: boolean = true): Promise<string> {
        const promptText = defaultValue ? `${prompt} [${defaultValue}]: ` : `${prompt}: `;
        while (true) {
            const answer = await this.rl.question(promptText);
            const trimmed = answer.trim();
            if (trimmed) return trimmed;
            if (defaultValue) return defaultValue;
            if (!required) return "";
            console.log("This field is required. Please enter a value.");
        }
    }

    private async getMultiline(prompt: string): Promise<string> {
        console.log(`${prompt} (press Enter twice to finish):`);
        const lines: string[] = [];
        while (true) {
            const line = await this.rl.question("");
            if (line === "") break;
            lines.push(line);
        }
        return lines.join("\n");
    }

    private async getChoice(prompt: string, choices: string[]): Promise<string> {
        console.log(`\n${prompt}`);
        choices.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));

        while (true) {
            const answer = await this.rl.question("\nEnter choice (number): ");
            const idx = parseInt(answer.trim()) - 1;
            if (!isNaN(idx) && idx >= 0 && idx < choices.length) {
                const choice = choices[idx];
                if (choice !== undefined) {
                    return choice;
                }
            }
            console.log(`Please enter a number between 1 and ${choices.length}`);
        }
    }

    private async getYesNo(prompt: string, defaultValue: boolean = false): Promise<boolean> {
        const defaultStr = defaultValue ? "Y/n" : "y/N";
        const answer = await this.rl.question(`${prompt} [${defaultStr}]: `);
        const trimmed = answer.trim().toLowerCase();
        if (!trimmed) return defaultValue;
        return ["y", "yes"].includes(trimmed);
    }

    async collectCompanyInfo() {
        console.log("\n" + "=".repeat(60));
        console.log("COMPANY INFORMATION");
        console.log("=".repeat(60));

        this.config.company_name = await this.getInput("Company Name");
        this.config.domain = await this.getInput("Website Domain", "example.com");
        this.config.contact_email = await this.getInput("Contact Email", `legal@${this.config.domain}`);
        this.config.support_email = await this.getInput("Support Email", `support@${this.config.domain}`);
        this.config.address = await this.getMultiline("Company Address");
        this.config.jurisdiction = await this.getInput("Governing Law Jurisdiction", "Delaware, USA");
        this.config.currency = await this.getInput("Currency", "USD");
    }

    async collectServiceInfo() {
        console.log("\n" + "=".repeat(60));
        console.log("SERVICE INFORMATION");
        console.log("=".repeat(60));

        this.config.service_description = await this.getMultiline("Describe your service (one sentence)");

        console.log("\nKey Features (enter each feature, empty line to finish):");
        const features: string[] = [];
        while (true) {
            const feature = await this.rl.question(`  Feature ${features.length + 1}: `);
            if (!feature) break;
            features.push(feature);
        }
        this.config.features = features;

        this.config.service_type = await this.getChoice("Service Type:", [
            "B2B SaaS", "B2C SaaS", "Marketplace", "Platform", "Other"
        ]);

        this.config.min_age = await this.getInput("Minimum User Age", "13");
    }

    async collectBillingInfo() {
        console.log("\n" + "=".repeat(60));
        console.log("BILLING INFORMATION");
        console.log("=".repeat(60));

        this.config.has_free_tier = await this.getYesNo("Do you offer a free tier?");
        this.config.billing_cycle = await this.getChoice("Billing Cycle:", [
            "Monthly", "Annual", "Quarterly", "One-time"
        ]);
        this.config.refund_policy = await this.getMultiline("Refund Policy Description");
        this.config.refund_days = await this.getInput("Refund Period (days)", "30");
    }

    async collectDataPractices() {
        console.log("\n" + "=".repeat(60));
        console.log("DATA PRACTICES");
        console.log("=".repeat(60));

        this.config.collects_email = await this.getYesNo("Collect email addresses?", true);
        this.config.collects_payment = await this.getYesNo("Collect payment information?", true);
        this.config.collects_usage = await this.getYesNo("Collect usage analytics?", true);
        this.config.uses_cookies = await this.getYesNo("Use cookies?", true);

        this.config.cookie_categories = [];
        if (this.config.uses_cookies) {
            console.log("\nCookie Categories:");
            if (await this.getYesNo("Essential cookies?", true)) this.config.cookie_categories.push("essential");
            if (await this.getYesNo("Analytics cookies?")) this.config.cookie_categories.push("analytics");
            if (await this.getYesNo("Marketing cookies?")) this.config.cookie_categories.push("marketing");
            if (await this.getYesNo("Functionality cookies?")) this.config.cookie_categories.push("functionality");
        }

        this.config.data_retention_days = await this.getInput("Data Retention Period (days)", "365");
    }

    async collectJurisdictions() {
        console.log("\n" + "=".repeat(60));
        console.log("COMPLIANCE JURISDICTIONS");
        console.log("=".repeat(60));

        this.config.jurisdictions = [];
        if (await this.getYesNo("Target European Union (GDPR)?")) {
            this.config.jurisdictions.push("gdpr");
            this.config.gdpr_rep_email = await this.getInput("GDPR Representative Email", this.config.contact_email);
        }
        if (await this.getYesNo("Target California (CCPA/CPRA)?")) {
            this.config.jurisdictions.push("ccpa");
            this.config.ccpa_agent_email = await this.getInput("CCPA Agent Email", this.config.contact_email);
        }
        if (await this.getYesNo("Target Canada (PIPEDA)?")) this.config.jurisdictions.push("pipeda");
        if (await this.getYesNo("Target Brazil (LGPD)?")) this.config.jurisdictions.push("lgpd");
        if (await this.getYesNo("Target United Kingdom (UK GDPR)?")) this.config.jurisdictions.push("uk-gdpr");
    }

    async collectThirdPartyServices() {
        console.log("\n" + "=".repeat(60));
        console.log("THIRD-PARTY SERVICES");
        console.log("=".repeat(60));

        this.config.third_parties = {};
        this.config.third_parties.payment = await this.getInput("Payment Processor (e.g., Stripe, PayPal)", "Stripe");
        this.config.third_parties.hosting = await this.getInput("Hosting Provider (e.g., AWS, GCP, Azure)", "AWS");
        this.config.third_parties.analytics = await this.getInput("Analytics Provider (e.g., Google Analytics)", "Google Analytics");
        this.config.third_parties.email = await this.getInput("Email Service (e.g., SendGrid, Mailgun)", "SendGrid");
        this.config.third_parties.support = await this.getInput("Support Tool (e.g., Intercom, Zendesk)", "Intercom");
    }

    async selectDocuments(): Promise<void> {
        console.log("\n" + "=".repeat(60));
        console.log("SELECT DOCUMENTS TO GENERATE");
        console.log("=".repeat(60));

        this.config.documents = [];
        for (const doc of ALL_DOCUMENTS) {
            const shouldOffer = doc.condition ? doc.condition(this.config) : doc.default !== false;
            if (shouldOffer) {
                if (await this.getYesNo(`Generate ${doc.name}?`, true)) {
                    this.config.documents.push(doc.key);
                }
            }
        }

        if (this.config.documents.length === 0) {
            console.log("\n⚠️  No documents selected. Please select at least one document.");
            return this.selectDocuments();
        }
    }

    private async generateDocument(docType: string): Promise<string> {
        const templateFile = TEMPLATE_MAP[docType];
        if (!templateFile) return `Error: Unknown document type ${docType}`;

        const templatePath = join(this.templateDir, templateFile);
        if (!existsSync(templatePath)) {
            return `# ${docType}\n\nDocument template not found. Please add templates/${docType}.md`;
        }

        let content = await readFile(templatePath, 'utf8');

        // Replacements
        const replacements: [string, string][] = [
            ["[COMPANY_NAME]", this.config.company_name || ""],
            ["[DOMAIN]", this.config.domain || ""],
            ["[CONTACT_EMAIL]", this.config.contact_email || ""],
            ["[SUPPORT_EMAIL]", this.config.support_email || this.config.contact_email || ""],
            ["[COMPANY_ADDRESS]", this.config.address || ""],
            ["[JURISDICTION]", this.config.jurisdiction || ""],
            ["[CURRENCY]", this.config.currency || ""],
            ["[EFFECTIVE_DATE]", new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
            ["[VERSION]", "1.0"],
            ["[SERVICE_DESCRIPTION]", this.config.service_description || ""],
            ["[MIN_AGE]", this.config.min_age || ""],
            ["[RETENTION_PERIOD]", this.config.data_retention_days || ""],
            ["[REFUND_PERIOD]", this.config.refund_days || ""],
            ["[BILLING_CYCLE]", this.config.billing_cycle || ""],
            ["[PAYMENT_PROCESSOR]", this.config.third_parties?.payment || ""],
            ["[HOSTING_PROVIDER]", this.config.third_parties?.hosting || ""],
            ["[ANALYTICS_PROVIDER]", this.config.third_parties?.analytics || ""],
            ["[EMAIL_PROVIDER]", this.config.third_parties?.email || ""],
            ["[SUPPORT_TOOL]", this.config.third_parties?.support || ""],
        ];

        if (this.config.gdpr_rep_email) replacements.push(["[GDPR_REP_EMAIL]", this.config.gdpr_rep_email]);
        if (this.config.ccpa_agent_email) replacements.push(["[CCPA_AGENT_EMAIL]", this.config.ccpa_agent_email]);

        if (this.config.features) {
            replacements.push(["[FEATURE_1]", this.config.features[0] || ""]);
            replacements.push(["[FEATURE_2]", this.config.features[1] || ""]);
            replacements.push(["[FEATURE_3]", this.config.features[2] || ""]);
        }

        for (const [placeholder, value] of replacements) {
            content = content.replaceAll(placeholder, value);
        }

        return content;
    }

    async generateAll() {
        console.log("\n" + "=".repeat(60));
        console.log("GENERATING DOCUMENTS");
        console.log("=".repeat(60));

        if (!existsSync(this.outputDir)) {
            await mkdir(this.outputDir, { recursive: true });
        }

        const generatedFiles: string[] = [];
        for (const docType of this.config.documents || []) {
            const content = await this.generateDocument(docType);
            const filename = OUTPUT_FILENAMES[docType] || `${docType}.md`;
            const filepath = join(this.outputDir, filename);
            await writeFile(filepath, content);
            generatedFiles.push(filename);
            console.log(`✓ Generated: ${filename}`);
        }
        return generatedFiles;
    }

    async run(configPath?: string) {
        console.log("\n" + "=".repeat(60));
        console.log("SAAS LEGAL BOILERPLATE GENERATOR");
        console.log("=".repeat(60));

        try {
            if (configPath) {
                await this.loadConfig(configPath);
            } else {
                console.log("\nThis tool will help you generate legal documents for your SaaS product.");
                console.log("Please answer the following questions to customize your documents.");
                console.log("\n⚠️  DISCLAIMER: These templates are for informational purposes only.");
                console.log("Always consult with a qualified attorney before publishing legal documents.\n");

                await this.collectCompanyInfo();
                await this.collectServiceInfo();
                await this.collectBillingInfo();
                await this.collectDataPractices();
                await this.collectJurisdictions();
                await this.collectThirdPartyServices();
                await this.selectDocuments();
            }

            const files = await this.generateAll();

            console.log("\n" + "=".repeat(60));
            console.log("GENERATION COMPLETE");
            console.log("=".repeat(60));
            console.log(`\nGenerated ${files.length} documents in:`);
            console.log(`  ${this.outputDir}/\n`);
            files.forEach(f => console.log(`  - ${f}`));

            console.log("\n" + "=".repeat(60));
            console.log("NEXT STEPS");
            console.log("=".repeat(60));
            console.log(`
1. Review each generated document carefully
2. Customize for your specific data practices and business model
3. Consult with a qualified attorney for legal review
4. Deploy to your website (link from footer)
5. Track changes and version dates
6. Review and update at least annually
`);
            console.log(`📂 Output directory: ${this.outputDir}`);

        } catch (error) {
            console.error("\n\n❌ Error:", error);
        } finally {
            this.rl.close();
        }
    }
}

// Helper to check if run directly
if (import.meta.main) {
    const configPath = process.argv[2];
    new LegalGenerator().run(configPath);
}
