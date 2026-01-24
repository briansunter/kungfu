#!/usr/bin/env python3
"""
SaaS Legal Boilerplate Generator - Interactive Mode
Generates customized legal documents for SaaS applications.
"""

import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))


class LegalGenerator:
    """Interactive legal document generator."""

    def __init__(self):
        self.output_dir = Path(__file__).parent.parent / "output"
        self.output_dir.mkdir(exist_ok=True)
        self.config = {}

    def get_input(self, prompt: str, default: str = "", required: bool = True) -> str:
        """Get user input with optional default."""
        if default:
            prompt = f"{prompt} [{default}]: "
        else:
            prompt = f"{prompt}: "

        while True:
            value = input(prompt).strip() or default
            if value or not required:
                return value
            print("This field is required. Please enter a value.")

    def get_multiline(self, prompt: str) -> str:
        """Get multiline input (terminated by empty line)."""
        print(f"{prompt} (press Enter twice to finish):")
        lines = []
        while True:
            line = input()
            if line == "":
                break
            lines.append(line)
        return "\n".join(lines)

    def get_choice(self, prompt: str, choices: List[str]) -> str:
        """Get user choice from list."""
        print(f"\n{prompt}")
        for i, choice in enumerate(choices, 1):
            print(f"  {i}. {choice}")

        while True:
            try:
                idx = int(input("\nEnter choice (number): ")) - 1
                if 0 <= idx < len(choices):
                    return choices[idx]
            except ValueError:
                pass
            print(f"Please enter a number between 1 and {len(choices)}")

    def get_yes_no(self, prompt: str, default: bool = False) -> bool:
        """Get yes/no response from user."""
        default_str = "Y/n" if default else "y/N"
        response = input(f"{prompt} [{default_str}]: ").strip().lower()

        if not response:
            return default

        return response in ["y", "yes", "Y", "YES"]

    def collect_company_info(self):
        """Collect basic company information."""
        print("\n" + "="*60)
        print("COMPANY INFORMATION")
        print("="*60)

        self.config["company_name"] = self.get_input("Company Name")
        self.config["domain"] = self.get_input("Website Domain", "example.com")
        self.config["contact_email"] = self.get_input("Contact Email", "legal@" + self.config["domain"])
        self.config["support_email"] = self.get_input("Support Email", "support@" + self.config["domain"])
        self.config["address"] = self.get_multiline("Company Address")
        self.config["jurisdiction"] = self.get_input("Governing Law Jurisdiction", "Delaware, USA")
        self.config["currency"] = self.get_input("Currency", "USD")

    def collect_service_info(self):
        """Collect service-specific information."""
        print("\n" + "="*60)
        print("SERVICE INFORMATION")
        print("="*60)

        self.config["service_description"] = self.get_multiline(
            "Describe your service (one sentence)"
        )

        print("\nKey Features (enter each feature, empty line to finish):")
        features = []
        while True:
            feature = input(f"  Feature {len(features) + 1}: ")
            if not feature:
                break
            features.append(feature)
        self.config["features"] = features

        self.config["service_type"] = self.get_choice(
            "Service Type:",
            ["B2B SaaS", "B2C SaaS", "Marketplace", "Platform", "Other"]
        )

        self.config["min_age"] = self.get_input(
            "Minimum User Age",
            "13"
        )

    def collect_billing_info(self):
        """Collect billing and pricing information."""
        print("\n" + "="*60)
        print("BILLING INFORMATION")
        print("="*60)

        self.config["has_free_tier"] = self.get_yes_no("Do you offer a free tier?")
        self.config["billing_cycle"] = self.get_choice(
            "Billing Cycle:",
            ["Monthly", "Annual", "Quarterly", "One-time"]
        )
        self.config["refund_policy"] = self.get_multiline(
            "Refund Policy Description"
        )
        self.config["refund_days"] = self.get_input(
            "Refund Period (days)",
            "30"
        )

    def collect_data_practices(self):
        """Collect data collection and processing information."""
        print("\n" + "="*60)
        print("DATA PRACTICES")
        print("="*60)

        self.config["collects_email"] = self.get_yes_no("Collect email addresses?", True)
        self.config["collects_payment"] = self.get_yes_no("Collect payment information?", True)
        self.config["collects_usage"] = self.get_yes_no("Collect usage analytics?", True)
        self.config["uses_cookies"] = self.get_yes_no("Use cookies?", True)

        self.config["cookie_categories"] = []
        if self.config["uses_cookies"]:
            print("\nCookie Categories:")
            if self.get_yes_no("Essential cookies?", True):
                self.config["cookie_categories"].append("essential")
            if self.get_yes_no("Analytics cookies?"):
                self.config["cookie_categories"].append("analytics")
            if self.get_yes_no("Marketing cookies?"):
                self.config["cookie_categories"].append("marketing")
            if self.get_yes_no("Functionality cookies?"):
                self.config["cookie_categories"].append("functionality")

        self.config["data_retention_days"] = self.get_input(
            "Data Retention Period (days)",
            "365"
        )

    def collect_jurisdictions(self):
        """Collect target jurisdictions for compliance."""
        print("\n" + "="*60)
        print("COMPLIANCE JURISDICTIONS")
        print("="*60)

        self.config["jurisdictions"] = []

        if self.get_yes_no("Target European Union (GDPR)?"):
            self.config["jurisdictions"].append("gdpr")
            self.config["gdpr_rep_email"] = self.get_input(
                "GDPR Representative Email",
                self.config["contact_email"]
            )

        if self.get_yes_no("Target California (CCPA/CPRA)?"):
            self.config["jurisdictions"].append("ccpa")
            self.config["ccpa_agent_email"] = self.get_input(
                "CCPA Agent Email",
                self.config["contact_email"]
            )

        if self.get_yes_no("Target Canada (PIPEDA)?"):
            self.config["jurisdictions"].append("pipeda")

        if self.get_yes_no("Target Brazil (LGPD)?"):
            self.config["jurisdictions"].append("lgpd")

        if self.get_yes_no("Target United Kingdom (UK GDPR)?"):
            self.config["jurisdictions"].append("uk-gdpr")

    def collect_third_party_services(self):
        """Collect third-party service information."""
        print("\n" + "="*60)
        print("THIRD-PARTY SERVICES")
        print("="*60)

        self.config["third_parties"] = {}

        self.config["third_parties"]["payment"] = self.get_input(
            "Payment Processor (e.g., Stripe, PayPal)",
            "Stripe"
        )

        self.config["third_parties"]["hosting"] = self.get_input(
            "Hosting Provider (e.g., AWS, GCP, Azure)",
            "AWS"
        )

        self.config["third_parties"]["analytics"] = self.get_input(
            "Analytics Provider (e.g., Google Analytics)",
            "Google Analytics"
        )

        self.config["third_parties"]["email"] = self.get_input(
            "Email Service (e.g., SendGrid, Mailgun)",
            "SendGrid"
        )

        self.config["third_parties"]["support"] = self.get_input(
            "Support Tool (e.g., Intercom, Zendesk)",
            "Intercom"
        )

    def select_documents(self):
        """Let user select which documents to generate."""
        print("\n" + "="*60)
        print("SELECT DOCUMENTS TO GENERATE")
        print("="*60)

        all_documents = [
            ("Privacy Policy", "privacy_policy", True),
            ("Terms of Service", "terms", True),
            ("Cookie Policy", "cookies", self.config["uses_cookies"]),
            ("Acceptable Use Policy", "aup", True),
            ("Data Processing Agreement (GDPR)", "dpa", "gdpr" in self.config["jurisdictions"]),
            ("CCPA 'Do Not Sell' Link", "ccpa_opt_out", "ccpa" in self.config["jurisdictions"]),
        ]

        self.config["documents"] = []

        for doc_name, doc_key, default in all_documents:
            if not default:
                continue

            if self.get_yes_no(f"Generate {doc_name}?", True):
                self.config["documents"].append(doc_key)

        if not self.config["documents"]:
            print("\n⚠️  No documents selected. Please select at least one document.")
            return self.select_documents()

    def generate_document(self, doc_type: str) -> str:
        """Generate a specific document type."""
        template_dir = Path(__file__).parent.parent / "templates"

        templates = {
            "privacy_policy": template_dir / "privacy-policy-global.md",
            "terms": template_dir / "terms-of-service-saas.md",
            "cookies": template_dir / "cookie-policy.md",
            "aup": template_dir / "acceptable-use-policy.md",
            "dpa": template_dir / "data-processing-agreement.md",
            "ccpa_opt_out": template_dir / "ccpa-opt-out-link.md",
        }

        template_file = templates.get(doc_type)
        if not template_file or not template_file.exists():
            return f"# {doc_type.replace('_', ' ').title()}\n\nDocument template not found. Please add templates/{doc_type}.md"

        # Read template
        content = template_file.read_text()

        # Replace placeholders
        replacements = {
            "[COMPANY_NAME]": self.config["company_name"],
            "[DOMAIN]": self.config["domain"],
            "[CONTACT_EMAIL]": self.config["contact_email"],
            "[SUPPORT_EMAIL]": self.config.get("support_email", self.config["contact_email"]),
            "[COMPANY_ADDRESS]": self.config["address"],
            "[JURISDICTION]": self.config["jurisdiction"],
            "[CURRENCY]": self.config["currency"],
            "[EFFECTIVE_DATE]": datetime.now().strftime("%B %d, %Y"),
            "[VERSION]": "1.0",
            "[SERVICE_DESCRIPTION]": self.config["service_description"],
            "[MIN_AGE]": self.config["min_age"],
            "[RETENTION_PERIOD]": str(self.config["data_retention_days"]),
            "[REFUND_PERIOD]": self.config["refund_days"],
            "[BILLING_CYCLE]": self.config["billing_cycle"],
            "[PAYMENT_PROCESSOR]": self.config["third_parties"]["payment"],
            "[HOSTING_PROVIDER]": self.config["third_parties"]["hosting"],
            "[ANALYTICS_PROVIDER]": self.config["third_parties"]["analytics"],
            "[EMAIL_PROVIDER]": self.config["third_parties"]["email"],
            "[SUPPORT_TOOL]": self.config["third_parties"]["support"],
        }

        # GDPR-specific
        if "gdpr_rep_email" in self.config:
            replacements["[GDPR_REP_EMAIL]"] = self.config["gdpr_rep_email"]

        # CCPA-specific
        if "ccpa_agent_email" in self.config:
            replacements["[CCPA_AGENT_EMAIL]"] = self.config["ccpa_agent_email"]

        # Features list
        if "features" in self.config:
            feature_list = "\n".join(f"- {f}" for f in self.config["features"])
            replacements["[FEATURE_1]"] = self.config["features"][0] if len(self.config["features"]) > 0 else ""
            replacements["[FEATURE_2]"] = self.config["features"][1] if len(self.config["features"]) > 1 else ""
            replacements["[FEATURE_3]"] = self.config["features"][2] if len(self.config["features"]) > 2 else ""

        # Apply replacements
        for placeholder, value in replacements.items():
            content = content.replace(placeholder, value)

        return content

    def generate_all(self):
        """Generate all selected documents."""
        print("\n" + "="*60)
        print("GENERATING DOCUMENTS")
        print("="*60)

        generated_files = []

        for doc_type in self.config["documents"]:
            content = self.generate_document(doc_type)

            # Determine filename
            filenames = {
                "privacy_policy": "privacy-policy.md",
                "terms": "terms-of-service.md",
                "cookies": "cookie-policy.md",
                "aup": "acceptable-use-policy.md",
                "dpa": "data-processing-agreement.md",
                "ccpa_opt_out": "do-not-sell-my-information.md",
            }

            filename = filenames.get(doc_type, f"{doc_type}.md")
            filepath = self.output_dir / filename

            # Write file
            filepath.write_text(content)
            generated_files.append(filepath)

            print(f"✓ Generated: {filename}")

        return generated_files

    def run(self):
        """Run the interactive generator."""
        print("\n" + "="*60)
        print("SAAS LEGAL BOILERPLATE GENERATOR")
        print("="*60)
        print("\nThis tool will help you generate legal documents for your SaaS product.")
        print("Please answer the following questions to customize your documents.")
        print("\n⚠️  DISCLAIMER: These templates are for informational purposes only.")
        print("Always consult with a qualified attorney before publishing legal documents.\n")

        # Collect information
        self.collect_company_info()
        self.collect_service_info()
        self.collect_billing_info()
        self.collect_data_practices()
        self.collect_jurisdictions()
        self.collect_third_party_services()
        self.select_documents()

        # Generate documents
        generated_files = self.generate_all()

        # Summary
        print("\n" + "="*60)
        print("GENERATION COMPLETE")
        print("="*60)
        print(f"\nGenerated {len(generated_files)} documents in:")
        print(f"  {self.output_dir}/\n")

        for filepath in generated_files:
            print(f"  - {filepath.name}")

        print("\n" + "="*60)
        print("NEXT STEPS")
        print("="*60)
        print("""
1. Review each generated document carefully
2. Customize for your specific data practices and business model
3. Consult with a qualified attorney for legal review
4. Deploy to your website (link from footer)
5. Track changes and version dates
6. Review and update at least annually
""")

        print(f"📂 Output directory: {self.output_dir.absolute()}")
        print()


def main():
    """Main entry point."""
    generator = LegalGenerator()

    try:
        generator.run()
    except KeyboardInterrupt:
        print("\n\n⚠️  Generation cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
