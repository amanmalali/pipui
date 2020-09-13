from setuptools import setup, find_packages

setup(
    name='pipUI-backend',  # Required

    version='1.0.3',  # Required

    description='Backend server for pipUI',  # Optional

    url='https://github.com/amanmalali/pipui',  # Optional

    classifiers=[  # Optional
        # How mature is this project? Common values are
        #   3 - Alpha
        #   4 - Beta
        #   5 - Production/Stable
        'Development Status :: 4 - Beta',

        'Intended Audience :: End Users/Desktop',

        'License :: OSI Approved :: MIT License',

        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3 :: Only',
    ],

    keywords='pipui, pypi, search, backend, server',  # Optional

    packages=['pipUI_backend/'],  # Required

    python_requires='>=3.5, <4',

    install_requires=['flask', 'beautifulsoup4', 'requests', 'fast-autocomplete', 'lxml', 'python-Levenshtein'],  # Optional
)
