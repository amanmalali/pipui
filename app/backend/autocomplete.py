from fast_autocomplete import autocomplete_factory

from pathlib import Path

class Autocomplete:
    def __init__(self, distance=3, size=20):
        self._distance = distance
        self._size = size
        self._autocomplete = autocomplete_factory(content_files=self._get_content_files())

    def _get_content_files(self):
        filepath = Path(Path.home().joinpath(".pipui", "package_list.json"))
        content_files = {
            "words": {
                "filepath": str(filepath.absolute()),
                "compress": True
            }
        }
        return content_files

    def search(self, word):
        """Return acutal words instead of indexed words"""

        result = self._autocomplete.search(word, self._distance, self._size)
        return [self._autocomplete.words[item].display for sublist in result for item in sublist]
