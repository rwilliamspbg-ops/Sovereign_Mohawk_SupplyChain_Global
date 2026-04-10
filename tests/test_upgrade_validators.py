import subprocess
import unittest
from pathlib import Path


class UpgradeValidatorTests(unittest.TestCase):
    def test_policy_pack_validator_script(self):
        root = Path(__file__).resolve().parents[1]
        script = root / "scripts" / "validate_policy_pack.py"
        result = subprocess.run(["python3", str(script)], capture_output=True, text=True, check=False)
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("passed", result.stdout.lower())

    def test_observability_mapping_validator_script(self):
        root = Path(__file__).resolve().parents[1]
        script = root / "scripts" / "validate_observability_mapping.py"
        result = subprocess.run(["python3", str(script)], capture_output=True, text=True, check=False)
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("passed", result.stdout.lower())


if __name__ == "__main__":
    unittest.main()
