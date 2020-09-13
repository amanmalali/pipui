from collections import defaultdict
from pathlib import Path
import re
from typing import Dict, Optional, List

from bs4 import BeautifulSoup
import requests


path = Path(Path.home().joinpath(".pipui", "etag"))


def is_cached(URL: Optional[str]="https://pypi.org/simple/") -> bool:
    """Don't scrape if ETag value is same as previous value"""

    with open(path, "r", encoding="utf-8") as et:
        etag = et.read()

    data = requests.get(URL, headers={"If-None-Match": etag})
    if 200 <= data.status_code < 300:
        return False
    return True


def _save_etag(ETag: str):
    with open(path, "w", encoding="utf-8") as et:
        et.write(ETag)


def _scrape_package_names(URL: Optional[str]="https://pypi.org/simple/") -> List[str]:
    """Return list of scraped packages"""

    try:
        data = requests.get(URL)
        _save_etag(data.headers["etag"])
        soup = BeautifulSoup(data.text, "lxml")
        return [tag.string for tag in soup.find_all("a")]
    except Exception as e:
        print("An exception occured trying to retrieve packages")
        print(e)
        return []


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


def get_meta(package_name: str, URL="https://pypi.org/pypi/"):
    if not URL.endswith("/"):
        URL += "/"
    data = requests.get(f"{URL}{package_name}/json").json()
    return {key:data["info"][key] for key in ("summary", "version","requires_python")}


