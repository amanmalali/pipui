import json
from pathlib import Path

import pypiscraper


def startup() -> None:
    """Startup script to verify and create intital requirements"""

    ROOT = Path(Path.home().joinpath(".pipui"))
    if not ROOT.exists():
        ROOT.mkdir()

    if ROOT.joinpath("package_list.json").is_file():
        pass
    else:
        print("Package list not found. Downloading...")
        packages = pypiscraper.get_packages()
        with open(ROOT.joinpath("package_list.json"), "w", encoding="utf-8") as plist:
            json.dump(packages, plist)
        print("Done")

