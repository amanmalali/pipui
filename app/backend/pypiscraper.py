from collections import defaultdict
import re
from typing import Dict, Optional, List

from bs4 import BeautifulSoup
import requests


# TODO: add exception handling
def _scrape_package_names(URL: Optional[str]="https://pypi.org/simple/") -> List[str]:
    """Return list of scraped packages"""

    data = requests.get(URL)
    soup = BeautifulSoup(data.text, "lxml")
    return [tag.string for tag in soup.find_all("a")]


def _clean_and_convert(package_list: List[str]) -> Dict:
    """Convert list of packages to JSON format required by fast-autocomplete"""

    regex = re.compile(r"[._-]")
    data = defaultdict(list)
    for package_name in package_list:
        normalised = re.sub(regex, " ", package_name).lower()
        data[normalised].extend([{}, package_name, 0])

    return data


def get_packages() -> Dict:
    """Download and return the list of PyPi packages"""

    package_list = _scrape_package_names()
    return _clean_and_convert(package_list)

