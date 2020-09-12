from pathlib import Path
from typing import Dict, List

from fast_autocomplete import autocomplete_factory


class Autocomplete:
    def __init__(self, distance: int=3, size: int=15):
        self._distance = distance
        self._size = size
        self._autocomplete = autocomplete_factory(content_files=self._get_content_files())

    def _get_content_files(self) -> Dict :
        """JSON data containing package names"""

        filepath = Path(Path.home().joinpath(".pipui", "package_list.json"))
        content_files = {
            "words": {
                "filepath": str(filepath.absolute()),
                "compress": True
            }
        }
        return content_files

    def search(self, word: str) -> List:
        """Return acutal words instead of indexed words"""

        result = self._autocomplete.search(word, self._distance, self._size)
        return [self._autocomplete.words[item].display for sublist in result for item in sublist]
